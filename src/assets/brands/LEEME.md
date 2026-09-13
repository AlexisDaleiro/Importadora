# Fotos de marca

Las usa la cinta de paneles del home (`BrandStrip.astro`) y el mosaico de
`/marcas` (`BrandMosaic.astro`).

## Estado actual: TODAS SON PLACEHOLDER

Los 16 archivos `.jpg` de esta carpeta los genera
`node scripts/marcas-color-y-foto.mjs`. Son una placa con el color de la marca
y el texto "FOTO PENDIENTE" encima, una distinta por marca. **No son diseño
final y no se le muestran al cliente como tales**: están para que el carrusel
se vea armado y para que se note de un vistazo qué falta.

## Cómo reemplazar una

1. Guardar la foto real como `<slug>.jpg` en esta carpeta, pisando el
   placeholder. El slug es el nombre del JSON en `src/content/brands/`.
2. Nada más: el JSON de la marca ya apunta a ese archivo
   (`"photo": "../../assets/brands/<slug>.jpg"`).

Si se vuelve a correr el script, **regenera el placeholder y pisa la foto
real**. Con fotos reales cargadas, correrlo solo para colores:
`SOLO_COLOR=1 node scripts/marcas-color-y-foto.mjs`.

## Formato

- JPG, recorte **vertical 4:5**, lado corto **≥ 880px** (el panel más grande
  mide 220px de ancho y se sirve a 2x).
- El motivo va en la **mitad superior**: el tercio de abajo se lo come el velo
  oscuro donde se apoya el nombre de la marca.
- Encuadre cerrado: el panel es angosto (una columna), así que un plano general
  se pierde.

## Qué foto va en cada marca

El criterio es el segmento, no el envase: alimento de perro → perro, alimento
de gato → gato, arena sanitaria → gato, cuidado → perro en situación de baño,
snacks para consumo humano → sin animal. Las razas y tamaños están variados a
propósito: en la cinta los paneles se ven uno al lado del otro y dos fotos
parecidas se notan enseguida.

| Archivo | Marca | Foto que va |
|---|---|---|
| `biofresh.jpg` | Biofresh | Perro adulto grande — labrador |
| `granplus.jpg` | Gran Plus | Perro adulto mediano — mestizo |
| `guabi-natural.jpg` | Guabi Natural | Gato adulto — atigrado |
| `primocao.jpg` | PrimoCão | Perro adulto pequeño — caniche |
| `primogato.jpg` | PrimoGato | Gato adulto — naranja |
| `three-orig.jpg` | Three Original (perro) | Perro adulto grande — pastor alemán |
| `three-dogs.jpg` | Three Dogs | Perro cachorro — golden |
| `three-cats.jpg` | Three Cats | Gato joven — siamés |
| `three-cats-orig.jpg` | Three Cats Original | Gato adulto — negro |
| `beny.jpg` | Beny | Perro adulto mediano — beagle |
| `eco-cane.jpg` | Eco Cane | Gato sobre arena — blanco y gris |
| `kets.jpg` | Kets | Gato en bandeja sanitaria |
| `pipicat.jpg` | Pipicat | Gato joven en bandeja |
| `4-pets.jpg` | 4 Pets | Gato adulto — gris |
| `procao.jpg` | Procão | Perro en el baño, con el pelo mojado |
| `stack.jpg` | Stack | Sin animal: snacks sobre madera o textura del producto |

Dos marcas de la misma especie no pueden compartir foto, ni siquiera parecida:
hoy `BrandMosaic` caía en las 4 fotos de línea de negocio para las 16 marcas y
se veía el mismo perro seis veces.

## Logos

Ninguna de las 16 marcas tiene logotipo en el repositorio (`"logo": null` en
los 16 JSON), así que los paneles muestran el **nombre en texto blanco**. Al
cargar un logo —versión blanca o monocroma, PNG o SVG con fondo transparente,
en `src/assets/logos/<slug>.png`, apuntado desde `"logo"`— el panel lo usa solo
y el nombre queda igual en el DOM como texto accesible.
