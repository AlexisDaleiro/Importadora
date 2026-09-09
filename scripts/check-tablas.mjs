// Chequeo de normalizarTecnica() contra el catálogo real.
// Uso: node scripts/check-tablas.mjs
//
// Falla si alguna tabla del catálogo queda anidada, sin encabezado, con filas
// de largo desparejo, o si se pierde texto por el camino.

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { normalizarTecnica } from '../src/lib/tabla-tecnica.ts';

// fileURLToPath y no URL.pathname: la ruta del proyecto tiene un espacio
// ("Proyectos PROGRAMACION") que pathname deja como %20.
const DIR = fileURLToPath(new URL('../src/content/products/', import.meta.url));

const plano = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

let fichas = 0;
let tablas = 0;
const fallos = [];

for (const archivo of readdirSync(DIR).filter((f) => f.endsWith('.json'))) {
  const datos = JSON.parse(readFileSync(join(DIR, archivo), 'utf8'));
  for (const bloque of datos.technicalSheet ?? []) {
    if (!bloque.content) continue;
    fichas++;
    const out = normalizarTecnica(bloque.content);
    const donde = `${archivo} · ${bloque.label}`;

    try {
      // Anidada = un <table> antes de que cierre el anterior. Dos tablas
      // hermanas seguidas son normales y no cuentan.
      assert.ok(!/<table>(?:(?!<\/table>)[\s\S])*<table>/.test(out), 'quedó una tabla anidada');
      assert.ok(!out.includes('&nbsp;'), 'quedó un &nbsp;');
      assert.ok(!/<\/?b>/.test(out), 'quedó un <b>');

      for (const tabla of out.matchAll(/<table>([\s\S]*?)<\/table>/g)) {
        tablas++;
        assert.ok(/<th[ >]/.test(tabla[1]), 'tabla sin ningún <th>');

        const largos = [...tabla[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)]
          .map((f) => {
            const span = [...f[1].matchAll(/colspan="(\d+)"/g)].reduce((a, m) => a + Number(m[1]) - 1, 0);
            return [...f[1].matchAll(/<t[dh][\s>]/g)].length + span;
          });
        assert.equal(new Set(largos).size, 1, `filas de largo desparejo: ${largos.join(',')}`);
      }

      // El texto no se pierde: toda palabra del original sigue estando.
      const antes = new Set(plano(bloque.content).split(' ').filter(Boolean));
      const despues = new Set(plano(out).split(' ').filter(Boolean));
      const perdidas = [...antes].filter((p) => !despues.has(p));
      assert.deepEqual(perdidas, [], `se perdió texto: ${perdidas.slice(0, 5).join(' | ')}`);
    } catch (e) {
      fallos.push(`${donde}: ${e.message}`);
    }
  }
}

console.log(`bloques técnicos: ${fichas} · tablas normalizadas: ${tablas}`);
if (fallos.length) {
  console.error(`\n${fallos.length} FALLOS:`);
  for (const f of fallos.slice(0, 20)) console.error('  ' + f);
  process.exit(1);
}
console.log('OK — sin tablas anidadas, todas con <th>, filas parejas, sin pérdida de texto.');
