#!/usr/bin/env node
/* Every phrase a card puts in "double quotes" in its `why` must appear in that card's M.P. text
   (build/mp-text, build/sop-vol2, build/fire-mps, build/academy). Quotes split by "..." are checked piece by piece.
   node tools/verify-quotes.js [files...]   (default: build/new-cards/*.json) */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const texts = {};
['build/mp-text', 'build/sop-vol2', 'build/fire-mps', 'build/academy'].forEach(d => {
  const dir = path.join(ROOT, d);
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const m = f.match(/^(?:MP )?(\d{3}\.\d{2}[A-Z]?)/);
    if (m) texts[m[1]] = (texts[m[1]] || '') + ' ' + fs.readFileSync(path.join(dir, f), 'utf8');
  });
});
const norm = s => s.toLowerCase()
  .replace(/[‘’ʼ`]/g, "'").replace(/[“”]/g, '"').replace(/[–—‐‑]/g, '-')
  .replace(/…/g, '...').replace(/-\s*\n\s*/g, '-').replace(/['"]/g, '').replace(/[^a-z0-9%$.,/&()-]+/g, ' ').replace(/\s+/g, ' ').trim();
const N = {};
Object.keys(texts).forEach(k => { N[k] = norm(texts[k]); });
const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
const files = args.length ? args : fs.readdirSync(path.join(ROOT, 'build/new-cards')).filter(f => f.endsWith('.json')).map(f => path.join(ROOT, 'build/new-cards', f));
let checked = 0;
const bad = [];
files.forEach(f => {
  JSON.parse(fs.readFileSync(f, 'utf8')).topics.forEach(t => t.cards.forEach(c => {
    const mp = c.src.replace('M.P. ', '');
    const src = N[mp];
    const parts = c.why.split('"'); const quotes = parts.filter((_, i) => i % 2 === 1).map(x => '"' + x + '"').filter(x => x.length >= 14);
    quotes.forEach(x => {
      checked++;
      const pieces = norm(x.slice(1, -1)).split(/\s*\.\.\.\s*/).map(s => s.replace(/[.,]+$/, '').replace(/^[.,]+/, '').trim()).filter(s => s.length > 3);
      const missing = !src ? ['(no text for ' + mp + ')'] : pieces.filter(p => !src.includes(p));
      if (missing.length) bad.push({ file: path.basename(f), src: c.src, q: c.q, quote: x, missing });
    });
  }));
});
console.log(`quotes checked: ${checked}, not found word-for-word: ${bad.length}`);
if (process.argv.includes('--json')) fs.writeFileSync(path.join(ROOT, 'build/quote-misses.json'), JSON.stringify(bad, null, 1));
bad.slice(0, 60).forEach(b => console.log(`  ${b.file} | ${b.src} | ${b.quote.slice(0, 110)}  -> missing: ${b.missing[0].slice(0, 60)}`));
