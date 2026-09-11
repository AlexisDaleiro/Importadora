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
 * Volver a correrlo cada vez que cambie qué productos llevan destacadoEnLinea.
 */
import { readdirSync, mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Qué productos se recortan: los que la colección marca con destacadoEnLinea.
// Antes había acá un mapa de un producto por línea, duplicado dentro de
// LineBlocks.astro, y cambiar el protagonista pedía editar los dos archivos.
// Ahora la única fuente es el contenido.
const CONTENIDO = fileURLToPath(new URL('../src/content/products/', import.meta.url));
const destacados = readdirSync(CONTENIDO)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(CONTENIDO + f, 'utf8')))
  .filter((p) => typeof p.destacadoEnLinea === 'number' && p.image)
  .sort((a, b) => a.category.localeCompare(b.category) || a.destacadoEnLinea - b.destacadoEnLinea);

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

for (const p of destacados) {
  // El nombre del archivo sale del campo image del producto y no de su slug:
  // el relevamiento recorta el nombre a ~60 caracteres antes del hash, asi que
  // buscar por prefijo falla justo en los productos de nombre largo.
  const file = p.image.split('/').pop();
  if (!archivos.includes(file)) {
    console.error(`FALTA ${file}, imagen de ${p.slug} (línea ${p.category})`);
    process.exitCode = 1;
    continue;
  }
  await cutout(file, `${p.slug}.png`);
}
