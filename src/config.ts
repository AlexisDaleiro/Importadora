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
   Los dos formularios del sitio postean a https://formspree.io/f/<ID>, cada uno
   con su form propio para que las bandejas no se mezclen:
     FORMSPREE_ID     → /contacto, consultas generales
     FORMSPREE_ID_B2B → ficha de producto, "quiero vender <marca>"
   Los IDs salen del panel de formspree.io; el destinatario se configura allá.
   El tipo `string` es a propósito: sin él TypeScript estrecha la constante al
   literal y marca la comparación con el placeholder como imposible (ts2367).
   ────────────────────────────────────────────────────────────────────────── */
export const FORMSPREE_ID: string = 'xnpqoooe';
export const FORMSPREE_ID_B2B: string = 'xaeylvdp';

export const formspreeUrl = `https://formspree.io/f/${FORMSPREE_ID}`;
export const formspreeB2bUrl = `https://formspree.io/f/${FORMSPREE_ID_B2B}`;
export const formspreeB2bListo = () => FORMSPREE_ID_B2B !== 'PEGAR_ID_B2B';

/* ──────────────────────────────────────────────────────────────────────────
   FORMULARIO DE RECLAMO DE GARANTÍA
   El sitio oficial menciona un "Formulario de Reclamo de Garantía" online pero
   no publica su destino. PENDIENTE DE CONFIRMAR CON EL CLIENTE: pedirle la URL
   real y pegarla acá; es el único lugar del sitio donde vive.
   En null, /garantia no dibuja el botón y deja solo la vía presencial, que sí
   está confirmada. No se inventa un destino.
   ────────────────────────────────────────────────────────────────────────── */
export const GARANTIA_FORM_URL: string | null = null;

/* ──────────────────────────────────────────────────────────────────────────
   ⚠ CASILLA DE POSTULACIONES — VALOR PROVISORIO
   A esta dirección escribe el botón "Enviar mi CV" de /nosotros.
   HOY APUNTA A UN CORREO DE PRUEBA, NO A DISTRICO.
   AL PASAR A PRODUCCIÓN: pedirle a Districo la casilla de RRHH y pegarla acá.
   Es el único lugar del sitio donde vive esta dirección; no hace falta tocar
   ningún componente.
   ────────────────────────────────────────────────────────────────────────── */
export const CV_EMAIL: string = 'alexisdaleiro@gmail.com';
export const CV_ASUNTO = 'Postulación — Districo';
export const cvMailto = () =>
  `mailto:${CV_EMAIL}?subject=${encodeURIComponent(CV_ASUNTO)}`;

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
  // "Líneas de negocio" salió de la barra: la home ya abre con los bloques de
  // línea y el catálogo filtra por línea, así que el enlace repetía dos
  // entradas que ya están un scroll más abajo. La página sigue viva y se llega
  // desde el pie.
  //
  // "Garantía" y no "Términos y condiciones", que es como la llama el sitio
  // oficial: el contenido real es la Garantía de Palatabilidad, una promesa
  // comercial, no letra chica. Con este nombre se lee como beneficio.
  { href: '/garantia', label: 'Garantía' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

// Las dos únicas redes de Districo, verificadas en su sitio oficial. No hay
// Instagram, ni X, ni YouTube: agregar una sería publicar un enlace roto.
export const social = [
  { label: 'Districo en Facebook', href: 'https://es-la.facebook.com/districosa/', icon: 'facebook' },
  { label: 'Districo en LinkedIn', href: 'https://uy.linkedin.com/company/districouy', icon: 'linkedin' },
] as const;

// Cifras verificadas: catálogo relevado del sitio oficial + hitos institucionales.
// 1995 es el año de Distribuidora Colón, la empresa que hoy es Districo S.A.
// Agropecuaria Colón (1960) fue una razón social distinta: aparece como
// antecedente en la línea de tiempo de /nosotros, no como antigüedad propia.
// Productos y Marcas NO están acá: los cuenta StatsBar.astro sobre las content
// collections, porque escritos a mano quedan viejos en cuanto se agrega o se
// discontinúa una marca, que es exactamente lo que pasó con las cinco marcas
// dadas de baja.
export const stats = [
  { value: '1995', label: 'Desde' },
  // Predio total, que es el dato vigente de la página de propuesta del sitio
  // oficial. Los 6.000 m² que decía antes son la cifra de 2013, cuando se
  // inauguró la Casa Matriz, y quedaron solo en el hito de ese año.
  { value: '10.000 m²', label: 'Casa Matriz' },
  { value: 'ISO 9001', label: 'Certificación' },
];

export const sucursales = [
  {
    id: 'casa-central',
    nombre: 'Casa Matriz',
    direccion: 'Cesar Mayo Gutiérrez 3024 bis, esq. Camino Uruguay — Montevideo',
    telefonos: ['0800 1004', '(+598) 2320 1381'],
    superficie: '10.000 m² de predio, con 1.600 m² de depósito',
    mapa: 'https://www.google.com/maps?q=Cesar+Mayo+Guti%C3%A9rrez+3024+Montevideo&output=embed',
  },
  {
    id: 'maldonado',
    nombre: 'Sucursal Maldonado',
    direccion: 'A. Antonio Lusich esq. Vicenza — Maldonado',
    telefonos: ['(+598) 4225 2155'],
    superficie: '700 m² propios',
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
  // Líneas nuevas: accesorios toma el naranja de TOH bajado de tono para que
  // sostenga texto blanco, y snacks para mascotas un azul lácteo.
  accesorios: { color: '#A8410B', text: '#FFFFFF' },
  'snacks-para-mascotas': { color: '#2E5E7E', text: '#FFFFFF' },
};

/** Nombre corto para chips y tarjetas; el nombre completo no entra. */
export const lineShort: Record<string, string> = {
  'alimento-para-mascotas': 'Alimento',
  'arenas-sanitarias': 'Arenas',
  'cuidado-de-la-mascota': 'Cuidado',
  'snacks-para-consumo-humano': 'Snacks',
  accesorios: 'Accesorios',
  'snacks-para-mascotas': 'Snacks mascotas',
};

export const lineAccent = (slug: string) =>
  lineAccents[slug] ?? { color: '#003647', text: '#FFFFFF' };

/** Link de WhatsApp con el mensaje ya escrito. */
export const contactLink = (mensaje: string = WHATSAPP_MENSAJE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
