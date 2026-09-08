# Districo S.A. — Brief de diseño y contenido
### Sitio institucional + catálogo | Astro | Referencia visual: Cantera (bold) + identidad actual de Districo

---

## 1. Objetivo del proyecto

Sitio para vender directamente a Districo S.A. como reemplazo de su sitio institucional actual. Debe transmitir:
- **Escala y solidez**: 25+ años, 156+ productos, 21+ marcas, ISO 9001, 6.000 m² de depósito.
- **Modernidad**: alejarse del sitio institucional genérico actual (bloques oscuros repetitivos, banners tipo flyer) hacia un lenguaje visual bold, con tipografía protagonista y fotografía de producto grande, como Cantera.
- **Conversión**: que un comprador o un futuro cliente comercial encuentre rápido el catálogo y tenga una vía directa de contacto (WhatsApp/formulario).

No es e-commerce: no hay carrito ni pago online. El objetivo de cada ficha de producto es generar contacto comercial, no venta directa.

---

## 2. Sitemap

```
/                          Home
/nosotros                  Institucional (historia, valores, instalaciones, certificaciones)
/lineas-de-negocio          Overview de las 4 líneas (mascotas, cuidado, snacks, etc.)
/marcas                     Listado de las 21 marcas, filtrable por línea de negocio
/marcas/[marca]             Página de marca individual (opcional en v1, evaluar si se fusiona con /productos)
/productos                  Catálogo filtrable (por línea de negocio, marca, categoría)
/productos/[slug]           Ficha de producto individual
/contacto                   Formulario + datos de las 2 sucursales + WhatsApp
```

**Nota:** dado que eligieron NO incluir "trabajá con nosotros", se omite del sitemap v1. Se puede agregar después como `/trabaja-con-nosotros`.

---

## 3. Modelo de contenido (Astro Content Collections)

### `src/content/brands/[slug].md`
```yaml
---
name: "Biofresh"
businessLine: "mascotas" # mascotas | cuidado | snacks
logo: "/images/brands/biofresh-logo.png"
color: "#..." # color de acento propio de la marca, tomado del packaging
description: "Alimento super premium para perros y gatos..."
featured: true
---
```

### `src/content/products/[slug].md`
```yaml
---
name: "Biofresh Adultos Carne y Cereales 25kg"
brand: "biofresh"
businessLine: "mascotas"
category: "alimento-perros" # alimento-perros | alimento-gatos | arena-sanitaria | snacks | ...
image: "/images/products/biofresh-adultos-25kg.jpg"
gallery: ["/images/products/....jpg"]
weight: "25kg"
highlights:
  - "Rico en vitaminas y minerales"
  - "Pelaje suave y brillante"
  - "Producto de alto rendimiento"
description: "..."
---
Contenido largo / ficha técnica en markdown si aplica.
```

Esto permite:
- Generar `/productos` con `getCollection('products')` + filtros client-side (Preact/React island liviana, o Alpine.js si querés cero JS framework).
- Generar `/productos/[slug]` con `getStaticPaths()` automático — cada producto ya tiene su página individual sin trabajo manual.
- Cargar productos reales después simplemente agregando archivos `.md`, sin tocar el layout.

---

## 4. Sistema visual

### Paleta
- **Base**: mantener el teal/azul petróleo oscuro y el verde lima del logo actual de Districo — es identidad ya reconocida, no conviene descartarla.
- **Bloques de color por línea de negocio** (al estilo Cantera): cada línea de negocio (mascotas, cuidado, snacks) tiene un color de acento propio derivado de sus marcas/packaging, usado en secciones full-bleed.
- Fondo blanco/gris muy claro como base neutra entre bloques de color, igual que hace Cantera para separar secciones.

### Tipografía
- Titulares grandes y bold (60–90px en desktop), tipo palo seco geométrico — es lo que le da el "aire moderno" a Cantera.
- Jerarquía marcada: kicker pequeño en mayúsculas con letter-spacing (ya lo usás en tu intento actual, "DISTRIBUCIÓN EN TODO URUGUAY" — mantenerlo, funciona bien) + título enorme + texto de apoyo más chico y liviano.

### Fotografía
- Producto siempre grande y protagonista, nunca como ícono chico — sacar los productos del catálogo actual (aunque sea en baja calidad por ahora) y tratarlos igual que Cantera trata el paquete de Monello: ocupando gran parte del bloque, con sombra/profundidad.
- Reemplazar los banners tipo "flyer" del sitio actual por fotografía real editorial (planta, equipo, producto) combinada con los bloques de color sólido.

### Elementos decorativos
- Círculos/blobs de color detrás de fotos (como el círculo lima detrás de la foto del depósito en Cantera) para romper la rigidez de bloques rectangulares.
- Stickers/badges circulares para certificaciones (ISO 9001, "+25 años", "representante exclusivo") — mismo recurso que el sticker "Relleno con carne de verdad" de Cantera, pero en versión institucional/seria.

### Motion
- Fade-in + slide-up sutil al hacer scroll por sección (visto en Cantera).
- Botón de WhatsApp flotante fijo (visto en Sadenir) — ya está en tus funcionalidades pedidas.

---

## 5. Desglose de componentes por página

### Home
1. Header sticky: logo + menú + CTA "Contacto"
2. Hero: kicker + título enorme + texto de apoyo + 2 CTAs (ya lo tenés bien encaminado, solo hay que agrandar la escala tipográfica y sumar una foto/elemento visual al lado, no abajo en bloque separado)
3. Barra de stats (156 productos / 21 marcas / 4 líneas / 6.000m² / ISO 9001) — mantener, funciona
4. Bloque "Líneas de negocio" en 4 tarjetas grandes full-bleed de color (una por línea), cada una con foto de producto protagonista + botón "Ver productos"
5. Bloque de marcas destacadas (logos en grid blanco, como el sitio actual, pero con más aire y logos más grandes)
6. Bloque institucional corto (certificación ISO, años de trayectoria) con foto de planta + círculo decorativo
7. CTA final de contacto + footer

### /productos
- Filtros por línea de negocio / marca / categoría (chips o dropdown, componente interactivo liviano)
- Grid de cards de producto: foto grande, nombre, marca, botón "Ver ficha"

### /productos/[slug]
- Foto grande a un lado (o galería), datos técnicos (peso, marca, categoría) al otro
- Highlights en badges/bullets destacados (como los textos "Rico en vitaminas y minerales" del banner actual, pero mejor integrados)
- CTA de contacto ("Consultar disponibilidad" vía WhatsApp con mensaje prellenado del nombre del producto)

### /contacto
- Formulario simple (nombre, empresa, mensaje)
- Datos de las 2 sucursales (Casa Central + Maldonado) con mapa embebido opcional
- Botón de WhatsApp directo

---

## 6. Notas técnicas para Astro

- Usar `astro:assets` (`<Image />`) para optimización automática de las fotos de producto — importante porque van a ser muchas imágenes.
- Filtro de catálogo: implementarlo como isla (Preact es el más liviano si sumás un framework; si no, Alpine.js o JS vanilla con `data-*` attributes alcanza para filtrar client-side sin hidratar toda la página).
- Generar rutas dinámicas de producto con `getStaticPaths()` a partir de la content collection — así cada producto nuevo que se agregue como `.md` genera su página sola, sin tocar código.
- Mantener todo el sitio 100% estático (sin SSR) dado que no hay lógica de usuario/sesión — mejor performance y hosting más simple/barato para vender a Districo como propuesta.

---

## 7. Próximos pasos sugeridos

1. Confirmar/ajustar este brief con vos.
2. Migrar el contenido textual real que ya está en el sitio actual de Districo (marcas, descripciones, datos de contacto) a la estructura de content collections.
3. Rehacer el Home y `/productos` siguiendo el sistema visual de la sección 4, usando este documento como spec para Claude Code.
4. Placeholder de fotos de producto en alta calidad (las del sitio actual están en baja resolución) — este es probablemente el mayor cuello de botella para que se vea "premium" como Cantera.
