// Draws the social cards public/og/quidey-<lang>.png (1200 × 630): the hero as a picture, for
// link previews in search, messengers and social networks. Run it after the hero's words change:
//   node scripts/og-image.mjs
// Needs Chrome or Edge (CHROME=<path> to pick one). The words are the hero's from src/copy.js
// (copied here: copy.js reads Vite's import.meta.env, which plain Node doesn't have).
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const CARDS = {
    de: { before: 'Eine Sache', after: 'nach der anderen.', done: 'Fertig', line: 'Lernplaner mit Fokus-Timer, Kalender und Lerngruppen' },
    en: { before: 'One thing', after: 'after another.', done: 'Done', line: 'Study planner with a focus timer, a calendar and study groups' },
};

const root = resolve(import.meta.dirname, '..');
const font = pathToFileURL(join(root, 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')).href;
const out = join(root, 'public/og');

const browser = [
    process.env.CHROME,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
].find(path => path && existsSync(path));
if (!browser) throw new Error('No Chrome or Edge found; set CHROME=<path>');

// the logo's Q with the check as its tail (same drawing as components/Logo.astro)
const logo = (size, colour) => `
<svg width="${size}" height="${size}" viewBox="9 5 50 50">
    <defs><mask id="cut${size}" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
        <rect width="64" height="64" fill="#fff" /><path d="M27 32l9 12" stroke="#000" stroke-width="10.5" stroke-linecap="round" />
    </mask></defs>
    <circle cx="25" cy="27" r="12" fill="none" stroke="${colour}" stroke-width="6" mask="url(#cut${size})" />
    <path d="M27 32l9 12L54 24" fill="none" stroke="${colour}" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

const page = (card) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: Inter; src: url('${font}') format('woff2'); font-weight: 100 900; }
* { margin: 0; box-sizing: border-box; }
html, body { width: 1200px; height: 630px; overflow: hidden; }
body { font-family: Inter, sans-serif; background: #0e0d0c; color: #f4f3f1; position: relative; }
.lower { position: absolute; inset: 300px 0 0; background: #fb923c; }
.brand { position: absolute; left: 64px; top: 52px; display: flex; align-items: center; gap: 12px;
    font-size: 34px; font-weight: 750; letter-spacing: -0.03em; }
.site { position: absolute; right: 64px; top: 60px; font-size: 24px; color: #b5aea7; }
h1 { position: absolute; left: 64px; right: 64px; top: 182px; font-size: 118px; font-weight: 800;
    letter-spacing: -0.045em; line-height: 0.95; }
.line { display: block; white-space: nowrap; }
.bottom { margin-top: 0.17em; color: #2a1305; }
.slot { display: inline-flex; align-items: center; gap: 0.16em; height: 0.86em; padding: 0 0.22em 0 0.16em;
    vertical-align: -0.05em; border-radius: 0.2em; background: #211f1e; color: #fb923c;
    font-size: 1em; }
.slot span { font-size: 0.48em; font-weight: 700; letter-spacing: -0.03em; }
.sub { position: absolute; left: 64px; right: 64px; bottom: 52px; font-size: 32px; font-weight: 600;
    letter-spacing: -0.02em; color: #2a1305; }
</style></head>
<body>
    <div class="lower"></div>
    <div class="brand">${logo(46, '#fb923c')}Quidey</div>
    <div class="site">quidey.com</div>
    <h1>
        <span class="line">${card.before} <span class="slot">${logo(80, '#fb923c')}<span>${card.done}</span></span></span>
        <span class="line bottom">${card.after}</span>
    </h1>
    <p class="sub">${card.line}</p>
</body></html>`;

mkdirSync(out, { recursive: true });
const work = mkdtempSync(join(tmpdir(), 'quidey-og-'));
try {
    for (const [lang, card] of Object.entries(CARDS)) {
        const html = join(work, `${lang}.html`);
        writeFileSync(html, page(card));
        const png = join(out, `quidey-${lang}.png`);
        execFileSync(browser, [
            '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
            `--user-data-dir=${join(work, 'profile')}`, '--window-size=1200,630',
            '--run-all-compositor-stages-before-draw', '--virtual-time-budget=2000',
            `--screenshot=${png}`, pathToFileURL(html).href,
        ], { stdio: 'ignore' });
        console.log('wrote', png);
    }
} finally {
    rmSync(work, { recursive: true, force: true });
}
