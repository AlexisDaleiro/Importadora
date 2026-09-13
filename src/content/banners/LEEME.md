# Banners del home

Los ocho banners actuales están aprobados para esta versión de demostración. Cada pieza usa
una imagen de escritorio y otra vertical para mobile; no se superpone texto HTML porque el
arte y el texto forman parte de la propia imagen.

Los JSON se validan mediante la colección `banners` de `src/content.config.ts`:

- `brand`: marca responsable de la pieza.
- `href`: destino interno al hacer clic.
- `imageDesktop`: arte apaisado.
- `imageMobile`: arte vertical.
- `alt`: alternativa textual descriptiva.
- `order`: posición en la rotación.
- `active`: permite ocultar una pieza sin borrarla.

Con menos de dos banners activos no se arma el carrusel: con uno se muestra una pieza fija y
con cero el bloque no se renderiza. No se publican precios porque Districo vende a comercios,
no al público general.

Antes de reemplazar una pieza hay que conservar ambas variantes, verificar que el enlace sea
válido y probar legibilidad en desktop y mobile. Los archivos viven en `src/assets/banners/`.
