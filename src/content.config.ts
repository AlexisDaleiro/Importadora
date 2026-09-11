import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

// El contenido viene del relevamiento del sitio real de Districo (districo.com.uy).
// Los campos que el sitio original deja vacíos se modelan como nullable, no se inventan.

const lineas = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/lineas' }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      name: z.string(),
      order: z.number(),
      accent: z.string(),
      description: z.string(),
      // Sin contadores: el relevamiento traía un `count` por subcategoría y un
      // `productCount` por línea que nadie mantenía, y ya estaban mal contra el
      // catálogo real. Todo número de productos se cuenta sobre la colección
      // de productos en el componente que lo muestra.
      subcategories: z
        .array(z.object({ name: z.string(), slug: z.string() }))
        .default([]),
      cover: image(),
      coverBackground: z.string().optional(),
      sourceSlug: z.string().optional(),
    }),
});

const brands = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/brands' }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      name: z.string(),
      categories: z.array(reference('lineas')).default([]),
      description: z.string().nullable().default(null),
      logo: image().nullable().default(null),
      /**
       * Foto del mosaico de marcas (/marcas y el bloque del home).
       * DÓNDE VAN LOS ARCHIVOS: src/assets/brands/<slug-de-la-marca>.jpg
       *   ej. src/assets/brands/biofresh.jpg  →  "photo": "../../assets/brands/biofresh.jpg"
       * Formato: JPG, recorte vertical 4:5, lado corto >= 640px (el tile más
       * grande mide 320px y se sirve a 2x). No hace falta que la foto sea de la
       * marca: sirve una foto de perro, gato o de la categoría.
       * Mientras esté en null, BrandMosaic usa la foto de la línea de negocio y,
       * si tampoco hubiera, pinta el tile con el color de acento.
       */
      photo: image().nullable().default(null),
      featured: z.boolean().default(false),
      externalUrl: z.string().url().nullable().default(null),
    }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      name: z.string(),
      // 3 productos del sitio oficial no declaran marca; se modela como opcional.
      brand: reference('brands').nullable().default(null),
      category: reference('lineas'),
      subcategory: z.string().nullable().default(null),
      species: z.array(z.string()).default([]),
      shortDescription: z.string().nullable().default(null),
      description: z.array(z.string()).default([]),
      presentations: z.array(z.string()).default([]),
      benefits: z.array(z.string()).default([]),
      technicalSheet: z
        .array(z.object({ label: z.string(), content: z.string() }))
        .default([]),
      image: image().nullable().default(null),
      gallery: z.array(image()).default([]),
      featured: z.boolean().default(false),
      /** Orden dentro del selector de productos del bloque de línea de la home.
       *  Sin este número el producto no aparece ahí. Va uno por marca: la idea
       *  es mostrar el catálogo de un vistazo, no repetir la misma marca.
       *  Cambiar la selección es editar estos números, no tocar el componente.
       *  Después de editarlos hay que correr `node scripts/cutout-lineas.mjs`,
       *  que genera el recorte con transparencia de cada producto marcado. */
      destacadoEnLinea: z.number().optional(),
      sourceUrl: z.string().url().nullable().default(null),
    }),
});

const milestones = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/milestones' }),
  schema: z.object({
    year: z.string(),
    title: z.string(),
    description: z.string(),
    source: z.string().url().optional(),
  }),
});

/**
 * Banners del carrusel del home. CONTENIDO PROVISORIO: los tres archivos que
 * hay hoy en src/content/banners son ejemplos con foto real de Districo, para
 * que se vea el componente. Antes de mostrarle el sitio al cliente hay que
 * reemplazar kicker, title y cta por campañas reales.
 *
 * DÓNDE VAN LAS IMÁGENES: src/assets/banners/<slug>.jpg
 * Formato: JPG, 2480x660 (el slide mide 1240x330 en desktop y se sirve a 2x).
 * El texto se apoya sobre un velo del color de acento, así que la mitad
 * derecha de la foto es la que se ve: poné ahí el motivo.
 *
 * Con menos de 2 banners activos el carrusel no se arma: con 1 se pinta como
 * banner fijo y con 0 no se renderiza nada. Ver BannerCarousel.astro.
 */
const banners = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/banners' }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      /** Marca que promociona el banner, para saber de quién es la pieza. */
      brand: z.string(),
      /** Destino real del sitio: una marca, una línea o el catálogo filtrado. */
      href: z.string(),
      /** Las piezas vienen con su propio arte y su propio texto, así que el
       *  slide ES la imagen: no hay kicker, ni título, ni botón encima. Por eso
       *  hacen falta dos, con relaciones de aspecto muy distintas: la apaisada
       *  1950x500 es ilegible en 390px de ancho. */
      imageDesktop: image(),
      imageMobile: image(),
      /** Texto alternativo de la pieza, ej. "Banner de la marca Biofresh". */
      alt: z.string(),
      order: z.number(),
      active: z.boolean().default(true),
    }),
});

export const collections = { lineas, brands, products, milestones, banners };
