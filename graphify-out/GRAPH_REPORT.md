# Graph Report - Importadora  (2026-09-11)

## Corpus Check
- 220 files · ~5,880,854 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 194 nodes · 307 edges · 13 communities (12 shown, 1 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `057b6709`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- config.ts
- BrandMosaic.astro
- package.json
- Colección products (src/content/products)
- tabla-tecnica.ts
- Banners del home (colección JSON)
- productos/index.astro
- cutout-lineas.mjs
- content.config.ts
- gen-og.mjs
- tsconfig.json
- Referencia Sadenir (botón WhatsApp flotante)
- astro:content

## God Nodes (most connected - your core abstractions)
1. `lineAccent()` - 10 edges
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
- `Banners del home (colección JSON)` --conceptually_related_to--> `Desglose de componentes del Home`  [AMBIGUOUS]
  src/content/banners/LEEME.md → districo-brief-diseno.md
- `Banners del home (colección JSON)` --conceptually_related_to--> `Reemplazar banners tipo flyer por fotografía editorial`  [INFERRED]
  src/content/banners/LEEME.md → districo-brief-diseno.md
- `Campo photo del JSON de marca` --shares_data_with--> `Colección brands (src/content/brands)`  [EXTRACTED]
  src/assets/brands/LEEME.md → districo-brief-diseno.md
- `Optimización de imágenes con astro:assets` --conceptually_related_to--> `Especificación de foto de banner (2480x660, motivo a la derecha)`  [INFERRED]
  districo-brief-diseno.md → src/content/banners/LEEME.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Pipeline de catálogo estático (colecciones → rutas → filtro → imágenes)** — districo_brief_diseno_products_collection, districo_brief_diseno_getstaticpaths_productos, districo_brief_diseno_filtro_catalogo_isla, districo_brief_diseno_astro_assets_image, districo_brief_diseno_sitio_estatico_sin_ssr [EXTRACTED 1.00]
- **Lenguaje visual bold inspirado en Cantera** — districo_brief_diseno_referencia_cantera, districo_brief_diseno_bloques_de_color_full_bleed, districo_brief_diseno_tipografia_protagonista, districo_brief_diseno_fotografia_producto_grande, districo_brief_diseno_elementos_decorativos, districo_brief_diseno_motion_fade_slide_up [EXTRACTED 1.00]
- **Andamio de contenido e imágenes provisorio a reemplazar antes de la revisión con el cliente** — src_content_banners_leeme_contenido_de_ejemplo, src_assets_brands_leeme_fallback_foto_de_categoria, districo_brief_diseno_migrar_contenido_real, districo_brief_diseno_cuello_botella_fotos_baja_resolucion [INFERRED 0.85]

## Communities (13 total, 1 thin omitted)

### Community 0 - "config.ts"
Cohesion: 0.09
Nodes (21): ALTO, string, href, contactLink(), FORMSPREE_ID, FORMSPREE_ID_B2B, formspreeB2bListo(), formspreeB2bUrl (+13 more)

### Community 1 - "BrandMosaic.astro"
Cohesion: 0.15
Nodes (9): coverDe, todas, accent, lineAccent(), lineShort, brands, lineas, accent (+1 more)

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (23): dependencies, astro, @astrojs/sitemap, @fontsource-variable/figtree, devDependencies, @astrojs/check, typescript, name (+15 more)

### Community 3 - "Colección products (src/content/products)"
Cohesion: 0.15
Nodes (18): Colección brands (src/content/brands), Brief de diseño y contenido Districo, Línea de negocio (mascotas | cuidado | snacks), Cuello de botella: fotos de producto en baja resolución, Districo S.A., Ficha de producto con CTA "Consultar disponibilidad" prellenado, Filtro de catálogo como isla client-side, Rutas de producto por getStaticPaths() (+10 more)

### Community 4 - "tabla-tecnica.ts"
Cohesion: 0.23
Nodes (12): DIR, fallos, construirTabla(), desanidar(), esEncabezado(), GLOSARIO, matriz(), normalizarTecnica() (+4 more)

### Community 5 - "Banners del home (colección JSON)"
Cohesion: 0.12
Nodes (18): Optimización de imágenes con astro:assets, Barra de stats (156 productos / 21 marcas / 4 líneas / 6.000m² / ISO 9001), Bloque de marcas destacadas en el home, Bloques de color full-bleed por línea de negocio, Círculos/blobs y stickers de certificación, Fotografía de producto grande y protagonista, Desglose de componentes del Home, Motion: fade-in + slide-up al scroll (+10 more)

### Community 6 - "productos/index.astro"
Cohesion: 0.27
Nodes (8): apply(), brandName, brands, lineas, products, reset(), subs, toggle()

### Community 7 - "cutout-lineas.mjs"
Cohesion: 0.29
Nodes (7): archivos, CONTENIDO, cutout(), destacados, isWhite(), OUT, SRC

### Community 8 - "content.config.ts"
Cohesion: 0.29
Nodes (6): banners, brands, collections, lineas, milestones, products

### Community 9 - "gen-og.mjs"
Cohesion: 0.33
Nodes (4): fondo, logoX, logoY, root

### Community 10 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): astro/tsconfigs/strict, exclude, extends, include

### Community 12 - "astro:content"
Cohesion: 0.14
Nodes (11): puntos, activos, brands, external, brandName, lineas, filas, centrosRegionales (+3 more)

## Ambiguous Edges - Review These
- `Banners del home (colección JSON)` → `Desglose de componentes del Home`  [AMBIGUOUS]
  src/content/banners/LEEME.md · relation: conceptually_related_to

## Knowledge Gaps
- **81 isolated node(s):** `name`, `type`, `version`, `private`, `dev` (+76 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 98 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Banners del home (colección JSON)` and `Desglose de componentes del Home`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `Fallback a la foto de la línea de negocio (andamio temporal)` connect `Colección products (src/content/products)` to `BrandMosaic.astro`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **Why does `Cuello de botella: fotos de producto en baja resolución` connect `Colección products (src/content/products)` to `Banners del home (colección JSON)`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **What connects `name`, `type`, `version` to the rest of the system?**
  _81 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `config.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08961593172119488 - nodes in this community are weakly interconnected._
- **Should `BrandMosaic.astro` be split into smaller, more focused modules?**
  _Cohesion score 0.14705882352941177 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._