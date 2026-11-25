#!/usr/bin/env node
/* MP change watcher.
   Reads the City of Phoenix Fire policies page (every M.P. with its revision date),
   compares it with build/mp-index.json, and lists the cards, scenarios and checklists
   that cite each M.P. whose revision date, title or file changed.

   node tools/mp-watch.js              check against the live page (exit 1 if a cited M.P. changed)
   node tools/mp-watch.js --update     write the live page's list as the new baseline
   node tools/mp-watch.js --file page.html   use a saved copy of the page instead of fetching
   Writes the report to mp-watch-report.md when anything changed. */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const PAGE = 'https://www.phoenix.gov/administration/departments/fire/policies-procedures.html';
const BASE = path.join(ROOT, 'build', 'mp-index.json');
const arg = n => { const i = process.argv.indexOf(n); return i > 0 ? (process.argv[i + 1] || true) : null; };

function decode(s) {
  return s.replace(/\\"/g, '"').replace(/\\r\\n|\\n/g, '\n').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#34;/g, '"').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
}
/* Lines look like: <p>202.04, <a href="/content/dam/.../074714.pdf">Fire Control</a>, 12/22 - R</p> */
function parse(html) {
  const t = decode(decode(html));
  const out = {};
  const re = /<p>\s*(\d{3}\.\d{2}[A-Z]?\d?)\s*,\s*<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*,?\s*([^<]*)<\/p>/g;
  let m;
  while ((m = re.exec(t))) {
    const mp = m[1].trim();
    const title = m[3].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const rev = m[4].replace(/\s+/g, ' ').trim();
    if (!out[mp]) out[mp] = { title, rev, href: m[2].trim() };
  }
  return out;
}

/* Every M.P. the app cites, and where. */
function citations() {
  global.window = global;
  const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
  eval(read('data.js') + ';global.TOPICS=TOPICS;');
  eval(read('scenarios.js') + ';global.SCENARIOS=SCENARIOS;');
  eval(read('checklists.js') + ';global.CHECKLISTS=CHECKLISTS;');
  const cite = {};
  const add = (text, where) => {
    const re = /\b(?:M\.?\s?P\.?|MP)\s*(\d{3}\.\d{2}[A-Z]?)/g; let m;
    while ((m = re.exec(String(text || '')))) { (cite[m[1]] = cite[m[1]] || new Set()).add(where); }
  };
  TOPICS.forEach(t => t.cards.forEach(c => add([c.q, c.a, c.why, c.src].join(' '), `card ${c.id} (${t.title})`)));
  SCENARIOS.forEach(s => s.steps.forEach((st, i) => add([st.q, st.mp].join(' '), `scenario "${s.title}" beat ${i + 1}`)));
  CHECKLISTS.forEach(c => add([c.src, c.sub].join(' '), `checklist "${c.title}"`));
  return cite;
}

(async () => {
  let html;
  const file = arg('--file');
  if (file) html = fs.readFileSync(file, 'utf8');
  else {
    const res = await fetch(PAGE, { headers: { 'User-Agent': 'fire-study-hq-mp-watch' } });
    if (!res.ok) { console.error(`Could not fetch the policies page: HTTP ${res.status}`); process.exit(2); }
    html = await res.text();
  }
  const live = parse(html);
  const n = Object.keys(live).length;
  if (n < 50) { console.error(`Only found ${n} M.P.s on the page — its layout may have changed. Not comparing.`); process.exit(2); }

  if (process.argv.includes('--update')) {
    fs.writeFileSync(BASE, JSON.stringify({ source: PAGE, checked: new Date().toISOString().slice(0, 10), mps: live }, null, 1) + '\n');
    console.log(`Baseline written: ${n} M.P.s → build/mp-index.json`);
    return;
  }
  const base = JSON.parse(fs.readFileSync(BASE, 'utf8')).mps;
  const cite = citations();
  const changes = [];
  Object.keys(live).forEach(mp => {
    const a = base[mp], b = live[mp];
    if (!a) changes.push({ mp, kind: 'new', b });
    else if (a.rev !== b.rev || a.title !== b.title || a.href !== b.href) changes.push({ mp, kind: 'changed', a, b });
  });
  Object.keys(base).forEach(mp => { if (!live[mp]) changes.push({ mp, kind: 'removed', a: base[mp] }); });
  if (!changes.length) { console.log(`No M.P. changes (${n} checked).`); return; }

  const cited = changes.filter(c => cite[c.mp]);
  const lines = ['# Phoenix M.P. changes detected', '', `Checked ${new Date().toISOString().slice(0, 10)} against ${PAGE}.`, ''];
  lines.push(cited.length ? `**${cited.length} changed M.P.(s) are cited by the app — review these items before the next release.**` : 'None of the changed M.P.s are cited by the app.', '');
  changes.forEach(c => {
    const was = c.a ? `${c.a.title}, ${c.a.rev}` : '—';
    const now = c.b ? `${c.b.title}, ${c.b.rev}` : 'removed from the page';
    lines.push(`## M.P. ${c.mp} (${c.kind})`, `- Was: ${was}`, `- Now: ${now}`);
    if (c.b && c.b.href) lines.push(`- PDF: https://www.phoenix.gov${c.b.href.startsWith('/') ? '' : '/'}${c.b.href}`);
    const where = cite[c.mp] ? [...cite[c.mp]] : [];
    if (where.length) { lines.push(`- Cited in ${where.length} place(s):`); where.slice(0, 60).forEach(w => lines.push(`  - ${w}`)); if (where.length > 60) lines.push(`  - …and ${where.length - 60} more`); }
    lines.push('');
  });
  lines.push('After the content is reviewed, run `node tools/mp-watch.js --update` to accept the new revision dates.');
  const report = lines.join('\n');
  fs.writeFileSync(path.join(ROOT, 'mp-watch-report.md'), report);
  console.log(report);
  process.exit(cited.length ? 1 : 0);
})();
