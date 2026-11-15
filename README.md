# Kindergarten Ready. Vaccine Protected.
React 18 + Vite + Tailwind CSS 3 + React Router (hash routes, so it deploys on any static host).

    npm install
    npm run dev      # local preview
    npm run build    # static site in dist/

- Content lives in `src/data.js`. Replace the four Parent Voices placeholder quotes there.
- Auth is a browser-only demo (`src/auth.jsx`, localStorage + SHA-256). To go live, replace the bodies of `api.register/login/logout/me/submitFeedback` with fetch() calls; the UI does not change.
- The demo stores accounts in the visitor's own browser, so it is not real security. Do not collect real personal data until a backend is connected.
