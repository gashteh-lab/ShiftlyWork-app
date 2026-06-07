# Shiftly Website (Node.js)

A small Express server that renders the Shiftly marketing site in four languages — English, Arabic (RTL), Spanish, and French — from a single templated page.

## Run it

```
npm install
npm start
```

Then open http://localhost:3000 — it redirects to your browser's preferred language (falls back to English), e.g. `/en`, `/ar`, `/es`, `/fr`.

## How it's organized

- `server.js` — Express server. Loads the four translation files and renders `views/index.ejs` per language/route.
- `views/index.ejs` — single page template shared by all languages (handles RTL layout automatically for Arabic).
- `locales/en.json`, `ar.json`, `es.json`, `fr.json` — all on-page text, one file per language.
- `screenshots/`, `logo.png`, `favicon*.png`, `privacy.html` — static assets, served as-is.

## App Store link

The Download buttons across the site point to:
https://apps.apple.com/app/shiftlywork/id6765924333

To change it, edit the `APP_STORE_URL` constant near the top of `server.js`.

## Editing text

To change copy in any language, edit the matching key in `locales/<lang>.json` — no template changes needed. The structure mirrors the page sections (hero, features, pricing, FAQ, footer, etc).
