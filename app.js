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
  zap: '<path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12z"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.3-5.6M20 3v4h-4"/>'
};
function icon(n, s) {
  s = s || 24;
  return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + P[n] + '</svg>';
}

/* ---------------- storage + legacy migration ---------------- */
var HQ_KEY = 'fireStudyHQ.v1';
var LEGACY_KEY = 'fireStudy.v1';

function cleanProg(p) {
  var c = {}, k;
  for (k in p) {
    if (/^t\d+-\d+$/.test(k)) {
      var r = p[k] || {};
      var g = parseInt(r.got, 10), m = parseInt(r.missed, 10);
      c[k] = { got: isNaN(g) ? 0 : Math.max(0, g), missed: isNaN(m) ? 0 : Math.max(0, m) };
    }
  }
  return c;
}
function defaultGames() { return { blitz: { best: 0, plays: 0 }, flash: { sessions: 0 }, weak: { sessions: 0 } }; }
function normGames(g) {
  var d = defaultGames();
  if (g && typeof g === 'object') {
    ['blitz', 'flash', 'weak'].forEach(function (k) {
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

/* ---------------- progress (original semantics, verbatim) ---------------- */
function cardKey(t, i) { return 't' + t + '-' + i; }
function rec(t, i) { var k = cardKey(t, i); if (!store.prog[k]) store.prog[k] = { got: 0, missed: 0 }; return store.prog[k]; }
function isMastered(t, i) { return rec(t, i).got >= 2; }
function isNeedsWork(t, i) { var r = rec(t, i); return r.missed > 0 && r.got < 2; }
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
function reviewItems() {
  var out = [], t, i;
  for (t = 0; t < TOPICS.length; t++) for (i = 0; i < TOPICS[t].cards.length; i++)
    if (isNeedsWork(t, i)) out.push({ t: t, i: i, r: rec(t, i) });
  return out;
}
/* grade: "Got it" -> got++, "Missed it" -> got reset to 0, missed++. Returns newly-mastered flag. */
function gradeCard(t, i, ok) {
  var r = rec(t, i);
  var was = isMastered(t, i);
  if (ok) { r.got++; } else { r.got = 0; r.missed++; }
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
  { id: 'study', label: 'Study', icon: 'book' },
  { id: 'games', label: 'Games', icon: 'gamepad' },
  { id: 'videos', label: 'Videos', icon: 'playcircle' },
  { id: 'progress', label: 'Progress', icon: 'chart' }
];
var state = { tab: 'study', study: { view: 'home', topic: -1 }, sess: null };

function stopSessionTimer() {
  if (state.sess && state.sess.timerId) { clearInterval(state.sess.timerId); state.sess.timerId = null; }
}
function go(tab) {
  stopSessionTimer();
  state.tab = tab;
  if (tab === 'study' && state.study.view === 'session') { /* session handles its own exit */ }
  state.sess = null;
  render();
  window.scrollTo(0, 0);
}
function renderTabbar() {
  var bar = document.getElementById('tabbar');
  bar.innerHTML = '';
  TABS.forEach(function (t) {
    var b = el('button', 'tab press' + (state.tab === t.id ? ' active' : ''));
    b.type = 'button';
    b.setAttribute('aria-label', t.label);
    b.setAttribute('aria-current', state.tab === t.id ? 'page' : 'false');
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
  if (state.tab === 'study') renderStudy(root);
  else if (state.tab === 'games') renderGames(root);
  else if (state.tab === 'videos') renderVideos(root);
  else renderProgress(root);
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
  b.addEventListener('click', function () { state.study = { view: 'topic', topic: n }; render(); window.scrollTo(0, 0); });
  return b;
}
function soonCard(k) {
  var ph = SOON[k];
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
  var s = moduleStats();
  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">Phoenix FD &middot; Recruit to Probie</span>'
    + '<h2>Put in the reps.</h2>'
    + '<p><span class="tabular"><b>' + s.mastered + '</b></span> mastered &middot; '
    + '<span class="tabular"><b>' + s.needsWork + '</b></span> need work &middot; '
    + '<span class="tabular"><b>' + s.fresh + '</b></span> fresh</p>';
  root.appendChild(head);

  var q = reviewItems();
  var rc = el('button', 'review-cta press'); rc.type = 'button';
  rc.innerHTML = '<span class="pill tabular">' + q.length + '</span><span><h3>Review queue</h3><p>'
    + (q.length ? q.length + ' card' + (q.length === 1 ? '' : 's') + ' waiting &mdash; get each one right twice in a row to clear it.'
      : 'Mark a card &ldquo;Missed it&rdquo; and it lands here for extra reps.') + '</p></span>';
  rc.disabled = !q.length;
  if (q.length) rc.addEventListener('click', function () { startSession('weak', shuffle(q.map(function (it) { return { t: it.t, i: it.i }; })), 'Review queue', { scopeRef: { type: 'weak' } }); });
  root.appendChild(rc);

  SECTIONS.forEach(function (sec) {
    var drills = 0; sec.topics.forEach(function (n) { drills += TOPICS[n].cards.length; });
    var h = el('h2', 'sec-head'); h.appendChild(document.createTextNode(sec.name + ' '));
    h.appendChild(el('span', 'n', '\u2014 ' + drills + ' drill' + (drills === 1 ? '' : 's')));
    root.appendChild(h);
    if (sec.blurb) root.appendChild(el('p', 'sec-sub', sec.blurb));
    sec.topics.forEach(function (n) { root.appendChild(topicCard(n)); });
    sec.soon.forEach(function (k) { root.appendChild(soonCard(k)); });
  });

  var foot = el('div', 'foot');
  foot.innerHTML = 'Roadmap: <b>Academy</b> &rarr; <b>Probation Year</b> &rarr; <b>Medical</b>. '
    + 'Built for Phoenix firefighters, by one. Wrong answers get corrected &mdash; that&rsquo;s the job.';
  root.appendChild(foot);
}
function topicView(root, n) {
  var tp = TOPICS[n], st = topicStats(n);
  var back = el('div', 'backbar');
  var bb = el('button', 'back press'); bb.type = 'button';
  bb.innerHTML = icon('chevL', 20) + '<span>All topics</span>';
  bb.addEventListener('click', function () { state.study = { view: 'home', topic: -1 }; render(); window.scrollTo(0, 0); });
  back.appendChild(bb); root.appendChild(back);

  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">Topic ' + tp.n + ' of ' + TOPICS.length + '</span>'
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
    tp.videos.forEach(function (v) { root.appendChild(videoRow(v)); });
  }

  var cta = el('div', 'drill-cta');
  var start = el('button', 'btn block press', 'Start drill'); start.type = 'button';
  start.addEventListener('click', function () {
    var queue = [];
    for (var i = 0; i < tp.cards.length; i++) if (!isMastered(n, i)) queue.push({ t: n, i: i });
    if (!queue.length) for (var j = 0; j < tp.cards.length; j++) queue.push({ t: n, i: j });
    startSession('drill', shuffle(queue), 'Topic ' + tp.n + ' \u00b7 ' + tp.title, { scopeRef: { type: 'topic', n: n } });
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
function videoRow(v) {
  var a = el('a', 'vid-row press'); a.href = v.url; a.target = '_blank'; a.rel = 'noopener';
  var pl = el('span', 'vid-play'); pl.innerHTML = icon('play', 20);
  var txt = el('span'); txt.appendChild(el('h4', null, v.title));
  var p = el('p', null, v.desc || ''); txt.appendChild(p);
  a.appendChild(pl); a.appendChild(txt);
  if (v.dur) a.appendChild(el('span', 'dur-chip tabular', v.dur));
  return a;
}
function renderStudy(root) {
  if (state.study.view === 'topic' && state.study.topic >= 0) topicView(root, state.study.topic);
  else if (state.sess) renderSessionView(root);
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
    n = ref.n;
    for (i = 0; i < TOPICS[n].cards.length; i++) if (!isMastered(n, i)) q.push({ t: n, i: i });
    if (!q.length) for (i = 0; i < TOPICS[n].cards.length; i++) q.push({ t: n, i: i });
    return shuffle(q);
  }
  if (ref.type === 'weak') return shuffle(reviewItems().map(function (it) { return { t: it.t, i: it.i }; }));
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
  if (state.tab === 'games') render(); else { state.study = { view: 'home', topic: -1 }; render(); }
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
function renderStudyCard(root, s) {
  var cur = s.queue[0], card = TOPICS[cur.t].cards[cur.i];
  sessTop(root, s);
  var dc = el('div', 'dcard animate-pop-in');
  var tag = el('span', 'tag', cardTag(card, cur)); dc.appendChild(tag);
  dc.appendChild(el('p', 'q', card.q));
  var ansBox = el('div', 'hidden'); dc.appendChild(ansBox);
  root.appendChild(dc);

  if (s.mode === 'flash') {
    var hint = el('div', 'flip-hint'); hint.innerHTML = icon('layers', 16) + '<span>Tap the card to flip it</span>';
    dc.style.cursor = 'pointer';
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
/* one grading step — identical re-queue semantics to the original build */
function gradeStep(s, cur, ok) {
  s.queue.shift();
  if (ok) { s.got++; } else { s.miss++; }
  var newly = gradeCard(cur.t, cur.i, ok);
  if (newly) s.masteredNow++;
  if (!isMastered(cur.t, cur.i)) {
    if (ok) s.queue.splice(Math.min(2, s.queue.length), 0, cur);
    else s.queue.push(cur);
  }
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
      : 'Missed cards come back until you get each one right twice in a row. No shortcuts.') + '</p>';
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
    startSession(s.mode, nq, s.scope, { scopeRef: s.scopeRef });
  });
  row.appendChild(again);
  var back = el('button', 'btn ghost press', state.tab === 'games' ? 'Games hub' : 'All topics'); back.type = 'button';
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
  gradeCard(cur.t, cur.i, ok); // feeds the same mastery + review system
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
function gameCard(ico, bg, title, desc, best, bestLabel, onTap) {
  var b = el('button', 'game-card press'); b.type = 'button';
  var gi = el('span', 'game-ico'); gi.style.background = bg; gi.innerHTML = icon(ico, 28);
  var txt = el('span'); txt.appendChild(el('h3', null, title)); txt.appendChild(el('p', null, desc));
  var bb = el('span', 'game-best'); bb.innerHTML = '<b class="tabular">' + best + '</b><span>' + bestLabel + '</span>';
  b.appendChild(gi); b.appendChild(txt); b.appendChild(bb);
  b.addEventListener('click', onTap);
  return b;
}
function scopeOptions(onPick) {
  var opts = [{ label: 'All topics', sub: TOPICS.reduce(function (a, t) { return a + t.cards.length; }, 0) + ' cards \u2014 the full deck', scope: { type: 'all' } }];
  TOPICS.forEach(function (tp, n) {
    opts.push({ label: 'Topic ' + tp.n + ' \u00b7 ' + tp.title, sub: tp.cards.length + ' cards', scope: { type: 'topic', n: n } });
  });
  openSheet('Pick your battlefield', 'Where do you want the reps?', opts.map(function (o) {
    return { label: o.label, sub: o.sub, onPick: function () { onPick(o.scope); } };
  }));
}
function renderGames(root) {
  if (state.sess) { renderSessionView(root); return; }
  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">Reps, but fun</span><h2>Games</h2>'
    + '<p>Same drill bank, different pressure. Scores and streaks live on this device.</p>';
  root.appendChild(head);

  root.appendChild(gameCard('layers', 'linear-gradient(135deg,#2E86C1,#1B4F7A)', 'Flashcards',
    'Flip through the deck. Be honest \u2014 if you hesitated, you missed it.',
    store.games.flash.sessions, 'sessions',
    function () { scopeOptions(function (sc) { startSession('flash', scopeCards(sc), scopeLabel(sc), { scopeRef: { type: 'flash', scope: sc } }); }); }));

  root.appendChild(gameCard('zap', 'linear-gradient(135deg,#F2A63B,#B3271E)', 'Blitz',
    'Sixty seconds. Scenario up, gut answer, grade yourself. No thinking, no mercy.',
    store.games.blitz.best, 'best score',
    function () { scopeOptions(function (sc) { startSession('blitz', scopeCards(sc), scopeLabel(sc), { scopeRef: { type: 'blitz', scope: sc } }); }); }));

  var qn = reviewItems().length;
  root.appendChild(gameCard('target', 'linear-gradient(135deg,#1E8A4C,#0E4A27)', 'Weak Spots',
    'Your misses, on repeat, until they\u2019re not misses anymore.',
    qn, 'in queue',
    function () {
      var q = reviewItems();
      if (!q.length) { openSheet('Queue\u2019s clear', 'Nothing to attack. Go drill something new and miss a few \u2014 that\u2019s how the queue gets fed.', []); return; }
      startSession('weak', shuffle(q.map(function (it) { return { t: it.t, i: it.i }; })), 'Weak spots', { scopeRef: { type: 'weak' } });
    }));
}
function scopeLabel(sc) {
  return sc.type === 'all' ? 'All topics' : 'Topic ' + TOPICS[sc.n].n + ' \u00b7 ' + TOPICS[sc.n].title;
}

/* ============================================================
   VIDEOS TAB
   ============================================================ */
function renderVideos(root) {
  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">UL FSRI training</span><h2>Videos</h2>'
    + '<p>The research behind the drills. Watch one before your next session.</p>';
  root.appendChild(head);
  TOPICS.forEach(function (tp) {
    if (!tp.videos || !tp.videos.length) return;
    var h = el('h2', 'sec-head'); h.appendChild(document.createTextNode('Topic ' + tp.n + ' '));
    h.appendChild(el('span', 'n', '\u2014 ' + tp.title));
    root.appendChild(h);
    tp.videos.forEach(function (v) { root.appendChild(videoRow(v)); });
  });
}

/* ============================================================
   PROGRESS TAB
   ============================================================ */
function renderProgress(root) {
  var s = moduleStats(), streak = dayStreak();
  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">The scoreboard</span><h2>Progress</h2>'
    + '<p>Saved on this device. Nobody masters anything by accident.</p>';
  root.appendChild(head);

  var grid = el('div', 'stat-grid');
  grid.innerHTML = '<div class="stat g"><b class="tabular">' + s.mastered + '</b><span>mastered</span></div>'
    + '<div class="stat w"><b class="tabular">' + s.needsWork + '</b><span>needs work</span></div>'
    + '<div class="stat n"><b class="tabular">' + s.fresh + '</b><span>fresh</span></div>';
  root.appendChild(grid);

  var sc = el('div', 'card');
  sc.innerHTML = '<div style="display:flex;align-items:center;gap:12px">'
    + '<span style="color:var(--th-accent)">' + icon('flame', 30) + '</span>'
    + '<div><h3 style="font-size:24px">' + streak + '-day streak</h3>'
    + '<p style="margin:0;color:var(--th-ink-2);font-size:14px">' + (streak ? 'Keep it alive. One graded card a day is all it takes.' : 'Grade one card today and the streak starts.') + '</p></div></div>';
  root.appendChild(sc);

  var th = el('h2', 'sec-head'); th.textContent = 'By topic';
  root.appendChild(th);
  TOPICS.forEach(function (tp, n) {
    var st = topicStats(n), pct = Math.round(st.mastered / tp.cards.length * 100);
    var row = el('div', 'prow');
    row.innerHTML = '<div class="t"><b>' + tp.title + '</b>'
      + '<small class="tabular">' + st.mastered + '/' + tp.cards.length + ' mastered'
      + (st.needsWork ? ' \u00b7 ' + st.needsWork + ' needs work' : '') + '</small>'
      + '<div class="pbar"><i style="width:' + pct + '%"></i></div></div>'
      + '<span class="ppct tabular">' + pct + '%</span>';
    root.appendChild(row);
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
    + '<div class="stat"><b class="tabular">' + store.games.weak.sessions + '</b><span>weak-spot runs</span></div>';
  root.appendChild(g);
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
}
function closeSheet() {
  document.getElementById('sheet-root').innerHTML = '';
}

/* ---------------- boot ---------------- */
document.getElementById('brand-icon').innerHTML = icon('flame', 22);
render();
