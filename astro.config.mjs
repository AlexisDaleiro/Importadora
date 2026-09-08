// @ts-check
import { defineConfig } from 'astro/config';

// Sitio 100% estático: sin adapter, sin SSR.
export default defineConfig({
  site: 'https://www.districo.com.uy',
  output: 'static',
  build: { inlineStylesheets: 'auto' },
  image: { responsiveStyles: true },
});
