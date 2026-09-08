// Genera imágenes placeholder (producto, logo de marca, fotos) hasta tener el material real.
// Borrar este script cuando entren las fotos definitivas de Districo.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const OUT = new URL('../src/assets/', import.meta.url);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const wrap = (text, max) => {
  const words = text.split(' ');
  const lines = [[]];
  for (const w of words) {
    const line = lines[lines.length - 1];
    if ([...line, w].join(' ').length > max && line.length) lines.push([w]);
    else line.push(w);
  }
  return lines.map((l) => l.join(' '));
};

const product = (name, brand, color) => {
  const lines = wrap(name.toUpperCase(), 16).slice(0, 4);
  const bagText = lines
    .map((l, i) => `<text x="600" y="${640 + i * 62}" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="bold" fill="#ffffff" text-anchor="middle">${esc(l)}</text>`)
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200">
    <rect width="1200" height="1200" fill="#F6F7F5"/>
    <ellipse cx="600" cy="1010" rx="330" ry="46" fill="#04191D" opacity="0.13"/>
    <rect x="330" y="230" width="540" height="760" rx="42" fill="${color}"/>
    <path d="M330 272 Q600 200 870 272 L870 300 Q600 232 330 300 Z" fill="#ffffff" opacity="0.22"/>
    <circle cx="600" cy="450" r="118" fill="#ffffff" opacity="0.14"/>
    <text x="600" y="470" font-family="Arial, Helvetica, sans-serif" font-size="74" font-weight="bold" fill="#ffffff" text-anchor="middle">${esc(brand.toUpperCase())}</text>
    ${bagText}
    <rect x="430" y="880" width="340" height="8" rx="4" fill="#ffffff" opacity="0.4"/>
  </svg>`;
};

const logo = (name, color) => `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="180">
  <rect width="480" height="180" fill="none"/>
  <circle cx="70" cy="90" r="30" fill="${color}"/>
  <circle cx="70" cy="90" r="12" fill="#ffffff"/>
  <text x="118" y="108" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="bold" fill="#06262C" letter-spacing="-2">${esc(name)}</text>
</svg>`;

const photo = (label, a, b) => `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
  </linearGradient></defs>
  <rect width="1600" height="1200" fill="url(#g)"/>
  <circle cx="1240" cy="300" r="240" fill="#ffffff" opacity="0.10"/>
  <rect x="120" y="700" width="620" height="340" rx="24" fill="#ffffff" opacity="0.10"/>
  <rect x="800" y="560" width="680" height="480" rx="24" fill="#04191D" opacity="0.14"/>
  <text x="80" y="180" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="bold" fill="#ffffff" opacity="0.85">${esc(label)}</text>
  <text x="80" y="248" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#ffffff" opacity="0.6">FOTO PLACEHOLDER — reemplazar por foto real</text>
</svg>`;

const write = async (dir, file, svg) => {
  await mkdir(new URL(dir, OUT), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 86 }).toFile(fileURLToPath(new URL(`${dir}/${file}.jpg`, OUT)));
};
const writePng = async (dir, file, svg) => {
  await mkdir(new URL(dir, OUT), { recursive: true });
  await sharp(Buffer.from(svg)).png().toFile(fileURLToPath(new URL(`${dir}/${file}.png`, OUT)));
};

const BRANDS = [
  ['biofresh', 'Biofresh', '#0E4650'],
  ['nutrican', 'Nutrican', '#C2410C'],
  ['felinno', 'Felinno', '#6D4AA8'],
  ['petclean', 'PetClean', '#2F6FB2'],
  ['snacky', 'Snacky', '#E2582B'],
  ['granja-sur', 'Granja Sur', '#7A9B1F'],
];

const PRODUCTS = [
  ['biofresh-adultos-carne-cereales-15kg', 'Adultos carne y cereales 15 kg', 'Biofresh', '#0E4650'],
  ['biofresh-cachorros-pollo-8kg', 'Cachorros pollo 8 kg', 'Biofresh', '#14606E'],
  ['biofresh-gatos-castrados-75kg', 'Gatos castrados 7,5 kg', 'Biofresh', '#0A353D'],
  ['nutrican-adultos-carne-22kg', 'Adultos carne 22 kg', 'Nutrican', '#C2410C'],
  ['nutrican-razas-pequenas-3kg', 'Razas pequeñas 3 kg', 'Nutrican', '#9A3412'],
  ['felinno-arena-sanitaria-10kg', 'Arena sanitaria 10 kg', 'Felinno', '#6D4AA8'],
  ['petclean-shampoo-neutro-500ml', 'Shampoo neutro 500 ml', 'PetClean', '#2F6FB2'],
  ['petclean-toallitas-hipoalergenicas', 'Toallitas hipoalergénicas', 'PetClean', '#1D4E86'],
  ['snacky-huesos-dentales-6u', 'Huesos dentales 6 u', 'Snacky', '#E2582B'],
  ['snacky-tiras-pollo-300g', 'Tiras de pollo 300 g', 'Snacky', '#B8431E'],
  ['granja-sur-aves-20kg', 'Alimento aves 20 kg', 'Granja Sur', '#7A9B1F'],
  ['granja-sur-conejos-10kg', 'Alimento conejos 10 kg', 'Granja Sur', '#5C7717'],
];

const PHOTOS = [
  ['hero-deposito', 'DEPÓSITO 6.000 m²', '#0E4650', '#04191D'],
  ['planta-equipo', 'EQUIPO DISTRICO', '#14606E', '#06262C'],
  ['logistica-flota', 'FLOTA Y LOGÍSTICA', '#2F6FB2', '#0A353D'],
  ['nosotros-historia', '25 AÑOS DE TRAYECTORIA', '#7A9B1F', '#0E4650'],
];

for (const [slug, name, brand, color] of PRODUCTS) await write('products', slug, product(name, brand, color));
for (const [slug, name, color] of BRANDS) await writePng('brands', slug, logo(name, color));
for (const [slug, label, a, b] of PHOTOS) await write('fotos', slug, photo(label, a, b));
console.log(`ok: ${PRODUCTS.length} productos, ${BRANDS.length} logos, ${PHOTOS.length} fotos`);
