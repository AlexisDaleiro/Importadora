import type { APIRoute } from 'astro';
import { NOINDEX } from '../config';

// Buscadores: bloqueados mientras el sitio viva en el dominio provisorio.
const BUSCADORES = ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider', 'YandexBot'];

// Asistentes de IA: permitidos para poder analizar el sitio durante el desarrollo.
// Google-Extended no rastrea, solo habilita el contenido para Gemini; va acá
// porque no afecta la indexación de la Búsqueda de Google (eso lo maneja Googlebot).
const ASISTENTES = ['ChatGPT-User', 'OAI-SearchBot', 'Claude-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'];

const grupo = (agentes: string[], regla: string) =>
  agentes.map((a) => `User-agent: ${a}\n${regla}\n`).join('\n');

// El orden no decide nada: robots.txt aplica el grupo del User-agent más
// específico que coincida, así que el "*" final solo alcanza a los no listados.
const bloqueoSelectivo = [
  '# TEMPORAL — el sitio está en importadora.vercel.app y no debe competir en',
  '# buscadores con districo.com.uy. Al pasar a dominio propio: NOINDEX = false',
  '# en src/config.ts y esto queda en "Allow: /" para todos.',
  '',
  grupo(BUSCADORES, 'Disallow: /'),
  grupo(ASISTENTES, 'Allow: /'),
  'User-agent: *',
  'Disallow: /',
  '',
].join('\n');

export const GET: APIRoute = ({ site }) =>
  new Response(
    NOINDEX
      ? bloqueoSelectivo
      : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
