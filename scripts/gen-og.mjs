// Genera public/og.png (1200x630), la imagen que se ve al compartir el sitio.
// Correr con: npm run gen:og
//
// Ojo con el PNG del logo: está en negativo. La placa rectangular es la parte
// opaca (#003748) y las LETRAS son huecos transparentes. Por eso va sobre una tarjeta
// blanca: las letras toman ese blanco, igual que el logo sobre el header.
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
// sharp necesita una ruta real: pathname deja "%20" en "Proyectos PROGRAMACION".
const p = (rel) => fileURLToPath(new URL(rel, root));

const W = 1200;
const H = 630;
const TEAL = '#003647';
const LIME = '#AAD400';
const LOGO_W = 460;

// metadata() sobre un pipeline devuelve el tamaño del ARCHIVO, no el del resize:
// hay que materializar el buffer para conocer el alto real del logo escalado.
const logo = await sharp(p('src/assets/brand/districo-logo.png'))
  .resize({ width: LOGO_W, kernel: 'lanczos3' })
  .png()
  .toBuffer();
const { width, height } = await sharp(logo).metadata();

const cardW = width + 104;
const cardH = height + 76;
const logoX = Math.round((W - width) / 2);
const logoY = Math.round(300 - height / 2);
const fondo = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <style>
    .t { font-family: 'Segoe UI', system-ui, sans-serif; font-weight: 600; font-size: 34px; fill: #FFFFFF; opacity: 0.82; }
  </style>
  <rect width="${W}" height="${H}" fill="${TEAL}"/>
  <rect x="${Math.round((W - cardW) / 2)}" y="${Math.round(300 - cardH / 2)}" width="${cardW}" height="${cardH}" rx="26" fill="#FFFFFF"/>
  <rect x="${(W - 96) / 2}" y="412" width="96" height="6" rx="3" fill="${LIME}"/>
  <text class="t" x="${W / 2}" y="486" text-anchor="middle">Distribución de alimento y cuidado para mascotas</text>
  <text class="t" x="${W / 2}" y="532" text-anchor="middle">en todo Uruguay</text>
</svg>`);

await sharp(fondo)
  .composite([{ input: logo, left: logoX, top: logoY }])
  .png()
  .toFile(p('public/og.png'));

console.log(`public/og.png ${W}x${H} listo`);
