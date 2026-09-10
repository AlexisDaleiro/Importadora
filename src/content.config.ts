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
      subcategories: z
        .array(z.object({ name: z.string(), slug: z.string(), count: z.number() }))
        .default([]),
      productCount: z.number(),
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
      /** Etiqueta corta en mayúscula, ej. "NUEVO EN URUGUAY". */
      kicker: z.string(),
      /** Dos o tres palabras. Más largo se come el ancho del slide. */
      title: z.string(),
      cta: z.string(),
      /** Destino real del sitio: una marca, una línea o el catálogo filtrado. */
      href: z.string(),
      image: image(),
      /** Texto alternativo de la foto. */
      alt: z.string(),
      /** Color del velo sobre el que se apoya el texto. Tiene que ser oscuro:
       *  el blanco encima necesita 4.5:1. */
      accent: z.string().default('#001A22'),
      order: z.number(),
      active: z.boolean().default(true),
    }),
});

export const collections = { lineas, brands, products, milestones, banners };
