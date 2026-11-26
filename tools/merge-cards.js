#!/usr/bin/env node
/* Merge M.P. study cards from build/new-cards/*.json into data.js.
   - Each JSON file: { topics: [{ title, sub, concepts[], cards: [{ q, a, why, opts[4] (opts[0] correct), src }] }], notes[] }
   - Topics whose title already exists in TOPICS are replaced in place (same index, card ids kept by question text),
     new topics are appended, so saved progress (keyed by card id) is never shifted.
   - "Vol I:" topics go in the "PFD Volume I" section; "Vol II:" topics go in "Probation Year".
   node tools/merge-cards.js            merge and write data.js
   node tools/merge-cards.js --check    validate only */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data.js');
const DIR = path.join(ROOT, 'build', 'new-cards');
const checkOnly = process.argv.includes('--check');

const src = fs.readFileSync(DATA, 'utf8');
const lines = src.split('\n');
const ti = lines.findIndex(l => l.startsWith('var TOPICS = '));
const TOPICS = JSON.parse(lines[ti].slice('var TOPICS = '.length).replace(/;\s*$/, ''));

const ids = new Set();
TOPICS.forEach(t => t.cards.forEach(c => c.id && ids.add(c.id)));
function hashId(s) {
  let h1 = 0x811c9dc5, h2 = 0x1234567;
  for (let i = 0; i < s.length; i++) { h1 = Math.imul(h1 ^ s.charCodeAt(i), 16777619) >>> 0; h2 = Math.imul(h2 + s.charCodeAt(i), 2654435761) >>> 0; }
  return 'm' + (h1.toString(36) + h2.toString(36)).slice(0, 8);
}
const problems = [];
const MP = /^M\.P\. \d{3}\.\d{2}[A-Z]?\d?$/;
let added = 0, files = fs.readdirSync(DIR).filter(f => f.endsWith('.json')).sort();
const newTopics = [];
files.forEach(f => {
  let j;
  try { j = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')); } catch (e) { problems.push(`${f}: not valid JSON — ${e.message}`); return; }
  (j.topics || []).forEach(t => {
    if (!/^Vol (I|II): /.test(t.title || '')) problems.push(`${f}: topic title must start with "Vol I:" or "Vol II:" — ${t.title}`);
    (t.cards || []).forEach((c, k) => {
      const where = `${f} / ${t.title} / card ${k + 1}`;
      ['q', 'a', 'why', 'src'].forEach(x => { if (!c[x] || typeof c[x] !== 'string') problems.push(`${where}: missing ${x}`); });
      if (!Array.isArray(c.opts) || c.opts.length !== 4 || c.opts.some(o => typeof o !== 'string' || !o.trim())) problems.push(`${where}: needs 4 options`);
      else if (new Set(c.opts.map(o => o.trim().toLowerCase())).size !== 4) problems.push(`${where}: duplicate options`);
      if (c.src && !MP.test(c.src)) problems.push(`${where}: src "${c.src}" should be "M.P. 123.45"`);
    });
    newTopics.push({ file: f, t });
  });
});
if (problems.length) { console.error(problems.slice(0, 40).join('\n')); console.error(`${problems.length} problem(s).`); process.exit(1); }

let longest = 0, total = 0;
newTopics.forEach(({ t }) => t.cards.forEach(c => { total++; const L = c.opts.map(o => o.length); if (L[0] === Math.max(...L) && L.filter(x => x === L[0]).length === 1) longest++; }));
console.log(`${newTopics.length} topics, ${total} cards; correct answer is the longest option on ${Math.round(longest / total * 100)}%.`);
if (checkOnly) process.exit(0);

const v1 = [], v2 = [];
newTopics.forEach(({ t }) => {
  const existing = TOPICS.findIndex(x => x.title === t.title);
  const old = existing >= 0 ? TOPICS[existing] : null;
  const keep = {};
  if (old) old.cards.forEach(c => { keep[c.q] = c.id; ids.delete(c.id); });
  const topic = { n: 0, title: t.title, sub: t.sub || '', concepts: t.concepts || [], videos: [], cards: [], diagrams: [] };
  t.cards.forEach(c => {
    let id = keep[c.q] || hashId(c.q + '|' + c.src);
    while (ids.has(id)) id = hashId(id + 'x');
    ids.add(id);
    topic.cards.push({ q: c.q.trim(), a: c.a.trim(), why: c.why.trim(), opts: c.opts.map(o => o.trim()), src: c.src, mc: true, id });
    added++;
  });
  let idx = existing;
  if (old) TOPICS[existing] = topic; else { TOPICS.push(topic); idx = TOPICS.length - 1; }
  (/^Vol I: /.test(t.title) ? v1 : v2).push(idx);
});
lines[ti] = 'var TOPICS = ' + JSON.stringify(TOPICS) + ';';
let out = lines.join('\n');

// Sections: Vol II topics join "Probation Year"; Vol I topics get their own section.
const secStart = out.indexOf('var SECTIONS = [');
const secEnd = out.indexOf('];', secStart) + 2;
const SECTIONS = new Function('return ' + out.slice(secStart + 'var SECTIONS = '.length, secEnd - 1))();
const prob = SECTIONS.find(s => s.name === 'Probation Year');
v2.forEach(i => { if (prob.topics.indexOf(i) < 0) prob.topics.push(i); });
let vol1 = SECTIONS.find(s => s.name === 'PFD Volume I');
if (!vol1 && v1.length) { vol1 = { name: 'PFD Volume I', blurb: 'Volume I — personnel, leave, staffing, wellness, conduct and safety programs. Every M.P. in the book.', topics: [], soon: [] }; SECTIONS.push(vol1); }
v1.forEach(i => { if (vol1.topics.indexOf(i) < 0) vol1.topics.push(i); });
const secText = 'var SECTIONS = [\n' + SECTIONS.map(s => '  {name:' + JSON.stringify(s.name) + ', blurb:' + JSON.stringify(s.blurb) + ',\n   topics:' + JSON.stringify(s.topics) + ', soon:' + JSON.stringify(s.soon || []) + '}').join(',\n') + '\n];';
out = out.slice(0, secStart) + secText + out.slice(secEnd);
fs.writeFileSync(DATA, out);
console.log(`Merged ${added} cards: ${v1.length} Volume I topic(s), ${v2.length} Volume II topic(s). Sections: ${SECTIONS.map(s => s.name + ' ' + s.topics.length).join(', ')}`);
