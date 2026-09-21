# Kosha — Personal Guidance

**Kosha** is a global, mobile-first personal-guidance web app for entertainment and self-reflection.

Enter your name and birth details to receive a layered reading across Western & Chinese astrology, numerology, English ordinal gematria, lucky profile cues, and playful brand/style "energy matches."

> **For entertainment and self-reflection only. Not science, not medical/financial/legal advice, not guaranteed prediction.** Brand names are illustrative energy matches — not endorsements or paid placements.

## Live

- **jsDelivr (works immediately):** https://cdn.jsdelivr.net/gh/iamaaraven/kosha-guide@gh-pages/index.html
- **GitHub Pages:** https://iamaaraven.github.io/kosha-guide/  
  *(Settings → Pages → Deploy from branch `gh-pages` / root, if not already enabled)*

## Features

1. **Western astrology** — sun sign, element, ruling planet vibe, short blurb  
2. **Chinese astrology** — animal + element (year pivot ~Feb 4), traits, compatibility hint  
3. **Numerology** — Life Path, Destiny/Expression, Soul Urge, Personality  
4. **Gematria** — English ordinal sum + reduced digit + interpretive note  
5. **Lucky profile** — numbers, colors, lucky day  
6. **Brand & style vibes** — clothing / auto / tech energy matches (examples only)  
7. **Today's nudge** — weekday + life path guidance line  
8. **localStorage** — last reading restored in-browser  
9. **Offline-friendly** — small vanilla JS files (no React / Vite bundle on gh-pages)

## Deploy (lite)

Primary ship is under `pages-lite/` (also mirrored at `gh-pages` branch root):

- `index.html` — UI shell
- `data.js` — tables (signs, numerology meanings, vibes, nudges)
- `app.js` — calculation + render logic
- `manifest.webmanifest` / `icon.svg` / `.nojekyll`

Total under ~30KB — safe for GitHub Contents API / MCP uploads.

## Author

Aaraven Sharma ([@iamaaraven](https://github.com/iamaaraven))
