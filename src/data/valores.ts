/**
 * Los nueve valores de Districo, con la definición textual de su sitio oficial.
 * Es texto institucional: se copia tal cual, no se reescribe.
 *
 * Archivo de datos y no content collection a propósito: son nueve pares de
 * strings sin imágenes ni referencias cruzadas, así que una colección con su
 * esquema y nueve JSON sueltos sería más piezas para el mismo resultado.
 * Editar la lista es editar este array; /nosotros la recorre en orden.
 *
 * "Trabajo en equipo" es el mismo enunciado que la frase de cultura que abre
 * la sección anterior de la página. Está repetido a propósito: la frase es la
 * versión pública del valor.
 */
export interface Valor {
  nombre: string;
  definicion: string;
}

export const valores: Valor[] = [
  {
    nombre: 'Confianza',
    definicion: 'Lo consideramos el valor central, la base sobre la que se construye todo.',
  },
  {
    nombre: 'Honestidad e integridad',
    definicion:
      'Cumplimos y respetamos los compromisos y requisitos asumidos con las partes interesadas.',
  },
  {
    nombre: 'Pasión',
    definicion: 'Damos lo mejor de nosotros mismos, siempre.',
  },
  {
    nombre: 'Mejora continua',
    definicion:
      'Tenemos la predisposición y actitud constante de aprender, superarnos y mejorar.',
  },
  {
    nombre: 'Conocimiento y habilidad',
    definicion:
      'Entendemos el conocimiento como la capacidad de saber qué hacer, y por qué hacerlo.',
  },
  {
    nombre: 'Humildad',
    definicion: 'Reconocemos que siempre hay más para aprender y para mejorar.',
  },
  {
    nombre: 'Trabajo en equipo',
    definicion: 'Consideramos que nadie puede ser mejor que todos nosotros juntos.',
  },
  {
    nombre: 'Respeto',
    definicion:
      'Consideramos la diversidad como una oportunidad de incorporar una perspectiva diferente que enriquece la visión del conjunto.',
  },
  {
    nombre: 'Orientación a resultados con filosofía ganar-ganar',
    definicion:
      'Todas nuestras relaciones se basan en construir vínculos que aporten valor para todos los involucrados.',
  },
];
