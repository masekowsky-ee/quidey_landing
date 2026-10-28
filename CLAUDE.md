# Quidey landing page

The public marketing page on **quidey.com** (German at `/`, English at `/en/`). The app is a
separate repo, `C:\Users\eesge\quidey_react-main` → **app.quidey.com**; this page only links to it.
Kept apart on purpose: it changes rarely and differently from the app.

- Static Astro 7 (`astro.config.mjs`: `inlineStylesheets: 'never'`, `assetsInlineLimit: 0`), no
  framework components. Plain `.astro` + three small scripts in `src/scripts/`.
- All copy in `src/copy.js` (de/en side by side). `APP_URL` from `PUBLIC_APP_URL`, default
  `https://app.quidey.com`.
- Deploy: Cloudflare Workers static assets, `wrangler.jsonc` (worker `quidey-landing`, custom
  domain `quidey.com`, `not_found_handling: 404-page`). `npm run deploy`.
- `public/_headers`: strict CSP — no inline `<script>` (JSON-LD data blocks are fine), no
  `style="…"` attributes, nothing from other hosts. Check `dist/*.html` after changes.
- `public/_redirects`: old legal URLs → app. `src/pages/404.astro` + `scripts/forward.js`:
  old app routes → app with query and hash (keep `APP_PATHS` in step with the app's routes).
- Search engines: this page is what Google should find (the app on app.quidey.com is
  `noindex`). `public/robots.txt` points to the sitemap, which `src/pages/sitemap.xml.js` builds
  from the languages in `copy.js` (hreflang pairs, lastmod = build day; a new page outside COPY
  must be added there). `layouts/Base.astro` writes canonical, hreflang, `robots`
  (`max-image-preview:large`), Open Graph / Twitter (`summary_large_image`) and JSON-LD
  (`WebSite` for the site name, `Organization` with logo, `WebPage`, `SoftwareApplication` with
  `featureList` from `copy.js` `meta.featureList`, `FAQPage` from `faq.items`, word for word as on
  the page); the 404 page is `noindex`. Search words (Lernplaner, Fokus-Timer, Kalender, zusammen
  lernen / study planner, …) live in the description, h2s and questions (the title is the plain
  line "Quidey – dein Planer für Lernen, Alltag und Studium"); headings must stay
  ≤ 2 lines (≈16 characters per line in the feature text column at desktop size).
  Favicon (also the picture beside the result in Google): `quidey-logo.svg`, plus
  `public/icons/icon-192.png` (Google wants a multiple of 48 px) and `public/favicon.ico`, both
  drawn from `icons/icon-512.png` by `node scripts/favicons.mjs`.
  Social cards: `public/og/quidey-<lang>.png` (1200 × 630, the hero as a picture), drawn by
  `node scripts/og-image.mjs` (headless Chrome/Edge); its words are copied from the hero, so
  re-run it when those change.
  Ownership is verified in Google Search Console as a Domain property (DNS TXT at Cloudflare),
  which covers quidey.com and app.quidey.com; no verification file lives in this repo.
- **Hilfe & Updates** (German only): Markdown files with frontmatter, read by `src/posts.js`
  (`import.meta.glob`, the file name is the address). `src/posts/hilfe/<slug>.md` → `/hilfe/<slug>/`
  (title, description, category from `HELP_CATEGORIES`, order, updated; one common question per page,
  the "forum" of answers; `/hilfe/` lists them by category with a filter, `scripts/helpSearch.js`).
  `src/posts/updates/<slug>.md` → `/updates/<slug>/` (title, description, date "YYYY-MM-DD", image,
  imageAlt, tags; release notes with pictures under `public/updates/<date>/`, WebP made with sharp
  from screenshots of the app), `/updates/` the list, `/updates/rss.xml` the feed. Every session of
  work on Quidey ends with an update post. Layout `layouts/Content.astro` (bar, reading column,
  footer on the paper field, `styles/content.css`); `Base.astro` takes `page="content"` (no hreflang
  pair, its own JSON-LD `graph`: Article / BlogPosting / CollectionPage + BreadcrumbList). The
  sitemap lists all of them. The landing page links there from the bar (wide screens), the hero's
  "Neu" line (`hero.news` in copy.js, point it at the newest update) and the footer.
- `public/sw.js` unregisters the old app service worker that once ran on quidey.com.
- The page stores nothing and sets no cookies. If that ever changes, the privacy policy in the
  app repo (`src/legal/LegalPage.jsx`, section "Aufruf der Website") must change with it.
- Page order (`components/Landing.astro`): hero (sentence, what Quidey is, button), five features
  (focus, plan, together, progress, style — statement, three points, a piece of the app marked
  `data-ui`), who it is for, everything else (`more`), questions, email line, footer. Fields
  alternate light / dark / accent / deep so two of a kind never touch.
- Visual check: `npm run build && npx wrangler dev` (or `npx astro preview`), then headless Chrome
  over CDP, or the taste-skill inspector from the app repo (`.claude/skills/design-taste-frontend/
  scripts/inspect.mjs <url>`; it needs the served site, not `dist/index.html`, as paths are absolute).
