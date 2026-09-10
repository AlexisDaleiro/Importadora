# Banners del home

Los tres archivos JSON de esta carpeta son **contenido de ejemplo**. Sirven para ver el
carrusel funcionando, no son campañas aprobadas por Districo.

Antes de la revisión con el cliente hay que reemplazar `kicker`, `title` y `cta` por
novedades comerciales reales: una marca que se empieza a distribuir, el lanzamiento de una
línea, la presencia en una feria, una certificación. Districo no vende al público, así que
el banner nunca comunica precios ni promociones de góndola.

Las fotos apuntan a imágenes que ya están en el repositorio (`src/assets/categories` y
`src/assets/institutional`), todas del relevamiento del sitio oficial. Las fotos definitivas
de cada campaña van en `src/assets/banners/<slug>.jpg`, en 2480x660: el slide mide 1240x330
en desktop y se sirve a 2x. El texto se apoya sobre un velo del color de `accent` que cubre
la mitad izquierda, así que el motivo de la foto tiene que quedar a la derecha.

`accent` tiene que ser un color oscuro: el texto encima es blanco y necesita 4.5:1.

`active: false` saca un banner de la rotación sin borrar el archivo. Con menos de dos
banners activos el carrusel no se arma: con uno se pinta como banner fijo, sin puntos ni
slides asomados, y con ninguno el home no renderiza nada.
