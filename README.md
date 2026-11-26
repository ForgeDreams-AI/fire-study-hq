# Fire Study HQ

Study app for Phoenix Fire Department recruits, probationary firefighters and paramedic candidates. Plain HTML, CSS and JavaScript with no build step, hosted on GitHub Pages. It installs to the home screen and works offline after the first visit.

Live: https://forgedreams-ai.github.io/fire-study-hq/

## Install it

- **iPhone:** open the site in Safari, then Share → Add to Home Screen. Progress made in Safari doesn't carry into the home-screen app: back it up first (Progress → App → Back up progress) and restore it inside the app.
- **Android / desktop:** tap Install on the banner, or use the browser menu.

## What's in it

- **Study:** about 1,435 multiple-choice cards in four sections (Academy, Probation, Medical, Paramedic), with spaced repetition: a card comes back after 1, 3, 7, 14, 30, 60 and 120 days, and a miss starts it over.
- **Today card:** what's due plus the next topic on the recruit's stage (Academy, Probation, Paramedic prep).
- **Scenarios:** 17 picture-based fireground scenarios. Each call is checked against the Phoenix M.P.s.
- **Exams:** a timed paramedic candidate simulation (150 questions, 3 hours, 70%), plus academy, probation and EMT exams. An exam in progress is saved after every answer and can be resumed.
- **Skills & checklists:** skill sheets, station routines and probation sign-offs, with a step-order quiz and officer sign-off.
- **Games:** Flashcards, Blitz, Weak Spots, Run the Call, Math (drug calculations and scores), ECG rhythms.
- **Progress:** backup and restore, a text summary for a captain, a daily calendar reminder.

## Files

| File | What it holds |
|---|---|
| `index.html` | The page shell. Loads the scripts below with `defer`, plus a Content Security Policy. |
| `app.js` | The app: storage and spaced repetition, routing, every screen, exams, math, scenarios engine. |
| `data.js` | All study cards (`TOPICS`), sections, diagrams and Run the Call cases (`MED_SCENARIOS`). |
| `scenarios.js` | The 17 picture scenarios. Loaded by `app.js` after the first screen shows. |
| `checklists.js`, `checklists-ui.js` | Skill sheets and probation checklists, and their screens. |
| `ecg.js` | ECG rhythm trainer (strips drawn from a beat model). |
| `pwa.js` | Install, reminder, backup/restore, captain summary, service-worker registration and the update prompt. |
| `sw.js` | Service worker: caches each version as one complete set for offline use. |
| `styles.css`, `fonts/` | Styles and self-hosted fonts (open license). |
| `paramedic-exam-prep.html` | Standalone paramedic candidate study guide with its own question bank. |
| `build/` | Source texts the content was written from (Phoenix SOPs and M.P.s, the 2026 recruit study packet). Not loaded by the app. |
| `CONTENT-CHANGES.md` | Every factual content change, for instructor review, plus open questions for PFD. |
| `tools/check.js` | Pre-deploy checks (also run by GitHub Actions on every push). |
| `assets/scenarios/inside/` | CC0 interior photos with smoke and fire added (see CREDITS.md; rebuild with `tools/bake-inside.js`). |
| `scenes.js` | Drawn interior views for scenarios (door, hallway, fire room, bedroom, stairs) — SVG, no image files. |
| `tools/mp-coverage.js`, `tools/merge-cards.js`, `tools/verify-quotes.js` | M.P. coverage report; merge card batches from `build/new-cards/` into data.js; check every quoted phrase against its M.P. text. |
| `tools/mp-watch.js`, `build/mp-index.json` | Weekly M.P. watcher: compares Phoenix's policies page with the saved revision dates and lists the cards that cite any revised M.P. |

## Editing content

Cards live in `data.js` as one JSON array, `TOPICS`. Each card is `{ id, q, a, why, opts: [correct, wrong, wrong, wrong], src? }`. The app shuffles options; `opts[0]` is always the correct one.

- **Never change or reuse a card's `id`.** Progress is saved by id. A new card needs a new unique id.
- Keep the four options about the same length, so the right answer isn't the longest.
- Cite the source (an M.P. number or document) in `src` when a card comes from a PFD document, and log factual changes in `CONTENT-CHANGES.md`.

## Before every push

1. Run `node tools/check.js`. It fails if a card id is missing or duplicated, a file isn't in the offline cache, a JS file doesn't parse, or app files changed without a version bump.
2. If you changed any app file, bump `VERSION` in `sw.js` (for example `fshq-v8` → `fshq-v9`). Installed apps only update when it changes; users then see "New version ready — Reload".
3. A new file the app loads (a script, a scenario photo) goes in `PRECACHE` in `sw.js`.

Every push to `master` goes live on GitHub Pages within about a minute.

## When an M.P. is revised

The **MP watch** job runs every Monday (Actions tab → MP watch, or run it by hand). A red X means an M.P. the app cites has a new revision date; the run summary lists every card, scenario beat and checklist that cites it. Read the new PDF, fix those items, then run `node tools/mp-watch.js --update` and commit the new `build/mp-index.json`.

## Storage

Progress is stored in the browser (`localStorage`) on each device, with no account or server. Key data:

- `fireStudyHQ.v1`: progress, stage, exam history, checklists, scenario bests.
- `fshq_exam_v1`: an exam in progress.
- `pep.*`: the paramedic prep page's own progress.

If two tabs are open, progress merges per card (the most recent review wins). If storage is full or blocked, the app shows a banner. Unreadable saved data is set aside as `fireStudyHQ.v1.corrupt-<time>` instead of being overwritten.
