/* ============================================================
   CHECKLISTS UI — list, detail (tick steps + officer sign-off), step-order quiz.
   Loaded after app.js; uses its helpers (el, icon, store, saveStore, render,
   state, touchDay, shuffle). Progress: store.checks[id] = { done: {i: ts},
   signedBy, signedAt, best }.
   ============================================================ */
'use strict';

var CHECK_GROUPS = [
  { kind: 'skill', stage: 'academy', title: 'Academy skill sheets', sub: 'The 9 functional skills and core evolutions' },
  { kind: 'routine', stage: 'probation', title: 'Station routines', sub: 'Morning check, shift change, SCBA inspection' },
  { kind: 'signoff', stage: 'probation', title: 'Probation sign-offs', sub: 'Each rotation and end of probation' }
];
function checkRec(id) {
  store.checks = store.checks || {};
  if (!store.checks[id]) store.checks[id] = { done: {}, signedBy: '', signedAt: 0, best: 0 };
  return store.checks[id];
}
function checkById(id) { for (var i = 0; i < CHECKLISTS.length; i++) if (CHECKLISTS[i].id === id) return CHECKLISTS[i]; return null; }
function checkDoneCount(c) { var r = checkRec(c.id), n = 0; c.steps.forEach(function (_, i) { if (r.done[i]) n++; }); return n; }

function checklistsBack(root, label, onTap) {
  var back = el('div', 'backbar');
  var bb = el('button', 'back press'); bb.type = 'button';
  bb.innerHTML = icon('chevL', 20) + '<span></span>';
  bb.querySelector('span').textContent = label;
  bb.addEventListener('click', onTap);
  back.appendChild(bb); root.appendChild(back);
}
function checklistsView(root, stageFilter) {
  checklistsBack(root, 'Study', function () { state.study = { view: 'home', hub: -1, topic: -1 }; render(); window.scrollTo(0, 0); });
  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker">Hands-on</span><h2>Skills &amp; checklists</h2>'
    + '<p>Step lists you can drill in order, tick off, and get signed. An app can’t teach the feel of a halligan — it can make sure you never forget a step.</p>';
  root.appendChild(head);
  CHECK_GROUPS.forEach(function (g) {
    if (stageFilter && g.stage !== stageFilter) return;
    var list = CHECKLISTS.filter(function (c) { return c.kind === g.kind; });
    if (!list.length) return;
    var h = el('h2', 'sec-head'); h.textContent = g.title; root.appendChild(h);
    root.appendChild(el('p', 'sec-sub', g.sub));
    list.forEach(function (c) {
      var r = checkRec(c.id), done = checkDoneCount(c);
      var b = el('button', 'app-row press'); b.type = 'button';
      b.innerHTML = '<span class="ico">' + icon(g.kind === 'skill' ? 'target' : (g.kind === 'routine' ? 'check' : 'book'), 22) + '</span>'
        + '<span class="t"><b></b><small></small></span>';
      b.querySelector('b').textContent = c.title;
      b.querySelector('small').textContent = c.steps.length + ' steps · ' + done + ' checked'
        + (r.best ? ' · order quiz best ' + r.best + '%' : '') + (r.signedAt ? ' · signed' : '');
      if (r.signedAt) b.appendChild(el('span', 'ok', 'Signed'));
      b.addEventListener('click', function () { state.study = { view: 'checklist', id: c.id, hub: -1, topic: -1 }; render(); window.scrollTo(0, 0); });
      root.appendChild(b);
    });
  });
}
function checklistView(root, id) {
  var c = checkById(id);
  if (!c) { state.study = { view: 'checklists', hub: -1, topic: -1 }; checklistsView(root); return; }
  var r = checkRec(id);
  checklistsBack(root, 'Skills & checklists', function () { state.study = { view: 'checklists', hub: -1, topic: -1 }; render(); window.scrollTo(0, 0); });
  var head = el('div', 'view-head animate-fade-in');
  head.innerHTML = '<span class="kicker"></span><h2></h2><p></p>';
  head.querySelector('.kicker').textContent = c.kind === 'skill' ? 'Skill sheet' : (c.kind === 'routine' ? 'Station routine' : 'Sign-off');
  head.querySelector('h2').textContent = c.title;
  head.querySelector('p').textContent = c.sub || '';
  root.appendChild(head);

  if (c.kind === 'skill') {
    var cta = el('div', 'drill-cta');
    var q = el('button', 'btn block press', 'Drill the step order'); q.type = 'button';
    q.addEventListener('click', function () { startOrderQuiz(id); });
    cta.appendChild(q); root.appendChild(cta);
  }
  var list = el('div', 'card check-list');
  c.steps.forEach(function (st, i) {
    var row = el('label', 'check-row' + (st.critical ? ' critical' : ''));
    var cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = !!r.done[i];
    cb.addEventListener('change', function () {
      if (cb.checked) r.done[i] = Date.now(); else delete r.done[i];
      touchDay(); saveStore();
      prog.textContent = checkDoneCount(c) + ' of ' + c.steps.length + ' checked';
    });
    var num = el('span', 'check-num tabular', String(i + 1));
    var txt = el('span', 'check-t', st.t);
    row.appendChild(cb); row.appendChild(num); row.appendChild(txt);
    if (st.critical) row.appendChild(el('span', 'check-crit', 'Critical'));
    list.appendChild(row);
  });
  root.appendChild(list);
  var prog = el('p', 'sec-sub tabular', checkDoneCount(c) + ' of ' + c.steps.length + ' checked');
  root.appendChild(prog);

  // Officer sign-off
  root.appendChild(el('h2', 'sec-head', 'Officer sign-off'));
  var so = el('div', 'card signoff');
  if (r.signedAt) {
    var d = new Date(r.signedAt);
    so.appendChild(el('p', null, 'Signed off by ' + r.signedBy + ' on ' + (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear() + '.'));
    var undo = el('button', 'btn ghost block press', 'Clear sign-off'); undo.type = 'button';
    undo.addEventListener('click', function () { if (confirm('Clear this sign-off?')) { r.signedBy = ''; r.signedAt = 0; saveStore(); render(); } });
    so.appendChild(undo);
  } else {
    so.appendChild(el('p', 'sec-sub', 'Have your captain or RTO watch you do it, then enter their name. It stays on this phone and goes in your backup.'));
    var inp = document.createElement('input'); inp.className = 'time-input text-input'; inp.placeholder = 'Officer name';
    inp.setAttribute('aria-label', 'Officer name');
    so.appendChild(inp);
    var sb = el('button', 'btn block press', 'Record sign-off'); sb.type = 'button';
    sb.addEventListener('click', function () {
      var v = inp.value.trim(); if (!v) { inp.focus(); return; }
      r.signedBy = v.slice(0, 60); r.signedAt = Date.now(); touchDay(); saveStore(); render();
    });
    so.appendChild(sb);
  }
  root.appendChild(so);
  if (c.src) { var src = el('p', 'src-note'); src.textContent = 'Source: ' + c.src; root.appendChild(src); }
}

/* Step-order quiz: tap the steps in the right order. A wrong tap counts an error. */
function startOrderQuiz(id) {
  var c = checkById(id);
  state.checkRun = { id: id, order: shuffle(c.steps.map(function (_, i) { return i; })), next: 0, errors: 0, flash: -1 };
  render(); window.scrollTo(0, 0);
}
function renderOrderQuiz(root) {
  var run = state.checkRun, c = checkById(run.id), n = c.steps.length;
  var head = el('div', 'view-head');
  head.innerHTML = '<span class="kicker">Step order</span><h2></h2><p class="tabular">Step <b>' + Math.min(run.next + 1, n) + '</b> of ' + n + ' &middot; errors <b>' + run.errors + '</b></p>';
  head.querySelector('h2').textContent = c.title;
  root.appendChild(head);
  if (run.next >= n) {
    var pct = Math.max(0, Math.round((n - run.errors) / n * 100));
    var r = checkRec(run.id); if (pct > r.best) r.best = pct; touchDay(); saveStore();
    var card = el('div', 'card');
    card.appendChild(el('h3', null, pct + '% ' + (pct >= 80 ? '— passing' : '— below the 80% line')));
    card.appendChild(el('p', null, run.errors ? run.errors + ' wrong tap' + (run.errors === 1 ? '' : 's') + '. Run it until it’s clean.' : 'Clean run. Now go do it with your hands.'));
    root.appendChild(card);
    var cta = el('div', 'drill-cta');
    var again = el('button', 'btn block press', 'Run it again'); again.type = 'button';
    again.addEventListener('click', function () { startOrderQuiz(run.id); });
    var done = el('button', 'btn ghost block press', 'Back to the sheet'); done.type = 'button';
    done.addEventListener('click', function () { state.checkRun = null; render(); window.scrollTo(0, 0); });
    cta.appendChild(again); cta.appendChild(done); root.appendChild(cta);
    return;
  }
  if (run.next > 0) {
    var doneCard = el('div', 'card order-done');
    for (var k = 0; k < run.next; k++) doneCard.appendChild(el('p', null, (k + 1) + '. ' + c.steps[k].t));
    root.appendChild(doneCard);
  }
  root.appendChild(el('p', 'sec-sub', 'Tap the next step.'));
  var opts = el('div', 'call-opts');
  run.order.forEach(function (si) {
    if (si < run.next) return;
    var b = el('button', 'call-opt press' + (run.flash === si ? ' order-wrong' : '')); b.type = 'button';
    b.textContent = c.steps[si].t;
    b.addEventListener('click', function () {
      if (si === run.next) { run.next++; run.flash = -1; }
      else { run.errors++; run.flash = si; }
      render();
    });
    opts.appendChild(b);
  });
  root.appendChild(opts);
  var quit = el('div', 'drill-cta');
  var qb = el('button', 'btn ghost block press', 'Quit'); qb.type = 'button';
  qb.addEventListener('click', function () { state.checkRun = null; render(); window.scrollTo(0, 0); });
  quit.appendChild(qb); root.appendChild(quit);
}
