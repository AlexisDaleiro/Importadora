// Datos de la empresa. Único lugar a tocar cuando Districo confirme cifras/contactos.
export const site = {
  name: 'Districo S.A.',
  tagline: 'Distribución de alimento y cuidado para mascotas en todo Uruguay',
  whatsapp: '59899123456', // TODO: reemplazar por el número real de Districo
  email: 'ventas@districo.com.uy',
  phone: '+598 2200 0000',
};

export const nav = [
  { href: '/productos', label: 'Productos' },
  { href: '/lineas-de-negocio', label: 'Líneas de negocio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

export const stats = [
  { value: '156+', label: 'Productos' },
  { value: '21', label: 'Marcas' },
  { value: '4', label: 'Líneas de negocio' },
  { value: '6.000 m²', label: 'Depósito' },
  { value: 'ISO 9001', label: 'Certificación' },
];

export const sucursales = [
  {
    nombre: 'Casa Central — Montevideo',
    direccion: 'Camino Carrasco 5678, Montevideo',
    telefono: '+598 2200 0000',
    horario: 'Lunes a viernes 8:30 a 18:00',
    mapa: 'https://www.google.com/maps?q=Camino+Carrasco+5678+Montevideo&output=embed',
  },
  {
    nombre: 'Sucursal Maldonado',
    direccion: 'Ruta 39 km 2.5, Maldonado',
    telefono: '+598 4222 0000',
    horario: 'Lunes a viernes 9:00 a 17:00',
    mapa: 'https://www.google.com/maps?q=Ruta+39+km+2.5+Maldonado&output=embed',
  },
];

// Una línea de negocio = un color de acento + una foto protagonista.
export const businessLines = {
  mascotas: {
    label: 'Alimento para mascotas',
    short: 'Mascotas',
    color: '#0E4650',
    text: '#FFFFFF',
    description:
      'Alimento balanceado super premium, premium y estándar para perros y gatos, en presentaciones de 1 a 25 kg.',
  },
  cuidado: {
    label: 'Cuidado e higiene',
    short: 'Cuidado',
    color: '#2F6FB2',
    text: '#FFFFFF',
    description:
      'Shampoos, antiparasitarios, arena sanitaria y accesorios para la higiene diaria de la mascota.',
  },
  snacks: {
    label: 'Snacks y premios',
    short: 'Snacks',
    color: '#E2582B',
    text: '#FFFFFF',
    description:
      'Premios, huesos y snacks funcionales para entrenamiento, higiene dental y momentos de recompensa.',
  },
  granja: {
    label: 'Granja y aves',
    short: 'Granja',
    color: '#B4D335',
    text: '#06262C',
    description:
      'Alimento para aves, conejos y animales de granja, con distribución en todo el interior del país.',
  },
} as const;

export type BusinessLine = keyof typeof businessLines;

export const categories = {
  'alimento-perros': 'Alimento para perros',
  'alimento-gatos': 'Alimento para gatos',
  'arena-sanitaria': 'Arena sanitaria',
  'higiene': 'Higiene y cuidado',
  'snacks': 'Snacks y premios',
  'granja': 'Granja y aves',
} as const;

export type Category = keyof typeof categories;

export const waLink = (mensaje: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensaje)}`;
