# Graph Report - Importadora  (2026-09-10)

## Corpus Check
- Large corpus: 788 files · ~5,613,172 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 191 nodes · 300 edges · 12 communities (11 shown, 1 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.85)
- Token cost: 69,535 input · 0 output

## Community Hubs (Navigation)
- Layout Shell Components
- Content Cards And Banners
- Build Config And Dependencies
- Design Decisions And Content Model
- Technical Spec Tables
- Home Content Specification
- Catalog Filter Island
- Line Image Cutout Script
- Content Collection Schemas
- Open Graph Image Generator
- TypeScript Configuration
- Floating WhatsApp Button

## God Nodes (most connected - your core abstractions)
1. `lineAccent()` - 11 edges
2. `site` - 7 edges
3. `Colección products (src/content/products)` - 7 edges
4. `scripts` - 6 edges
5. `normalizarTecnica()` - 6 edges
6. `contactLink()` - 5 edges
7. `Colección brands (src/content/brands)` - 5 edges
8. `Línea de negocio (mascotas | cuidado | snacks)` - 5 edges
9. `Banners del home (colección JSON)` - 5 edges
10. `sucursales` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Banners de ejemplo, no campañas aprobadas` --semantically_similar_to--> `Migrar contenido textual real del sitio actual`  [INFERRED] [semantically similar]
  src/content/banners/LEEME.md → districo-brief-diseno.md
- `Campo photo del JSON de marca` --shares_data_with--> `Colección brands (src/content/brands)`  [EXTRACTED]
  src/assets/brands/LEEME.md → districo-brief-diseno.md
- `Optimización de imágenes con astro:assets` --conceptually_related_to--> `Especificación de foto de banner (2480x660, motivo a la derecha)`  [INFERRED]
  districo-brief-diseno.md → src/content/banners/LEEME.md
- `Banners del home (colección JSON)` --conceptually_related_to--> `Reemplazar banners tipo flyer por fotografía editorial`  [INFERRED]
  src/content/banners/LEEME.md → districo-brief-diseno.md
- `Banners del home (colección JSON)` --conceptually_related_to--> `Desglose de componentes del Home`  [AMBIGUOUS]
  src/content/banners/LEEME.md → districo-brief-diseno.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Lenguaje visual bold inspirado en Cantera** — districo_brief_diseno_referencia_cantera, districo_brief_diseno_bloques_de_color_full_bleed, districo_brief_diseno_tipografia_protagonista, districo_brief_diseno_fotografia_producto_grande, districo_brief_diseno_elementos_decorativos, districo_brief_diseno_motion_fade_slide_up [EXTRACTED 1.00]
- **Pipeline de catálogo estático (colecciones → rutas → filtro → imágenes)** — districo_brief_diseno_products_collection, districo_brief_diseno_getstaticpaths_productos, districo_brief_diseno_filtro_catalogo_isla, districo_brief_diseno_astro_assets_image, districo_brief_diseno_sitio_estatico_sin_ssr [EXTRACTED 1.00]
- **Andamio de contenido e imágenes provisorio a reemplazar antes de la revisión con el cliente** — src_content_banners_leeme_contenido_de_ejemplo, src_assets_brands_leeme_fallback_foto_de_categoria, districo_brief_diseno_migrar_contenido_real, districo_brief_diseno_cuello_botella_fotos_baja_resolucion [INFERRED 0.85]

## Communities (12 total, 1 thin omitted)

### Community 0 - "Layout Shell Components"
Cohesion: 0.08
Nodes (23): astro, puntos, href, centrosRegionales, contactLink(), FORMSPREE_ID, FORMSPREE_ID_B2B, formspreeUrl (+15 more)

### Community 1 - "Content Cards And Banners"
Cohesion: 0.09
Nodes (18): Campo photo del JSON de marca, slides, brands, coverDe, todas, external, blocks, ImageMetadata (+10 more)

### Community 2 - "Build Config And Dependencies"
Cohesion: 0.09
Nodes (21): dependencies, astro, @astrojs/sitemap, @fontsource-variable/figtree, devDependencies, @astrojs/check, typescript, name (+13 more)

### Community 3 - "Design Decisions And Content Model"
Cohesion: 0.13
Nodes (20): Optimización de imágenes con astro:assets, Colección brands (src/content/brands), Línea de negocio (mascotas | cuidado | snacks), Cuello de botella: fotos de producto en baja resolución, Círculos/blobs y stickers de certificación, Filtro de catálogo como isla client-side, Fotografía de producto grande y protagonista, Rutas de producto por getStaticPaths() (+12 more)

### Community 4 - "Technical Spec Tables"
Cohesion: 0.16
Nodes (14): DIR, fallos, formspreeB2bListo(), formspreeB2bUrl, construirTabla(), desanidar(), esEncabezado(), GLOSARIO (+6 more)

### Community 5 - "Home Content Specification"
Cohesion: 0.14
Nodes (15): Barra de stats (156 productos / 21 marcas / 4 líneas / 6.000m² / ISO 9001), Bloque de marcas destacadas en el home, Bloques de color full-bleed por línea de negocio, Brief de diseño y contenido Districo, Districo S.A., Ficha de producto con CTA "Consultar disponibilidad" prellenado, Desglose de componentes del Home, Objetivo: conversión a contacto comercial, no venta online (+7 more)

### Community 6 - "Catalog Filter Island"
Cohesion: 0.27
Nodes (8): apply(), brandName, brands, lineas, products, reset(), subs, toggle()

### Community 7 - "Line Image Cutout Script"
Cohesion: 0.33
Nodes (6): archivos, cutout(), HEROES, isWhite(), OUT, SRC

### Community 8 - "Content Collection Schemas"
Cohesion: 0.29
Nodes (6): banners, brands, collections, lineas, milestones, products

### Community 9 - "Open Graph Image Generator"
Cohesion: 0.33
Nodes (4): fondo, logoX, logoY, root

### Community 10 - "TypeScript Configuration"
Cohesion: 0.40
Nodes (4): astro/tsconfigs/strict, exclude, extends, include

## Ambiguous Edges - Review These
- `Desglose de componentes del Home` → `Banners del home (colección JSON)`  [AMBIGUOUS]
  src/content/banners/LEEME.md · relation: conceptually_related_to

## Knowledge Gaps
- **79 isolated node(s):** `name`, `type`, `version`, `private`, `dev` (+74 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 96 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Desglose de componentes del Home` and `Banners del home (colección JSON)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `astro` connect `Layout Shell Components` to `Build Config And Dependencies`?**
  _High betweenness centrality (0.179) - this node is a cross-community bridge._
- **Why does `Fallback a la foto de la línea de negocio (andamio temporal)` connect `Design Decisions And Content Model` to `Content Cards And Banners`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **What connects `name`, `type`, `version` to the rest of the system?**
  _79 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Layout Shell Components` be split into smaller, more focused modules?**
  _Cohesion score 0.08292682926829269 - nodes in this community are weakly interconnected._
- **Should `Content Cards And Banners` be split into smaller, more focused modules?**
  _Cohesion score 0.08907563025210084 - nodes in this community are weakly interconnected._
- **Should `Build Config And Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._