/**
 * Carga única de TOH y YowUp: baja las imágenes, arma los JSON de marca y de
 * producto. Se corre una vez; después el contenido vive en src/content.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dirProd = resolve(raiz, 'src/content/products');
const dirMarcas = resolve(raiz, 'src/content/brands');
const dirImg = resolve(raiz, 'src/assets/products');
const dirLogos = resolve(raiz, 'src/assets/logos');
mkdirSync(dirLogos, { recursive: true });

const modelos = JSON.parse(readFileSync(process.argv[2], 'utf8'));

const bajar = async (url, destino) => {
  if (existsSync(destino)) return destino;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  writeFileSync(destino, Buffer.from(await r.arrayBuffer()));
  return destino;
};

// ── Colores ───────────────────────────────────────────────────────────────
// El color viene pegado al título del producto en la tienda; hay que sacarle
// el resto del nombre del modelo y traducir los que son palabras comunes. Los
// nombres de fantasía (Fiji, Alga, Coral, Atacama…) quedan como están: son
// nombres de color de la marca, no palabras a traducir.
const RUIDO = /\+?\s*(e\s+)?Guia|de Corda|de Seguran[çc]a|de Gato|QR Code|Peixe|Handsfree|Com \d+ Refis|Avulsa|Avulso|Basic|Slim|PooPee|\d+un|\d+X\d+cm|\d+Kg|Mandioca|Biodegradável/gi;
const TRADUCE = {
  Preto: 'Negro', Black: 'Negro', Grafite: 'Grafito', 'Bordô': 'Bordó', Marinho: 'Azul marino',
  Laranja: 'Naranja', 'Lilás': 'Lila', Cinza: 'Gris', Bege: 'Beige', Oliva: 'Oliva',
  Turquesa: 'Turquesa', Musgo: 'Musgo', Rosa: 'Rosa', 'Verde Tiffany': 'Verde Tiffany', 'Verde Tifanny': 'Verde Tiffany',
};
const limpiarColores = (lista) => {
  const salida = [];
  for (const bruto of lista) {
    const c = bruto.replace(RUIDO, ' ').replace(/[-–]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!c || /\d/.test(c) || c.split(' ').length > 2) continue;
    const t = TRADUCE[c] ?? c;
    if (!salida.includes(t)) salida.push(t);
  }
  return salida;
};

const ordenTalles = ['PP', 'P', 'M', 'G', 'GG'];
// La tienda también usa Pequeno/Médio/Grande en algunos artículos.
const TALLE_ES = { Pequeno: 'Pequeña', 'Médio': 'Mediana', Grande: 'Grande' };
const ordenar = (t) =>
  [...t]
    .sort((a, b) => ordenTalles.indexOf(a) - ordenTalles.indexOf(b))
    .map((x) => TALLE_ES[x] ?? x);

// ── TOH ───────────────────────────────────────────────────────────────────
const TOH = [
  ['peitoral-mesh-h', 'TOH Pechera Mesh H + correa', 'accesorios', 'Pecheras', ['perros'],
    'Pechera en malla respirable con cierre en H, pensada para el paseo diario de perros que caminan mucho. Reparte la tensión sobre el pecho en lugar del cuello y viene con su correa a juego.',
    ['Malla respirable', 'Cierre en H', 'Incluye correa', 'Regulable']],
  ['conjunto-peitoral-h', 'TOH Pechera H + correa', 'accesorios', 'Pecheras', ['perros'],
    'El modelo clásico de la marca: pechera en H con cintas regulables en pecho y contorno, hebillas de seguridad y correa del mismo color. Se ajusta al perro sin apretar y no le marca el pelo.',
    ['Regulable en dos puntos', 'Incluye correa', 'Hebillas de seguridad']],
  ['peitoral-tradicional', 'TOH Pechera tradicional + correa', 'accesorios', 'Pecheras', ['perros'],
    'Pechera de corte tradicional, con apoyo amplio sobre el pecho y argolla metálica en el lomo. Es la opción más simple de colocar y la que mejor funciona en perros que recién empiezan a usar pechera.',
    ['Fácil de colocar', 'Argolla metálica', 'Incluye correa']],
  ['peitoral-step-in', 'TOH Pechera Step In + correa', 'accesorios', 'Pecheras', ['perros'],
    'El perro apoya las patas y la pechera se cierra sobre el lomo: no hay que pasarla por la cabeza. Cómoda para perros a los que les molesta que les toquen las orejas o el hocico.',
    ['Se coloca desde abajo', 'Sin pasar por la cabeza', 'Incluye correa']],
  ['peitoral-antipuxao', 'TOH Pechera antitirones + correa', 'accesorios', 'Pecheras', ['perros'],
    'Con argolla delantera además de la del lomo: enganchando la correa adelante, el tirón del perro lo gira hacia quien lo pasea en vez de impulsarlo. Pensada para perros que arrastran.',
    ['Argolla delantera', 'Reduce el tirón', 'Incluye correa']],
  ['peitoral-neocomfy-gato', 'TOH Pechera NeoComfy para gatos + correa', 'accesorios', 'Pecheras', ['gatos'],
    'Pechera de neopreno acolchado para gatos, con superficie de apoyo amplia para que no se escapen tirando hacia atrás. Incluye correa liviana para las primeras salidas.',
    ['Neopreno acolchado', 'Diseño antiescape', 'Incluye correa']],
  ['peitoral-h-gato', 'TOH Pechera H para gatos + correa', 'accesorios', 'Pecheras', ['gatos'],
    'Versión en H a la medida de un gato: cintas finas, livianas y regulables, con correa incluida. El cierre en H evita la presión sobre la garganta.',
    ['Liviana', 'Regulable', 'Incluye correa']],
  ['guia-padrao', 'TOH Correa estándar', 'accesorios', 'Correas', ['perros', 'gatos'],
    'La correa de todos los días: cinta resistente, mosquetón metálico y manija cosida. Combina con cualquiera de las pecheras y collares de la línea.',
    ['Mosquetón metálico', 'Manija cosida']],
  ['guia-corda-120', 'TOH Correa de soga 1,20 m', 'accesorios', 'Correas', ['perros'],
    'Correa de soga trenzada de 1,20 m, con mosquetón metálico y terminación en cuero. Da un largo cómodo para caminar por vereda sin que el perro se adelante.',
    ['Soga trenzada', '1,20 m', 'Mosquetón metálico']],
  ['guia-corda-5m', 'TOH Correa de soga 5 m', 'accesorios', 'Correas', ['perros'],
    'Cinco metros de soga para que el perro explore en parques y espacios abiertos sin soltarlo. Sirve además para entrenar el llamado a distancia.',
    ['5 m de largo', 'Para espacios abiertos', 'Soga trenzada']],
  ['guia-dupla', 'TOH Correa doble', 'accesorios', 'Correas', ['perros'],
    'Una sola manija con dos ramales para pasear dos perros a la vez. Los ramales giran sin enredarse entre sí.',
    ['Dos perros a la vez', 'Ramales antienredo']],
  ['coleira-tag-id', 'TOH Collar Tag ID con código QR', 'accesorios', 'Collares', ['perros'],
    'Collar regulable con una chapa de identificación que lleva un código QR: al escanearlo con cualquier teléfono aparecen los datos de contacto del dueño, que se actualizan online sin cambiar la chapa.',
    ['Identificación con QR', 'Datos actualizables', 'Regulable']],
  ['coleira-cabresto', 'TOH Collar tipo cabestro', 'accesorios', 'Collares', ['perros'],
    'Collar de cabestro que se ajusta al cerrarse y vuelve a aflojarse solo, sin quedar apretado. Sirve como apoyo de entrenamiento en perros que se escapan del collar común.',
    ['Ajuste progresivo', 'Apoyo de entrenamiento']],
  ['coleira-gato', 'TOH Collar Breakaway para gatos', 'accesorios', 'Collares', ['gatos'],
    'Collar para gatos con hebilla de liberación: si el gato queda enganchado en una rama o un mueble, el collar se abre solo. Liviano y con espacio para la chapa de identificación.',
    ['Hebilla de liberación', 'Liviano', 'Admite chapa']],
  ['pingente-qr', 'TOH Chapita con código QR', 'accesorios', 'Paseo y viaje', ['perros', 'gatos'],
    'Chapa de identificación con código QR para sumar a cualquier collar. Los datos de contacto se editan online, así que no hay que grabar una chapa nueva al mudarse o cambiar de teléfono.',
    ['Código QR', 'Datos editables', 'Para cualquier collar']],
  ['adaptador-cinto', 'TOH Adaptador de cinturón de seguridad', 'accesorios', 'Paseo y viaje', ['perros'],
    'Conecta la pechera del perro al cinturón de seguridad del auto y lo mantiene en su asiento durante el viaje. Se engancha en segundos y es regulable en largo.',
    ['Para viajar en auto', 'Regulable', 'Se engancha a la pechera']],
  // Los dos que caen en líneas que ya existían.
  ['tapete-poopee', 'TOH Paños higiénicos PooPee Slim', 'cuidado-de-la-mascota', 'Otros', ['perros'],
    'Paños higiénicos de 80 × 60 cm en packs de 30 unidades, con núcleo absorbente que retiene el líquido y controla el olor. Para cachorros en etapa de aprendizaje y para perros que pasan muchas horas solos.',
    ['80 × 60 cm', '30 unidades', 'Control de olor']],
  ['areia-yucat', 'TOH Arena sanitaria Yucat', 'arenas-sanitarias', null, ['gatos'],
    'Arena sanitaria biodegradable hecha con mandioca: aglomera en grumos firmes, controla el olor y se descarta sin el peso ni el polvo de las arenas minerales.',
    ['Biodegradable', 'De mandioca', '4 kg', 'Aglomerante']],
];

const productos = [];

for (const [clave, nombre, categoria, sub, species, texto, benefits] of TOH) {
  const m = modelos[clave];
  if (!m) { console.warn('sin datos:', clave); continue; }
  const slug = nombre.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const ext = extname(new URL(m.imagen).pathname) || '.jpg';
  const archivo = `${slug}${ext}`;
  await bajar(m.imagen, resolve(dirImg, archivo));
  productos.push({
    slug,
    name: nombre,
    brand: 'toh',
    category: categoria,
    subcategory: sub,
    species,
    shortDescription: texto,
    description: [texto],
    presentations: ordenar(m.tamanos),
    colors: limpiarColores(m.colores),
    benefits,
    technicalSheet: [],
    composition: null,
    image: `../../assets/products/${archivo}`,
    gallery: [],
    featured: false,
    sourceUrl: `https://toh.com.br/products/${m.handle}`,
  });
}

// ── YowUp ─────────────────────────────────────────────────────────────────
const YOWUP = [
  ['yowup-yogur-digestive-natural-para-perros', 'YOWUP Yogur Digestive natural para perros', 'Perros', ['perros'],
    'https://yowup.com/wp-content/uploads/2026/04/yogur-digestive-natural-perros-prin-yowup.webp',
    'Yogur funcional para perros, sin lactosa ni azúcar añadido, con fermentos que acompañan la digestión. Se sirve solo o sobre el alimento de todos los días.',
    ['Sin lactosa', 'Sin azúcar añadido', 'Bajo en grasa', 'Apoyo digestivo']],
  ['yowup-flora-plus-pato-y-calabaza-para-perros', 'YOWUP Flora Plus de pato y calabaza para perros', 'Perros', ['perros'],
    'https://yowup.com/wp-content/uploads/2026/03/kefir-perros-flora-plus-duck-yowup.webp',
    'Kéfir funcional con pre y postbióticos, en versión pato y calabaza. Pensado para sostener la flora intestinal en perros con digestiones delicadas.',
    ['Kéfir', 'Pre y postbióticos', 'Pato y calabaza', 'Sin lactosa']],
  ['yowup-petflurry-de-pavo-para-perros', 'YOWUP Petflurry cremoso de pavo para perros', 'Perros', ['perros'],
    'https://yowup.com/wp-content/uploads/2026/04/petflurry-turkey-perros-yowup.webp',
    'Yogur cremoso con trocitos de pavo, para dar como premio o para rellenar juguetes dispensadores. Bajo en grasa y sin azúcar añadido.',
    ['Con trozos de pavo', 'Textura cremosa', 'Bajo en grasa']],
  ['yowup-bone-broth-de-vacuno-para-perros', 'YOWUP Bone Broth de vacuno, verduras y jengibre para perros', 'Perros', ['perros'],
    'https://yowup.com/wp-content/uploads/2026/03/bone-broth-meal-topper-beef-prin-yowup.webp',
    'Caldo de huesos con verduras y jengibre para servir sobre el alimento. Aporta humedad y sabor al plato, útil en perros que comen poco o toman poca agua.',
    ['Caldo de huesos', 'Con verduras y jengibre', 'Aporta humedad']],
  ['yowup-frozen-yogurt-bacon-cake-para-perros', 'YOWUP Frozen Yogurt Bacon Cake para perros', 'Perros', ['perros'],
    'https://yowup.com/wp-content/uploads/2026/04/frozen-yogurt-bacon-cake-perros-prin-yowup.webp',
    'Yogur helado con sabor a panceta, para los días de calor. Se sirve congelado y se come despacio, así que entretiene además de refrescar.',
    ['Para servir congelado', 'Sabor panceta', 'Sin azúcar añadido']],
  ['yowup-milky-licks-jamon-serrano-para-perros', 'YOWUP Milky Licks de jamón serrano para perros', 'Perros', ['perros'],
    'https://yowup.com/wp-content/uploads/2026/03/milky-licks-serrano-ham-doypack-prin-yowup.webp',
    'Snack lácteo cremoso con sabor a jamón serrano, en formato para lamer. Sirve como premio de entrenamiento y para dar la medicación sin pelea.',
    ['Snack para lamer', 'Sabor jamón serrano', 'Sin lactosa']],
  ['yowup-immune-system-de-pavo-para-perros', 'YOWUP Immune System de pavo para perros', 'Perros', ['perros'],
    'https://yowup.com/wp-content/uploads/2026/04/lcasei-turkey-perros-categ-yowup.webp',
    'Bebida funcional con L. casei y postbióticos, en versión pavo, orientada a acompañar las defensas. Se da como snack diario, sola o sobre el alimento.',
    ['Con L. casei', 'Pre y postbióticos', 'Apoyo inmunitario']],
  ['yowup-milk-hydration-natural-para-gatos', 'YOWUP Milk Hydration natural para gatos', 'Gatos', ['gatos'],
    'https://yowup.com/wp-content/uploads/2026/04/leche-funcional-hydration-gatos.webp',
    'Leche funcional sin lactosa para gatos, pensada para sumar líquido a la dieta de los que toman poca agua. Sin azúcar añadido y baja en grasa.',
    ['Sin lactosa', 'Suma hidratación', 'Bajo en grasa']],
];

for (const [slug, nombre, sub, species, url, texto, benefits] of YOWUP) {
  const ext = extname(new URL(url).pathname) || '.webp';
  const archivo = `${slug}${ext}`;
  await bajar(url, resolve(dirImg, archivo));
  productos.push({
    slug,
    name: nombre,
    brand: 'yowup',
    category: 'snacks-para-mascotas',
    subcategory: sub,
    species,
    shortDescription: texto,
    description: [
      texto,
      'YowUp elabora en Galicia, España, snacks líquidos funcionales para perros y gatos: bajos en grasa, sin lactosa y sin azúcar añadido, con pre y postbióticos.',
    ],
    // Formatos SIN CARGAR a propósito: el sitio de origen no los publica y no
    // se inventan. Se completan cuando Districo confirme qué envases importa.
    presentations: [],
    colors: [],
    benefits,
    technicalSheet: [],
    composition: null,
    image: `../../assets/products/${archivo}`,
    gallery: [],
    featured: false,
    sourceUrl: 'https://yowup.com',
  });
}

for (const p of productos) {
  writeFileSync(resolve(dirProd, `${p.slug}.json`), JSON.stringify(p, null, 2) + '\n');
}

// ── Logos ─────────────────────────────────────────────────────────────────
// El panel del carrusel de marcas pide el logo en blanco. El de TOH viene
// naranja: se usa su canal alfa como máscara y se rellena de blanco, que en un
// logo plano da exactamente la versión monocroma. El de YowUp ya es blanco,
// pero viene en SVG y se rasteriza para que astro:assets lo pueda servir.
const tmpToh = resolve(dirLogos, '_toh-color.png');
await bajar('https://toh.com.br/cdn/shop/files/Logotipo_TOH_Vetor_Laranja_PNG_1_1.png', tmpToh);

// El PNG de TOH es naranja OPACO sobre blanco: no tiene alfa que sirva de
// máscara. La máscara real es la luminancia invertida y saturada, y va en DOS
// invocaciones de sharp: dentro de una misma tubería sharp aplica linear antes
// que negate, con lo cual gray*3 se satura a 255, el negate lo deja todo en 0
// y el logo sale invisible. El joinChannel sobre un create() tampoco sirve
// —devuelve alfa 0—, así que el RGBA se arma a mano.
const gris = await sharp(tmpToh).flatten({ background: '#ffffff' }).grayscale().negate().toBuffer();
const { data, info } = await sharp(gris).linear(3, 0).raw().toBuffer({ resolveWithObject: true });
const rgba = Buffer.alloc(info.width * info.height * 4);
for (let i = 0; i < info.width * info.height; i++) {
  rgba[i * 4] = 255; rgba[i * 4 + 1] = 255; rgba[i * 4 + 2] = 255;
  rgba[i * 4 + 3] = data[i * info.channels];
}
await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
  .resize({ width: 600, withoutEnlargement: true })
  .png()
  .toFile(resolve(dirLogos, 'toh.png'));

// El de YowUp ya es blanco: solo hay que rasterizar el SVG para que
// astro:assets lo pueda servir.
const tmpYow = resolve(dirLogos, '_yowup.svg');
await bajar('https://yowup.com/wp-content/uploads/2026/03/yowup-logo-white.svg', tmpYow);
await sharp(readFileSync(tmpYow), { density: 300 }).resize({ width: 600 }).png().toFile(resolve(dirLogos, 'yowup.png'));

// ── Marcas ────────────────────────────────────────────────────────────────
const marcas = [
  {
    slug: 'toh', name: 'TOH', categories: ['accesorios'],
    description: 'Fabricante brasileño de accesorios para mascotas: pecheras, correas, collares, identificación con código QR y artículos de paseo y viaje.',
    logo: '../../assets/logos/toh.png', accent: null, photo: null, featured: false, externalUrl: 'https://toh.com.br',
  },
  {
    slug: 'yowup', name: 'YowUp', categories: ['snacks-para-mascotas'],
    description: 'Fabricante español de snacks líquidos funcionales para perros y gatos —yogur, kéfir, leche y caldo de huesos—, elaborados en Galicia sin lactosa ni azúcar añadido.',
    logo: '../../assets/logos/yowup.png', accent: null, photo: null, featured: false, externalUrl: 'https://yowup.com',
  },
];
for (const m of marcas) writeFileSync(resolve(dirMarcas, `${m.slug}.json`), JSON.stringify(m, null, 2) + '\n');

console.log(`productos escritos: ${productos.length}`);
for (const p of productos) {
  console.log(`  ${p.category} | ${p.name} | presentaciones: ${p.presentations.join('/') || '-'} | colores: ${p.colors.length}`);
}
