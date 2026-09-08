// Datos institucionales de Districo S.A.
// REGLA: todo valor de este archivo está verificado contra el sitio oficial
// (districo.com.uy). Lo que no está confirmado queda en null y los componentes
// lo omiten — no se rellena con datos inventados.

export const site = {
  name: 'Districo S.A.',
  shortName: 'Districo',
  tagline:
    'Distribución de alimento para mascotas, arenas sanitarias, cuidado animal y snacks en todo Uruguay',
  email: 'contacto@districo.com.uy',
  tollFree: '0800 1004',
  phone: '(+598) 2320 1381',
  /** PENDIENTE: Districo no publica un número de WhatsApp. Al confirmarlo,
   *  poner acá el número en formato internacional sin signos (ej '59899123456')
   *  y el botón flotante + los CTA pasan solos de tel: a wa.me. */
  whatsapp: null as string | null,
};

export const nav = [
  { href: '/productos', label: 'Productos' },
  { href: '/marcas', label: 'Marcas' },
  { href: '/lineas-de-negocio', label: 'Líneas de negocio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

// Cifras verificadas: catálogo relevado del sitio oficial + hitos institucionales.
export const stats = [
  { value: '156', label: 'Productos' },
  { value: '21', label: 'Marcas' },
  { value: '1960', label: 'Desde' },
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

/** wa.me si hay WhatsApp confirmado; si no, el 0800 por teléfono. */
export const contactLink = (mensaje: string) =>
  site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensaje)}`
    : 'tel:08001004';

export const hasWhatsApp = () => site.whatsapp !== null;
