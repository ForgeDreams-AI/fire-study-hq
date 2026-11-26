#!/usr/bin/env node
/* Which Phoenix M.P.s (from build/mp-index.json, the city's policies page) appear somewhere in
   the app's cards, scenarios or checklists? Prints coverage by volume and lists the gaps.
   node tools/mp-coverage.js [--fail]   (--fail exits 1 if anything is missing) */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
global.window = global;
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
eval(read('data.js') + ';global.TOPICS=TOPICS;');
eval(read('scenarios.js') + ';global.SCENARIOS=SCENARIOS;');
eval(read('checklists.js') + ';global.CHECKLISTS=CHECKLISTS;');
const all = JSON.stringify(TOPICS) + JSON.stringify(SCENARIOS.map(s => s.steps)) + JSON.stringify(CHECKLISTS);
const idx = JSON.parse(read('build/mp-index.json')).mps;
const hit = k => new RegExp('(^|[^0-9.])' + k.replace('.', '\\.') + '(?![0-9A-Z])').test(all);
// MPs the city lists without usable text (nothing to teach from yet)
const NO_TEXT = { '202.12D': 'PDF has no text (listed "Out For Review")' };
const keys = Object.keys(idx).sort();
const vol = k => (+k.slice(0, 3) < 200 ? 'Volume I' : 'Volume II');
const out = { 'Volume I': [0, 0], 'Volume II': [0, 0] }, gaps = [];
keys.forEach(k => { const v = out[vol(k)]; v[1]++; if (hit(k)) v[0]++; else if (!NO_TEXT[k]) gaps.push(k); });
Object.keys(out).forEach(v => console.log(`${v}: ${out[v][0]} of ${out[v][1]} M.P.s covered`));
Object.keys(NO_TEXT).forEach(k => console.log(`  (${k} ${idx[k] ? idx[k].title : ''}: ${NO_TEXT[k]})`));
if (gaps.length) { console.log(`Missing (${gaps.length}):`); gaps.forEach(k => console.log(`  ${k} ${idx[k].title}`)); }
if (process.argv.includes('--fail') && gaps.length) process.exit(1);
