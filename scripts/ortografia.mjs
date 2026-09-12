/**
 * Correcciones ortográficas del texto de ingredientes.
 *
 * El texto original viene del fabricante brasileño y trae tres cosas: palabras
 * en portugués, palabras a las que les falta la tilde y una que la tiene de
 * más. Todas se corrigen contra el propio corpus: cada una aparece escrita
 * bien en la mayoría de las fichas y mal en unas pocas.
 *
 * Vive aparte del scraper a propósito. `aplicar-ingredientes.mjs` lo importa y
 * lo aplica como último paso, así que volver a bajar las fichas no deja el
 * texto sin corregir ni pisa el trabajo hecho: la corrección se rehace sola.
 *
 * Como script suelto arregla lo que ya está escrito en la colección:
 *
 *   node scripts/ortografia.mjs --dry
 *   node scripts/ortografia.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** mal → bien. Se comparan palabras enteras, así que `acido` no toca
 *  `aminoacido` ni `oxido` toca `dióxido`. */
export const CORRECCIONES = {
  // Portugués
  'orgânico': 'orgánico',
  'orgânicos': 'orgánicos',
  'selênio': 'selenio',
  'manganês': 'manganeso',
  'cálcio': 'calcio',
  // Falta la tilde
  'acido': 'ácido',
  'aminoacido': 'aminoácido',
  'sodico': 'sódico',
  'oxido': 'óxido',
  'min': 'mín',
  // Tilde de más
  'proteínato': 'proteinato',
};

/** Deja la mayúscula inicial como estaba: "Acido" → "Ácido". */
const comoVenia = (original, corregida) =>
  original[0] === original[0].toUpperCase()
    ? corregida[0].toUpperCase() + corregida.slice(1)
    : corregida;

const REGLAS = Object.entries(CORRECCIONES).map(([mal, bien]) => [
  new RegExp(`(?<![\\p{L}\\p{M}])${mal}(?![\\p{L}\\p{M}])`, 'giu'),
  bien,
]);

export function corregir(texto) {
  if (!texto) return texto;
  let salida = texto;
  for (const [re, bien] of REGLAS) salida = salida.replace(re, (m) => comoVenia(m, bien));
  return salida;
}

// ── Uso como script ───────────────────────────────────────────────────────
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
  const dry = process.argv.includes('--dry');
  const dir = join(raiz, 'src', 'content', 'products');

  let tocados = 0;
  const conteo = {};
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.json'))) {
    const ruta = join(dir, f);
    const p = JSON.parse(readFileSync(ruta, 'utf8'));
    if (!p.composition) continue;
    const nuevo = corregir(p.composition);
    if (nuevo === p.composition) continue;
    for (const [mal, bien] of Object.entries(CORRECCIONES)) {
      const re = new RegExp(`(?<![\\p{L}\\p{M}])${mal}(?![\\p{L}\\p{M}])`, 'giu');
      const n = (p.composition.match(re) || []).length;
      if (n) conteo[`${mal} → ${bien}`] = (conteo[`${mal} → ${bien}`] ?? 0) + n;
    }
    p.composition = nuevo;
    if (!dry) writeFileSync(ruta, JSON.stringify(p, null, 2) + '\n', 'utf8');
    tocados += 1;
  }

  console.log(`${dry ? '[dry] ' : ''}productos corregidos: ${tocados}`);
  for (const [k, v] of Object.entries(conteo).sort((a, b) => b[1] - a[1])) console.log(`  ${k.padEnd(30)} ${v}`);
}
