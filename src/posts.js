// The written pages next to the landing page, as Markdown files with a few lines of frontmatter:
//
//   src/posts/hilfe/<slug>.md     Hilfe & Fragen: one common question per page (the forum of answers)
//       title, description, category (one of HELP_CATEGORIES), order (smaller first), updated
//   src/posts/updates/<slug>.md   Updates: release notes and stories, newest first, with pictures
//       title, description, date ("YYYY-MM-DD"), time ("HH:MM", orders posts of one day), image (a
//       picture under public/, for the list and social cards), imageAlt, tags
//
// The file name is the address (/hilfe/<slug>/, /updates/<slug>/). A new file is picked up by the
// lists, the sitemap and the RSS feed by itself.

export const HELP_CATEGORIES = [
    ['start', 'Erste Schritte'],
    ['fokus', 'Fokus & Pomodoro'],
    ['planen', 'Planen & Routinen'],
    ['zusammen', 'Zusammen lernen'],
    ['konto', 'Konto, App & Daten'],
];

const slugOf = (file) => file.split('/').pop().replace(/\.md$/, '');

// "2026-10-28", also when YAML made a date of it
export const isoDay = (value) => (value instanceof Date ? value.toISOString() : String(value ?? '')).slice(0, 10);

const read = (modules) => Object.entries(modules).map(([file, mod]) => ({
    slug: slugOf(file),
    ...mod.frontmatter,
    ...(mod.frontmatter.date ? { date: isoDay(mod.frontmatter.date) } : {}),
    ...(mod.frontmatter.updated ? { updated: isoDay(mod.frontmatter.updated) } : {}),
    Content: mod.Content,
    headings: mod.getHeadings?.() ?? [],
}));

const help = read(import.meta.glob('./posts/hilfe/*.md', { eager: true }))
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.title.localeCompare(b.title, 'de'));

const updates = read(import.meta.glob('./posts/updates/*.md', { eager: true }))
    .sort((a, b) => `${b.date}${b.time ?? ''}`.localeCompare(`${a.date}${a.time ?? ''}`));

export const helpPosts = () => help;
export const updatePosts = () => updates;

export const formatDate = (value) => new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
    .format(new Date(`${isoDay(value)}T12:00:00`));
