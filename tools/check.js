#!/usr/bin/env node
/* Pre-deploy checks for Fire Study HQ. Run: node tools/check.js
   Exit code 1 = something would break for users if deployed.
   - every card has a unique, present id (progress is keyed by it)
   - every script/stylesheet index.html loads, and every scenario photo, is in sw.js PRECACHE
   - all JS files parse
   - if app files changed since the last commit (or vs. --base <ref>), sw.js VERSION changed too */
'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const errors = [];
const fail = m => errors.push(m);

// 1. Card ids
global.window = global;
try {
  eval(read('data.js') + ';global.TOPICS=TOPICS;global.SECTIONS=SECTIONS;');
  const seen = new Map();
  TOPICS.forEach((t, ti) => t.cards.forEach((c, ci) => {
    const where = `topic ${ti} "${t.title}" card ${ci}`;
    if (!c.id) fail(`${where}: missing id`);
    else if (seen.has(c.id)) fail(`${where}: duplicate id ${c.id} (also ${seen.get(c.id)})`);
    else seen.set(c.id, where);
    if (!Array.isArray(c.opts) || c.opts.length !== 4) fail(`${where}: needs exactly 4 options`);
  }));
  SECTIONS.forEach(s => s.topics.forEach(n => { if (!TOPICS[n]) fail(`section ${s.name}: topic index ${n} does not exist`); }));
} catch (e) { fail('data.js failed to load: ' + e.message); }

// 2. Every JS file parses
['app.js', 'pwa.js', 'checklists.js', 'checklists-ui.js', 'ecg.js', 'sw.js', 'scenarios.js', 'data.js'].forEach(f => {
  try { new Function(read(f)); } catch (e) { fail(`${f} does not parse: ${e.message}`); }
});

// 3. Precache covers what the page loads
const sw = read('sw.js');
const pre = (sw.match(/var PRECACHE = \[([\s\S]*?)\];/) || [])[1] || '';
const precached = new Set([...pre.matchAll(/'([^']+)'/g)].map(m => m[1]));
const html = read('index.html');
const scripts = [...html.matchAll(/<script (?:defer )?src="([^"]+)"/g)].map(m => m[1]);
const sheets = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(m => m[1]);
// scenarios.js is loaded by app.js after the first screen, so it must be precached too.
const loaded = ['scenarios.js', ...scripts, ...sheets].filter(u => !/^https?:/.test(u));
loaded.forEach(u => { if (!precached.has(u)) fail(`index.html loads ${u} but sw.js PRECACHE doesn't list it (it won't work offline)`); });
try {
  eval(read('scenarios.js') + ';global.SCENARIOS=SCENARIOS;');
  SCENARIOS.forEach(s => { if (!precached.has(s.image)) fail(`scenario "${s.title}" photo ${s.image} isn't in PRECACHE`); });
} catch (e) { fail('scenarios.js failed to load: ' + e.message); }
precached.forEach(u => { if (u !== './' && !fs.existsSync(path.join(ROOT, u))) fail(`PRECACHE lists ${u} but the file doesn't exist (install would fail)`); });

// 4. VERSION bumped when app files changed
const baseIdx = process.argv.indexOf('--base');
const base = baseIdx > 0 ? process.argv[baseIdx + 1] : 'HEAD';
try {
  const changed = execSync(`git -C "${ROOT}" diff --name-only ${base}`, { encoding: 'utf8' }).split('\n').filter(Boolean);
  const appChanged = changed.filter(f => precached.has(f) || f === 'index.html');
  if (appChanged.length) {
    const ver = s => (s.match(/var VERSION = '([^']+)'/) || [])[1];
    let old = null;
    try { old = ver(execSync(`git -C "${ROOT}" show ${base}:sw.js`, { encoding: 'utf8' })); } catch (e) { /* new file */ }
    if (old && old === ver(sw) && !process.env.FSHQ_VERSION_STAMPED) fail(`app files changed (${appChanged.join(', ')}) but sw.js VERSION is still '${old}' — installed apps would never update. Bump it.`);
  }
} catch (e) { /* not a git checkout: skip */ }

if (errors.length) { console.error('FAILED\n- ' + errors.join('\n- ')); process.exit(1); }
console.log('OK: card ids, precache, parsing and version all check out.');
