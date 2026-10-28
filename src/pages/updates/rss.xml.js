// The updates as an RSS feed (/updates/rss.xml), for feed readers
import { updatePosts } from '../../posts.js';

const escape = (text) => String(text ?? '').replace(/[<>&'"]/g, (ch) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[ch]);

export function GET({ site }) {
    const base = site ?? new URL('https://quidey.com');
    const items = updatePosts().map(post => {
        const url = new URL(`/updates/${post.slug}/`, base).href;
        return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.date}T09:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(post.description)}</description>
    </item>`;
    });
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Quidey Updates</title>
    <link>${new URL('/updates/', base).href}</link>
    <description>Neues in Quidey, dem Lernplaner für Schule, Studium und Alltag.</description>
    <language>de</language>
${items.join('\n')}
  </channel>
</rss>
`;
    return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
