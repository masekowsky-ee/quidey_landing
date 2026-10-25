// sitemap.xml, built from the language versions in copy.js: a new language is listed by itself,
// each page with its hreflang pair. lastmod is the build day; the page is only built and deployed
// when it changes, so that is the day of the last change. The 404 page stays out (noindex).
import { COPY } from '../copy.js';

export function GET({ site }) {
    const base = site ?? new URL('https://quidey.com');
    const pages = Object.values(COPY).map(c => ({ lang: c.lang, href: new URL(c.path, base).href }));
    const lastmod = new Date().toISOString().slice(0, 10);
    const links = [
        ...pages.map(p => `    <xhtml:link rel="alternate" hreflang="${p.lang}" href="${p.href}" />`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${pages[0].href}" />`,
    ].join('\n');
    const urls = pages.map(p => `  <url>\n    <loc>${p.href}</loc>\n    <lastmod>${lastmod}</lastmod>\n${links}\n  </url>`);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
    return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
