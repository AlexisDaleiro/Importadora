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

  // Las fotos de TOH no vienen sobre blanco sino sobre un gris de estudio
  // (245) con sombra suave alrededor del producto: con el umbral de 232 esa
  // sombra quedaba pegada como un halo claro. Si la esquina es gris se acepta
  // como fondo todo gris claro NEUTRO; el color del producto corta el relleno
  // igual. Las fotos sobre blanco no cambian. px[3]: una esquina transparente
  // (YowUp) no tiene fondo que recortar.
  const fondo = Math.min(px[0], px[1], px[2]);
  const estudio = fondo < 250 && px[3] === 255;
  const neutro = (d, i, min) => {
    const lo = Math.min(d[i], d[i + 1], d[i + 2]);
    return lo > min && Math.max(d[i], d[i + 1], d[i + 2]) - lo < 15;
  };
  const esFondo = estudio ? (d, i) => neutro(d, i, 190) : isWhite;
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
    if (!esFondo(px, i)) continue;
    seen[p] = 1;
    px[i + 3] = 0;
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }

  // Huecos: el fondo encerrado por el producto (el lazo de una correa, el
  // interior de un collar) no toca el borde y el relleno no llega. Se borra
  // cada mancha del color exacto del estudio que sea grande; las chicas se
  // quedan, porque suelen ser brillos del metal o letras del envase.
  if (estudio) {
    const cerca = (i) => neutro(px, i, fondo - 10) && Math.max(px[i], px[i + 1], px[i + 2]) <= fondo + 6;
    const minimo = w * h * 0.002;
    for (let p0 = 0; p0 < w * h; p0++) {
      if (seen[p0] || !cerca(p0 * 4)) continue;
      const mancha = [];
      const pila = [p0];
      seen[p0] = 2;
      while (pila.length) {
        const p = pila.pop();
        mancha.push(p);
        const x = p % w;
        for (const q of [x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1, p - w, p + w]) {
          if (q < 0 || q >= w * h || seen[q] || !cerca(q * 4)) continue;
          seen[q] = 2;
          pila.push(q);
        }
      }
      if (mancha.length > minimo) for (const p of mancha) px[p * 4 + 3] = 0;
    }
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

  let quitado = 0;
  for (let p = 0; p < w * h; p++) if (px[p * 4 + 3] === 0) quitado++;
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
