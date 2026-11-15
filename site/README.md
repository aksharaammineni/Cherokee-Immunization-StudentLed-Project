# Kindergarten Ready. Vaccine Protected.
Plain HTML + CSS + a little vanilla JS. Open `index.html` directly, or upload the folder to any static host.

- `css/site.css` is compiled Tailwind. To edit styles: `npm install`, then `npm run build:css` (or `npm run watch:css`). Tailwind scans the .html and js/ files.
- Parent Voices quotes: search `voices.html` for "REPLACE".
- `js/site.js` holds the demo sign-in (localStorage + SHA-256) and feedback form. Replace the bodies of `api` with fetch() calls to a real backend before collecting real data.
