# Fotos del mosaico de marcas

Acá van las fotos que usa `BrandMosaic.astro` en `/marcas` y en el bloque de
marcas del home.

## Cómo agregar una

1. Guardar el archivo como `<slug-de-la-marca>.jpg` — el slug es el nombre del
   JSON en `src/content/brands/`. Ejemplos: `biofresh.jpg`, `granplus.jpg`,
   `three-orig.jpg`, `procao.jpg`.
2. Apuntarlo desde el JSON de la marca:

   ```json
   "photo": "../../assets/brands/biofresh.jpg"
   ```

## Formato

- JPG, recorte **vertical 4:5** (el tile tiene `aspect-ratio: 4 / 5`).
- Lado corto **640px o más**: el tile más grande mide 320px y se sirve a 2x.
- No hace falta que la foto sea de la marca. Sirve una foto de perro, gato o de
  la categoría; el nombre de la marca va escrito encima.

## Estado actual

Ninguna de las 21 marcas tiene foto propia todavía (`"photo": null` en los 21
JSON). Mientras tanto el mosaico cae en la foto de la línea de negocio de cada
marca — `src/assets/categories/*.jpg`, que son fotos reales del sitio de
Districo. Son solo 4 fotos para 21 marcas, así que se repiten: es un andamio
temporal, no el diseño final. Al cargar la foto propia, el tile la toma sola.
