# Districo — Estado vigente del proyecto

Actualizado: 2026-09-17.

## Producto y objetivo

Sitio institucional y catálogo B2B para Districo S.A., desarrollado como propuesta comercial
para reemplazar su WordPress actual. No es e-commerce: no muestra precios, carrito ni pagos.
La conversión buscada es el contacto de veterinarias, pet shops, agropecuarias y grandes
superficies mediante formulario, teléfono o WhatsApp.

## Estado actual

- Astro 5, salida 100% estática y deploy en Vercel.
- 167 productos, 18 marcas y 6 líneas de negocio.
- 8 banners aprobados para la versión de demostración.
- Formularios general y B2B operativos mediante credenciales de prueba de Formspree.
- Districo tiene únicamente dos sedes físicas: Casa Matriz en Montevideo y sucursal en
  Maldonado. La cobertura nacional no debe presentarse como sucursales o centros regionales.
- `noindex` activo mientras el sitio use `importadora.vercel.app`.
- Open Graph configurado en `public/og.png`.
- Imágenes actuales aceptadas para esta etapa aunque varias sean de resolución limitada.
- Las 18 fotos editoriales de marca siguen siendo placeholders y deben sustituirse antes de
  una presentación final al cliente.
- La página `Nosotros` incluye una maqueta de cultura, equipo y novedades. La cifra de 150
  colaboradores, Mariana Silva y las tres novedades son contenido ficticio de demostración.
- Los 13 hitos de `Nosotros` se presentan en una línea de tiempo accesible, sin autoplay,
  con navegación táctil, por flechas y por teclado. En escritorio se sustituye directamente
  la tarjeta visible; en móvil se mantiene el desplazamiento horizontal. Inicia en 1960.
- El sitio no tiene animaciones de entrada. El contenido es visible por defecto y nada queda
  esperando que un script lo active. La navegación usa precarga por intención y la transición
  nativa del `ClientRouter` de Astro, sin personalizaciones. El catálogo restaura filtros y
  posición al volver.

## Decisiones vigentes

- Mantener Astro sin SSR ni framework de interfaz adicional.
- Conservar teal `#204F5F`, lima `#B1CA00` y acentos por línea/marca.
- Mantener el teléfono 0800 1004 en la navegación.
- Banner contenido, sin autoplay; las piezas ya incluyen su texto.
- Ningún carrusel avanza solo: banners, marcas y productos por línea se manejan a mano.
- Los carruseles se dimensionan con CSS (`flex-basis`, porcentajes, `scroll-snap`). El JS solo
  atiende puntos y flechas, y va aislado en su propio `try/catch`.
- El único movimiento es la respuesta a una acción del usuario (hover, focus, active) más la
  transición nativa del `ClientRouter`; reduced-motion apaga el scroll suave y esas
  transiciones.
- No ocultar overflow horizontal globalmente: identificar y corregir el elemento responsable.
- No inventar datos institucionales ni de productos. Los problemas presentes en la fuente se
  corrigen solo cuando son erratas inequívocas; las dudas se confirman con Districo.

## Verificación obligatoria

Después de cambios de código o contenido:

1. `npm run check`
2. `npm run build`
3. `node scripts/check-tablas.mjs` si se tocaron fichas o normalización técnica.
4. Iniciar `npm run preview` y ejecutar `npm run check:overflow` si cambió layout o CSS.
5. Revisar visualmente las rutas afectadas en desktop y mobile.
6. `graphify update .` para mantener actualizado el grafo.

## Pendientes confirmados

- Sustituir las 18 fotos placeholder de marcas por fotografías distintas.
- Confirmar con Districo los textos de origen que parecen corresponder a otra variante de
  producto; no corregirlos por inferencia.
- Completar la descripción de `biofresh-para-perros-castrados-razas-grandes-y-gigantes`
  cuando exista una fuente confirmada.
- Sustituir la cifra de colaboradores, la historia destacada y las novedades demostrativas de
  `Nosotros` por datos, fotografías y testimonios aprobados por Districo.
- Antes de entregar: cambiar credenciales de prueba de Formspree, confirmar WhatsApp y dominio,
  desactivar `NOINDEX` y actualizar `site` en `astro.config.mjs`. Eso revierte también el
  bloqueo selectivo de rastreadores: `robots.txt` vuelve a permitir todo y desaparece el
  `<meta name="robots">`.
- TEMPORAL mientras el sitio viva en `importadora.vercel.app`: `robots.txt` bloquea a los
  buscadores (Googlebot, Bingbot, Slurp, DuckDuckBot, Baiduspider, YandexBot) y permite a los
  asistentes de IA (ChatGPT-User, OAI-SearchBot, Claude-User, ClaudeBot, PerplexityBot,
  Google-Extended) para poder analizar el sitio. Cualquier otro bot sigue bloqueado por la
  regla `User-agent: *`.
- Definir precio, mantenimiento y responsable de altas futuras de productos.

## Documentos

- `AGENTS.md`: reglas operativas que Codex carga automáticamente.
- `PROJECT_STATUS.md`: fuente de verdad sobre el estado vigente.
- `districo-brief-diseno.md`: brief de diseño y arquitectura; conserva contexto histórico.
- `graphify-out/`: grafo de dependencias y relaciones del repositorio.
