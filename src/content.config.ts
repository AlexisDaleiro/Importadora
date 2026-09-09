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

export const collections = { lineas, brands, products, milestones };
