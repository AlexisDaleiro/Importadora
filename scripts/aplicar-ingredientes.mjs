/**
 * Vuelca scripts/out/ingredientes.json en el campo `composition` de la
 * colección de productos.
 *
 * El JSON intermedio guarda el texto tal cual viene del sitio oficial. Las
 * correcciones ortográficas viven en scripts/ortografia.mjs y se aplican acá,
 * al escribir: así volver a bajar las fichas nunca deja el texto sin corregir
 * ni pisa el trabajo hecho, porque la corrección se rehace sola.
 *
 * No se escribe nada cuando el panel oficial no trae una composición de
 * verdad: varias fichas responden "Ver ingredientes en envoltorio." u otra
 * remisión al envase, y guardar eso haría que la ficha dibujara un acordeón
 * "Composición básica" que no contiene una composición.
 *
 *   node scripts/aplicar-ingredientes.mjs --dry   # muestra sin escribir
 *   node scripts/aplicar-ingredientes.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { corregir } from './ortografia.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dry = process.argv.includes('--dry');

const datos = JSON.parse(readFileSync(join(raiz, 'scripts', 'out', 'ingredientes.json'), 'utf8'));

/** Remisiones al envase y demás no-respuestas del panel oficial. */
const esRemision = (t) => !t || /^ver (los )?ingredientes/i.test(t) || t.length < 40;

let escritos = 0;
const omitidos = [];
const duplicados = [];

for (const [slug, r] of Object.entries(datos)) {
  const ruta = join(raiz, 'src', 'content', 'products', `${slug}.json`);
  const p = JSON.parse(readFileSync(ruta, 'utf8'));

  if (esRemision(r.ingredientes)) {
    omitidos.push([slug, r.ingredientes || '(pestaña ausente)']);
    if (p.composition !== undefined) {
      delete p.composition;
      if (!dry) writeFileSync(ruta, JSON.stringify(p, null, 2) + '\n', 'utf8');
    }
    continue;
  }

  // El relevamiento viejo dejó un bloque "Ingredientes" en technicalSheet de
  // unas pocas fichas. No se borra del JSON: la ficha lo descarta al armar los
  // acordeones, así que el dato original queda intacto por si hiciera falta.
  if ((p.technicalSheet || []).some((b) => /ingredientes/i.test(b.label))) duplicados.push(slug);

  const texto = corregir(r.ingredientes);
  if (p.composition === texto) continue;
  p.composition = texto;
  if (!dry) writeFileSync(ruta, JSON.stringify(p, null, 2) + '\n', 'utf8');
  escritos += 1;
}

console.log(`${dry ? '[dry] ' : ''}composición escrita en ${escritos} productos`);
console.log(`sin composición utilizable: ${omitidos.length}`);
for (const [slug, t] of omitidos) console.log(`  ${slug} — ${t}`);
console.log(`ya tenían un bloque "Ingredientes" en technicalSheet: ${duplicados.length}`);
for (const s of duplicados) console.log(`  ${s}`);
