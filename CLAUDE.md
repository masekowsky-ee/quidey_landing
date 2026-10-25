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
  must be added there). `layouts/Base.astro` writes canonical, hreflang, Open Graph and JSON-LD
  (`WebSite` for the site name, `Organization` with logo, `SoftwareApplication`); the 404 page is
  `noindex`.
  Ownership is verified in Google Search Console as a Domain property (DNS TXT at Cloudflare),
  which covers quidey.com and app.quidey.com; no verification file lives in this repo.
- `public/sw.js` unregisters the old app service worker that once ran on quidey.com.
- The page stores nothing and sets no cookies. If that ever changes, the privacy policy in the
  app repo (`src/legal/LegalPage.jsx`, section "Aufruf der Website") must change with it.
- Visual check: `npm run build && npx wrangler dev`, then headless Chrome over CDP.
