// Datos institucionales de Districo S.A.
// REGLA: todo valor de este archivo está verificado contra el sitio oficial
// (districo.com.uy). Lo que no está confirmado queda en null y los componentes
// lo omiten — no se rellena con datos inventados.

/* ──────────────────────────────────────────────────────────────────────────
   INDEXACIÓN EN BUSCADORES
   Mientras el sitio viva en importadora.vercel.app tiene que estar fuera de
   Google, para no competir con districo.com.uy ni indexar una URL provisoria.
   NOINDEX = true  → <meta name="robots" content="noindex, nofollow"> en todas
   las páginas + robots.txt con Disallow.
   AL PASAR A DOMINIO PROPIO: poner NOINDEX = false acá y cambiar `site` en
   astro.config.mjs. No hay que tocar nada más.
   ────────────────────────────────────────────────────────────────────────── */
export const NOINDEX = true;

/* ──────────────────────────────────────────────────────────────────────────
   WHATSAPP
   Número al que apunta el botón flotante y todos los CTA de consulta.
   Formato internacional, solo dígitos, sin +, sin espacios y sin guiones:
   código de país (598) + número sin el 0 inicial.  Ej: 59899123456
   ────────────────────────────────────────────────────────────────────────── */
export const WHATSAPP_NUMBER = '59895673109'; // +598 095 673 109

/* ──────────────────────────────────────────────────────────────────────────
   FORMULARIO DE CONTACTO (Formspree)
   El form de /contacto postea a https://formspree.io/f/<ID>.
   El ID sale del panel de formspree.io. El destinatario de los mails se
   configura allá, no acá. Si se cambia de cuenta, se reemplaza solo esta línea.
   ────────────────────────────────────────────────────────────────────────── */
export const FORMSPREE_ID = 'xnpqoooe';

export const formspreeUrl = `https://formspree.io/f/${FORMSPREE_ID}`;

/** Mensaje por defecto del botón flotante. */
export const WHATSAPP_MENSAJE = 'Hola, quisiera hacer una consulta sobre sus productos';

export const site = {
  name: 'Districo S.A.',
  shortName: 'Districo',
  tagline:
    'Distribución de alimento para mascotas, arenas sanitarias, cuidado animal y snacks en todo Uruguay',
  email: 'contacto@districo.com.uy',
  tollFree: '0800 1004',
  phone: '(+598) 2320 1381',
  whatsapp: WHATSAPP_NUMBER,
  /** Imagen por defecto al compartir el link (1200x630).
   *  Se regenera con `npm run gen:og` — ver scripts/gen-og.mjs. */
  ogImage: '/og.png',
};

export const nav = [
  { href: '/productos', label: 'Productos' },
  { href: '/marcas', label: 'Marcas' },
  { href: '/lineas-de-negocio', label: 'Líneas de negocio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

// Cifras verificadas: catálogo relevado del sitio oficial + hitos institucionales.
// 1995 es el año de Distribuidora Colón, la empresa que hoy es Districo S.A.
// Agropecuaria Colón (1960) fue una razón social distinta: aparece como
// antecedente en la línea de tiempo de /nosotros, no como antigüedad propia.
export const stats = [
  { value: '156', label: 'Productos' },
  { value: '21', label: 'Marcas' },
  { value: '1995', label: 'Desde' },
  { value: '6.000 m²', label: 'Casa Matriz' },
  { value: 'ISO 9001', label: 'Certificación' },
];

export const sucursales = [
  {
    id: 'casa-central',
    nombre: 'Casa Matriz',
    direccion: 'Cesar Mayo Gutiérrez 3024 bis, esq. Camino Uruguay — Montevideo',
    telefonos: ['0800 1004', '(+598) 2320 1381'],
    superficie: '6.000 m²',
    mapa: 'https://www.google.com/maps?q=Cesar+Mayo+Guti%C3%A9rrez+3024+Montevideo&output=embed',
  },
  {
    id: 'maldonado',
    nombre: 'Sucursal Maldonado',
    direccion: 'A. Antonio Lusich esq. Vicenza — Maldonado',
    telefonos: ['(+598) 4225 2155'],
    superficie: '400 m²',
    mapa: 'https://www.google.com/maps?q=Antonio+Lusich+esq+Vicenza+Maldonado&output=embed',
  },
];

/** Centros regionales declarados por la empresa. */
export const centrosRegionales = ['Maldonado', 'Ciudad de la Costa', 'Colonia', 'Salto'];

// Un color de acento por línea de negocio, para los bloques full-bleed.
// alimento: color institucional del logo. snacks: amarillo real de la portada
// de la categoría en el sitio oficial. arenas y cuidado: acentos ya validados
// por contraste en el relevamiento anterior.
export const lineAccents: Record<string, { color: string; text: string }> = {
  'alimento-para-mascotas': { color: '#003647', text: '#FFFFFF' },
  'arenas-sanitarias': { color: '#55684D', text: '#FFFFFF' },
  'cuidado-de-la-mascota': { color: '#3F6759', text: '#FFFFFF' },
  'snacks-para-consumo-humano': { color: '#FAC541', text: '#1F1A05' },
};

/** Nombre corto para chips y tarjetas; el nombre completo no entra. */
export const lineShort: Record<string, string> = {
  'alimento-para-mascotas': 'Alimento',
  'arenas-sanitarias': 'Arenas',
  'cuidado-de-la-mascota': 'Cuidado',
  'snacks-para-consumo-humano': 'Snacks',
};

export const lineAccent = (slug: string) =>
  lineAccents[slug] ?? { color: '#003647', text: '#FFFFFF' };

/** Link de WhatsApp con el mensaje ya escrito. */
export const contactLink = (mensaje: string = WHATSAPP_MENSAJE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
