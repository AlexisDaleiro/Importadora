## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Proyecto Districo

Leé `PROJECT_STATUS.md` para el estado comercial y técnico vigente. Usá
`districo-brief-diseno.md` como referencia de diseño, no como tablero de pendientes.

Reglas de trabajo:

- El sitio es una propuesta comercial B2B para Districo S.A.; no es e-commerce y no lleva precios.
- Hay 167 productos, 18 marcas y 6 líneas. Las cantidades visibles deben calcularse desde las
  Content Collections, nunca escribirse a mano.
- Los ocho banners actuales están aprobados. Los formularios funcionan con credenciales de prueba.
- La resolución actual de las imágenes es aceptable durante esta etapa. No bloquear trabajo por
  calidad de píxeles, pero no degradar ni recomprimir fuentes sin necesidad.
- No inventar datos del cliente ni de productos. Verificar en la fuente oficial; si la propia fuente
  es contradictoria, documentar la duda en vez de adivinar.
- Antes de implementar cambios visuales importantes, presentar opciones y costos cuando el usuario
  todavía no haya elegido una dirección.
- Mantener accesibilidad, foco visible, áreas táctiles de 44x44 y ausencia de overflow horizontal
  real; nunca enmascararlo con `overflow-x: hidden`.
- El contenido es visible por defecto, siempre. Una animación puede mejorar cómo aparece algo,
  nunca decidir si aparece: ningún elemento queda invisible o desplazado esperando que algo lo
  active, y ningún script de layout puede dejar el contenido inutilizable si falla. El layout vive
  en CSS; el JS de un componente se limita a la interacción y va aislado en su `try/catch`.
- No agregar dependencias de producción sin justificar el costo de mantenimiento.
- Al finalizar cambios, ejecutar las verificaciones indicadas en `PROJECT_STATUS.md` y actualizar
  Graphify.
