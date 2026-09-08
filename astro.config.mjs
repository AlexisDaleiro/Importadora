// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Sitio 100% estático: sin adapter, sin SSR.
export default defineConfig({
  // URL pública del sitio. Alimenta el canonical, el sitemap y og:url.
  // Al pasar a dominio propio se cambia SOLO acá.
  site: 'https://importadora.vercel.app',
  output: 'static',
  build: { inlineStylesheets: 'auto' },
  image: { responsiveStyles: true },
  integrations: [sitemap()],
});
