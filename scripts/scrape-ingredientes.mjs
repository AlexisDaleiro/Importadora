/**
 * Extrae la pestaña "Ingredientes" de cada ficha de producto del sitio oficial
 * de Districo y la guarda en un JSON intermedio, para revisarlo antes de que
 * toque la colección de contenido.
 *
 * El contenido de las pestañas lo carga JetTabs (Elementor) por AJAX: no está
 * en el HTML inicial, así que un fetch simple devuelve el panel vacío. Hay que
 * abrir la página en un navegador de verdad, hacer clic en la pestaña y esperar
 * a que el panel se llene.
 *
 * OJO con el emparejamiento pestaña ↔ panel: el control activo recibe la clase
 * `active-tab` pero el panel recibe `active-content`, así que esperar por
 * `.jet-tabs__content.active-tab` no encuentra nada y agota el timeout. Lo que
 * los une es el atributo `data-tab`, y su número no es fijo entre fichas.
 *
 * No hace falta recorrer las páginas de marca para juntar las URLs: cada
 * producto de src/content/products ya guarda su `sourceUrl`, que es la ficha
 * oficial de la que salió. Eso también evita tener que adivinar el match por
 * nombre entre los slugs del sitio y los del proyecto.
 *
 *   node scripts/scrape-ingredientes.mjs            # solo los que faltan
 *   node scripts/scrape-ingredientes.mjs --todos    # vuelve a bajar todo
 *   node scripts/scrape-ingredientes.mjs --limite 5 # prueba corta
 *
 * Se puede cortar con Ctrl+C y volver a arrancar: cada ficha se guarda apenas
 * se lee, y sin --todos se saltean las que ya están.
 */
import { chromium } from 'playwright-core';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const LINEA = 'alimento-para-mascotas';
const SALIDA = join(raiz, 'scripts', 'out', 'ingredientes.json');
const PAUSA_MS = 1500; // entre fichas: es el servidor del cliente
const REINTENTOS = 2;

const args = process.argv.slice(2);
const todos = args.includes('--todos');
const limite = args.includes('--limite') ? Number(args[args.indexOf('--limite') + 1]) : Infinity;

// ── Entrada ───────────────────────────────────────────────────────────────
const dirProductos = join(raiz, 'src', 'content', 'products');
const productos = readdirSync(dirProductos)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(join(dirProductos, f), 'utf8')))
  .filter((p) => p.category === LINEA && p.sourceUrl)
  .sort((a, b) => a.slug.localeCompare(b.slug));

mkdirSync(dirname(SALIDA), { recursive: true });
const previo = existsSync(SALIDA) ? JSON.parse(readFileSync(SALIDA, 'utf8')) : {};
const resultado = todos ? {} : previo;

const pendientes = productos.filter((p) => !resultado[p.slug]).slice(0, limite);
console.log(`${productos.length} productos de ${LINEA}; ${pendientes.length} por bajar.`);

// ── Extracción ────────────────────────────────────────────────────────────
/**
 * Abre la ficha, hace clic en la pestaña "Ingredientes" y devuelve el texto del
 * panel. Devuelve null si la ficha no tiene esa pestaña, que es un resultado
 * legítimo y no un error.
 */
async function leerIngredientes(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });

  const control = page
    .locator('.jet-tabs__control')
    .filter({ hasText: /ingredientes/i })
    .first();
  if ((await control.count()) === 0) return null;

  const nro = await control.getAttribute('data-tab');
  await control.scrollIntoViewIfNeeded();
  await control.click();

  // Dos cosas que pasan en fichas reales y que no son errores del script:
  //
  // - Algunas montan DOS juegos de paneles con el mismo data-tab, y el que
  //   trae el texto no es siempre el primero. Por eso se recorren todos y se
  //   busca el que tenga contenido, en vez de quedarse con `.first()`.
  // - Otras dejan el panel de Ingredientes vacío en el sitio oficial. Eso es
  //   "no hay dato", no una falla: se devuelve null y el recorrido sigue.
  const leer = (n) => {
    const el = [...document.querySelectorAll(`.jet-tabs__content[data-tab="${n}"]`)].find(
      (e) => e.innerText.trim().length > 20,
    );
    return el ? el.innerText.replace(/\s+/g, ' ').trim() : null;
  };

  try {
    await page.waitForFunction(leer, nro, { timeout: 20000 });
  } catch {
    return null;
  }
  return page.evaluate(leer, nro);
}

const fallos = [];
// playwright-core no trae navegador propio: usa uno ya instalado en la máquina.
// En este equipo el que hay es Edge, que es el mismo Chromium. Se puede forzar
// otro con CANAL=chrome.
const navegador = await chromium.launch({ channel: process.env.CANAL || 'msedge', headless: true });
const ctx = await navegador.newContext({
  viewport: { width: 1280, height: 900 },
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
});
const page = await ctx.newPage();
// Las fotos no aportan nada acá y son casi todo el peso de cada ficha.
await page.route('**/*.{png,jpg,jpeg,webp,gif,svg,woff,woff2,mp4}', (r) => r.abort());

let i = 0;
for (const p of pendientes) {
  i += 1;
  let texto;
  let error;
  for (let intento = 1; intento <= REINTENTOS; intento += 1) {
    try {
      texto = await leerIngredientes(page, p.sourceUrl);
      error = undefined;
      break;
    } catch (e) {
      error = e.message.split('\n')[0];
      if (intento < REINTENTOS) await page.waitForTimeout(2500);
    }
  }

  if (error) {
    fallos.push({ slug: p.slug, url: p.sourceUrl, error });
    console.log(`[${i}/${pendientes.length}] ERROR  ${p.slug} — ${error}`);
  } else {
    resultado[p.slug] = { name: p.name, url: p.sourceUrl, ingredientes: texto };
    console.log(`[${i}/${pendientes.length}] ok     ${p.slug} — ${texto ? `${texto.split(' ').length} palabras` : 'sin pestaña'}`);
  }

  writeFileSync(SALIDA, JSON.stringify(resultado, null, 2) + '\n', 'utf8');
  await page.waitForTimeout(PAUSA_MS);
}

await navegador.close();

// ── Reporte ───────────────────────────────────────────────────────────────
const con = Object.values(resultado).filter((r) => r.ingredientes).length;
const sin = Object.values(resultado).filter((r) => !r.ingredientes).length;
console.log('\n── Reporte ──');
console.log(`con composición : ${con}`);
console.log(`sin pestaña     : ${sin}`);
console.log(`fallaron        : ${fallos.length}`);
for (const f of fallos) console.log(`  ${f.slug} — ${f.error}`);
console.log(`\nJSON: ${SALIDA}`);
