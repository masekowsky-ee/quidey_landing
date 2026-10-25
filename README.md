# Quidey – Landingpage

Die öffentliche Startseite von Quidey auf **https://quidey.com**. Die App selbst liegt in einem
eigenen Repo (`quidey_react-main`) unter **https://app.quidey.com**.

Statisches [Astro](https://astro.build): Jede Seite ist fertiges HTML, das JavaScript beschränkt
sich auf ein paar kleine Dateien (Hero-Animation, mitlaufende Leiste, Farbwahl). Ohne JS bleibt
alles lesbar und jeder Link funktioniert.

## Befehle

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # nach dist/
npm run deploy    # bauen + wrangler deploy (Cloudflare Worker "quidey-landing")
```

Lokal wie in Produktion testen (mit `_headers`, `_redirects` und 404-Seite):
`npm run build && npx wrangler dev`.

## Aufbau

| Datei | Inhalt |
|---|---|
| `src/copy.js` | alle Texte, Deutsch und Englisch, und `APP_URL` |
| `src/pages/index.astro`, `src/pages/en/index.astro` | die Seite auf Deutsch (`/`) und Englisch (`/en/`) |
| `src/pages/404.astro` | unbekannte Adressen; leitet alte App-Adressen (`/calendar`, `/verify-email?token=…`) an die App weiter |
| `src/components/Landing.astro` | die ganze Seite: Leiste, Hero, fünf Features, Für wen, Funktionen, Fragen, E-Mail-Zeile, Footer |
| `src/layouts/Base.astro` | Kopf jeder Seite: Titel, Beschreibung, Sprachen, Social Cards, strukturierte Daten (inkl. FAQ) |
| `scripts/og-image.mjs` | zeichnet die Social Cards `public/og/quidey-de.png` / `-en.png` (1200 × 630) mit Headless Chrome |
| `src/components/FocusLoop.astro` + `src/scripts/focusLoop.js` | das Wort im Hero: Timer → Q → Logo, als SVG |
| `src/scripts/landing.js` | Leistenfarbe, Einblenden, tickende App-Ausschnitte, Woche und Serie ab heute, Farbwahl, E-Mail-Zeile |
| `src/styles/landing.css` | alle Styles |
| `public/_headers` | CSP und Sicherheits-Header (keine Inline-Skripte/-Styles, nichts von fremden Hosts) |
| `public/_redirects` | alte Adressen der Rechtstexte → app.quidey.com |
| `public/sw.js` | entfernt den Service Worker der App, die früher auf quidey.com lief |

## Regeln

- Keine Inline-Styles (`style="…"`) und keine Inline-Skripte: die CSP blockiert sie. Werte, die
  sich ändern, setzt JS per `element.style.setProperty` oder per Klasse.
- Keine Schriften, Bilder oder Skripte von fremden Hosts, keine Cookies, kein Tracking, kein
  `localStorage`. Die Datenschutzerklärung (in der App) sagt genau das über die Startseite.
- Impressum, Datenschutz, Nutzungsbedingungen und Kontakt leben in der App, weil sie sich mit
  deren Funktionen ändern; der Footer verlinkt dorthin.
- Anmelden / Registrieren gehen nach `APP_URL/signin` bzw. `APP_URL/signup`; die E-Mail aus der
  E-Mail-Zeile geht als `#email=…` mit (Hash, erreicht keinen Server).
- `PUBLIC_APP_URL` (siehe `.env.example`) überschreibt die App-Adresse, z. B. für lokale Tests
  gegen `http://localhost:5173`.
