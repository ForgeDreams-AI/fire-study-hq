/* ============================================================
   Fire Study HQ — app logic (vanilla JS, no build step)
   Tabs: Study / Games / Videos / Progress
   Progress semantics match the original build exactly:
   "Got it" -> got++, "Missed it" -> got=0, missed++.
   Mastered = got>=2. Legacy progress migrates from fireStudy.v1.
   ============================================================ */
'use strict';

/* ---------------- inline SVG icons (no emoji anywhere) ---------------- */
var P = {
  flame: '<path fill="currentColor" stroke="none" d="M12 2c1 4-3 5-3 9a5 5 0 0 0 10 .5C20.5 8 16 6 14 2c-3 2-5 5-5 8-1-1-1.5-2.5-1.5-4C5.7 7.6 5 10 5 12a7 7 0 0 0 14 0c0-4.5-4-7.5-7-10z"/>',
  book: '<path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/>',
  gamepad: '<rect x="2" y="7" width="20" height="11" rx="5.5"/><path d="M7.5 10.8v4.4M5.3 13h4.4"/><circle cx="15.8" cy="11.8" r="1" fill="currentColor" stroke="none"/><circle cx="18.2" cy="14.2" r="1" fill="currentColor" stroke="none"/>',
  playcircle: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5l6 3.5-6 3.5z" fill="currentColor" stroke="none"/>',
  chart: '<path d="M5 20v-6M11 20V6M17 20v-9"/><path d="M3 20h18"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  chevL: '<path d="M14.5 6L8.5 12l6 6"/>',
  check: '<path d="M4.5 12.5l5 5 10-11"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  timer: '<circle cx="12" cy="13.5" r="7.5"/><path d="M12 10v3.5l2.5 2M9.5 2.5h5"/>',
  play: '<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  download: '<path d="M12 4v11M7 10.5l5 5 5-5"/><path d="M4.5 19.5h15"/>',
  upload: '<path d="M12 15.5v-11M7 9l5-5 5 5"/><path d="M4.5 19.5h15"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  zap: '<path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12z"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.3-5.6M20 3v4h-4"/>',
  cross: '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M12 8v8M8 12h8"/>',
  house: '<path d="M4 11l8-7 8 7"/><path d="M6 9.5V20h12V9.5"/>',
  ext: '<path d="M14 4h6v6M20 4L11 13"/><path d="M19 13.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5.5"/>'
};
function icon(n, s) {
  s = s || 24;
  return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + P[n] + '</svg>';
}

/* ---------------- storage + legacy migration ---------------- */
var HQ_KEY = 'fireStudyHQ.v1';
var SR_DAYS = [0, 1, 3, 7, 14, 30, 60, 120];
/* Where the recruit is in the journey. Drives Home order and what "Next up" picks.
   path = hub indexes in study order (HUBS below: 0 Academy, 1 Probation, 2 Medical, 3 Paramedic). */
var STAGES = {
  academy: { label: 'Academy', sub: 'Recruit academy: fire, EMT, PFD culture', path: [0, 2, 1, 3] },
  probation: { label: 'Probation', sub: 'First year on the line: MPs, radio, rotations', path: [1, 0, 2, 3] },
  medic: { label: 'Paramedic prep', sub: 'Candidate exam: EMT-level competencies, A&P, math', path: [3, 2, 0, 1] }
};
var LEGACY_KEY = 'fireStudy.v1';

function cleanProg(p) {
  var c = {}, k;
  function num(v) { v = parseInt(v, 10); return isNaN(v) ? 0 : Math.max(0, v); }
  for (k in p) {
    if (/^[A-Za-z0-9_-]{1,40}$/.test(k)) {
      var r = p[k] || {};
      var o = { got: num(r.got), missed: num(r.missed), box: num(r.box), due: num(r.due), last: num(r.last) };
      // Records saved before spaced repetition have no box: bring them in as
      // early boxes that are due now, so "mastered" cards get re-checked.
      if (r.box === undefined) { o.box = o.got >= 2 ? 2 : (o.got >= 1 ? 1 : 0); o.due = o.box ? Date.now() : 0; }
      o.box = Math.min(o.box, SR_DAYS.length - 1);
      c[k] = o;
    }
  }
  return c;
}
function defaultGames() { return { blitz: { best: 0, plays: 0 }, flash: { sessions: 0 }, weak: { sessions: 0 }, call: { best: 0, plays: 0 }, exam: { best: 0, plays: 0 }, calc: { best: 0, plays: 0 }, scen: { plays: 0 } }; }
function normGames(g) {
  var d = defaultGames();
  if (g && typeof g === 'object') {
    ['blitz', 'flash', 'weak', 'call', 'exam', 'calc', 'scen'].forEach(function (k) {
      if (g[k] && typeof g[k] === 'object') {
        Object.keys(d[k]).forEach(function (f) {
          var v = parseInt(g[k][f], 10);
          d[k][f] = isNaN(v) ? 0 : Math.max(0, v);
        });
      }
    });
  }
  return d;
}
function loadStore() {
  var s = { prog: {}, games: defaultGames(), days: {}, migrated: false };
  try {
    var raw = localStorage.getItem(HQ_KEY);
    if (raw) {
      var p = JSON.parse(raw);
      if (p && typeof p === 'object' && !Array.isArray(p)) {
        if (p.prog && typeof p.prog === 'object') s.prog = cleanProg(p.prog);
        s.games = normGames(p.games);
        if (p.days && typeof p.days === 'object') {
          Object.keys(p.days).forEach(function (k) {
            if (/^\d{4}-\d{2}-\d{2}$/.test(k)) { var v = parseInt(p.days[k], 10); s.days[k] = isNaN(v) ? 0 : Math.max(0, v); }
          });
        }
        s.migrated = !!p.migrated;
        if (STAGES[p.stage]) { s.stage = p.stage; s.stageSince = parseInt(p.stageSince, 10) || Date.now(); }
        if (p.exams && Array.isArray(p.exams)) s.exams = p.exams.slice(-50);
        if (p.checks && typeof p.checks === 'object') s.checks = p.checks;
      }
    }
  } catch (e) { /* start clean */ }
  if (!s.migrated) {
    try {
      var leg = localStorage.getItem(LEGACY_KEY);
      if (leg) { var lp = JSON.parse(leg); var c = cleanProg(lp || {}); for (var k in c) s.prog[k] = c[k]; }
    } catch (e) { /* legacy unreadable — nothing to migrate */ }
    s.migrated = true;
    saveStore(s);
  }
  return s;
}
function saveStore(s) {
  try { localStorage.setItem(HQ_KEY, JSON.stringify(s || store)); } catch (e) { /* quota/private mode */ }
}
var store = loadStore();

function dateKey(d) {
  return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
}
function touchDay() {
  var k = dateKey(new Date());
  store.days[k] = (store.days[k] || 0) + 1;
}
function dayStreak() {
  var d = new Date(), k = dateKey(d), s = 0;
  if (!store.days[k]) { d.setDate(d.getDate() - 1); k = dateKey(d); if (!store.days[k]) return 0; }
  while (store.days[k]) { s++; d.setDate(d.getDate() - 1); k = dateKey(d); }
  return s;
}

/* ---------------- progress: spaced repetition (Leitner boxes) ----------------
   box 0 = new or just missed. Each correct answer on a card that is DUE moves it
   up one box; the next review comes SR_DAYS[box] days later. A miss sends it to 0.
   Correct answers on cards that aren't due yet (cramming, Blitz reshuffles, a
   retry right after a miss) count as reps but don't move the card up.
   "Solid" (isMastered) = box 3+ and not yet due again: right three times across
   at least four days. "Retained" = box 4+: it survived a two-week gap. */
var DAY_MS = 864e5;
function cardKey(t, i) { var c = TOPICS[t].cards[i]; return (c && c.id) || ('t' + t + '-' + i); }
function rec(t, i) {
  var k = cardKey(t, i), r = store.prog[k];
  if (!r) r = store.prog[k] = { got: 0, missed: 0, box: 0, due: 0, last: 0 };
  return r;
}
function isDue(t, i) { var r = rec(t, i); return r.box > 0 && r.due <= Date.now(); }
function isMastered(t, i) { var r = rec(t, i); return r.box >= 3 && r.due > Date.now(); }
function isRetained(t, i) { return rec(t, i).box >= 4; }
function isNeedsWork(t, i) { var r = rec(t, i); return r.missed > 0 && r.box < 2; }
/* Drill queue for a set of topic indexes: due reviews first, then misses, then
   new / still-learning cards. Capped so a session ends; solid cards rest. */
var DRILL_CAP = 20;
function drillQueue(topics, cap) {
  var due = [], weak = [], fresh = [], t, i;
  topics.forEach(function (n) {
    for (i = 0; i < TOPICS[n].cards.length; i++) {
      var it = { t: n, i: i };
      if (isDue(n, i)) due.push(it);
      else if (isNeedsWork(n, i)) weak.push(it);
      else if (!isMastered(n, i)) fresh.push(it);
    }
  });
  var q = shuffle(due).concat(shuffle(weak), shuffle(fresh));
  if (!q.length) { // everything is solid: offer a mixed refresher instead of nothing
    topics.forEach(function (n) { for (i = 0; i < TOPICS[n].cards.length; i++) q.push({ t: n, i: i }); });
    q = shuffle(q);
  }
  return q.slice(0, cap || DRILL_CAP);
}
function hubTopicIdx(h) {
  var out = [];
  HUBS[h].sections.forEach(function (si) { SECTIONS[si].topics.forEach(function (n) { out.push(n); }); });
  return out;
}
function dueCount() {
  var c = 0, t, i;
  for (t = 0; t < TOPICS.length; t++) for (i = 0; i < TOPICS[t].cards.length; i++) if (isDue(t, i)) c++;
  return c;
}
function topicStats(n) {
  var m = 0, w = 0, nd = 0, i;
  for (i = 0; i < TOPICS[n].cards.length; i++) { if (isMastered(n, i)) m++; else if (isNeedsWork(n, i)) w++; else nd++; }
  return { mastered: m, needsWork: w, fresh: nd };
}
function moduleStats() {
  var m = 0, w = 0, nd = 0, n;
  for (n = 0; n < TOPICS.length; n++) { var s = topicStats(n); m += s.mastered; w += s.needsWork; nd += s.fresh; }
  return { mastered: m, needsWork: w, fresh: nd };
}
/* Everything waiting: cards due for spaced review plus recent misses. */
function reviewItems() {
  var out = [], t, i;
  for (t = 0; t < TOPICS.length; t++) for (i = 0; i < TOPICS[t].cards.length; i++)
    if (isDue(t, i) || isNeedsWork(t, i)) out.push({ t: t, i: i, r: rec(t, i) });
  out.sort(function (a, b) { return (a.r.due || 0) - (b.r.due || 0); });
  return out;
}
/* grade a card. opts.noAdvance: count the rep but never move the card up a box
   (used for a retry right after a miss, and for Blitz). Returns newly-solid flag. */
function gradeCard(t, i, ok, opts) {
  var r = rec(t, i), now = Date.now();
  var was = isMastered(t, i);
  if (ok) {
    r.got++;
    var eligible = r.box === 0 || r.due <= now;
    if (eligible && !(opts && opts.noAdvance)) {
      r.box = Math.min(r.box + 1, SR_DAYS.length - 1);
      // due a little before the same time of day, so "tomorrow" means tomorrow
      r.due = now + SR_DAYS[r.box] * DAY_MS - 4 * 36e5;
    }
  } else {
    r.got = 0; r.missed++; r.box = 0; r.due = 0;
  }
  r.last = now;
  touchDay();
  saveStore();
  return !was && isMastered(t, i);
}
function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var s = a[i]; a[i] = a[j]; a[j] = s; } return a; }
function ringSVG(frac, label) {
  var C = 2 * Math.PI * 22, off = C * (1 - frac);
  return '<svg width="58" height="58" viewBox="0 0 56 56" aria-hidden="true">'
    + '<circle cx="28" cy="28" r="22" fill="none" stroke="var(--th-surface-2)" stroke-width="6"/>'
    + '<circle cx="28" cy="28" r="22" fill="none" stroke="' + (frac >= 1 ? 'var(--th-success)' : 'var(--th-primary)') + '" stroke-width="6" stroke-linecap="round" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '"/>'
    + '</svg><span class="val tabular">' + label + '</span>';
}
function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

/* ---------------- router ---------------- */
var TABS = [
  { id: 'home', label: 'Home', icon: 'house' },
  { id: 'study', label: 'Study', icon: 'book' },
  { id: 'games', label: 'Games', icon: 'gamepad' },
  { id: 'scenarios', label: 'Scenarios', icon: 'target' },
  { id: 'progress', label: 'Progress', icon: 'chart' }
];
/* NFPA 1700 and UL FSRI live inside Study now; their pages still use these tab ids. */
var SUBTAB_PARENT = { nfpa1700: 'study', ulfsri: 'study' };
/* Hubs: drill-down groups over SECTIONS (data.js untouched). Fire merges Academy + Probation Year. */
var HUBS = [
  { title: 'Academy', sub: 'Fire foundations & PFD culture', icon: 'flame', sections: [0] },
  { title: 'Probation', sub: 'MPs, radio, rotations', icon: 'layers', sections: [1] },
  { title: 'Medical', sub: 'EMT patient care', icon: 'cross', sections: [2] },
  { title: 'Paramedic', sub: 'Candidate exam', icon: 'book', sections: [3] }
];
var PARAMEDIC_HUB = 3;
/* Display numbers follow reading order: Fire 1..n, then Medical, then Paramedic.
   tp.n is display-only; progress and scopes use the TOPICS array index. */
var TOPIC_COUNT = 0;
HUBS.forEach(function (hub) {
  hub.sections.forEach(function (si) {
    SECTIONS[si].topics.forEach(function (n) { TOPICS[n].n = ++TOPIC_COUNT; });
  });
});
var state = { tab: 'home', study: { view: 'home', hub: -1, topic: -1 }, sess: null };

function stopSessionTimer() {
  if (state.sess && state.sess.timerId) { clearInterval(state.sess.timerId); state.sess.timerId = null; }
}
function activeWork() {
  if (state.sess && !state.sess.done && (state.sess.got + state.sess.miss) > 0) return 'this drill (graded cards are already saved)';
  if (state.scenRun && state.scenRun.log && state.scenRun.log.length) return 'this scenario run';
  if (state.callRun && state.callRun.pos > 0) return 'this Run the Call round';
  if (state.checkRun && state.checkRun.next > 0) return 'this step-order quiz';
  return null;
}
function go(tab) {
  if (tab !== state.tab || state.sess || state.scenRun || state.callRun || state.checkRun) {
    var w = activeWork();
    if (w && !confirm('Leave ' + w + '?')) return;
  }
  stopSessionTimer();
  state.tab = tab;
  state.checkRun = null;
  if (tab === 'study' && state.study.view === 'session') { /* session handles its own exit */ }
  state.sess = null;
  state.callRun = null;
  state.scenRun = null;
  render();
  window.scrollTo(0, 0);
}
function renderTabbar() {
  var bar = document.getElementById('tabbar');
  bar.innerHTML = '';
  TABS.forEach(function (t) {
    var cur = SUBTAB_PARENT[state.tab] || state.tab;
    var b = el('button', 'tab press' + (cur === t.id ? ' active' : ''));
    b.type = 'button';
    b.setAttribute('aria-label', t.label);
    b.setAttribute('aria-current', cur === t.id ? 'page' : 'false');
    b.innerHTML = icon(t.icon, 25) + '<span>' + t.label + '</span><span class="dot"></span>';
    b.addEventListener('click', function () { go(t.id); });
    bar.appendChild(b);
  });
}
function renderStreak() {
  var s = dayStreak();
  document.getElementById('streak-chip').innerHTML = icon('flame', 18)
    + '<span class="tabular">' + s + '</span><span>' + (s === 1 ? 'day' : 'days') + '</span>';
}
function render() {
  renderTabbar();
  renderStreak();
  var root = document.getElementById('view-root');
  root.innerHTML = '';
  var focused = !!state.sess || !!state.examRun || !!state.calcRun || !!state.checkRun || !!state.callRun || !!state.scenRun;
  document.body.classList.toggle('in-session', focused);
  if (state.tab === 'home') renderHome(root);
  else if (state.tab === 'study') renderStudy(root);
  else if (state.tab === 'games') renderGames(root);
  else if (state.tab === 'scenarios') renderScenarios(root);
  else if (state.tab === 'nfpa1700') renderNFPA1700(root);
  else if (state.tab === 'ulfsri') renderULFSRI(root);
  else renderProgress(root);
  // Put screen-reader focus at the top of the new view without scrolling.
  var h2 = root.querySelector('h2');
  if (h2) { h2.setAttribute('tabindex', '-1'); try { h2.focus({ preventScroll: true }); } catch (e) {} }
}

/* ============================================================
   HUB HELPERS — drill-down grouping over SECTIONS
   ============================================================ */
function hubStats(h) {
  var cards = 0, mastered = 0, needsWork = 0;
  HUBS[h].sections.forEach(function (si) {
    SECTIONS[si].topics.forEach(function (n) {
      var st = topicStats(n);
      cards += TOPICS[n].cards.length;
      mastered += st.mastered;
      needsWork += st.needsWork;
    });
  });
  return { cards: cards, mastered: mastered, needsWork: needsWork };
}
function hubVideos(h) {
  var vs = [];
  HUBS[h].sections.forEach(function (si) {
    SECTIONS[si].topics.forEach(function (n) {
      (TOPICS[n].videos || []).forEach(function (v) { vs.push({ v: v, n: TOPICS[n].n, title: TOPICS[n].title }); });
    });
  });
  return vs;
}
function hubQueue(h) { return drillQueue(hubTopicIdx(h)); }
function hubMistakes(h) {
  var q = [];
  HUBS[h].sections.forEach(function (si) {
    SECTIONS[si].topics.forEach(function (n) {
      for (var i = 0; i < TOPICS[n].cards.length; i++) if (isNeedsWork(n, i)) q.push({ t: n, i: i });
    });
  });
  return shuffle(q);
}
function hubTile(h, onTap) {
  var st = hubStats(h), hub = HUBS[h];
  var pct = st.cards ? Math.round(st.mastered / st.cards * 100) : 0;
  var b = el('button', 'hub-tile press'); b.type = 'button';
  b.setAttribute('aria-label', hub.title + ': ' + st.mastered + ' of ' + st.cards + ' drills mastered');
  b.innerHTML = '<span class="hub-ico">' + icon(hub.icon, 30) + '</span>'
    + '<span class="hub-t"><b>' + hub.title + '</b><small>' + hub.sub + '</small></span>'
    + '<span class="hub-meta tabular">' + st.cards + ' drills</span>'
    + '<span class="hub-bar"><i style="width:' + pct + '%"></i></span>'
    + '<span class="hub-pct tabular">' + pct + '%</span>';
  b.addEventListener('click', onTap);
  return b;
}
function goHub(h) {
  stopSessionTimer();
  state.sess = null;
  state.tab = 'study';
  state.study = { view: 'hub', hub: h, topic: -1 };
  render();
  window.scrollTo(0, 0);
}

/* ============================================================
   HOME TAB — dashboard
   ============================================================ */
function streakBanner() {
  var streak = dayStreak();
  var sc = el('div', 'card streak-banner');
  sc.innerHTML = '<span class="sb-ico">' + icon('flame', 32) + '</span>'
    + '<span class="sb-t"><b class="tabular">' + streak + '-day streak</b>'
    + '<small>' + (streak ? 'One graded card a day keeps it alive.' : 'Grade one card today and the streak starts.') + '</small></span>';
  return sc;
}
function reviewCta() {
  var q = reviewItems();
  var rc = el('button', 'review-cta press'); rc.type = 'button';
  rc.setAttribute('aria-label', q.length ? 'Review queue: ' + q.length + ' cards waiting' : 'Review queue is clear');
  rc.innerHTML = '<span class="pill tabular">' + q.length + '</span><span><h3>Review queue</h3><p>'
    + (q.length ? q.length + ' card' + (q.length === 1 ? '' : 's') + ' waiting &mdash; get each one right twice in a row to clear it.'
      : 'Mark a card &ldquo;Missed it&rdquo; and it lands here for extra reps.') + '</p></span>';
  rc.disabled = !q.length;
  if (q.length) rc.addEventListener('click', function () { startSession('weak', shuffle(q.map(function (it) { return { t: it.t, i: it.i }; })), 'Review queue', { scopeRef: { type: 'weak' } }); });
  return rc;
}
function continueCard() {
  // topic with the most needs-work; else first topic with unmastered cards
  var best = -1, bestNW = 0, n, i, st;
  for (n = 0; n < TOPICS.length; n++) {
    st = topicStats(n);
    if (st.needsWork > bestNW) { bestNW = st.needsWork; best = n; }
  }
  if (best < 0) {
    for (n = 0; n < TOPICS.length; n++) {
      st = topicStats(n);
      if (st.mastered < TOPICS[n].cards.length) { best = n; break; }
    }
  }
  if (best < 0) return null;
  var tp = TOPICS[best];
  var card = el('button', 'continue-card press'); card.type = 'button';
  card.setAttribute('aria-label', 'Continue drilling: ' + tp.title);
  card.innerHTML = '<span class="cc-ico">' + icon('zap', 28) + '</span>'
    + '<span class="cc-t"><small>Continue</small><b>' + tp.title + '</b>'
    + '<span class="cc-sub tabular">' + (bestNW ? bestNW + ' need work' : (TOPICS[best].cards.length - topicStats(best).mastered) + ' left to master') + '</span></span>'
    + '<span class="cc-go">' + icon('chevL', 22) + '</span>';
  // flip chevron to point right via CSS
  card.addEventListener('click', function () {
    var queue = [];
    for (i = 0; i < tp.cards.length; i++) if (isNeedsWork(best, i)) queue.push({ t: best, i: i });
    var mode = 'weak', label = tp.title + ' \u00b7 mistakes';
    if (!queue.length) {
      for (i = 0; i < tp.cards.length; i++) if (!isMastered(best, i)) queue.push({ t: best, i: i });
      mode = 'drill'; label = 'Topic ' + tp.n + ' \u00b7 ' + tp.title;
    }
    startSession(mode, shuffle(queue), label, { scopeRef: { type: 'topic', n: best } });
  });
  return card;
}
/* ---------- stage + today ---------- */
function stagePath() { return store.stage ? STAGES[store.stage].path : [0, 1, 2, 3]; }
function setStage(k) { store.stage = k; store.stageSince = Date.now(); saveStore(); render(); window.scrollTo(0, 0); }
function stagePicker() {
  var c = el('div', 'card stage-picker animate-fade-in');
  c.innerHTML = '<h3>Where are you right now?</h3><p>Pick one. It sets what Home puts in front of you. Change it any time in Progress.</p>';
  Object.keys(STAGES).forEach(function (k) {
    var b = el('button', 'opt-row press'); b.type = 'button';
    b.innerHTML = '<span><span></span><small></small></span>';
    b.querySelector('span > span').textContent = STAGES[k].label;
    b.querySelector('small').textContent = STAGES[k].sub;
    b.addEventListener('click', function () { setStage(k); });
    c.appendChild(b);
  });
  return c;
}
/* Next topic on this stage's path that still has new or learning cards. */
function nextTopic() {
  var path = stagePath(), h, k, n, st;
  for (h = 0; h < path.length; h++) {
    var tops = hubTopicIdx(path[h]);
    for (k = 0; k < tops.length; k++) {
      n = tops[k]; st = topicStats(n);
      if (st.fresh + st.needsWork > 0) return n;
    }
  }
  return -1;
}
function todayCard() {
  var q = reviewItems(), due = q.length, nt = nextTopic();
  var c = el('div', 'today-card animate-fade-in');
  c.innerHTML = '<span class="kicker">Today</span>';
  var row = el('div', 'today-row');
  var rv = el('button', 'today-btn press' + (due ? ' hot' : '')); rv.type = 'button';
  rv.innerHTML = '<b class="tabular">' + due + '</b><span>' + (due ? 'due for review' : 'nothing due') + '</span>';
  rv.disabled = !due;
  rv.addEventListener('click', function () {
    startSession('weak', reviewItems().slice(0, DRILL_CAP).map(function (it) { return { t: it.t, i: it.i }; }), 'Due for review', { scopeRef: { type: 'weak' } });
  });
  row.appendChild(rv);
  if (nt >= 0) {
    var tp = TOPICS[nt], st = topicStats(nt);
    var nx = el('button', 'today-btn next press'); nx.type = 'button';
    nx.innerHTML = '<small>Next up \u00b7 Topic ' + tp.n + '</small><b></b><span class="tabular">' + (st.fresh + st.needsWork) + ' to learn</span>';
    nx.querySelector('b').textContent = tp.title;
    nx.addEventListener('click', function () {
      startSession('drill', drillQueue([nt]), 'Topic ' + tp.n + ' \u00b7 ' + tp.title, { scopeRef: { type: 'topic', n: nt } });
    });
    row.appendChild(nx);
  }
  c.appendChild(row);
  var tip = el('p', 'today-tip');
  tip.textContent = due ? 'Clear what\u2019s due first \u2014 that\u2019s what keeps it from leaking out by month six. Then learn new.'
    : 'Nothing due. Learn something new; it comes back tomorrow, then in 3 days, a week, two weeks.';
  c.appendChild(tip);
  return c;
}
function gameMini(ico, bg, title, best, bestLabel, onTap) {
  var b = el('button', 'game-mini press'); b.type = 'button';
  b.setAttribute('aria-label', title + ' — ' + bestLabel + ' ' + best);
  b.innerHTML = '<span class="gm-ico" style="background:' + bg + '">' + icon(ico, 24) + '</span>'
    + '<span class="gm-t"><b>' + title + '</b><small class="tabular">' + bestLabel + ': ' + best + '</small></span>';
  b.addEventListener('click', onTap);
  return b;
}
function renderHome(root) {
  if (state.sess) { renderSessionView(root); return; }
  if (state.callRun) { renderCallView(root); return; }
  if (state.scenRun) { renderScenarioRun(root); return; }
  if (state.examRun) { renderExamView(root); return; }
  if (state.calcRun) { renderCalcView(root); return; }

  var s = moduleStats(), due = dueCount();
  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">' + (store.stage ? STAGES[store.stage].label : 'Welcome') + '</span><h2>Put in the reps.</h2>'
    + '<p><span class="tabular"><b>' + s.mastered + '</b></span> solid &middot; '
    + '<span class="tabular"><b>' + due + '</b></span> due &middot; '
    + '<span class="tabular"><b>' + s.needsWork + '</b></span> need work</p>';
  root.appendChild(head);

  if (!store.stage) { root.appendChild(stagePicker()); }
  else {
    root.appendChild(todayCard());
    if (window.FSHQ_PWA) FSHQ_PWA.renderInstallBanner(root);
    root.appendChild(streakBanner());
  }

  var hh = el('h2', 'sec-head'); hh.textContent = 'Pick your ground';
  root.appendChild(hh);
  var grid = el('div', 'hub-grid');
  stagePath().forEach(function (hh2) { grid.appendChild(hubTile(hh2, function () { goHub(hh2); })); });
  var vids = el('button', 'hub-tile hub-tile-wide press'); vids.type = 'button';
  var totalVids = HUBS.reduce(function (a, _, hi) { return a + hubVideos(hi).length; }, 0);
  vids.setAttribute('aria-label', 'Training videos: ' + totalVids + ' videos');
  vids.innerHTML = '<span class="hub-ico">' + icon('playcircle', 30) + '</span>'
    + '<span class="hub-t"><b>Training videos</b><small>UL FSRI research, with lesson plans</small></span>'
    + '<span class="hub-meta tabular">' + totalVids + ' videos</span>'
    + '<span class="cc-go">' + icon('chevL', 22) + '</span>';
  vids.addEventListener('click', function () {
    state.tab = 'study';
    state.study = { view: 'videos', hub: -1, topic: -1 };
    render(); window.scrollTo(0, 0);
  });
  grid.appendChild(vids);
  var scen = el('button', 'hub-tile hub-tile-wide press'); scen.type = 'button';
  scen.setAttribute('aria-label', 'Scenarios: ' + SCENARIOS.length + ' scenarios');
  scen.innerHTML = '<span class="hub-ico">' + icon('target', 30) + '</span>'
    + '<span class="hub-t"><b>Scenarios</b><small>First-arriving size-ups from Sets &amp; Reps</small></span>'
    + '<span class="hub-meta tabular">' + SCENARIOS.length + (SCENARIOS.length === 1 ? ' scenario' : ' scenarios') + '</span>'
    + '<span class="cc-go">' + icon('chevL', 22) + '</span>';
  scen.addEventListener('click', function () { go('scenarios'); });
  grid.appendChild(scen);
  root.appendChild(grid);

  var gh = el('h2', 'sec-head'); gh.textContent = 'Games';
  root.appendChild(gh);
  var gg = el('div', 'game-mini-grid');
  gg.appendChild(gameMini('layers', 'linear-gradient(135deg,#2E86C1,#1B4F7A)', 'Flashcards', store.games.flash.sessions, 'sessions',
    function () { scopeOptions(function (sc) { startSession('flash', scopeCards(sc), scopeLabel(sc), { scopeRef: { type: 'flash', scope: sc } }); }); }));
  gg.appendChild(gameMini('zap', 'linear-gradient(135deg,#F2A63B,#B3271E)', 'Blitz', store.games.blitz.best, 'best',
    function () { scopeOptions(function (sc) { startSession('blitz', scopeCards(sc), scopeLabel(sc), { scopeRef: { type: 'blitz', scope: sc } }); }); }));
  gg.appendChild(gameMini('target', 'linear-gradient(135deg,#1E8A4C,#0E4A27)', 'Weak Spots', reviewItems().length, 'in queue',
    function () {
      var q = reviewItems();
      if (!q.length) { openSheet('Queue\u2019s clear', 'Nothing to attack. Go drill something new and miss a few \u2014 that\u2019s how the queue gets fed.', []); return; }
      startSession('weak', shuffle(q.map(function (it) { return { t: it.t, i: it.i }; })), 'Weak spots', { scopeRef: { type: 'weak' } });
    }));
  gg.appendChild(gameMini('cross', 'linear-gradient(135deg,#C0392B,#7B1F14)', 'Run the Call', store.games.call.best, 'best', function () { startCallRun(); }));
  gg.appendChild(gameMini('book', 'linear-gradient(135deg,#6C3483,#2E1A47)', 'Exams', store.games.exam.best, 'best', function () { startExamRun(); }));
  gg.appendChild(gameMini('timer', 'linear-gradient(135deg,#117A65,#0B3D33)', 'Math', store.games.calc.best, 'best', function () { startCalcRun(); }));
  root.appendChild(gg);

  var foot = el('div', 'foot');
  foot.innerHTML = 'Roadmap: <b>Fire</b> &rarr; <b>Medical</b> &rarr; <b>Paramedic</b>. '
    + 'Built for Phoenix firefighters, by one. Wrong answers get corrected &mdash; that&rsquo;s the job.';
  root.appendChild(foot);
}

/* ============================================================
   STUDY TAB
   ============================================================ */
function topicCard(n) {
  var tp = TOPICS[n], st = topicStats(n);
  var b = el('button', 'tcard press'); b.type = 'button';
  b.setAttribute('aria-label', tp.title + ': ' + st.mastered + ' of ' + tp.cards.length + ' mastered');
  var inner = el('div', 'tcard-inner');
  inner.appendChild(el('div', 'tnum', String(tp.n)));
  var txt = el('div'); txt.appendChild(el('h3', null, tp.title)); txt.appendChild(el('p', 'sub', tp.sub));
  var prog = el('div', 'tprog');
  var ring = el('div', 'ring'); ring.innerHTML = ringSVG(st.mastered / tp.cards.length, st.mastered + '/' + tp.cards.length);
  prog.appendChild(ring);
  prog.appendChild(el('small', null, st.needsWork > 0 ? st.needsWork + ' needs work' : 'mastered'));
  inner.appendChild(txt); inner.appendChild(prog);
  var bar = el('div', 'tbar'); var fill = document.createElement('i');
  fill.style.width = (st.mastered / tp.cards.length * 100) + '%'; bar.appendChild(fill);
  b.appendChild(inner); b.appendChild(bar);
  b.addEventListener('click', function () {
    state.study = { view: 'topic', hub: (state.tab === 'study' ? state.study.hub : -1), topic: n };
    render(); window.scrollTo(0, 0);
  });
  return b;
}
function examPrepCard() {
  var a = el('a', 'tcard press');
  a.href = 'paramedic-exam-prep.html';
  a.style.textDecoration = 'none';
  a.setAttribute('aria-label', 'Paramedic Candidate Exam Prep: study guide, flashcards, and practice exams');
  var inner = el('div', 'tcard-inner');
  inner.appendChild(el('div', 'tnum', '\u2605'));
  var txt = el('div');
  txt.appendChild(el('h3', null, 'Paramedic Candidate Exam Prep'));
  txt.appendChild(el('p', 'sub', 'Study guide \u00b7 Flashcards \u00b7 Practice exams'));
  inner.appendChild(txt);
  a.appendChild(inner);
  return a;
}
function soonCard(k) {  var ph = SOON[k];
  var b = el('button', 'tcard soon press'); b.type = 'button';
  b.setAttribute('aria-label', ph.title + ': coming soon');
  var inner = el('div', 'tcard-inner');
  var lock = el('div', 'tnum lock'); lock.innerHTML = icon('lock', 20);
  var txt = el('div'); var h = el('h3', null, ph.title);
  var badge = el('span', 'soon-badge', 'COMING SOON'); h.appendChild(badge);
  txt.appendChild(h);
  inner.appendChild(lock); inner.appendChild(txt);
  var note = el('div', 'soon-note hidden'); note.innerHTML = ph.note;
  b.appendChild(inner); b.appendChild(note);
  b.addEventListener('click', function () { note.classList.toggle('hidden'); });
  return b;
}
function studyHome(root) {
  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">Drill down</span><h2>Study</h2>'
    + '<p>Pick a section, pick a topic, put in the reps.</p>';
  root.appendChild(head);

  for (var h = 0; h < HUBS.length; h++) {
    (function (hh) {
      var st = hubStats(hh), hub = HUBS[hh];
      var b = el('button', 'hub-row press'); b.type = 'button';
      b.setAttribute('aria-label', hub.title + ': ' + st.mastered + ' of ' + st.cards + ' drills mastered');
      var pct = st.cards ? Math.round(st.mastered / st.cards * 100) : 0;
      b.innerHTML = '<span class="hub-ico">' + icon(hub.icon, 28) + '</span>'
        + '<span class="hub-t"><b>' + hub.title + '</b><small>' + hub.sub + ' &middot; <span class="tabular">' + st.cards + '</span> drills</small></span>'
        + '<span class="hub-pct tabular">' + pct + '%</span>'
        + '<span class="hub-bar"><i style="width:' + pct + '%"></i></span>';
      b.addEventListener('click', function () { goHub(hh); });
      root.appendChild(b);
    })(h);
  }

  var vids = el('button', 'hub-row press'); vids.type = 'button';
  var totalVids = HUBS.reduce(function (a, _, hi) { return a + hubVideos(hi).length; }, 0);
  vids.setAttribute('aria-label', 'Training videos: ' + totalVids + ' videos');
  vids.innerHTML = '<span class="hub-ico">' + icon('playcircle', 28) + '</span>'
    + '<span class="hub-t"><b>Training videos</b><small>UL FSRI research &middot; <span class="tabular">' + totalVids + '</span> videos</small></span>'
    + '<span class="cc-go">' + icon('chevL', 22) + '</span>';
  vids.addEventListener('click', function () {
    state.study = { view: 'videos', hub: -1, topic: -1 };
    render(); window.scrollTo(0, 0);
  });
  root.appendChild(vids);

  root.appendChild(studyLinkRow('target', 'Skills & checklists', CHECKLISTS.length + ' skill sheets, station routines and probation sign-offs', function () {
    state.study = { view: 'checklists', hub: -1, topic: -1 }; render(); window.scrollTo(0, 0);
  }));

  var rh = el('h2', 'sec-head'); rh.textContent = 'Reference';
  root.appendChild(rh);
  root.appendChild(studyLinkRow('layers', 'NFPA 1700', 'Science-based structural firefighting guide', function () { go('nfpa1700'); }));
  root.appendChild(studyLinkRow('playcircle', 'UL FSRI', 'The research behind the drills', function () { go('ulfsri'); }));
}
function hubView(root, h) {
  var hub = HUBS[h], st = hubStats(h);
  var back = el('div', 'backbar');
  var bb = el('button', 'back press'); bb.type = 'button';
  bb.innerHTML = icon('chevL', 20) + '<span>Study</span>';
  bb.setAttribute('aria-label', 'Back to Study');
  bb.addEventListener('click', function () { state.study = { view: 'home', hub: -1, topic: -1 }; render(); window.scrollTo(0, 0); });
  back.appendChild(bb); root.appendChild(back);

  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">' + hub.sub + '</span><h2>' + hub.title + '</h2>'
    + '<p><span class="tabular"><b>' + st.mastered + '</b>/' + st.cards + '</span> mastered'
    + (st.needsWork ? ' &middot; <span class="tabular"><b>' + st.needsWork + '</b></span> need work' : '') + '</p>';
  root.appendChild(head);

  var cta = el('div', 'drill-cta');
  var start = el('button', 'btn block press', 'Drill ' + hub.title); start.type = 'button';
  start.addEventListener('click', function () {
    startSession('drill', hubQueue(h), hub.title + ' \u00b7 all topics', { scopeRef: { type: 'hub', h: h } });
  });
  cta.appendChild(start);
  if (st.needsWork) {
    var rw = el('button', 'btn ghost block press', 'Review mistakes (' + st.needsWork + ')'); rw.type = 'button';
    rw.addEventListener('click', function () {
      startSession('weak', hubMistakes(h), hub.title + ' \u00b7 mistakes', { scopeRef: { type: 'hubweak', h: h } });
    });
    cta.appendChild(rw);
  }
  root.appendChild(cta);

  var th = el('h2', 'sec-head'); th.textContent = 'Topics';
  root.appendChild(th);
  if (h === PARAMEDIC_HUB) root.appendChild(examPrepCard());
  var stg = h === 0 ? 'academy' : (h === 1 ? 'probation' : null);
  if (stg) {
    var cn = CHECKLISTS.filter(function (c) { return c.stage === stg; }).length;
    root.appendChild(studyLinkRow('target', h === 0 ? 'Skill sheets' : 'Routines & sign-offs', cn + ' checklists you can drill and get signed', function () {
      state.study = { view: 'checklists', stage: stg, hub: -1, topic: -1 }; render(); window.scrollTo(0, 0);
    }));
  }
  hub.sections.forEach(function (si) {
    SECTIONS[si].topics.forEach(function (n) { root.appendChild(topicCard(n)); });
    SECTIONS[si].soon.forEach(function (k) { root.appendChild(soonCard(k)); });
  });

  var vs = hubVideos(h);
  if (vs.length) {
    var vh = el('h2', 'sec-head'); vh.textContent = 'Videos';
    root.appendChild(vh);
    root.appendChild(studyLinkRow('playcircle', 'Training videos', vs.length + ' videos with lesson plans', function () {
      state.study = { view: 'videos', hub: -1, topic: -1 };
      render(); window.scrollTo(0, 0);
    }));
  }
}
function studyLinkRow(ic, title, sub, onTap) {
  var b = el('button', 'hub-row press'); b.type = 'button';
  b.setAttribute('aria-label', title);
  b.innerHTML = '<span class="hub-ico">' + icon(ic, 28) + '</span>'
    + '<span class="hub-t"><b></b><small></small></span>'
    + '<span class="cc-go">' + icon('chevL', 22) + '</span>';
  b.querySelector('b').textContent = title;
  b.querySelector('small').textContent = sub;
  b.addEventListener('click', onTap);
  return b;
}
function subtabBack(root) {
  var back = el('div', 'backbar');
  var bb = el('button', 'back press'); bb.type = 'button';
  bb.innerHTML = icon('chevL', 20) + '<span>Study</span>';
  bb.setAttribute('aria-label', 'Back to Study');
  bb.addEventListener('click', function () { state.study = { view: 'home', hub: -1, topic: -1 }; go('study'); });
  back.appendChild(bb); root.appendChild(back);
}
function videosView(root) {
  var back = el('div', 'backbar');
  var bb = el('button', 'back press'); bb.type = 'button';
  bb.innerHTML = icon('chevL', 20) + '<span>Study</span>';
  bb.setAttribute('aria-label', 'Back to Study');
  bb.addEventListener('click', function () { state.study = { view: 'home', hub: -1, topic: -1 }; render(); window.scrollTo(0, 0); });
  back.appendChild(bb); root.appendChild(back);

  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">UL FSRI training</span><h2>Videos</h2>'
    + '<p>The research behind the drills. Watch one before your next session.</p>';
  root.appendChild(head);
  videoGroups(root);
}
/* Shared: all UL FSRI videos grouped by hub (used by Study > Videos and the UL FSRI tab). */
function videoGroups(root) {
  HUBS.forEach(function (hub, h) {
    var vs = hubVideos(h);
    if (!vs.length) return;
    var hh = el('h2', 'sec-head'); hh.textContent = hub.title;
    root.appendChild(hh);
    vs.forEach(function (it) { root.appendChild(videoRow(it.v, it.n)); });
  });
}
/* ---------------- NFPA 1700 + UL FSRI tabs ---------------- */
function extCard(title, desc, url, meta) {
  var card = el('div', 'vid-card');
  var a = el('a', 'vid-row press'); a.href = url; a.target = '_blank'; a.rel = 'noopener';
  var pl = el('span', 'vid-play'); pl.innerHTML = icon('ext', 20);
  var txt = el('span', 'vid-txt'); txt.appendChild(el('h4', null, title));
  txt.appendChild(el('p', null, desc)); a.appendChild(pl); a.appendChild(txt);
  if (meta) a.appendChild(el('span', 'dur-chip tabular', meta));
  card.appendChild(a);
  return card;
}
function renderNFPA1700(root) {
  subtabBack(root);
  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">Science-based tactics</span><h2>NFPA 1700</h2>'
    + '<p>Guide for Structural Fire Fighting \u2014 the first NFPA document connecting fire dynamics research to strategy, tactics, and best practices.</p>';
  root.appendChild(head);

  var th = el('h2', 'sec-head'); th.textContent = 'Free training'; root.appendChild(th);
  root.appendChild(extCard(
    'NFPA 1700 Online Training',
    'Free 14-module course: 360\u00b0 3D fireground scenarios covering fire dynamics, strategy, tactics, and contamination reduction, ending with an exam.',
    'https://www.nfpa.org/1700', 'Free'));

  var sh = el('h2', 'sec-head'); sh.textContent = 'The standard'; root.appendChild(sh);
  root.appendChild(extCard(
    'Read NFPA 1700 (2026 edition)',
    'Full text free on NFPA Link with a free account. 13 chapters: strategy, search, ventilation, suppression, and contamination control.',
    'https://link.nfpa.org/free-access/publications/1700/2026', 'Free'));
}
function renderULFSRI(root) {
  subtabBack(root);
  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">Fire Safety Research Institute</span><h2>UL FSRI</h2>'
    + '<p>The research behind the drills. Watch one before your next session.</p>';
  root.appendChild(head);
  videoGroups(root);
}
function topicView(root, n) {
  var tp = TOPICS[n], st = topicStats(n);
  var hubIdx = state.study.hub;
  var back = el('div', 'backbar');
  var bb = el('button', 'back press'); bb.type = 'button';
  var backLabel = hubIdx >= 0 ? HUBS[hubIdx].title : 'Study';
  bb.innerHTML = icon('chevL', 20) + '<span></span>';
  bb.querySelector('span').textContent = backLabel;
  bb.setAttribute('aria-label', 'Back to ' + backLabel);
  bb.addEventListener('click', function () {
    state.study = hubIdx >= 0 ? { view: 'hub', hub: hubIdx, topic: -1 } : { view: 'home', hub: -1, topic: -1 };
    render(); window.scrollTo(0, 0);
  });
  back.appendChild(bb); root.appendChild(back);

  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">Topic ' + tp.n + ' of ' + TOPIC_COUNT + '</span>'
    + '<h2>' + tp.title + '</h2><p>' + tp.sub + '</p>'
    + '<p style="margin-top:8px"><span class="tabular"><b>' + st.mastered + '</b>/' + tp.cards.length + '</span> mastered'
    + (st.needsWork ? ' &middot; <span class="tabular"><b>' + st.needsWork + '</b></span> need work' : '') + '</p>';
  root.appendChild(head);

  if (tp.concepts && tp.concepts.length) {
    var c = el('div', 'concepts');
    c.innerHTML = '<h3>Key concepts</h3><ul>' + tp.concepts.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
    root.appendChild(c);
  }
  if (tp.pfdNote) {
    var pb = el('div', 'pfdbox');
    pb.innerHTML = '<span class="ph"><span class="t">' + tp.pfdNote.title + '</span><span class="s">' + tp.pfdNote.src + '</span></span>'
      + '<ul>' + tp.pfdNote.items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
    root.appendChild(pb);
  }
  if (tp.diagrams && tp.diagrams.length) {
    var plates = el('div', 'plates');
    tp.diagrams.forEach(function (d) {
      var fig = document.createElement('figure'); fig.className = 'plate'; fig.style.margin = '0';
      var holder = document.createElement('div');
      try { holder.innerHTML = DIAGS[d.svg](); } catch (e) { holder.innerHTML = ''; }
      fig.appendChild(holder);
      var cap = el('figcaption', null, null); cap.innerHTML = '<b>' + d.title + '.</b> ' + d.cap;
      fig.appendChild(cap);
      plates.appendChild(fig);
    });
    root.appendChild(plates);
  }
  if (tp.videos && tp.videos.length) {
    var vh = el('h2', 'sec-head'); vh.textContent = 'Videos';
    root.appendChild(vh);
    tp.videos.forEach(function (v) { root.appendChild(videoRow(v, tp.n)); });
  }

  var cta = el('div', 'drill-cta');
  var start = el('button', 'btn block press', 'Start drill'); start.type = 'button';
  start.addEventListener('click', function () {
    startSession('drill', drillQueue([n]), 'Topic ' + tp.n + ' \u00b7 ' + tp.title, { scopeRef: { type: 'topic', n: n } });
  });
  cta.appendChild(start);
  if (st.needsWork) {
    var rw = el('button', 'btn ghost block press', 'Review mistakes (' + st.needsWork + ')'); rw.type = 'button';
    rw.addEventListener('click', function () {
      var queue = [];
      for (var i = 0; i < tp.cards.length; i++) if (isNeedsWork(n, i)) queue.push({ t: n, i: i });
      startSession('weak', shuffle(queue), 'Topic ' + tp.n + ' mistakes', { scopeRef: { type: 'weak' } });
    });
    cta.appendChild(rw);
  }
  root.appendChild(cta);
}
function videoRow(v, topicN) {
  var card = el('div', 'vid-card');
  var a = el('a', 'vid-row press'); a.href = v.url; a.target = '_blank'; a.rel = 'noopener';
  var pl = el('span', 'vid-play'); pl.innerHTML = icon('play', 20);
  var txt = el('span', 'vid-txt'); txt.appendChild(el('h4', null, v.title));
  var p = el('p', null, v.desc || ''); txt.appendChild(p);
  a.appendChild(pl); a.appendChild(txt);
  if (v.dur) a.appendChild(el('span', 'dur-chip tabular', v.dur));
  card.appendChild(a);
  if (v.lesson) {
    var tgl = el('button', 'vid-lp-toggle press'); tgl.type = 'button';
    tgl.setAttribute('aria-expanded', 'false');
    tgl.innerHTML = '<span class="vid-chev">' + icon('chevL', 16) + '</span><span>Lesson plan</span>';
    var body = el('div', 'vid-lesson'); body.hidden = true;
    renderLesson(body, v, topicN);
    tgl.addEventListener('click', function () {
      var open = body.hidden;
      body.hidden = !open;
      tgl.setAttribute('aria-expanded', String(open));
      tgl.classList.toggle('open', open);
    });
    card.appendChild(tgl);
    card.appendChild(body);
  }
  return card;
}
function renderLesson(root, v, topicN) {
  var L = v.lesson;
  function sec(title) { var s = el('div', 'lp-sec'); s.appendChild(el('h5', null, title)); return s; }
  function bullets(items) { var u = el('ul'); items.forEach(function (t) { u.appendChild(el('li', null, t)); }); return u; }
  var o = sec('Objectives'); o.appendChild(bullets(L.objectives)); root.appendChild(o);
  var k = sec('Key takeaways'); k.appendChild(bullets(L.takeaways)); root.appendChild(k);
  var d = sec('Drill questions');
  L.drills.forEach(function (dr) {
    var dc = el('div', 'dcard');
    dc.appendChild(el('p', 'q', dr.q));
    dc.appendChild(el('div', 'a-label', 'Correct action'));
    dc.appendChild(el('p', 'a', dr.a));
    dc.appendChild(el('div', 'why-label', 'Why'));
    dc.appendChild(el('p', 'why', dr.why));
    d.appendChild(dc);
  });
  var note = el('p', 'lp-note',
    'These drill questions are also in the Topic ' + topicN + ' Study deck \u2014 the Progress tab tracks them.');
  d.appendChild(note); root.appendChild(d);
  var f = sec('On the fireground');
  f.appendChild(el('p', 'lp-fireground', L.fireground)); root.appendChild(f);
}
function renderStudy(root) {
  if (state.sess) { renderSessionView(root); return; }
  if (state.checkRun) { renderOrderQuiz(root); return; }
  if (state.study.view === 'checklists') { checklistsView(root, state.study.stage); return; }
  if (state.study.view === 'checklist') { checklistView(root, state.study.id); return; }
  if (state.study.view === 'topic' && state.study.topic >= 0) topicView(root, state.study.topic);
  else if (state.study.view === 'hub' && state.study.hub >= 0) hubView(root, state.study.hub);
  else if (state.study.view === 'videos') videosView(root);
  else studyHome(root);
}

/* ============================================================
   SESSION ENGINE (drill / flashcards / weak spots / blitz)
   ============================================================ */
function startSession(mode, queue, scopeLabel, opts) {
  stopSessionTimer();
  opts = opts || {};
  state.sess = {
    mode: mode, queue: queue.slice(), scope: scopeLabel, scopeRef: opts.scopeRef || null,
    got: 0, miss: 0, masteredNow: 0, revealed: false, done: false,
    blitz: mode === 'blitz' ? { left: 60, score: 0, timerId: null, scopeObj: (opts.scopeRef && opts.scopeRef.scope) || null } : null
  };
  if (mode === 'drill' || mode === 'weak') {
    var h = hubOfScope(state.sess.scopeRef, state.sess.queue);
    state.sess.hub = h;
    state.sess.style = opts.style || loadStylePref(h) || (h === PARAMEDIC_HUB || h === 2 || (state.sess.scopeRef && state.sess.scopeRef.type === 'topic' && state.sess.scopeRef.n === 12) ? 'quiz' : 'recall');
    state.sess.quizAvail = state.sess.queue.some(function (it) {
      var c = TOPICS[it.t].cards[it.i];
      return !!(c.mc && c.opts && c.opts.length >= 4);
    });
  }
  if (state.tab === 'study') state.study.view = 'session';
  if (mode === 'flash') store.games.flash.sessions++;
  if (mode === 'weak') store.games.weak.sessions++;
  saveStore();
  render();
  window.scrollTo(0, 0);
  if (mode === 'blitz') startBlitzTimer();
}
/* rebuild a fresh queue from a scopeRef (for "Keep drilling" / "Run it back") */
function buildQueueFor(ref) {
  if (!ref) return [];
  var q = [], n, i;
  if (ref.type === 'topic') {
    return drillQueue([ref.n]);
  }
  if (ref.type === 'weak') return reviewItems().slice(0, DRILL_CAP).map(function (it) { return { t: it.t, i: it.i }; });
  if (ref.type === 'hub') return hubQueue(ref.h);
  if (ref.type === 'hubweak') return hubMistakes(ref.h);
  if (ref.type === 'flash' || ref.type === 'blitz') return scopeCards(ref.scope);
  return [];
}
function startBlitzTimer() {
  var s = state.sess; if (!s || !s.blitz) return;
  s.blitz.timerId = setInterval(function () {
    if (!state.sess || state.sess !== s) { clearInterval(s.blitz.timerId); return; }
    s.blitz.left--;
    var t = document.getElementById('blitz-timer');
    if (t) {
      t.textContent = '0:' + ('0' + Math.max(0, s.blitz.left)).slice(-2);
      if (s.blitz.left <= 10) t.classList.add('urgent');
    }
    if (s.blitz.left <= 0) { clearInterval(s.blitz.timerId); s.blitz.timerId = null; endBlitz(); }
  }, 1000);
}
function scopeCards(scope) {
  // scope: {type:'all'} or {type:'topic', n}
  var q = [], i;
  if (scope.type === 'all') { for (var t = 0; t < TOPICS.length; t++) for (i = 0; i < TOPICS[t].cards.length; i++) q.push({ t: t, i: i }); }
  else { for (i = 0; i < TOPICS[scope.n].cards.length; i++) q.push({ t: scope.n, i: i }); }
  return shuffle(q);
}
function sessTop(root, s) {
  var total = s.queue.length + s.got + s.miss;
  var done = s.got + s.miss;
  var top = el('div', 'sess-top');
  top.innerHTML = '<span class="sess-count tabular">' + done + '/' + total + '</span>'
    + '<div class="sess-bar"><i style="width:' + (total ? (done / total * 100) : 0) + '%"></i></div>';
  var exit = el('button', 'back press'); exit.type = 'button';
  exit.setAttribute('aria-label', 'Exit session');
  exit.innerHTML = icon('x', 20);
  exit.addEventListener('click', exitSession);
  top.appendChild(exit);
  root.appendChild(top);
  var sc = el('div', 'sess-scope'); sc.textContent = s.scope;
  root.appendChild(sc);
}
function exitSession() {
  stopSessionTimer();
  state.sess = null;
  if (state.tab !== 'games' && state.tab !== 'home') state.study = { view: 'home', hub: -1, topic: -1 };
  render();
  window.scrollTo(0, 0);
}
function cardTag(card, cur) {
  return 'Scenario' + (card.sec ? ' \u2014 ' + card.sec : ' \u00b7 Topic ' + TOPICS[cur.t].n);
}
function renderSessionView(root) {
  var s = state.sess;
  if (!s) { studyHome(root); return; }
  if (s.done) {
    if (s.mode === 'blitz') renderBlitzDone(root, s);
    else renderSessionDone(root, s);
    return;
  }
  if (s.mode === 'blitz') { renderBlitzCard(root, s); return; }
  renderStudyCard(root, s);
}
function shuffleIdx(n) {
  var a = [], i;
  for (i = 0; i < n; i++) a.push(i);
  for (i = n - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}
/* ---------------- drill style (quiz vs recall) ---------------- */
var STYLE_KEY = 'fshq_drillstyle_v1';
function loadStylePref(h) {
  try { var m = JSON.parse(localStorage.getItem(STYLE_KEY) || '{}'); return (h >= 0 && m[h]) || null; }
  catch (e) { return null; }
}
function saveStylePref(h, v) {
  if (h == null || h < 0) return;
  try { var m = JSON.parse(localStorage.getItem(STYLE_KEY) || '{}'); m[h] = v; localStorage.setItem(STYLE_KEY, JSON.stringify(m)); }
  catch (e) {}
}
function hubOfTopic(n) {
  for (var h = 0; h < HUBS.length; h++) {
    var secs = HUBS[h].sections;
    for (var k = 0; k < secs.length; k++) {
      if (SECTIONS[secs[k]].topics.indexOf(n) >= 0) return h;
    }
  }
  return -1;
}
function hubOfScope(ref, queue) {
  if (!ref) return -1;
  if (ref.type === 'hub') return ref.h;
  if (ref.type === 'topic') return hubOfTopic(ref.n);
  if (ref.type === 'weak' && queue && queue.length) return hubOfTopic(queue[0].t);
  return -1;
}
/* segmented Quiz/Recall toggle shown on drill + weak-spot sessions */
function styleToggle(root, s) {
  if ((s.mode !== 'drill' && s.mode !== 'weak') || !s.quizAvail) return;
  var wrap = el('div', 'style-toggle');
  wrap.setAttribute('role', 'group');
  wrap.setAttribute('aria-label', 'Drill mode: quiz or recall');
  [['quiz', 'Quiz'], ['recall', 'Recall']].forEach(function (pair) {
    var b = el('button', 'style-btn press' + (s.style === pair[0] ? ' active' : ''));
    b.type = 'button';
    b.setAttribute('aria-pressed', s.style === pair[0] ? 'true' : 'false');
    b.textContent = pair[1];
    b.addEventListener('click', function () {
      if (s.style === pair[0]) return;
      s.style = pair[0];
      s.picked = false; s.revealed = false;
      saveStylePref(s.hub, s.style);
      render(); window.scrollTo(0, 0);
    });
    wrap.appendChild(b);
  });
  root.appendChild(wrap);
}
function renderStudyCard(root, s) {
  var cur = s.queue[0], card = TOPICS[cur.t].cards[cur.i];
  var canQuiz = !!(card.mc && card.opts && card.opts.length >= 4);
  if ((s.style || 'recall') === 'quiz' && canQuiz && s.mode !== 'flash') { renderMCCard(root, s, cur, card); return; }
  sessTop(root, s);
  styleToggle(root, s);
  var dc = el('div', 'dcard animate-pop-in');
  var tag = el('span', 'tag', cardTag(card, cur)); dc.appendChild(tag);
  dc.appendChild(el('p', 'q', card.q));
  if (card.mc && card.opts) {
    var ol = el('div', 'mc-list');
    shuffleIdx(card.opts.length).forEach(function (oi) { var li = el('div', 'mc-static'); li.textContent = card.opts[oi]; ol.appendChild(li); });
    dc.appendChild(ol);
  }
  var ansBox = el('div', 'hidden'); dc.appendChild(ansBox);
  root.appendChild(dc);

  if (s.mode === 'flash') {
    var hint = el('div', 'flip-hint'); hint.innerHTML = icon('layers', 16) + '<span>Tap the card to flip it</span>';
    dc.style.cursor = 'pointer';
    dc.setAttribute('role', 'button');
    dc.setAttribute('tabindex', '0');
    dc.setAttribute('aria-label', 'Flip card to see the answer');
    dc.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); dc.click(); } });
    dc.addEventListener('click', function flip() {
      if (s.revealed) return;
      s.revealed = true;
      showAnswer(ansBox, card);
      renderGradeButtons(root, s, cur);
      hint.classList.add('hidden');
    }, { once: true });
    root.appendChild(hint);
  } else {
    var rev = el('button', 'btn block press', s.mode === 'weak' ? 'Reveal the answer' : 'Reveal answer');
    rev.type = 'button';
    rev.addEventListener('click', function () {
      s.revealed = true;
      showAnswer(ansBox, card);
      renderGradeButtons(root, s, cur);
      rev.remove();
    });
    var wrap = el('div', 'drill-cta'); wrap.appendChild(rev);
    root.appendChild(wrap);
  }
}
function renderMCCard(root, s, cur, card) {
  sessTop(root, s);
  styleToggle(root, s);
  var dc = el('div', 'dcard animate-pop-in');
  dc.appendChild(el('span', 'tag', cardTag(card, cur) + ' \u00b7 multiple choice'));
  dc.appendChild(el('p', 'q', card.q));
  var order = shuffleIdx(card.opts.length);
  var correctPos = -1;
  var btns = [];
  order.forEach(function (oi, pos) {
    var b = el('button', 'mc-opt press'); b.type = 'button';
    b.innerHTML = '<span class="mc-letter">' + 'ABCD'[pos] + '</span><span></span>';
    b.querySelector('span:last-child').textContent = card.opts[oi];
    if (oi === 0) correctPos = pos;
    b.addEventListener('click', function () {
      if (s.picked) return;
      var ok = (pos === correctPos);
      s.picked = true;
      btns.forEach(function (bb, p) {
        bb.disabled = true;
        if (p === correctPos) bb.classList.add('mc-right');
        else if (p === pos && !ok) bb.classList.add('mc-wrong');
        else bb.classList.add('mc-dim');
      });
      var fb = el('div', 'mc-feedback ' + (ok ? 'good' : 'bad'));
      fb.setAttribute('role', 'status');
      fb.innerHTML = '<b>' + (ok ? 'Correct.' : 'Wrong.') + '</b>';
      dc.appendChild(fb);
      showAnswer(ansBox, card);
      var nx = el('button', 'btn block press', 'Next'); nx.type = 'button';
      nx.addEventListener('click', function () { s.picked = false; gradeStep(s, cur, ok); });
      var wrap = el('div', 'drill-cta'); wrap.appendChild(nx);
      root.appendChild(wrap);
    });
    btns.push(b);
    dc.appendChild(b);
  });
  var ansBox = el('div', 'hidden'); dc.appendChild(ansBox);
  root.appendChild(dc);
}
function showAnswer(box, card) {
  box.classList.remove('hidden');
  box.appendChild(el('div', 'a-label', 'Answer'));
  box.appendChild(el('p', 'a', card.a));
  box.appendChild(el('div', 'why-label', 'Why'));
  box.appendChild(el('p', 'why', card.why));
}
function renderGradeButtons(root, s, cur) {
  var row = el('div', 'btn-row');
  var miss = el('button', 'btn danger-line press'); miss.type = 'button';
  miss.innerHTML = icon('x', 20) + '<span>Missed it</span>';
  var got = el('button', 'btn good press'); got.type = 'button';
  got.innerHTML = icon('check', 20) + '<span>Got it</span>';
  miss.addEventListener('click', function () { gradeStep(s, cur, false); });
  got.addEventListener('click', function () { gradeStep(s, cur, true); });
  row.appendChild(miss); row.appendChild(got);
  root.appendChild(row);
}
/* one grading step — correct answers move on; misses go to the end of the queue
   and repeat until answered correctly once */
function gradeStep(s, cur, ok) {
  s.queue.shift();
  if (ok) { s.got++; } else { s.miss++; }
  s.missedKeys = s.missedKeys || {};
  var key = cardKey(cur.t, cur.i);
  var newly = gradeCard(cur.t, cur.i, ok, { noAdvance: ok && !!s.missedKeys[key] });
  if (!ok) s.missedKeys[key] = true;
  if (newly) s.masteredNow++;
  if (!ok) s.queue.push(cur);
  s.revealed = false;
  if (!s.queue.length) s.done = true;
  render();
  window.scrollTo(0, 0);
}
function renderSessionDone(root, s) {
  var wrap = el('div', 'sess-done animate-pop-in');
  var allClear = s.miss === 0;
  wrap.innerHTML = '<h2>' + (allClear ? 'All clear.' : 'Run complete.') + '</h2><p>'
    + (allClear ? 'Nothing missed. That\u2019s the standard \u2014 hold it.'
      : 'Missed cards come back until you get each one right. No shortcuts.') + '</p>';
  var grid = el('div', 'stat-grid');
  grid.innerHTML = '<div class="stat g"><b class="tabular">' + s.masteredNow + '</b><span>mastered</span></div>'
    + '<div class="stat w"><b class="tabular">' + s.miss + '</b><span>miss marks</span></div>'
    + '<div class="stat n"><b class="tabular">' + s.got + '</b><span>got it</span></div>';
  wrap.appendChild(grid);
  var row = el('div', 'btn-row');
  var again = el('button', 'btn press', 'Keep drilling'); again.type = 'button';
  again.addEventListener('click', function () {
    var nq = buildQueueFor(s.scopeRef);
    if (!nq.length) { exitSession(); return; }
    startSession(s.mode, nq, s.scope, { scopeRef: s.scopeRef, style: s.style });
  });
  row.appendChild(again);
  var back = el('button', 'btn ghost press', state.tab === 'games' ? 'Games hub' : state.tab === 'home' ? 'Home' : 'Study'); back.type = 'button';
  back.addEventListener('click', exitSession);
  row.appendChild(back);
  wrap.appendChild(row);
  root.appendChild(wrap);
}

/* ---------------- blitz ---------------- */
function renderBlitzCard(root, s) {
  if (!s.queue.length) {
    // reshuffle so the clock never runs dry
    s.queue = scopeCards(s.blitz.scopeObj);
  }
  var cur = s.queue[0], card = TOPICS[cur.t].cards[cur.i];
  var hz = el('div', 'sess-top');
  hz.innerHTML = '<span class="timer tabular" id="blitz-timer">1:00</span>'
    + '<span class="sess-count tabular" style="margin-left:auto">Score: ' + s.blitz.score + '</span>';
  var exit = el('button', 'back press'); exit.type = 'button';
  exit.setAttribute('aria-label', 'Exit blitz');
  exit.innerHTML = icon('x', 20);
  exit.addEventListener('click', exitSession);
  hz.appendChild(exit);
  root.appendChild(hz);
  var sc = el('div', 'sess-scope'); sc.textContent = s.scope + ' \u2014 if you had to think about it, you missed it';
  root.appendChild(sc);

  var dc = el('div', 'dcard animate-pop-in');
  dc.appendChild(el('span', 'tag', cardTag(card, cur)));
  dc.appendChild(el('p', 'q', card.q));
  if (card.mc && card.opts) {
    var ol = el('div', 'mc-list');
    card.opts.forEach(function (o, i) { var li = el('div', 'mc-static'); li.textContent = 'ABCD'[i] + ') ' + o; ol.appendChild(li); });
    dc.appendChild(ol);
  }
  root.appendChild(dc);
  // sync timer text in case of re-render mid-run
  var t = document.getElementById('blitz-timer');
  if (t) { t.textContent = '0:' + ('0' + Math.max(0, s.blitz.left)).slice(-2); if (s.blitz.left <= 10) t.classList.add('urgent'); }

  var row = el('div', 'btn-row');
  var miss = el('button', 'btn danger-line press'); miss.type = 'button';
  miss.innerHTML = icon('x', 20) + '<span>Blew it</span>';
  var got = el('button', 'btn good press'); got.type = 'button';
  got.innerHTML = icon('check', 20) + '<span>Knew it</span>';
  miss.addEventListener('click', function () { blitzGrade(s, cur, false); });
  got.addEventListener('click', function () { blitzGrade(s, cur, true); });
  row.appendChild(miss); row.appendChild(got);
  root.appendChild(row);
}
function blitzGrade(s, cur, ok) {
  s.queue.shift();
  if (ok) { s.blitz.score++; } 
  gradeCard(cur.t, cur.i, ok, { noAdvance: true }); // misses feed review; speed answers never advance a card
  render();
}
function endBlitz() {
  var s = state.sess; if (!s || !s.blitz) return;
  s.done = true;
  var g = store.games.blitz;
  g.plays++;
  var newBest = s.blitz.score > g.best;
  if (newBest) g.best = s.blitz.score;
  saveStore();
  s.newBest = newBest;
  render();
  window.scrollTo(0, 0);
}
function renderBlitzDone(root, s) {
  var wrap = el('div', 'sess-done animate-pop-in');
  wrap.innerHTML = '<span class="kicker" style="display:inline-block;font-family:\'Barlow Condensed\',sans-serif;font-weight:700;font-size:13.5px;letter-spacing:.2em;color:var(--th-primary);text-transform:uppercase">Blitz over</span>'
    + '<div class="score-big tabular">' + s.blitz.score + '</div>'
    + '<h2>' + (s.newBest ? 'New best. Remember this feeling.' : s.blitz.score >= store.games.blitz.best ? 'Tied your best. Break it next run.' : 'Not your best. Run it back.') + '</h2>'
    + '<p>Best: <span class="tabular"><b>' + store.games.blitz.best + '</b></span> &middot; Missed cards went to your review queue.</p>';
  var row = el('div', 'btn-row');
  var again = el('button', 'btn press', 'Run it back'); again.type = 'button';
  again.addEventListener('click', function () {
    startSession('blitz', buildQueueFor(s.scopeRef), s.scope, { scopeRef: s.scopeRef });
  });
  var hub = el('button', 'btn ghost press', 'Games hub'); hub.type = 'button';
  hub.addEventListener('click', exitSession);
  row.appendChild(again); row.appendChild(hub);
  wrap.appendChild(row);
  root.appendChild(wrap);
}

/* ============================================================
   GAMES TAB
   ============================================================ */
function scopeOptions(onPick) {
  var opts = [{ label: 'All topics', sub: TOPICS.reduce(function (a, t) { return a + t.cards.length; }, 0) + ' cards \u2014 the full deck', scope: { type: 'all' } }];
  TOPICS.forEach(function (tp, n) {
    opts.push({ label: 'Topic ' + tp.n + ' \u00b7 ' + tp.title, sub: tp.cards.length + ' cards', scope: { type: 'topic', n: n } });
  });
  openSheet('Pick your battlefield', 'Where do you want the reps?', opts.map(function (o) {
    return { label: o.label, sub: o.sub, onPick: function () { onPick(o.scope); } };
  }));
}
function gameTile(ico, bg, title, desc, best, bestLabel, onTap) {
  var b = el('button', 'game-tile press'); b.type = 'button';
  b.setAttribute('aria-label', title + ' — ' + bestLabel + ' ' + best);
  b.innerHTML = '<span class="gt-ico" style="background:' + bg + '">' + icon(ico, 30) + '</span>'
    + '<b>' + title + '</b><span class="gt-desc">' + desc + '</span>'
    + '<span class="gt-best tabular">' + best + ' <small>' + bestLabel + '</small></span>';
  b.addEventListener('click', onTap);
  return b;
}
function renderGames(root) {
  if (state.sess) { renderSessionView(root); return; }
  if (state.callRun) { renderCallView(root); return; }
  if (state.examRun) { renderExamView(root); return; }
  if (state.calcRun) { renderCalcView(root); return; }
  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">Reps, but fun</span><h2>Games</h2>'
    + '<p>Same drill bank, different pressure. Scores and streaks live on this device.</p>';
  root.appendChild(head);

  var grid = el('div', 'game-grid');
  grid.appendChild(gameTile('layers', 'linear-gradient(135deg,#2E86C1,#1B4F7A)', 'Flashcards',
    'Flip the deck. Hesitated? You missed it.',
    store.games.flash.sessions, 'sessions',
    function () { scopeOptions(function (sc) { startSession('flash', scopeCards(sc), scopeLabel(sc), { scopeRef: { type: 'flash', scope: sc } }); }); }));
  grid.appendChild(gameTile('zap', 'linear-gradient(135deg,#F2A63B,#B3271E)', 'Blitz',
    '60 seconds. Gut answer. No mercy.',
    store.games.blitz.best, 'best',
    function () { scopeOptions(function (sc) { startSession('blitz', scopeCards(sc), scopeLabel(sc), { scopeRef: { type: 'blitz', scope: sc } }); }); }));
  var qn = reviewItems().length;
  grid.appendChild(gameTile('target', 'linear-gradient(135deg,#1E8A4C,#0E4A27)', 'Weak Spots',
    'Your misses, on repeat.',
    qn, 'in queue',
    function () {
      var q = reviewItems();
      if (!q.length) { openSheet('Queue\u2019s clear', 'Nothing to attack. Go drill something new and miss a few \u2014 that\u2019s how the queue gets fed.', []); return; }
      startSession('weak', shuffle(q.map(function (it) { return { t: it.t, i: it.i }; })), 'Weak spots', { scopeRef: { type: 'weak' } });
    }));
  grid.appendChild(gameTile('cross', 'linear-gradient(135deg,#C0392B,#7B1F14)', 'Run the Call',
    'Dispatch, vitals, make the call.',
    store.games.call.best, 'best',
    function () { startCallRun(); }));
  grid.appendChild(gameTile('book', 'linear-gradient(135deg,#6C3483,#2E1A47)', 'Exams',
    'Timed candidate simulation (150 Q, 3 hr), academy, probation and EMT exams.',
    store.games.exam.best, 'best',
    function () { startExamRun(); }));
  grid.appendChild(gameTile('timer', 'linear-gradient(135deg,#117A65,#0B3D33)', 'Math',
    'Drug math, drips, conversions, GCS, Apgar, rule of nines.',
    store.games.calc.best, 'best',
    function () { startCalcRun(); }));
  root.appendChild(grid);
}

/* ============================================================
   RUN THE CALL — vitals scenario game
   ============================================================ */
var CALL_RUN_LEN = 10;
function startCallRun() {
  var order = shuffle(MED_SCENARIOS.map(function (_, i) { return i; }));
  state.callRun = { order: order.slice(0, Math.min(CALL_RUN_LEN, order.length)), pos: 0, score: 0, picked: -1 };
  touchDay();
  render();
  window.scrollTo(0, 0);
}
function endCallRun() { state.callRun = null; render(); window.scrollTo(0, 0); }
function renderCallView(root) {
  var run = state.callRun;
  if (run.pos >= run.order.length) { renderCallScore(root); return; }
  var sc = MED_SCENARIOS[run.order[run.pos]];

  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">Run the Call</span><h2>Call ' + (run.pos + 1) + ' of ' + run.order.length + '</h2>'
    + '<p>Score this run: <span class="tabular"><b>' + run.score + '</b></span> &middot; Best: <span class="tabular"><b>' + store.games.call.best + '</b></span></p>';
  root.appendChild(head);

  var disp = el('div', 'call-dispatch');
  disp.innerHTML = '<span class="call-dispatch-tag">DISPATCH</span><p></p>';
  disp.querySelector('p').textContent = sc.dispatch;
  root.appendChild(disp);

  var nar = el('div', 'card call-narr');
  nar.innerHTML = '<p></p>';
  nar.querySelector('p').textContent = sc.narrative;
  root.appendChild(nar);

  var vg = el('div', 'vitals-grid');
  var v = sc.vitals;
  [['BP', v.bp], ['Pulse', v.hr], ['Resps', v.rr], ['SpO2', v.spo2], ['Temp', v.temp], ['Glucose', v.glucose], ['Pain', v.pain], ['Mental', v.mental], ['Skin', v.skin], ['Pupils', v.pupils]].forEach(function (pair) {
    var cell = el('div', 'vital');
    cell.innerHTML = '<span></span><b></b>';
    cell.querySelector('span').textContent = pair[0];
    cell.querySelector('b').textContent = pair[1];
    vg.appendChild(cell);
  });
  root.appendChild(el('h2', 'sec-head', 'Vitals'));
  root.appendChild(vg);

  if (run.picked < 0) {
    root.appendChild(el('h2', 'sec-head', "What's happening?"));
    var opts = el('div', 'call-opts');
    sc.options.forEach(function (opt, i) {
      var b = el('button', 'call-opt press'); b.type = 'button';
      b.textContent = opt;
      b.addEventListener('click', function () {
        run.picked = i;
        if (i === sc.answer) run.score++;
        touchDay(); saveStore();
        render(); window.scrollTo(0, 0);
      });
      opts.appendChild(b);
    });
    root.appendChild(opts);
  } else {
    var ok = run.picked === sc.answer;
    var rev = el('div', 'card call-reveal ' + (ok ? 'good' : 'bad'));
    var verdict = el('h3', null, ok ? 'Correct. Good read.' : 'Wrong. It was ' + sc.options[sc.answer] + ' \u2014 here\u2019s what you missed.');
    rev.appendChild(verdict);
    var secs = [['Why the vitals say so', sc.why], ['If you miss this', sc.miss], ['On scene', sc.actions]];
    secs.forEach(function (s) {
      rev.appendChild(el('h4', null, s[0]));
      var p = el('p', null, null); p.textContent = s[1]; rev.appendChild(p);
    });
    root.appendChild(rev);
    var nx = el('div', 'drill-cta');
    var nb = el('button', 'btn block press', (run.pos + 1 >= run.order.length) ? 'See your score' : 'Next call');
    nb.type = 'button';
    nb.addEventListener('click', function () { run.pos++; run.picked = -1; render(); window.scrollTo(0, 0); });
    nx.appendChild(nb);
    root.appendChild(nx);
  }

  var quit = el('div', 'drill-cta');
  var qb = el('button', 'btn ghost block press', 'Quit run');
  qb.type = 'button';
  qb.addEventListener('click', endCallRun);
  quit.appendChild(qb);
  root.appendChild(quit);
}
function renderCallScore(root) {
  var run = state.callRun, n = run.order.length, s = run.score;
  var g = store.games.call;
  g.plays++;
  if (s > g.best) g.best = s;
  saveStore();
  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">Run the Call</span><h2>' + s + ' / ' + n + '</h2>';
  root.appendChild(head);
  var msg;
  if (s === n) msg = 'Perfect run. You read every patient right — that\u2019s the standard.';
  else if (s >= n * 0.8) msg = 'Strong. Tighten up the ones you missed and run it back.';
  else if (s >= n * 0.6) msg = 'Passing, barely. The misses are the ones that kill patients — go again.';
  else msg = 'Rough. Hit the Medical decks in Study, then come back and prove it.';
  var card = el('div', 'card');
  card.innerHTML = '<p style="margin:0 0 12px"></p><p style="margin:0;color:var(--th-ink-2);font-size:14px">Best: <span class="tabular"><b>' + g.best + '</b></span> &middot; Runs: <span class="tabular"><b>' + g.plays + '</b></span></p>';
  card.querySelector('p').textContent = msg;
  root.appendChild(card);
  var cta = el('div', 'drill-cta');
  var again = el('button', 'btn block press', 'Run it back'); again.type = 'button';
  again.addEventListener('click', startCallRun);
  var back = el('button', 'btn ghost block press', 'Back to Games'); back.type = 'button';
  back.addEventListener('click', endCallRun);
  cta.appendChild(again); cta.appendChild(back);
  root.appendChild(cta);
  state.callRun = null;
}
/* ============================================================
   SCENARIOS — first-arriving size-up game from Sets & Reps
   No grading: every pick is just logged, and the run ends in a
   debrief report that mirrors the player's own choices back in the
   On Scene Report deck's framework. No scores, no pass/fail.
   ============================================================ */
function scenOptText(o) { return (typeof o === 'string') ? o : o.t; }
/* A pick: log it, then either show the MP check (if the beat has one) or move on. */
function scenPick(run, step, text, clears, unit, matched) {
  if (run.feedback) return;
  scenLog(run, step.label, text, clears, unit);
  if (step.mp) {
    var e = run.log[run.log.length - 1];
    e.hasBest = (typeof step.best === 'number');
    e.matched = e.hasBest && !!matched;
    e.mp = step.mp;
    e.bestText = e.hasBest ? (step.hotspots ? SCENARIOS[run.scen].hotspots[step.best].label : scenOptText(step.opts[step.best])) : null;
    run.feedback = e;
    render();
    var fb = document.querySelector('.mp-check');
    if (fb && fb.scrollIntoView) fb.scrollIntoView({ block: 'center' });
    return;
  }
  run.pos++;
  render(); window.scrollTo(0, 0);
}
function scenFeedbackCard(run, step) {
  var e = run.feedback;
  var card = el('div', 'mp-check animate-pop-in ' + (e.hasBest ? (e.matched ? 'match' : 'miss') : 'note'));
  card.setAttribute('role', 'status');
  var verdict = el('div', 'mp-verdict');
  verdict.innerHTML = e.hasBest ? (icon(e.matched ? 'check' : 'x', 18) + '<span>' + (e.matched ? 'Matches the MP' : 'The MP points another way') + '</span>')
    : (icon('book', 18) + '<span>What the MP says</span>');
  card.appendChild(verdict);
  var you = el('p', 'mp-you'); you.innerHTML = '<b>Your call:</b> '; you.appendChild(document.createTextNode(e.pick));
  card.appendChild(you);
  if (e.hasBest && !e.matched) {
    var best = el('p', 'mp-best'); best.innerHTML = '<b>MP call:</b> '; best.appendChild(document.createTextNode(e.bestText));
    card.appendChild(best);
  }
  card.appendChild(el('p', 'mp-text', e.mp));
  var next = el('button', 'btn block press', 'Next'); next.type = 'button';
  next.addEventListener('click', function () { run.feedback = null; run.pos++; render(); window.scrollTo(0, 0); });
  card.appendChild(next);
  return card;
}
function scenOptClears(o) { return (typeof o === 'string' || !o.c) ? [] : o.c; }
function startScenRun(i) {
  state.scenRun = { scen: i, pos: 0, log: [], reported: false, feedback: null, orders: {} };
  touchDay();
  render();
  window.scrollTo(0, 0);
}
function endScenRun() { state.scenRun = null; render(); window.scrollTo(0, 0); }
function scenLog(run, label, pick, clears, unit) {
  run.log.push({ label: label, pick: pick, clears: clears || [], unit: unit || null });
}
function renderScenarios(root) {
  if (state.scenRun) { renderScenarioRun(root); return; }
  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">The game</span><h2>Scenarios</h2>'
    + '<p>Pick a scene, make the calls, move on the picture. Every call gets checked against the Phoenix MPs, and the debrief puts your whole run side by side with them.</p>';
  root.appendChild(head);
  var legend = el('div', 'card');
  legend.innerHTML = '<p style="margin:0 0 6px;font-size:14px"><b>How to read the game:</b></p>'
    + '<p style="margin:0 0 4px;font-size:14px"><span style="color:#1E8A4C">\u25cf</span> Green pins move you &nbsp; '
    + '<span style="color:#2E86C1">\u25a0</span> Blue boxes aim water &nbsp; '
    + '<span style="color:#6C3483">\u25cf</span> Purple options place units &nbsp; '
    + '<span style="color:#B7791F">\u25cf</span> Amber options are size-up questions</p>';
  root.appendChild(legend);
  SCENARIOS.forEach(function (sc, i) {
    var b = el('button', 'tcard press'); b.type = 'button';
    b.setAttribute('aria-label', sc.title);
    var inner = el('div', 'tcard-inner');
    inner.appendChild(el('div', 'tnum', String(i + 1)));
    var txt = el('div');
    txt.appendChild(el('h3', null, sc.title));
    txt.appendChild(el('p', 'sub', sc.sub + ' \u00b7 ' + sc.steps.length + ' beats'));
    inner.appendChild(txt);
    var prog = el('div', 'tprog');
    prog.appendChild(el('small', null, 'Played ' + store.games.scen.plays + ' time' + (store.games.scen.plays === 1 ? '' : 's')));
    inner.appendChild(prog);
    b.appendChild(inner);
    b.addEventListener('click', function () { startScenRun(i); });
    root.appendChild(b);
  });
}
function scenStepVisible(step, run) {
  if (!step.showIf) return true;
  var e = scenFindLog(run, step.showIf.label);
  return !!e && e.pick.toLowerCase().indexOf(step.showIf.match.toLowerCase()) >= 0;
}
function renderScenarioRun(root) {
  var run = state.scenRun;
  var sc = SCENARIOS[run.scen];
  while (run.pos < sc.steps.length && !scenStepVisible(sc.steps[run.pos], run)) { run.pos++; }
  if (run.pos >= sc.steps.length) { renderScenarioReport(root); return; }
  var step = sc.steps[run.pos];

  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">Scenarios</span><h2>' + sc.title + '</h2>'
    + '<p>Beat ' + (run.pos + 1) + ' of ' + sc.steps.length + '</p>';
  root.appendChild(head);

  var disp = el('div', 'call-dispatch');
  disp.innerHTML = '<span class="call-dispatch-tag">DISPATCH</span><p></p>';
  disp.querySelector('p').textContent = sc.dispatch;
  root.appendChild(disp);

  var stage = el('div', 'scen-stage');
  var img = document.createElement('img');
  img.className = 'scen-img';
  img.src = sc.image;
  img.alt = sc.imageAlt;
  stage.appendChild(img);
  var choiceList = null;
  if (step.hotspots) {
    // Numbered pins on the picture + full-width labeled choices below.
    // Labels never sit on the photo, so they can't pile on top of each other.
    choiceList = el('div', 'scen-choices');
    sc.hotspots.forEach(function (h, hi) {
      var num = String(hi + 1);
      var pick = function () {
        scenPick(run, step, h.label + (h.note ? ' \u2014 ' + h.note : ''), h.c || [], null, hi === step.best);
      };
      var aria = num + '. ' + h.label + (h.note ? ': ' + h.note : '');
      var pin;
      if (h.kind === 'spray') {
        pin = el('button', 'scen-spray press'); pin.type = 'button';
        pin.style.left = (h.x - h.w / 2) + '%';
        pin.style.top = (h.y - h.h / 2) + '%';
        pin.style.width = h.w + '%';
        pin.style.height = h.h + '%';
        pin.appendChild(el('span', 'scen-pin-num', num));
      } else {
        pin = el('button', 'scen-pin press', num); pin.type = 'button';
        pin.style.left = h.x + '%';
        pin.style.top = h.y + '%';
      }
      pin.setAttribute('aria-label', aria);
      pin.addEventListener('click', pick);
      stage.appendChild(pin);

      var row = el('button', 'scen-choice press ' + (h.kind === 'spray' ? 'spray' : 'move')); row.type = 'button';
      row.innerHTML = '<span class="scen-choice-num"></span><span class="scen-choice-t"><b></b></span>';
      row.querySelector('.scen-choice-num').textContent = num;
      row.querySelector('b').textContent = (h.kind === 'spray' ? 'Aim water: ' : '') + h.label;
      row.setAttribute('aria-label', aria);
      row.addEventListener('click', pick);
      choiceList.appendChild(row);
    });
  }
  root.appendChild(stage);

  if (run.pos === 0) {
    var nar = el('div', 'card call-narr');
    nar.innerHTML = '<p></p>';
    nar.querySelector('p').textContent = sc.arrival;
    root.appendChild(nar);
  }

  root.appendChild(el('h2', 'sec-head', step.label));
  var qcard = el('div', 'card');
  qcard.innerHTML = '<p style="margin:0"></p>';
  qcard.querySelector('p').textContent = step.q;
  root.appendChild(qcard);

  if (run.feedback) {
    root.appendChild(scenFeedbackCard(run, step));
  } else if (step.hotspots) {
    root.appendChild(choiceList);
  } else {
    var opts = el('div', 'call-opts');
    // Shuffle once per beat so the MP-backed option isn't always on top.
    run.orders = run.orders || {};
    if (!run.orders[run.pos]) run.orders[run.pos] = shuffleIdx(step.opts.length);
    run.orders[run.pos].forEach(function (oi) {
      var opt = step.opts[oi];
      var b = el('button', 'call-opt press' + (step.cat ? ' opt-' + step.cat : '')); b.type = 'button';
      b.textContent = scenOptText(opt);
      b.addEventListener('click', function () {
        scenPick(run, step, scenOptText(opt), scenOptClears(opt), step.unit || null, oi === step.best);
      });
      opts.appendChild(b);
    });
    root.appendChild(opts);
  }

  if (run.log.length) {
    root.appendChild(el('h2', 'sec-head', 'Your log so far'));
    var logCard = el('div', 'card');
    run.log.forEach(function (entry, li) {
      var p = el('p', null, null);
      p.style.margin = '0 0 6px';
      p.style.fontSize = '14px';
      p.textContent = (li + 1) + '. ' + entry.label + ' \u2014 ' + entry.pick;
      logCard.appendChild(p);
    });
    root.appendChild(logCard);
  }

  var quit = el('div', 'drill-cta');
  var qb = el('button', 'btn ghost block press', 'Quit run');
  qb.type = 'button';
  qb.addEventListener('click', endScenRun);
  quit.appendChild(qb);
  root.appendChild(quit);
}
function scenFindLog(run, label) {
  for (var i = 0; i < run.log.length; i++) if (run.log[i].label === label) return run.log[i];
  return null;
}
function scenSection(root, title, bodyText) {
  root.appendChild(el('h2', 'sec-head', title));
  var card = el('div', 'card');
  var p = el('p', null, null);
  p.style.margin = '0';
  p.textContent = bodyText;
  card.appendChild(p);
  root.appendChild(card);
}
function renderScenarioReport(root) {
  var run = state.scenRun, sc = SCENARIOS[run.scen];
  if (!run.reported) { store.games.scen.plays++; saveStore(); run.reported = true; }

  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">Debrief</span><h2>' + sc.title + ' \u2014 debrief</h2>'
    + '<p>What you did, organized the way the On Scene Report deck teaches it, checked against the Phoenix MPs.</p>';
  root.appendChild(head);

  var checked = run.log.filter(function (e) { return e.hasBest; });
  if (checked.length) {
    var hits = checked.filter(function (e) { return e.matched; }).length;
    root.appendChild(el('h2', 'sec-head', 'MP check'));
    var sum = el('div', 'card mp-summary');
    sum.innerHTML = '<b class="tabular">' + hits + ' of ' + checked.length + '</b><span>calls matched the MP</span>';
    root.appendChild(sum);
    checked.filter(function (e) { return !e.matched; }).forEach(function (e) {
      var c = el('div', 'card mp-miss');
      c.appendChild(el('h4', null, e.label));
      var y = el('p'); y.innerHTML = '<b>You:</b> '; y.appendChild(document.createTextNode(e.pick)); c.appendChild(y);
      var b = el('p'); b.innerHTML = '<b>MP:</b> '; b.appendChild(document.createTextNode(e.bestText)); c.appendChild(b);
      c.appendChild(el('p', 'mp-text', e.mp));
      root.appendChild(c);
    });
  }

  function pickText(label) {
    var e = scenFindLog(run, label);
    return e ? e.pick : 'Not picked.';
  }
  scenSection(root, 'Fireground factors', pickText('Fireground factors'));
  scenSection(root, 'Risk profile', pickText('Risk profile'));
  scenSection(root, 'Strategy', pickText('Strategy'));
  scenSection(root, 'Incident action plan', pickText('Incident action plan'));
  scenSection(root, 'Tactical priorities', pickText('Tactical priorities'));
  scenSection(root, 'On-scene report', pickText('On-scene report'));
  if (scenFindLog(run, 'Follow-up report')) scenSection(root, 'Follow-up report', pickText('Follow-up report'));
  scenSection(root, 'Initial 3 & 1', pickText('Initial 3 & 1'));

  function pickLatest(labels) {
    var found = null;
    run.log.forEach(function (e) { if (labels.indexOf(e.label) >= 0) found = e; });
    return found ? found.pick : 'Not picked.';
  }
  scenSection(root, 'Victim status', pickLatest(['Victim status', 'Victim status (update)']));
  scenSection(root, 'What\u2019s happening inside?', pickLatest(['What\u2019s happening inside?', 'What\u2019s happening inside? (update)']));

  root.appendChild(el('h2', 'sec-head', 'The 3 clears'));
  ['All Clear', 'Fire Control', 'Loss Stopped'].forEach(function (clear) {
    var card = el('div', 'card');
    var h = el('h4', null, clear);
    h.style.margin = '0 0 8px';
    card.appendChild(h);
    var found = false;
    run.log.forEach(function (entry) {
      if (entry.clears.indexOf(clear) >= 0) {
        found = true;
        var p = el('p', null, null);
        p.style.margin = '0 0 6px';
        p.style.fontSize = '14px';
        p.textContent = (entry.unit || entry.label) + ' \u2014 ' + entry.pick;
        card.appendChild(p);
      }
    });
    if (!found) {
      var none = el('p', null, null);
      none.style.margin = '0';
      none.style.fontSize = '14px';
      none.style.color = 'var(--th-ink-2)';
      none.textContent = 'Nothing assigned to this.';
      card.appendChild(none);
    }
    root.appendChild(card);
  });

  scenSection(root, 'Crew of 4', pickText('Crew of 4'));

  root.appendChild(el('h2', 'sec-head', 'Other units'));
  var unitsCard = el('div', 'card');
  var anyUnit = false;
  run.log.forEach(function (entry) {
    if (entry.unit) {
      anyUnit = true;
      var p = el('p', null, null);
      p.style.margin = '0 0 6px';
      p.style.fontSize = '14px';
      p.textContent = entry.unit + ' \u2014 ' + entry.pick;
      unitsCard.appendChild(p);
    }
  });
  if (!anyUnit) {
    var nu = el('p', null, null);
    nu.style.margin = '0';
    nu.style.fontSize = '14px';
    nu.textContent = 'No other units assigned.';
    unitsCard.appendChild(nu);
  }
  root.appendChild(unitsCard);

  root.appendChild(el('h2', 'sec-head', 'Everything, in order'));
  var allCard = el('div', 'card');
  run.log.forEach(function (entry, li) {
    var p = el('p', null, null);
    p.style.margin = '0 0 6px';
    p.style.fontSize = '14px';
    p.textContent = (li + 1) + '. ' + entry.label + ' \u2014 ' + entry.pick;
    allCard.appendChild(p);
  });
  root.appendChild(allCard);

  var cta = el('div', 'drill-cta');
  var again = el('button', 'btn block press', 'Run it again'); again.type = 'button';
  again.addEventListener('click', function () { startScenRun(run.scen); });
  var back = el('button', 'btn ghost block press', 'Back to Scenarios'); back.type = 'button';
  back.addEventListener('click', endScenRun);
  cta.appendChild(again); cta.appendChild(back);
  root.appendChild(cta);
}
function scopeLabel(sc) {
  return sc.type === 'all' ? 'All topics' : 'Topic ' + TOPICS[sc.n].n + ' \u00b7 ' + TOPICS[sc.n].title;
}

/* ============================================================
   PRACTICE EXAM — 30-question paramedic test simulation
   ============================================================ */
var EXAM_LEN = 30, EXAM_TOPIC = -1;
function paramedicTopic() {
  if (EXAM_TOPIC < 0) {
    for (var i = 0; i < TOPICS.length; i++) if (TOPICS[i].title === 'Paramedic Exam Prep') { EXAM_TOPIC = i; break; }
  }
  return EXAM_TOPIC;
}
/* ---------- exams: practice (feedback each item) or timed simulation ---------- */
var EXAM_KINDS = {
  candidate: { title: 'Paramedic candidate simulation', sub: '150 questions · 3 hours · 70% to pass · EMT scope', n: 150, mins: 180, pass: 70, hubs: [3, 2], emtOnly: true, timed: true },
  quick: { title: 'Paramedic quick 30', sub: '30 questions, feedback after each', n: 30, pass: 70, hubs: [3] },
  academy: { title: 'Academy written exam', sub: '50 questions across Academy + EMT topics', n: 50, mins: 60, pass: 70, hubs: [0, 2], timed: true },
  probation: { title: 'Probation MP exam', sub: '50 questions on MPs, SOPs and radio', n: 50, mins: 60, pass: 80, hubs: [1], timed: true },
  medical: { title: 'EMT / medical exam', sub: '50 questions across the Medical topics', n: 50, mins: 60, pass: 70, hubs: [2], timed: true }
};
function examPool(k) {
  var K = EXAM_KINDS[k], pool = [];
  K.hubs.forEach(function (h) {
    hubTopicIdx(h).forEach(function (t) {
      TOPICS[t].cards.forEach(function (c, i) { if (!(K.emtOnly && c.lvl === 'medic')) pool.push({ t: t, i: i }); });
    });
  });
  return pool;
}
/* Spread picks across topics and (when tagged) competencies so a short exam isn't all one deck. */
function examPick(pool, n) {
  var groups = {}, keys = [];
  pool.forEach(function (it) {
    var c = TOPICS[it.t].cards[it.i], g = c.comp ? 'c' + c.comp : 't' + it.t;
    if (!groups[g]) { groups[g] = []; keys.push(g); }
    groups[g].push(it);
  });
  keys.forEach(function (g) { shuffle(groups[g]); });
  shuffle(keys);
  var out = [];
  while (out.length < n) {
    var added = false;
    for (var j = 0; j < keys.length && out.length < n; j++) { var it = groups[keys[j]].pop(); if (it) { out.push(it); added = true; } }
    if (!added) break;
  }
  return shuffle(out);
}
function chooseExam() {
  openSheet('Exams', 'Timed exams hold all feedback until the end, like the real thing. Practice gives feedback after every question.',
    Object.keys(EXAM_KINDS).map(function (k) {
      var K = EXAM_KINDS[k], pool = examPool(k).length;
      return { label: K.title, sub: K.sub + ' · ' + pool + ' in the bank', onPick: function () { startExamRun(k); } };
    }));
}
function startExamRun(kind) {
  if (!kind) { chooseExam(); return; }
  var K = EXAM_KINDS[kind], pool = examPool(kind);
  if (!pool.length) return;
  var items = examPick(pool, Math.min(K.n, pool.length));
  state.examRun = { kind: kind, items: items, pos: 0, answers: [], orders: {}, start: Date.now(), timed: !!K.timed, limit: K.timed ? K.mins * 60000 : 0 };
  if (state.examRun.timed) startExamClock();
  render(); window.scrollTo(0, 0);
}
var examClock = null;
function startExamClock() {
  stopExamClock();
  examClock = setInterval(function () {
    var run = state.examRun;
    if (!run || !run.timed) { stopExamClock(); return; }
    var el2 = document.getElementById('exam-clock');
    var left = run.limit - (Date.now() - run.start);
    if (left <= 0) { run.pos = run.items.length; run.timeUp = true; stopExamClock(); render(); return; }
    if (el2) el2.textContent = fmtClock(left);
  }, 1000);
}
function stopExamClock() { if (examClock) { clearInterval(examClock); examClock = null; } }
function fmtClock(ms) { var s2 = Math.max(0, Math.round(ms / 1000)), h = Math.floor(s2 / 3600), m = Math.floor(s2 % 3600 / 60), x = s2 % 60; return (h ? h + ':' : '') + ('0' + m).slice(-2) + ':' + ('0' + x).slice(-2); }
function endExamRun() {
  if (state.examRun && state.examRun.pos < state.examRun.items.length && state.examRun.answers.length &&
      !confirm('Quit this exam? Your answers so far won’t be scored.')) return;
  stopExamClock(); state.examRun = null; render(); window.scrollTo(0, 0);
}
function renderExamView(root) {
  var run = state.examRun, K = EXAM_KINDS[run.kind];
  if (run.pos >= run.items.length) { renderExamScore(root); return; }
  var it = run.items[run.pos], card = TOPICS[it.t].cards[it.i], ans = run.answers[run.pos];
  if (!run.orders[run.pos]) run.orders[run.pos] = shuffleIdx(card.opts.length);
  var head = el('div', 'view-head');
  head.innerHTML = '<span class="kicker">' + K.title + '</span><h2>Question ' + (run.pos + 1) + ' of ' + run.items.length + '</h2>'
    + (run.timed ? '<p>Time left: <b class="tabular" id="exam-clock">' + fmtClock(run.limit - (Date.now() - run.start)) + '</b> &middot; answered <span class="tabular">' + run.answers.filter(Boolean).length + '</span></p>'
      : '<p>Score: <span class="tabular"><b>' + run.answers.filter(function (a) { return a && a.ok; }).length + '</b></span></p>');
  root.appendChild(head);
  var bar = el('div', 'pbar exam-bar'); bar.innerHTML = '<i style="width:' + Math.round(run.pos / run.items.length * 100) + '%"></i>';
  root.appendChild(bar);

  var dc = el('div', 'dcard');
  dc.appendChild(el('span', 'tag', TOPICS[it.t].title + (card.comp ? ' · competency ' + card.comp : '')));
  dc.appendChild(el('p', 'q', card.q));
  var showFb = ans && !run.timed;
  run.orders[run.pos].forEach(function (oi, pos) {
    var b = el('button', 'mc-opt press'); b.type = 'button';
    b.innerHTML = '<span class="mc-letter">' + 'ABCD'[pos] + '</span><span></span>';
    b.querySelector('span:last-child').textContent = card.opts[oi];
    if (ans) {
      if (run.timed) { b.classList.add(ans.pick === oi ? 'mc-picked' : 'mc-dim'); }
      else { b.disabled = true; b.classList.add(oi === 0 ? 'mc-right' : (oi === ans.pick ? 'mc-wrong' : 'mc-dim')); }
    }
    b.addEventListener('click', function () {
      if (ans && !run.timed) return;
      run.answers[run.pos] = { pick: oi, ok: oi === 0 };
      if (!run.timed) gradeCard(it.t, it.i, oi === 0);
      if (run.timed) { run.pos++; render(); window.scrollTo(0, 0); }
      else { render(); var a2 = document.querySelector('.exam-next'); if (a2 && a2.scrollIntoView) a2.scrollIntoView({ block: 'center' }); }
    });
    dc.appendChild(b);
  });
  if (showFb) {
    var fb = el('div', 'mc-feedback ' + (ans.ok ? 'good' : 'bad')); fb.setAttribute('role', 'status');
    var fbb = el('b', null, ans.ok ? 'Correct.' : 'Wrong. The answer: ' + card.opts[0]); fb.appendChild(fbb);
    dc.appendChild(fb);
    if (card.why) dc.appendChild(el('p', 'why', card.why));
  }
  root.appendChild(dc);

  var cta = el('div', 'drill-cta action-bar');
  if (showFb || (run.timed && run.pos > 0)) {
    if (showFb) {
      var nb = el('button', 'btn block press exam-next', run.pos + 1 >= run.items.length ? 'See your score' : 'Next question'); nb.type = 'button';
      nb.addEventListener('click', function () { run.pos++; render(); window.scrollTo(0, 0); });
      cta.appendChild(nb);
    }
  }
  if (run.timed) {
    var row = el('div', 'btn-row');
    var pv = el('button', 'btn ghost press', 'Back'); pv.type = 'button'; pv.disabled = run.pos === 0;
    pv.addEventListener('click', function () { run.pos--; render(); window.scrollTo(0, 0); });
    var sk = el('button', 'btn ghost press', run.pos + 1 >= run.items.length ? 'Finish' : 'Skip'); sk.type = 'button';
    sk.addEventListener('click', function () {
      if (run.pos + 1 >= run.items.length) {
        var left = run.items.length - run.answers.filter(Boolean).length;
        if (left && !confirm(left + ' unanswered. Finish and score it anyway?')) return;
      }
      run.pos++; render(); window.scrollTo(0, 0);
    });
    row.appendChild(pv); row.appendChild(sk); cta.appendChild(row);
  }
  var qb = el('button', 'btn ghost block press quit-btn', 'Quit exam'); qb.type = 'button';
  qb.addEventListener('click', endExamRun);
  cta.appendChild(qb);
  root.appendChild(cta);
}
function renderExamScore(root) {
  var run = state.examRun, K = EXAM_KINDS[run.kind], n = run.items.length;
  stopExamClock();
  if (!run.scored) {
    run.scored = true;
    if (run.timed) run.items.forEach(function (it, j) { var a = run.answers[j]; gradeCard(it.t, it.i, !!(a && a.ok)); });
    run.score = run.answers.filter(function (a) { return a && a.ok; }).length;
    var g = store.games.exam; g.plays++; if (run.kind === 'quick' && run.score > g.best) g.best = run.score;
    store.exams = store.exams || [];
    store.exams.push({ kind: run.kind, date: Date.now(), n: n, score: run.score, mins: Math.round((Date.now() - run.start) / 60000) });
    store.exams = store.exams.slice(-50);
    touchDay(); saveStore();
  }
  var s2 = run.score, pct = Math.round(s2 / n * 100), passed = pct >= K.pass;
  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">' + K.title + (run.timeUp ? ' · time’s up' : '') + '</span><h2>' + s2 + ' / ' + n + ' (' + pct + '%)</h2>'
    + '<p class="' + (passed ? 'pass' : 'fail') + '"><b>' + (passed ? 'Pass' : 'Below the ' + K.pass + '% line') + '</b></p>';
  root.appendChild(head);
  // breakdown by competency (when tagged) else by topic
  var groups = {}, order = [];
  run.items.forEach(function (it, j) {
    var c = TOPICS[it.t].cards[it.i], key = c.comp ? 'Competency ' + c.comp : TOPICS[it.t].title;
    if (!groups[key]) { groups[key] = { n: 0, ok: 0 }; order.push(key); }
    groups[key].n++; if (run.answers[j] && run.answers[j].ok) groups[key].ok++;
  });
  order.sort(function (a, b) { return groups[a].ok / groups[a].n - groups[b].ok / groups[b].n; });
  root.appendChild(el('h2', 'sec-head', 'Weakest areas first'));
  var bd = el('div', 'card');
  order.slice(0, 15).forEach(function (k) {
    var g2 = groups[k], p2 = Math.round(g2.ok / g2.n * 100);
    var row = el('div', 'prow');
    row.innerHTML = '<div class="t"><b></b><small class="tabular">' + g2.ok + '/' + g2.n + '</small><div class="pbar"><i style="width:' + p2 + '%"></i></div></div><span class="ppct tabular">' + p2 + '%</span>';
    row.querySelector('b').textContent = k;
    bd.appendChild(row);
  });
  root.appendChild(bd);
  var hist = (store.exams || []).filter(function (e) { return e.kind === run.kind; }).slice(-6);
  if (hist.length > 1) {
    root.appendChild(el('h2', 'sec-head', 'Your last attempts'));
    var hc = el('div', 'card');
    hist.forEach(function (e) {
      var d = new Date(e.date);
      hc.appendChild(el('p', 'hist-row', (d.getMonth() + 1) + '/' + d.getDate() + ' — ' + Math.round(e.score / e.n * 100) + '% (' + e.score + '/' + e.n + ')' + (e.mins ? ', ' + e.mins + ' min' : '')));
    });
    root.appendChild(hc);
  }
  var misses = run.items.filter(function (it, j) { return !(run.answers[j] && run.answers[j].ok); });
  if (misses.length) {
    root.appendChild(el('h2', 'sec-head', 'Misses (' + misses.length + ') — now in your review queue'));
    misses.slice(0, 40).forEach(function (it) {
      var c = TOPICS[it.t].cards[it.i], m = el('div', 'card miss-card');
      m.appendChild(el('p', 'q-sm', c.q));
      var a = el('p', 'a-sm'); a.innerHTML = '<b>Answer:</b> '; a.appendChild(document.createTextNode(c.opts[0])); m.appendChild(a);
      if (c.why) m.appendChild(el('p', 'why', c.why));
      root.appendChild(m);
    });
  }
  var cta = el('div', 'drill-cta');
  var again = el('button', 'btn block press', 'Run it back'); again.type = 'button';
  var kind = run.kind;
  again.addEventListener('click', function () { startExamRun(kind); });
  var back = el('button', 'btn ghost block press', 'Done'); back.type = 'button';
  back.addEventListener('click', function () { state.examRun = null; render(); window.scrollTo(0, 0); });
  cta.appendChild(again); cta.appendChild(back);
  root.appendChild(cta);
}

/* ============================================================
   MED MATH — GCS / Apgar / rule-of-nines calculation drills
   ============================================================ */
var CALC_LEN = 10;
var GCS_E = [[4, 'opens eyes spontaneously'], [3, 'opens eyes to voice'], [2, 'opens eyes to pain'], [1, 'no eye opening']];
var GCS_V = [[5, 'oriented, converses normally'], [4, 'confused, disoriented'], [3, 'inappropriate words'], [2, 'incomprehensible sounds'], [1, 'no verbal response']];
var GCS_M = [[6, 'obeys commands'], [5, 'localizes pain'], [4, 'withdraws from pain'], [3, 'abnormal flexion (decorticate)'], [2, 'abnormal extension (decerebrate)'], [1, 'no motor response']];
var APGAR_SIGNS = [
  ['Appearance', [[2, 'pink all over'], [1, 'pink body, blue extremities'], [0, 'blue-gray all over']]],
  ['Pulse', [[2, 'over 100 bpm'], [1, 'under 100 bpm'], [0, 'absent']]],
  ['Grimace', [[2, 'coughs, sneezes, or cries'], [1, 'grimace or weak cry'], [0, 'no response']]],
  ['Activity', [[2, 'active, good flexion'], [1, 'some flexion'], [0, 'limp, floppy']]],
  ['Respiration', [[2, 'strong cry'], [1, 'slow, weak, irregular'], [0, 'absent']]]
];
var NINES = [['head', 9], ['one arm', 9], ['other arm', 9], ['chest (front torso)', 18], ['back', 18], ['one leg', 18], ['other leg', 18]];
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
function genGCS() {
  var e = pick(GCS_E), v = pick(GCS_V), m = pick(GCS_M);
  return { kind: 'GCS', prompt: 'Head-injury patient: ' + e[1] + '; ' + v[1] + '; ' + m[1] + '. What is the GCS?', answer: e[0] + v[0] + m[0], unit: '' };
}
function genApgar() {
  var parts = [], total = 0;
  APGAR_SIGNS.forEach(function (sg) {
    var r = pick(sg[1]); total += r[0]; parts.push(sg[0] + ': ' + r[1]);
  });
  return { kind: 'Apgar', prompt: 'Newborn at 5 minutes — ' + parts.join('; ') + '. What is the Apgar score?', answer: total, unit: '' };
}
function genNines() {
  var n = 1 + Math.floor(Math.random() * 3), pool = shuffleIdx(NINES.length).slice(0, n), total = 0, names = [];
  pool.forEach(function (i) { total += NINES[i][1]; names.push(NINES[i][0]); });
  return { kind: 'Rule of nines', prompt: 'Adult with partial/full-thickness burns to ' + names.join(', ') + '. Estimated body surface area burned?', answer: total, unit: '%' };
}
/* ---------- drug math: numbers are practice values for "Drug A/B/C", not dosing guidance ---------- */
function rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
function r1(x) { return Math.round(x * 10) / 10; }
function r2(x) { return Math.round(x * 100) / 100; }
function genLbKg() {
  var lb = rnd(18, 260), kg = r1(lb / 2.2);
  return { kind: 'Weight conversion', prompt: 'Patient weighs ' + lb + ' lb. Weight in kg? (round to 0.1)', answer: kg, unit: 'kg', tol: 0.15,
    steps: lb + ' lb ÷ 2.2 = ' + kg + ' kg' };
}
function genMgKg() {
  var kg = rnd(8, 110), per = pick([0.01, 0.02, 0.1, 0.5, 1, 1.5, 2, 5]), dose = r2(kg * per);
  return { kind: 'Weight-based dose', prompt: 'Drug A is ordered at ' + per + ' mg/kg. Patient weighs ' + kg + ' kg. Dose in mg?', answer: dose, unit: 'mg', tol: Math.max(0.01, dose * 0.01),
    steps: kg + ' kg × ' + per + ' mg/kg = ' + dose + ' mg' };
}
function genVolume() {
  var conc = pick([[1, 1], [10, 1], [50, 1], [100, 10], [1, 10], [4, 2], [25, 1]]); // [mg, mL]
  var mgPerMl = conc[0] / conc[1], ml = pick([0.5, 1, 1.5, 2, 2.5, 3, 4, 5]), dose = r2(ml * mgPerMl);
  return { kind: 'Volume to give', prompt: 'Order: ' + dose + ' mg of Drug B. On hand: ' + conc[0] + ' mg in ' + conc[1] + ' mL. How many mL do you give?', answer: ml, unit: 'mL', tol: 0.05,
    steps: 'Concentration = ' + conc[0] + ' mg ÷ ' + conc[1] + ' mL = ' + r2(mgPerMl) + ' mg/mL. ' + dose + ' mg ÷ ' + r2(mgPerMl) + ' mg/mL = ' + ml + ' mL' };
}
function genDrip() {
  var set = pick([10, 15, 60]), vol = pick([100, 250, 500, 1000]), mins = pick([30, 60, 120, 240]);
  var gtt = Math.round(vol * set / mins);
  return { kind: 'Drip rate', prompt: 'Run ' + vol + ' mL over ' + mins + ' minutes with a ' + set + ' gtt/mL set. Drops per minute? (round to whole)', answer: gtt, unit: 'gtt/min', tol: 1,
    steps: '(' + vol + ' mL × ' + set + ' gtt/mL) ÷ ' + mins + ' min = ' + gtt + ' gtt/min' };
}
function genMlHr() {
  var vol = pick([250, 500, 1000]), hrs = pick([2, 4, 6, 8, 12]), rate = r1(vol / hrs);
  return { kind: 'Infusion rate', prompt: 'Infuse ' + vol + ' mL over ' + hrs + ' hours. Rate in mL/hr?', answer: rate, unit: 'mL/hr', tol: 0.5,
    steps: vol + ' mL ÷ ' + hrs + ' hr = ' + rate + ' mL/hr' };
}
function genMcgKgMin() {
  var kg = rnd(50, 100), dose = pick([2, 5, 10]), mg = pick([400, 800]), bag = 250;
  var mcgPerMl = mg * 1000 / bag, rate = r1(dose * kg * 60 / mcgPerMl);
  return { kind: 'mcg/kg/min drip', prompt: 'Drug C at ' + dose + ' mcg/kg/min for a ' + kg + ' kg patient. Bag: ' + mg + ' mg in ' + bag + ' mL. Pump rate in mL/hr? (0.1)', answer: rate, unit: 'mL/hr', tol: Math.max(0.2, rate * 0.02),
    steps: 'Concentration = ' + mg + ' mg × 1000 ÷ ' + bag + ' mL = ' + mcgPerMl + ' mcg/mL. ' + dose + ' × ' + kg + ' kg = ' + (dose * kg) + ' mcg/min, × 60 = ' + (dose * kg * 60) + ' mcg/hr, ÷ ' + mcgPerMl + ' = ' + rate + ' mL/hr' };
}
function genPercent() {
  var pct = pick([5, 10, 25, 50]), ml = pick([50, 100, 250, 500]), g = r1(pct * ml / 100);
  return { kind: 'Percent solution', prompt: 'How many grams of dextrose are in ' + ml + ' mL of D' + pct + ' (' + pct + '%)?', answer: g, unit: 'g', tol: 0.1,
    steps: pct + '% = ' + pct + ' g per 100 mL. ' + pct + ' × ' + ml + ' ÷ 100 = ' + g + ' g' };
}
function genPedsWt() {
  var age = rnd(1, 10), kg = age * 2 + 8;
  return { kind: 'Pediatric weight estimate', prompt: 'A ' + age + '-year-old, no scale or tape. Estimated weight with (age × 2) + 8?', answer: kg, unit: 'kg', tol: 0.1,
    steps: '(' + age + ' × 2) + 8 = ' + kg + ' kg. Use a length-based tape when you have one.' };
}
var CALC_SETS = {
  mixed: { label: 'Mixed', sub: 'Drug math + scores', gens: [genMgKg, genVolume, genDrip, genMlHr, genLbKg, genGCS, genApgar, genNines, genPercent, genPedsWt] },
  drug: { label: 'Drug math', sub: 'mg/kg, mL to give, drips, mL/hr, mcg/kg/min, %, conversions', gens: [genMgKg, genVolume, genDrip, genMlHr, genMcgKgMin, genLbKg, genPercent, genPedsWt] },
  scores: { label: 'Scores', sub: 'GCS, Apgar, rule of nines', gens: [genGCS, genApgar, genNines] }
};
function startCalcRun(set) {
  if (!set) {
    openSheet('Math drills', 'Practice numbers use generic drugs — this trains the math, not doses.', Object.keys(CALC_SETS).map(function (k) {
      return { label: CALC_SETS[k].label, sub: CALC_SETS[k].sub, onPick: function () { startCalcRun(k); } };
    }));
    return;
  }
  var probs = [], i, gens = shuffle(CALC_SETS[set].gens.slice());
  for (i = 0; i < CALC_LEN; i++) probs.push(gens[i % gens.length]());
  state.calcRun = { probs: shuffle(probs), pos: 0, score: 0, checked: false, set: set };
  render(); window.scrollTo(0, 0);
}
function endCalcRun() { state.calcRun = null; render(); window.scrollTo(0, 0); }
function renderCalcView(root) {
  var run = state.calcRun;
  if (run.pos >= run.probs.length) { renderCalcScore(root); return; }
  var p = run.probs[run.pos];
  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">Math</span><h2>' + p.kind + ' ' + (run.pos + 1) + ' of ' + run.probs.length + '</h2>'
    + '<p>Score: <span class="tabular"><b>' + run.score + '</b></span> &middot; Best: <span class="tabular"><b>' + store.games.calc.best + '</b></span></p>';
  root.appendChild(head);

  var dc = el('div', 'dcard animate-pop-in');
  dc.appendChild(el('span', 'tag', 'Calculation drill'));
  var pq = el('p', 'q', null); pq.textContent = p.prompt; dc.appendChild(pq);
  var row = el('div', 'calc-row');
  var inp = document.createElement('input');
  inp.type = 'number'; inp.inputMode = 'decimal'; inp.step = 'any'; inp.className = 'calc-input';
  inp.placeholder = 'Your answer'; inp.setAttribute('aria-label', 'Your answer');
  row.appendChild(inp);
  if (p.unit) { var u = el('span', 'calc-unit', p.unit); row.appendChild(u); }
  dc.appendChild(row);
  var fb = el('div', 'mc-feedback hidden'); fb.setAttribute('role', 'status'); dc.appendChild(fb);
  root.appendChild(dc);

  var cta = el('div', 'drill-cta');
  var chk = el('button', 'btn block press', 'Check it'); chk.type = 'button';
  chk.addEventListener('click', function () {
    if (run.checked) return;
    var val = parseFloat(inp.value);
    var ok = !isNaN(val) && Math.abs(val - p.answer) <= (p.tol || 0.01);
    run.checked = true;
    inp.disabled = true;
    fb.classList.remove('hidden');
    fb.classList.add(ok ? 'good' : 'bad');
    fb.innerHTML = '<b>' + (ok ? 'Correct.' : 'Wrong — the answer is ' + p.answer + ' ' + (p.unit || '') + '.') + '</b>';
    if (p.steps) fb.appendChild(el('p', 'why', 'Work it: ' + p.steps));
    if (ok) run.score++;
    touchDay(); saveStore();
    chk.textContent = (run.pos + 1 >= run.probs.length) ? 'See your score' : 'Next problem';
    chk.addEventListener('click', function () { run.pos++; run.checked = false; render(); window.scrollTo(0, 0); }, { once: true });
  });
  cta.appendChild(chk);
  root.appendChild(cta);

  var quit = el('div', 'drill-cta');
  var qb = el('button', 'btn ghost block press', 'Quit'); qb.type = 'button';
  qb.addEventListener('click', endCalcRun);
  quit.appendChild(qb); root.appendChild(quit);
  setTimeout(function () { try { inp.focus(); } catch (e) {} }, 60);
}
function renderCalcScore(root) {
  var run = state.calcRun, n = run.probs.length, s = run.score;
  var g = store.games.calc;
  g.plays++;
  if (s > g.best) g.best = s;
  saveStore();
  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">Math</span><h2>' + s + ' / ' + n + '</h2>';
  root.appendChild(head);
  var msg = s === n ? 'Clean sweep. The math is automatic now.'
    : s >= n * 0.8 ? 'Strong. The test loves these — lock them in.'
    : 'Shaky. GCS maxes at 15, Apgar at 10, nines add up fast. Run it back.';
  var card = el('div', 'card');
  card.innerHTML = '<p style="margin:0 0 12px"></p><p style="margin:0;color:var(--th-ink-2);font-size:14px">Best: <span class="tabular"><b>' + g.best + '</b></span> &middot; Runs: <span class="tabular"><b>' + g.plays + '</b></span></p>';
  card.querySelector('p').textContent = msg;
  root.appendChild(card);
  var cta = el('div', 'drill-cta');
  var again = el('button', 'btn block press', 'Run it back'); again.type = 'button';
  again.addEventListener('click', startCalcRun);
  var back = el('button', 'btn ghost block press', 'Back to Games'); back.type = 'button';
  back.addEventListener('click', endCalcRun);
  cta.appendChild(again); cta.appendChild(back);
  root.appendChild(cta);
  state.calcRun = null;
}

/* ============================================================
   VIDEOS TAB
   ============================================================ */
/* Videos now live under Study (hub view + video library). The old tab renderer is retired. */

/* ============================================================
   PROGRESS TAB
   ============================================================ */
function renderProgress(root) {
  var s = moduleStats(), streak = dayStreak();
  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">The scoreboard</span><h2>Progress</h2>'
    + '<p>Saved on this phone. Back it up in the App section below before you switch phones.</p>';
  root.appendChild(head);

  var grid = el('div', 'stat-grid');
  var retained = 0; TOPICS.forEach(function (tp, t) { tp.cards.forEach(function (_, i) { if (isRetained(t, i)) retained++; }); });
  grid.innerHTML = '<div class="stat g"><b class="tabular">' + retained + '</b><span>retained 2 wk+</span></div>'
    + '<div class="stat"><b class="tabular">' + dueCount() + '</b><span>due now</span></div>'
    + '<div class="stat g"><b class="tabular">' + s.mastered + '</b><span>solid</span></div>'
    + '<div class="stat w"><b class="tabular">' + s.needsWork + '</b><span>needs work</span></div>'
    + '<div class="stat n"><b class="tabular">' + s.fresh + '</b><span>fresh</span></div>';
  root.appendChild(grid);

  var sc = el('div', 'card');
  sc.innerHTML = '<div style="display:flex;align-items:center;gap:12px">'
    + '<span style="color:var(--th-accent)">' + icon('flame', 30) + '</span>'
    + '<div><h3 style="font-size:24px">' + streak + '-day streak</h3>'
    + '<p style="margin:0;color:var(--th-ink-2);font-size:14px">' + (streak ? 'Keep it alive. One graded card a day is all it takes.' : 'Grade one card today and the streak starts.') + '</p></div></div>';
  root.appendChild(sc);

  var th = el('h2', 'sec-head'); th.textContent = 'By section';
  root.appendChild(th);
  HUBS.forEach(function (hub, h) {
    var hs = hubStats(h), hpct = hs.cards ? Math.round(hs.mastered / hs.cards * 100) : 0;
    var hh = el('button', 'prog-hub press'); hh.type = 'button';
    hh.setAttribute('aria-expanded', 'false');
    hh.innerHTML = '<span class="hub-ico sm">' + icon(hub.icon, 22) + '</span>'
      + '<span class="hub-t"><b>' + hub.title + '</b><small class="tabular">' + hs.mastered + '/' + hs.cards + ' mastered</small></span>'
      + '<span class="hub-pct tabular">' + hpct + '%</span>'
      + '<span class="prog-chev">' + icon('chevL', 18) + '</span>';
    var list = el('div', 'prog-topics hidden');
    hub.sections.forEach(function (si) {
      SECTIONS[si].topics.forEach(function (n) {
        var tp = TOPICS[n], st = topicStats(n), pct = Math.round(st.mastered / tp.cards.length * 100);
        var row = el('div', 'prow');
        row.innerHTML = '<div class="t"><b>' + tp.title + '</b>'
          + '<small class="tabular">' + st.mastered + '/' + tp.cards.length + ' mastered'
          + (st.needsWork ? ' \u00b7 ' + st.needsWork + ' needs work' : '') + '</small>'
          + '<div class="pbar"><i style="width:' + pct + '%"></i></div></div>'
          + '<span class="ppct tabular">' + pct + '%</span>';
        list.appendChild(row);
      });
    });
    hh.addEventListener('click', function () {
      var open = list.classList.toggle('hidden');
      hh.setAttribute('aria-expanded', String(!open));
      hh.classList.toggle('open', !open);
    });
    root.appendChild(hh);
    root.appendChild(list);
  });

  var q = reviewItems();
  var qh = el('h2', 'sec-head'); qh.appendChild(document.createTextNode('Review queue '));
  qh.appendChild(el('span', 'n', '\u2014 ' + q.length + ' waiting'));
  root.appendChild(qh);
  if (!q.length) {
    var e = el('div', 'empty');
    e.innerHTML = '<span class="eico">' + icon('check', 30) + '</span><h3>Queue\u2019s clear</h3><p>Nothing waiting. Miss something on purpose? No \u2014 just keep drilling.</p>';
    root.appendChild(e);
  } else {
    q.slice(0, 20).forEach(function (it) {
      var card = TOPICS[it.t].cards[it.i];
      var b = el('button', 'rq-row press'); b.type = 'button';
      b.innerHTML = '<span class="rq-miss tabular">' + it.r.missed + '</span>'
        + '<span><span class="tag">Topic ' + TOPICS[it.t].n + (card.sec ? ' \u00b7 ' + card.sec : '') + '</span><p></p></span>';
      b.querySelector('p').textContent = card.q.length > 110 ? card.q.slice(0, 110) + '\u2026' : card.q;
      b.addEventListener('click', function () {
        state.tab = 'games';
        startSession('weak', shuffle(q.map(function (x) { return { t: x.t, i: x.i }; })), 'Weak spots', { scopeRef: { type: 'weak' } });
      });
      root.appendChild(b);
    });
    if (q.length > 20) { var m = el('p', 'sec-sub'); m.textContent = '+' + (q.length - 20) + ' more in the queue.'; root.appendChild(m); }
  }

  var gh = el('h2', 'sec-head'); gh.textContent = 'Game records';
  root.appendChild(gh);
  var g = el('div', 'stat-grid');
  g.innerHTML = '<div class="stat"><b class="tabular">' + store.games.blitz.best + '</b><span>blitz best</span></div>'
    + '<div class="stat"><b class="tabular">' + store.games.flash.sessions + '</b><span>flash sessions</span></div>'
    + '<div class="stat"><b class="tabular">' + store.games.weak.sessions + '</b><span>weak-spot runs</span></div>'
    + '<div class="stat"><b class="tabular">' + store.games.call.best + '</b><span>run-the-call best</span></div>'
    + '<div class="stat"><b class="tabular">' + store.games.exam.best + '</b><span>practice exam best</span></div>'
    + '<div class="stat"><b class="tabular">' + store.games.calc.best + '</b><span>med math best</span></div>';
  root.appendChild(g);

  if (window.FSHQ_PWA) FSHQ_PWA.renderAppSection(root);
}

/* ============================================================
   BOTTOM SHEET
   ============================================================ */
function openSheet(title, sub, options) {
  closeSheet();
  var root = document.getElementById('sheet-root');
  var scrim = el('div', 'scrim animate-fade-in');
  var sheet = el('div', 'sheet animate-sheet-up');
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-modal', 'true');
  sheet.setAttribute('aria-label', title);
  sheet.innerHTML = '<div class="sheet-grab"></div><h3></h3><p class="sub"></p>';
  sheet.querySelector('h3').textContent = title;
  sheet.querySelector('.sub').textContent = sub;
  options.forEach(function (o) {
    var b = el('button', 'opt-row press'); b.type = 'button';
    b.innerHTML = '<span><span></span>' + (o.sub ? '<small></small>' : '') + '</span>';
    b.querySelector('span > span').textContent = o.label;
    if (o.sub) b.querySelector('small').textContent = o.sub;
    b.addEventListener('click', function () { closeSheet(); o.onPick(); });
    sheet.appendChild(b);
  });
  var cancel = el('button', 'btn ghost block press', 'Cancel'); cancel.type = 'button';
  cancel.style.marginTop = '6px';
  cancel.addEventListener('click', closeSheet);
  sheet.appendChild(cancel);
  scrim.addEventListener('click', closeSheet);
  root.appendChild(scrim); root.appendChild(sheet);
  sheetOpener = document.activeElement;
  var first = sheet.querySelector('button'); if (first) first.focus();
}
var sheetOpener = null;
function closeSheet() {
  var had = document.getElementById('sheet-root').innerHTML !== '';
  document.getElementById('sheet-root').innerHTML = '';
  if (had && sheetOpener && sheetOpener.focus) { try { sheetOpener.focus({ preventScroll: true }); } catch (e) {} }
  sheetOpener = null;
}
document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') closeSheet(); });

/* ---------------- boot ---------------- */
document.getElementById('brand-icon').innerHTML = icon('flame', 22);
render();
