// sitemap.xml, built from the language versions in copy.js (each with its hreflang pair) and the
// written pages (Hilfe, Updates; German only, posts.js). lastmod is the build day for the landing
// page and the lists (the site is only built and deployed when it changes), a post's own date for
// a post. The 404 page stays out (noindex).
import { COPY } from '../copy.js';
import { helpPosts, updatePosts } from '../posts.js';

export function GET({ site }) {
    const base = site ?? new URL('https://quidey.com');
    const pages = Object.values(COPY).map(c => ({ lang: c.lang, href: new URL(c.path, base).href }));
    const today = new Date().toISOString().slice(0, 10);
    const links = [
        ...pages.map(p => `    <xhtml:link rel="alternate" hreflang="${p.lang}" href="${p.href}" />`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${pages[0].href}" />`,
    ].join('\n');
    const landing = pages.map(p => `  <url>\n    <loc>${p.href}</loc>\n    <lastmod>${today}</lastmod>\n${links}\n  </url>`);
    const written = [
        { path: '/hilfe/', lastmod: today },
        { path: '/updates/', lastmod: updatePosts()[0]?.date ?? today },
        ...helpPosts().map(post => ({ path: `/hilfe/${post.slug}/`, lastmod: post.updated ?? today })),
        ...updatePosts().map(post => ({ path: `/updates/${post.slug}/`, lastmod: post.updated ?? post.date })),
    ].map(p => `  <url>\n    <loc>${new URL(p.path, base).href}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n  </url>`);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...landing, ...written].join('\n')}
</urlset>
`;
    return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
