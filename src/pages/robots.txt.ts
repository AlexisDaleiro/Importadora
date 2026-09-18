import type { APIRoute } from 'astro';
import { NOINDEX } from '../config';

// robots.txt generado: acompaña al <meta robots> del layout, para que el bloqueo
// mientras el sitio está en Vercel dependa de un solo interruptor (NOINDEX).
export const GET: APIRoute = ({ site }) =>
  new Response(
    NOINDEX
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
