# Graph Report - Importadora  (2026-09-12)

## Corpus Check
- 259 files · ~88,046 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 269 nodes · 383 edges · 17 communities (15 shown, 2 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c514d9a5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- config.ts
- scrape-ingredientes.mjs
- package.json
- Colección products (src/content/products)
- tabla-tecnica.ts
- Sistema visual
- productos/index.astro
- cutout-lineas.mjs
- content.config.ts
- cargar-toh-yowup.mjs
- tsconfig.json
- Referencia Sadenir (botón WhatsApp flotante)
- astro:content
- aplicar-ingredientes.mjs
- marcas-color-y-foto.mjs
- Districo — Estado vigente del proyecto
- AGENTS.md

## God Nodes (most connected - your core abstractions)
1. `lineAccent()` - 11 edges
2. `scripts` - 7 edges
3. `site` - 7 edges
4. `Districo — Estado vigente del proyecto` - 7 edges
5. `Colección products (src/content/products)` - 7 edges
6. `normalizarTecnica()` - 6 edges
7. `contactLink()` - 5 edges
8. `apply()` - 5 edges
9. `toggle()` - 5 edges
10. `Banners del home (colección JSON)` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Banners de ejemplo, no campañas aprobadas` --semantically_similar_to--> `Migrar contenido textual real del sitio actual`  [INFERRED] [semantically similar]
  src/content/banners/LEEME.md → districo-brief-diseno.md
- `Banners del home (colección JSON)` --conceptually_related_to--> `Desglose de componentes del Home`  [AMBIGUOUS]
  src/content/banners/LEEME.md → districo-brief-diseno.md
- `Banners del home (colección JSON)` --conceptually_related_to--> `Reemplazar banners tipo flyer por fotografía editorial`  [INFERRED]
  src/content/banners/LEEME.md → districo-brief-diseno.md
- `El banner nunca comunica precios ni promociones` --conceptually_related_to--> `Objetivo: conversión a contacto comercial, no venta online`  [INFERRED]
  src/content/banners/LEEME.md → districo-brief-diseno.md
- `Optimización de imágenes con astro:assets` --conceptually_related_to--> `Especificación de foto de banner (2480x660, motivo a la derecha)`  [INFERRED]
  districo-brief-diseno.md → src/content/banners/LEEME.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Pipeline de catálogo estático (colecciones → rutas → filtro → imágenes)** — districo_brief_diseno_products_collection, districo_brief_diseno_getstaticpaths_productos, districo_brief_diseno_filtro_catalogo_isla, districo_brief_diseno_astro_assets_image, districo_brief_diseno_sitio_estatico_sin_ssr [EXTRACTED 1.00]
- **Lenguaje visual bold inspirado en Cantera** — districo_brief_diseno_referencia_cantera, districo_brief_diseno_bloques_de_color_full_bleed, districo_brief_diseno_tipografia_protagonista, districo_brief_diseno_fotografia_producto_grande, districo_brief_diseno_elementos_decorativos, districo_brief_diseno_motion_fade_slide_up [EXTRACTED 1.00]

## Communities (17 total, 2 thin omitted)

### Community 0 - "config.ts"
Cohesion: 0.07
Nodes (25): astro, ALTO, string, href, contactLink(), FORMSPREE_ID, FORMSPREE_ID_B2B, formspreeB2bListo() (+17 more)

### Community 1 - "scrape-ingredientes.mjs"
Cohesion: 0.13
Nodes (11): playwright-core, ANCHOS, RUTAS, args, dirProductos, fallos, pendientes, productos (+3 more)

### Community 2 - "package.json"
Cohesion: 0.08
Nodes (23): dependencies, astro, @astrojs/sitemap, @fontsource-variable/figtree, devDependencies, @astrojs/check, playwright-core, typescript (+15 more)

### Community 3 - "Colección products (src/content/products)"
Cohesion: 0.10
Nodes (25): Optimización de imágenes con astro:assets, Barra de stats (156 productos / 21 marcas / 4 líneas / 6.000m² / ISO 9001), Bloque de marcas destacadas en el home, Bloques de color full-bleed por línea de negocio, Colección brands (src/content/brands), Brief de diseño y contenido Districo, Línea de negocio (mascotas | cuidado | snacks), Districo S.A. (+17 more)

### Community 4 - "tabla-tecnica.ts"
Cohesion: 0.23
Nodes (12): DIR, fallos, construirTabla(), desanidar(), esEncabezado(), GLOSARIO, matriz(), normalizarTecnica() (+4 more)

### Community 5 - "Sistema visual"
Cohesion: 0.25
Nodes (8): Cuello de botella: fotos de producto en baja resolución, Círculos/blobs y stickers de certificación, Fotografía de producto grande y protagonista, Motion: fade-in + slide-up al scroll, Paleta: teal petróleo + verde lima del logo actual, Referencia visual Cantera, Sistema visual, Tipografía protagonista (titulares 60-90px, kicker + título + apoyo)

### Community 6 - "productos/index.astro"
Cohesion: 0.24
Nodes (12): apply(), brandName, brands, lineas, medir(), pintarTags(), products, quitar() (+4 more)

### Community 7 - "cutout-lineas.mjs"
Cohesion: 0.29
Nodes (7): archivos, CONTENIDO, cutout(), destacados, isWhite(), OUT, SRC

### Community 8 - "content.config.ts"
Cohesion: 0.29
Nodes (6): banners, brands, collections, lineas, milestones, products

### Community 9 - "cargar-toh-yowup.mjs"
Cohesion: 0.08
Nodes (21): dirImg, dirLogos, dirMarcas, dirProd, marcas, modelos, ordenTalles, productos (+13 more)

### Community 10 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): astro/tsconfigs/strict, exclude, extends, include

### Community 12 - "astro:content"
Cohesion: 0.09
Nodes (20): puntos, activos, brands, coverDe, todas, armarPuntos(), pintar(), external (+12 more)

### Community 13 - "aplicar-ingredientes.mjs"
Cohesion: 0.20
Nodes (9): datos, dry, duplicados, omitidos, raiz, comoVenia(), CORRECCIONES, corregir() (+1 more)

### Community 14 - "marcas-color-y-foto.mjs"
Cohesion: 0.18
Nodes (8): dirFotos, dirMarcas, dirProductos, ENCARGO, filas, marcas, productos, raiz

### Community 15 - "Districo — Estado vigente del proyecto"
Cohesion: 0.25
Nodes (7): Decisiones vigentes, Districo — Estado vigente del proyecto, Documentos, Estado actual, Pendientes confirmados, Producto y objetivo, Verificación obligatoria

## Ambiguous Edges - Review These
- `Banners del home (colección JSON)` → `Desglose de componentes del Home`  [AMBIGUOUS]
  src/content/banners/LEEME.md · relation: conceptually_related_to

## Knowledge Gaps
- **133 isolated node(s):** `name`, `type`, `version`, `private`, `dev` (+128 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 160 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Banners del home (colección JSON)` and `Desglose de componentes del Home`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `astro` connect `config.ts` to `package.json`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **Why does `texto()` connect `tabla-tecnica.ts` to `cargar-toh-yowup.mjs`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `playwright-core` connect `scrape-ingredientes.mjs` to `package.json`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **What connects `name`, `type`, `version` to the rest of the system?**
  _133 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `config.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06956521739130435 - nodes in this community are weakly interconnected._
- **Should `scrape-ingredientes.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._