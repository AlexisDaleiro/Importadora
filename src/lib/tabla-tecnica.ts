// Normalización del HTML técnico raspado de districo.com.uy.
//
// El contenido de `technicalSheet` viene del sitio oficial y llega roto: no hay
// un solo <th> en las 156 fichas, 110 bloques <thead> traen filas de datos
// adentro (que el CSS pintaba como encabezado), hay celdas vacías de relleno,
// filas más cortas que la tabla y una tabla anidada dentro de un <td>.
//
// Se normaliza acá, en tiempo de build, y no con un script que reescriba los
// JSON: así el contenido raspado queda intacto y un futuro re-scrape sale
// arreglado solo. El HTML de origen no tiene un solo atributo (verificado sobre
// las 156 fichas: p, table, thead, tr, tbody, td, em, strong, b, h3 y nada más),
// así que las tablas se reconstruyen desde la matriz de celdas.

const RE_TR = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
const RE_CELDA = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;

/** Texto plano de un fragmento, para aplanar las tablas anidadas. */
function texto(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Quita las tablas anidadas dentro de una celda, dejando su texto. */
function desanidar(html: string): string {
  let previo;
  do {
    previo = html;
    // Tabla sin tablas adentro = la más interna. Si está dentro de un <td>, se
    // reemplaza por su texto para no romper el conteo de columnas.
    html = html.replace(
      /<td[^>]*>\s*<table>((?:(?!<table>)[\s\S])*?)<\/table>\s*<\/td>/gi,
      (_m, dentro) => `<td>${texto(dentro)}</td>`
    );
  } while (html !== previo);
  return html;
}

/** Filas de una tabla como matriz de celdas ya en texto plano de HTML. */
function matriz(interior: string): string[][] {
  const filas: string[][] = [];
  for (const fila of interior.matchAll(RE_TR)) {
    const celdas: string[] = [];
    for (const celda of fila[1].matchAll(RE_CELDA)) celdas.push(celda[1].trim());
    filas.push(celdas);
  }
  return filas;
}

const tieneDigito = (s: string) => /\d/.test(s);

/**
 * ¿La fila es un encabezado de columna? Sirve para separar los encabezados
 * reales de las filas de datos que el sitio de origen dejó dentro del <thead>.
 * Una fila de datos tiene primera celda con contenido y la mayoría de sus
 * celdas con números ("Mini 1-5kg | 60 | 70 | 80"); una segunda fila de
 * encabezado suele venir con la primera celda vacía ("| 1 a 3 | 3 a 6 | …").
 */
function esEncabezado(celdas: string[]): boolean {
  const llenas = celdas.filter(Boolean);
  if (llenas.length === 0) return false;
  if (!celdas[0]) return true;
  return llenas.filter(tieneDigito).length < llenas.length / 2;
}

function construirTabla(interior: string): string {
  const filas = matriz(interior).filter((f) => f.some(Boolean));
  if (filas.length === 0) return '';

  const cols = Math.max(...filas.map((f) => f.length));
  for (const f of filas) while (f.length < cols) f.push('');

  // Fila de subtítulo: una sola celda con contenido, ocupando todo el ancho.
  const subtitulo = (f: string[]) => f.filter(Boolean).length === 1 && Boolean(f[0]);

  const cuerpo = (f: string[]) =>
    subtitulo(f)
      ? `<tr><th scope="colgroup" colspan="${cols}">${f[0]}</th></tr>`
      : `<tr><th scope="row">${f[0]}</th>${f.slice(1).map((c) => `<td>${c}</td>`).join('')}</tr>`;

  // Tabla de dos columnas = pares etiqueta/valor (la tabla nutricional). No
  // tiene encabezados de columna: el encabezado de cada fila es la etiqueta.
  if (cols === 2) {
    return `<table><tbody>${filas.map(cuerpo).join('')}</tbody></table>`;
  }

  // Con más columnas, las primeras filas sí son encabezado (hasta 2: varias
  // tablas de dosificación traen "Tamaño del perro" y "Edad en meses" separadas).
  let corte = 0;
  while (corte < Math.min(2, filas.length) && esEncabezado(filas[corte])) corte++;
  if (corte === 0) corte = 1;

  // Fila de encabezado: cada celda con texto absorbe las vacías que le siguen.
  // Sin esto "Edad en meses" queda en una columna y al lado sobran seis celdas
  // vacías, que es lo que hacía ver la tabla descuadrada.
  const encabezado = (f: string[]) => {
    let html = '';
    for (let i = 0; i < f.length; i++) {
      let span = 1;
      while (i + span < f.length && !f[i + span] && f[i]) span++;
      html += `<th scope="col"${span > 1 ? ` colspan="${span}"` : ''}>${f[i]}</th>`;
      i += span - 1;
    }
    return `<tr>${html}</tr>`;
  };

  const thead = filas.slice(0, corte).map(encabezado).join('');

  return `<table><thead>${thead}</thead><tbody>${filas.slice(corte).map(cuerpo).join('')}</tbody></table>`;
}

/** Reemplaza cada <table> de nivel superior por su versión normalizada. */
function reconstruirTablas(html: string): string {
  let salida = '';
  let i = 0;
  while (i < html.length) {
    const inicio = html.toLowerCase().indexOf('<table>', i);
    if (inicio === -1) {
      salida += html.slice(i);
      break;
    }
    salida += html.slice(i, inicio);

    // Cierre de ESTA tabla, contando aperturas anidadas.
    let nivel = 0;
    let j = inicio;
    let fin = -1;
    while (j < html.length) {
      const abre = html.toLowerCase().indexOf('<table>', j);
      const cierra = html.toLowerCase().indexOf('</table>', j);
      if (cierra === -1) break;
      if (abre !== -1 && abre < cierra) {
        nivel++;
        j = abre + 7;
      } else {
        nivel--;
        j = cierra + 8;
        if (nivel === 0) {
          fin = j;
          break;
        }
      }
    }
    if (fin === -1) {
      salida += html.slice(inicio);
      break;
    }

    salida += construirTabla(html.slice(inicio + 7, fin - 8));
    i = fin;
  }
  return salida;
}

export function normalizarTecnica(html: string): string {
  let out = html
    .replace(/&nbsp;/g, ' ')
    .replace(/<\/?b>/gi, '')
    // <p> que quedaron vacíos: el sitio de origen los usa como separadores.
    .replace(/<p>\s*<\/p>/gi, '');
  out = desanidar(out);
  out = reconstruirTablas(out);
  return out.replace(/\s{2,}/g, ' ').trim();
}
