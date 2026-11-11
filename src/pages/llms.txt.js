// llms.txt (llmstxt.org): a short Markdown map of the site for AI assistants and answer engines,
// built from the same sources as the page and the sitemap (copy.js, posts.js), so it never goes stale.
import { COPY } from '../copy.js';
import { helpPosts, updatePosts, HELP_CATEGORIES } from '../posts.js';

export function GET({ site }) {
    const base = site ?? new URL('https://quidey.com');
    const url = (path) => new URL(path, base).href;
    const de = COPY.de;
    const en = COPY.en;
    const help = HELP_CATEGORIES.flatMap(([key, label]) => {
        const posts = helpPosts().filter(post => post.category === key);
        return posts.length ? [`### ${label}`, '', ...posts.map(post => `- [${post.title}](${url(`/hilfe/${post.slug}/`)}): ${post.description}`), ''] : [];
    });
    const text = [
        '# Quidey',
        '',
        `> ${de.meta.description}`,
        '',
        `${en.meta.description}`,
        '',
        `- [Quidey (Deutsch)](${url(de.path)}): ${de.meta.title}`,
        `- [Quidey (English)](${url(en.path)}): ${en.meta.title}`,
        '- [App](https://app.quidey.com): the app itself (sign-in needed, not indexed)',
        '',
        '## Funktionen',
        '',
        ...de.meta.featureList.map(feature => `- ${feature}`),
        '',
        '## Fragen',
        '',
        ...de.faq.items.flatMap(([question, answer]) => [`### ${question}`, '', answer, '']),
        '## Hilfe',
        '',
        ...help,
        '## Updates',
        '',
        ...updatePosts().map(post => `- [${post.title}](${url(`/updates/${post.slug}/`)}) (${post.date}): ${post.description}`),
        '',
    ].join('\n');
    return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
