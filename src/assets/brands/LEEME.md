# Fotos de marca

Las usa la cinta de paneles del home (`BrandStrip.astro`) y el mosaico de
`/marcas` (`BrandMosaic.astro`).

## Estado actual: fotos reales (banco libre)

Los 17 archivos `.jpg` son fotos de stock de licencia comercial libre
(Pexels), descargadas como asset local — no son las fotos de los fabricantes
(Hercosul, Guabi, Total Alimentos, TOH, YowUp), que tienen derechos propios y
todavía no hay acuerdo con el cliente para usarlas. Sirven de foto
institucional del segmento (perro/gato/snack según la marca), no del producto
ni del packaging real. Si el cliente provee fotografía propia de marca o
mascota, esa reemplaza a esta.

**NO volver a correr `scripts/marcas-color-y-foto.mjs` sin `SOLO_COLOR=1`**:
regenera el placeholder "FOTO PENDIENTE" y pisa estas fotos.

## Cómo reemplazar una

1. Guardar la foto real como `<slug>.jpg` en esta carpeta, pisando la
   actual. El slug es el nombre del JSON en `src/content/brands/`.
2. Nada más: el JSON de la marca ya apunta a ese archivo
   (`"photo": "../../assets/brands/<slug>.jpg"`).
3. Recorte vertical 4:5, lado corto ≥ 1200px, sujeto en el tercio superior
   (ver "Formato" abajo). Ninguna marca puede compartir foto con otra.

## Formato

- JPG, recorte **vertical 4:5** o cuadrado, lado corto **≥ 1200px** (cubre
  pantallas de alta densidad; el panel más grande mide 220px y se sirve a 2x).
- El motivo va en la **mitad superior**: el tercio de abajo se lo come el velo
  oscuro donde se apoya el nombre de la marca.
- Encuadre cerrado: el panel es angosto (una columna), así que un plano general
  se pierde.

## Qué foto va en cada marca

El criterio es el segmento, no el envase: alimento de perro → perro, alimento
de gato → gato, arena sanitaria → gato, cuidado → perro en situación de baño,
snacks para consumo humano → sin animal. Las razas, colores de pelaje y
encuadres están variados a propósito: en la cinta los paneles se ven uno al
lado del otro y dos fotos parecidas se notan enseguida.

| Archivo | Marca | Foto |
|---|---|---|
| `biofresh.jpg` | Biofresh | Golden retriever adulto, tirado en piso interior, luz natural |
| `granplus.jpg` | Gran Plus | Perro mestizo, primer plano de cara |
| `guabi-natural.jpg` | Guabi Natural | Border collie corriendo en campo verde |
| `three-dogs.jpg` | Three Dogs | Tres golden retriever juntos al aire libre |
| `primocao.jpg` | PrimoCão | Perro callejero corriendo, día soleado |
| `beny.jpg` | Beny | Cachorro labrador, estudio fondo negro |
| `three-cats.jpg` | Three Cats | Gato atigrado, retrato fondo oscuro |
| `primogato.jpg` | PrimoGato | Gato naranja de pelo largo, junto a ventana |
| `three-orig.jpg` | Three Dogs Original | Pastor alemán adulto, tirado al aire libre |
| `three-cats-orig.jpg` | Three Cats Original | Gato negro, retrato |
| `procao.jpg` | Procão | Perro pequeño en el baño, con jabón |
| `4-pets.jpg` | 4 Pets | Gato naranja y blanco con gatito, junto a bandeja sanitaria |
| `pipicat.jpg` | Pipicat | Gatitos de varios colores durmiendo en caja |
| `stack.jpg` | Stack | Sin animal: snacks en potes sobre fondo rosa |
| `toh.jpg` | TOH | Perro blanco lanudo con pechera de colores, correa |
| `yowup.jpg` | YowUp | Perro de perfil, lengua afuera |
| `lopets.jpg` | LoPets | Gato crema punto rojo, medio perfil, fondo rosado |

Fuente: Pexels (banco libre, licencia comercial). Dos marcas de la misma
especie no comparten foto ni escena parecida — quedó verificado a mano contra
las 17 a la vez.

## Coberturas de línea de negocio

`src/assets/categories/accesorios.jpg` (línea 05) y
`.../snacks-para-mascotas.jpg` (línea 06) son también fotos de stock reales,
descargadas con el mismo criterio (representan la categoría, no una marca).
Las usa `lineas-de-negocio.astro` y, como respaldo, `BrandMosaic`/`BrandStrip`
cuando una marca no tiene foto propia.

## Logos

Solo TOH, YowUp y LoPets tienen logotipo en el repositorio, los tres en
versión blanca; el resto de los paneles muestra el **nombre en texto blanco**. Al
cargar un logo —versión blanca o monocroma, PNG o SVG con fondo transparente,
en `src/assets/logos/<slug>.png`, apuntado desde `"logo"`— el panel lo usa solo
y el nombre queda igual en el DOM como texto accesible.
