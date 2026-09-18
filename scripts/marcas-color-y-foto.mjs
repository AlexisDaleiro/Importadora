/**
 * Prepara las dos cosas que le faltan a cada marca para el carrusel de paneles
 * del home (BrandStrip.astro):
 *
 *   1. `accent`: color de la marca. NO se inventa: se saca del envase real del
 *      producto más representativo de esa marca (el que ya está marcado con
 *      `destacadoEnLinea`, o si no el primero con foto), descartando el blanco
 *      del fondo y los grises. Es un punto de partida revisable: si Districo
 *      entrega el color oficial de una marca, se pisa a mano en su JSON y este
 *      script no lo vuelve a tocar (solo completa los que estén en null,
 *      salvo que se corra con FORZAR=1).
 *
 *   2. `photo`: PLACEHOLDER PROVISORIO. Genera en src/assets/brands/<slug>.jpg
 *      una imagen 4:5 distinta para cada marca, con el color de la marca y el
 *      texto de qué foto real va ahí. No es diseño final: está pensada para que
 *      cualquiera que la vea en una revisión sepa que falta la foto. La tabla
 *      de qué foto va en cada archivo está en src/assets/brands/LEEME.md.
 *
 * Uso: node scripts/marcas-color-y-foto.mjs
 *      FORZAR=1 node scripts/marcas-color-y-foto.mjs   (recalcula accent)
 *      SOLO_COLOR=1 / SOLO_FOTO=1 para correr una sola parte.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dirMarcas = resolve(raiz, 'src/content/brands');
const dirProductos = resolve(raiz, 'src/content/products');
const dirFotos = resolve(raiz, 'src/assets/brands');

/** Qué foto real va en cada marca. Manda el segmento, no la marca: las de perro
 *  varían raza y tamaño a propósito para que la cinta no se vea repetida. */
const ENCARGO = {
  biofresh: 'Perro adulto grande — labrador',
  granplus: 'Perro adulto mediano — mestizo',
  'guabi-natural': 'Gato adulto — atigrado',
  primocao: 'Perro adulto pequeño — caniche',
  primogato: 'Gato adulto — naranja',
  'three-orig': 'Perro adulto grande — pastor alemán',
  'three-dogs': 'Perro cachorro — golden',
  'three-cats': 'Gato joven — siamés',
  'three-cats-orig': 'Gato adulto — negro',
  beny: 'Perro adulto mediano — beagle',
  pipicat: 'Gato joven en bandeja',
  '4-pets': 'Gato adulto — gris',
  procao: 'Perro en el baño, pelo mojado',
  stack: 'Sin animal: snacks sobre madera',
  toh: 'Perro de paseo con pechera — plano medio',
  yowup: 'Perro lamiendo un snack cremoso',
  lopets: 'Gato adulto — crema punto rojo, medio perfil',
};

const marcas = readdirSync(dirMarcas).filter((f) => f.endsWith('.json'));
const productos = readdirSync(dirProductos).map((f) => JSON.parse(readFileSync(resolve(dirProductos, f), 'utf8')));

/** Color dominante del envase: se descarta el fondo (casi blanco), lo casi
 *  negro y lo gris, y entre lo que queda gana el tono más frecuente. Sin ese
 *  filtro todas las marcas dan blanco, que es el fondo del recorte. */
async function colorDeEnvase(rutaImagen) {
  const { data, info } = await sharp(rutaImagen)
    .resize(80, 80, { fit: 'inside' })
    .flatten({ background: '#ffffff' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cubos = new Map();
  for (let i = 0; i < data.length; i += info.channels) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max > 235 && min > 210) continue; // fondo
    if (max < 28) continue; // sombra
    if (max - min < 28) continue; // gris
    const clave = `${r >> 4}-${g >> 4}-${b >> 4}`;
    const c = cubos.get(clave) ?? { r: 0, g: 0, b: 0, n: 0 };
    c.r += r; c.g += g; c.b += b; c.n++;
    cubos.set(clave, c);
  }
  if (cubos.size === 0) return null;
  const mejor = [...cubos.values()].sort((a, b) => b.n - a.n)[0];
  const hex = (v) => Math.round(v / mejor.n).toString(16).padStart(2, '0');
  return `#${hex(mejor.r)}${hex(mejor.g)}${hex(mejor.b)}`.toUpperCase();
}

const luminancia = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const l = c.map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2];
};

const filas = [];

for (const archivo of marcas) {
  const ruta = resolve(dirMarcas, archivo);
  const marca = JSON.parse(readFileSync(ruta, 'utf8'));
  const slug = marca.slug;
  const mios = productos.filter((p) => p.brand === slug && p.image);
  const fuente = mios.find((p) => p.destacadoEnLinea !== undefined) ?? mios[0];
  let cambiado = false;

  if (!process.env.SOLO_FOTO && (process.env.FORZAR || !marca.accent)) {
    let color = null;
    if (fuente) {
      const img = resolve(dirProductos, fuente.image);
      if (existsSync(img)) color = await colorDeEnvase(img);
    }
    if (color) {
      marca.accent = color;
      cambiado = true;
    }
  }

  if (!process.env.SOLO_COLOR) {
    const color = marca.accent ?? '#003647';
    const oscuro = luminancia(color) > 0.45;
    const texto = ENCARGO[slug] ?? 'Foto pendiente';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.9"/>
        </linearGradient>
      </defs>
      <rect width="1080" height="1350" fill="${color}"/>
      <rect width="1080" height="1350" fill="url(#g)"/>
      <g fill="${oscuro ? '#000' : '#fff'}" font-family="Segoe UI, Arial, sans-serif" text-anchor="middle" opacity="0.92">
        <text x="540" y="600" font-size="52" font-weight="700" letter-spacing="6">FOTO PENDIENTE</text>
        ${texto
          .split(' — ')
          .map((linea, i) => `<text x="540" y="${690 + i * 62}" font-size="44">${linea.replace(/&/g, '&amp;')}</text>`)
          .join('')}
        <text x="540" y="880" font-size="34" opacity="0.7">${slug}.jpg</text>
      </g>
    </svg>`;
    await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(resolve(dirFotos, `${slug}.jpg`));
    if (marca.photo !== `../../assets/brands/${slug}.jpg`) {
      marca.photo = `../../assets/brands/${slug}.jpg`;
      cambiado = true;
    }
  }

  if (cambiado) writeFileSync(ruta, JSON.stringify(marca, null, 2) + '\n');
  filas.push([slug, marca.accent ?? '(sin color)', fuente?.slug ?? '(sin producto con foto)', ENCARGO[slug] ?? '?']);
}

console.log('marca | accent | envase del que salió el color | foto que falta');
for (const f of filas) console.log(f.join(' | '));
