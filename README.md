# Fire Study HQ

Phoenix FD study app (recruit to probie). Plain HTML/CSS/JS, no build step, hosted on GitHub Pages.

## Install it

- **iPhone:** open the site in Safari → Share → Add to Home Screen.
- **Android / desktop:** tap Install on the banner, or use the browser menu.

Once opened, it works with no signal. Daily reminder: Progress → App → Daily study reminder (adds a repeating calendar alert).

## How it's put together

- `manifest.webmanifest` + `icons/`: home-screen install.
- `sw.js`: saves every app file for offline use. New pushes show up the next time the app is opened.
- `pwa.js`: install banner and the App section in Progress.

Adding a new file the app needs offline (like a scenario image)? Add it to `PRECACHE` in `sw.js` and bump `VERSION`.

## Hosting (GitHub Pages)

Repo Settings → Pages → Source: **Deploy from a branch** → `master` / `(root)` → Save. Every push to `master` goes live in about a minute.
