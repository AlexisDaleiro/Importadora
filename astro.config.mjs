// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Sitio 100% estático: sin adapter, sin SSR.
export default defineConfig({
  // URL pública del sitio. Alimenta el canonical, el sitemap y og:url.
  // Al pasar a dominio propio se cambia SOLO acá.
  site: 'https://importadora.vercel.app',
  output: 'static',
  // Anticipa solo la navegación que el usuario señala con mouse o teclado.
  // Evita descargar de antemano las 167 fichas visibles en el catálogo.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  build: { inlineStylesheets: 'auto' },
  image: { responsiveStyles: true },
  integrations: [sitemap()],
});
