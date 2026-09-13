/**
 * Comprueba que ninguna página desborde horizontalmente en anchos de mobile.
 *
 * El síntoma visible cuando pasa: el header teal deja de llegar al borde
 * derecho, porque el documento es más ancho que el viewport y el header solo
 * cubre el 100% del viewport.
 *
 * Uso: npm run dev (u otro servidor) y luego `npm run check:overflow`.
 * Variables: BASE (default http://localhost:4321), CANAL (default msedge).
 */
import { chromium } from 'playwright-core';

const BASE = process.env.BASE || 'http://localhost:4321';
const ANCHOS = [412, 360];
const RUTAS = [
  '/',
  '/productos',
  '/productos/guabi-natural-para-gatos-adultos',
  '/productos/biofresh-para-cachorros-razas-grandes-y-gigantes',
  '/marcas',
  '/marcas/guabi-natural',
  '/nosotros',
  '/contacto',
  '/lineas-de-negocio',
];

// TODAS=1 barre además las 150+ fichas de producto: lento, para revisiones
// grandes. Sin la variable alcanza con la muestra de arriba.
if (process.env.TODAS) {
  const { readdirSync } = await import('node:fs');
  for (const f of readdirSync(new URL('../src/content/products', import.meta.url))) {
    const ruta = '/productos/' + f.replace(/\.json$/, '');
    if (!RUTAS.includes(ruta)) RUTAS.push(ruta);
  }
}

const navegador = await chromium.launch({ channel: process.env.CANAL || 'msedge', headless: true });
let fallas = 0;

for (const ancho of ANCHOS) {
  const ctx = await navegador.newContext({ viewport: { width: ancho, height: 900 } });
  const page = await ctx.newPage();

  for (const ruta of RUTAS) {
    const respuesta = await page.goto(BASE + ruta, { waitUntil: 'networkidle' });
    if (!respuesta?.ok()) {
      fallas++;
      console.error(`FALLA ${ancho}px ${ruta}: HTTP ${respuesta?.status() ?? 'sin respuesta'}`);
      continue;
    }
    // Los acordeones cerrados esconden las tablas anchas: abrirlos es parte de
    // la comprobación, ahí es donde aparecería un overflow-x mal contenido.
    await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));

    const r = await page.evaluate(() => {
      const de = document.documentElement;
      const cw = de.clientWidth;
      if (de.scrollWidth <= cw) return { cw, sw: de.scrollWidth, culpables: [] };
      const culpables = [];
      for (const el of document.querySelectorAll('*')) {
        const caja = el.getBoundingClientRect();
        if (caja.right <= cw + 1 || caja.width === 0) continue;
        const clases = typeof el.className === 'string' ? el.className.trim().split(/\s+/).join('.') : '';
        culpables.push(`${el.tagName.toLowerCase()}${clases ? '.' + clases : ''} (hasta ${Math.round(caja.right)}px)`);
      }
      return { cw, sw: de.scrollWidth, culpables: culpables.slice(0, 10) };
    });

    if (r.sw > r.cw) {
      fallas++;
      console.error(`FALLA ${ancho}px ${ruta}: scrollWidth ${r.sw} > clientWidth ${r.cw}`);
      for (const c of r.culpables) console.error(`   ${c}`);
    } else {
      console.log(`ok    ${ancho}px ${ruta}`);
    }
  }

  await ctx.close();
}

await navegador.close();
if (fallas > 0) {
  console.error(`\n${fallas} página(s) con desborde horizontal.`);
  process.exit(1);
}
console.log('\nSin desbordes horizontales.');
