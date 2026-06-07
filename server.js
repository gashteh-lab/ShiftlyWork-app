const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const APP_STORE_URL = 'https://apps.apple.com/app/shiftlywork/id6765924333';
const SUPPORTED_LANGS = ['en', 'ar', 'es', 'fr'];
const DEFAULT_LANG = 'en';

// Load translation files once at startup
const locales = {};
SUPPORTED_LANGS.forEach((code) => {
  const file = path.join(__dirname, 'locales', `${code}.json`);
  locales[code] = JSON.parse(fs.readFileSync(file, 'utf8'));
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static assets (screenshots, logo, favicons, privacy/manual pages, etc.)
app.use(express.static(path.join(__dirname), {
  index: false,
  // Don't let the static middleware serve index.html for "/"
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('index.html')) res.setHeader('Cache-Control', 'no-store');
  },
}));

function pickLang(req) {
  const fromParam = req.params.lang;
  if (fromParam && SUPPORTED_LANGS.includes(fromParam)) return fromParam;

  const accepted = (req.acceptsLanguages() || [])
    .map((l) => l.toLowerCase().slice(0, 2))
    .find((l) => SUPPORTED_LANGS.includes(l));

  return accepted || DEFAULT_LANG;
}

app.get('/', (req, res) => {
  res.redirect(`/${pickLang(req)}`);
});

app.get('/:lang(en|ar|es|fr)', (req, res) => {
  const lang = req.params.lang;
  res.render('index', { t: locales[lang], appStoreUrl: APP_STORE_URL });
});

// Fallback: unknown path -> redirect to detected-language home
app.use((req, res) => {
  res.redirect(`/${pickLang(req)}`);
});

app.listen(PORT, () => {
  console.log(`Shiftly site running at http://localhost:${PORT}`);
});
