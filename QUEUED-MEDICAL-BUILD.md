# Queued: Medical section build (user-approved 2026-10-07)

Start AFTER the UL video/lesson-plan agent (4d5893c3) completes — it edits data.js/app.js.

## Scope
1. **Medical curriculum** — vitals (how to take each, normal ranges, what abnormal means), patient assessment (scene size-up, primary ABCs, secondary SAMPLE/OPQRST), symptom patterns, BLS-level treatment/response. Integrate the existing Medical Spanish section.
2. **"Run the call" scenario game** (user request 2026-10-07): a game where the player gets a dispatch + patient vitals and must determine what's happening / what's going to happen. Present vitals as the clues (BP, pulse, respirations, SpO2, temp, glucose, pain, mental status, skin signs). Player picks the likely problem from options or types the call; score + streaks; blunt feedback explaining the why. Wire into Progress tab.
3. Fold in any PFD Medical Direction protocols found by the browser investigation (medication administration rules) — check conversation for the handoff before building.

Style: blunt firefighter-direct, no fluff, no emoji. Drills style consistent with existing cards.
