# Fire Study HQ

Phoenix FD study app (recruit to probie). Plain HTML/CSS/JS with no build step.

## Installable app

- `manifest.webmanifest` + `icons/`: home-screen install on iPhone (Safari → Share → Add to Home Screen) and Android/desktop (Install prompt).
- `sw.js`: caches every app file so it opens with no signal. Cached files load instantly and refresh in the background, so a new deploy shows up on the next launch, and a "New version ready" toast appears when `sw.js` itself changes.
- `pwa.js`: install banner on Home, plus an **App** section in Progress with Install, Daily study reminder (adds a repeating calendar event with an alert), and Back up / Restore progress.

**When you add a new file the app needs offline** (e.g. a new scenario image), add it to `PRECACHE` in `sw.js` and bump `VERSION`.

## Hosting

Any static host over HTTPS works (service workers need HTTPS). Serve the repo root as-is. Locally: `python3 -m http.server` then open http://localhost:8000.
