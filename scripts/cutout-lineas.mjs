/**
 * Recorta el fondo blanco de las fotos protagonistas de los bloques de línea
 * del Home y las deja como PNG con transparencia en src/assets/lineas/.
 *
 * Las fotos del catálogo de Districo vienen sobre fondo blanco sólido; sobre los
 * bloques de color eso se ve como un rectángulo pegado. El recorte es por
 * inundación desde los bordes, así que el blanco que está DENTRO del envase
 * (etiquetas, textos) no se toca.
 *
 * Uso: node scripts/cutout-lineas.mjs
 * Volver a correrlo si cambian los productos elegidos en HEROES.
 */
import { readdirSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Producto protagonista de cada línea (slug del contenido).
const HEROES = {
  'alimento-para-mascotas': 'adultos-todas-las-razas-carne-y-cereales',
  'arenas-sanitarias': 'pipicat-classic',
  'cuidado-de-la-mascota': 'acondicionador-aloe-vera',
  'snacks-para-consumo-humano': 'mega-pack',
};

const SRC = fileURLToPath(new URL('../src/assets/products/', import.meta.url));
const OUT = fileURLToPath(new URL('../src/assets/lineas/', import.meta.url));

// Un píxel cuenta como fondo si es casi blanco.
const isWhite = (d, i) => d[i] > 232 && d[i + 1] > 232 && d[i + 2] > 232;

async function cutout(file, destino) {
  const { data, info } = await sharp(SRC + file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h } = info;
  const px = Buffer.from(data);
  const seen = new Uint8Array(w * h);
  const stack = [];

  // Semillas: todo el borde de la imagen.
  for (let x = 0; x < w; x++) { stack.push([x, 0], [x, h - 1]); }
  for (let y = 0; y < h; y++) { stack.push([0, y], [w - 1, y]); }

  while (stack.length) {
    const [x, y] = stack.pop();
    if (x < 0 || y < 0 || x >= w || y >= h) continue;
    const p = y * w + x;
    if (seen[p]) continue;
    const i = p * 4;
    if (!isWhite(px, i)) continue;
    seen[p] = 1;
    px[i + 3] = 0;
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }

  // Recorte final por el contorno OPACO del producto. trim() no sirve acá:
  // varias fotos traen una sombra difusa a un costado y, al conservarla, el
  // producto queda descentrado dentro del PNG (el de Amazonia tenía 127 px de
  // sombra a la izquierda y 1 px a la derecha).
  const OPACO = 64;
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (px[(y * w + x) * 4 + 3] < OPACO) continue;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }

  await sharp(px, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 })
    .png({ compressionLevel: 9 })
    .toFile(OUT + destino);

  const quitado = seen.reduce((n, v) => n + v, 0);
  console.log(`${destino.padEnd(34)} fondo recortado: ${((100 * quitado) / (w * h)).toFixed(0)}%`);
}

mkdirSync(OUT, { recursive: true });
const archivos = readdirSync(SRC);

for (const [linea, slug] of Object.entries(HEROES)) {
  // El archivo del catálogo lleva un hash al final: se busca por prefijo.
  const file = archivos.find((f) => f.startsWith(slug + '-'));
  if (!file) {
    console.error(`FALTA la imagen de ${slug} (línea ${linea})`);
    process.exitCode = 1;
    continue;
  }
  await cutout(file, `${linea}.png`);
}
