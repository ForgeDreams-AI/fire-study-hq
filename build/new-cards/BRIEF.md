# Card-writing brief — Phoenix Fire M.P. coverage

Goal: every Phoenix Regional / PFD M.P. appears in the Fire Study HQ app's study cards, so a firefighter who studies the app works through all of Volume I and Volume II. The users are Phoenix recruits, probationary firefighters and firefighters on the line. Cards are multiple choice, shown on a phone, graded with spaced repetition.

## Source
Only the M.P. text in `build/mp-text/<number> <title>.txt` (extracted from the city's PDFs at phoenix.gov). Do not use outside knowledge for facts; if the MP doesn't say it, don't put it on a card. If a PDF's text is garbled or nearly empty, say so in your report instead of guessing.

## Output
Write ONE JSON file: `build/new-cards/<batch>.json`:
```json
{ "topics": [ { "title": "...", "sub": "...", "concepts": ["<b>202.12A</b>: ...", "..."],
    "cards": [ { "q": "...", "a": "...", "why": "...", "opts": ["CORRECT", "wrong", "wrong", "wrong"], "src": "M.P. 202.12A" } ] } ],
  "notes": ["anything odd: outdated MP, conflicting numbers, unreadable PDF"] }
```
- `opts[0]` is ALWAYS the correct answer (the app shuffles). `a` restates the correct answer as a full sentence or phrase.
- `src` is exactly `M.P. <number>` (one MP per card; the number as listed, e.g. `M.P. 205.20A`).
- `why` (1–3 sentences) explains from the MP and, where it helps, quotes a short phrase in double quotes. Start it with the MP number, e.g. `M.P. 110.02: ...`.
- `concepts`: 4–8 short bullets for the topic's summary screen, each starting with the bold MP number like `<b>103.05</b>:`. Plain HTML only (<b>), no other tags.
- Valid JSON (escape quotes inside strings). No ids (added later).

## How many cards
Every MP in your batch gets at least 2 cards. Substantial operational MPs get 4–8. Tiny or purely clerical MPs (an index, a template) get 1–2 about what the MP is for and who uses it. Aim for what a captain would actually quiz a probie on: numbers, time limits, who-notifies-whom, required steps and their order, definitions, safety rules, "what do you do when…".

## Card quality rules (these matter — the previous content review fixed all of these)
1. Question stands alone on a phone: name the MP topic or the situation ("Per M.P. 103.05, a shift trade…"). Prefer short scenarios ("You're on scene at…, what do you do?") for operational MPs.
2. All four options are believable mistakes of about the same length and form. The correct option must NOT be the longest more than ~1 in 4 times across your cards. No joke answers, no "all/none of the above", no "always/never" giveaways that only appear on wrong answers.
3. Wrong options are real misconceptions: wrong number nearby (e.g., 30 vs 45 days), wrong person/rank, wrong order, a rule from a different MP.
4. Exact numbers, times, ranks and terms as the MP states them. Plain English; keep each option under ~110 characters; question under ~220 characters.
5. Don't test trivia nobody needs (form numbers, page layout, revision dates) unless the MP's point is the form.
6. No two cards ask the same thing.

## Topics
Group your MPs into the topic title(s) your batch was given. Keep each topic between 10 and 60 cards; split into "(Part 1)/(Part 2)" if needed. `sub` = one sentence on what the topic covers.

## Report back (short)
File path, MPs covered with card count each, total cards, and the notes (unreadable/odd MPs). Do not edit any other file.
