import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const BUSINESS_LINES = ['mascotas', 'cuidado', 'snacks', 'granja'] as const;
const CATEGORIES = [
  'alimento-perros',
  'alimento-gatos',
  'arena-sanitaria',
  'higiene',
  'snacks',
  'granja',
] as const;
const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Usar color hex de 6 dígitos, ej #0E4650');

const brands = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/brands' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      businessLine: z.enum(BUSINESS_LINES),
      logo: image(),
      color: hex, // acento propio de la marca, tomado del packaging
      description: z.string(),
      featured: z.boolean().default(false),
      country: z.string().optional(),
      exclusive: z.boolean().default(false), // representación exclusiva en Uruguay
      order: z.number().default(99),
    }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      brand: reference('brands'),
      businessLine: z.enum(BUSINESS_LINES),
      category: z.enum(CATEGORIES),
      image: image(),
      gallery: z.array(image()).default([]),
      weight: z.string().optional(),
      presentation: z.string().optional(), // ej "Bolsa x 6 unidades"
      highlights: z.array(z.string()).default([]),
      description: z.string(),
      featured: z.boolean().default(false),
    }),
});

export const collections = { brands, products };
