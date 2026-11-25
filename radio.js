/* ============================================================
   RADIO REPORTS — say (or type) an on-scene or follow-up report for a
   real scenario photo; the app checks every element and the order against
   the PFD command-process deck (M.P. 201.01 initial radio report):
   On-scene: clear alarm, unit on the scene, building/area description,
   occupancy, size, height, conditions, action taken, strategy, command name.
   Follow-up: safety concerns, accountability started (location),
   disposition of resources (hold/add/return), IRIC in place.
   Speech uses the browser's speech recognition when it exists; otherwise
   the phone keyboard's dictation button works in the text box.
   Loaded before app.js; uses its helpers at call time.
   ============================================================ */
'use strict';

var RADIO_FORMATS = {
  onscene: {
    title: 'On-scene report',
    src: 'M.P. 201.01 · command-process deck',
    items: [
      { id: 'alarm', grp: 'open', name: 'Clear alarm', tip: 'Open by calling Alarm: "Engine 1 to Alarm."', re: /\balarm\b/ },
      { id: 'unit', grp: 'open', name: 'Unit on the scene', tip: 'Your unit and "on scene": "Engine 1 on scene."', re: /\b(engine|ladder|rescue|squad|battalion|e|l)\s*\d+\b|\bon (the )?scene\b/ },
      // Building, size and height are spoken as one description ("small one-story house"), in any order.
      { id: 'building', grp: 'desc', name: 'Building and occupancy', tip: 'What it is: house, apartment building, strip mall, mid-rise.', re: /\b(house|home|residen\w*|single[- ]family|apartment\w*|condo\w*|duplex|commercial|strip (mall|center)|restaurant|warehouse|garage|parking|church|building|structure|tower|office|mid[- ]?rise|high[- ]?rise|storage|yard|occupancy)\b/ },
      { id: 'size', grp: 'desc', name: 'Size', tip: 'Small, medium or large.', re: /\b(small|medium|large|big)\b/ },
      { id: 'height', grp: 'desc', name: 'Height', tip: 'Stories: "two-story". One story is assumed if you say nothing, but say it.', re: /\b(one|two|three|four|five|six|single|1|2|3|4|5|6|multi)[- ]?(story|stories|floor|floors)\b|\b(story|stories)\b|\b(mid|high)[- ]?rise\b/ },
      { id: 'conditions', name: 'Conditions', tip: 'Nothing showing, smoke showing (amount and where), working fire, or fully involved.', re: /\bnothing showing\b|\bsmoke\b|\bfire showing\b|\bworking fire\b|\bfully involved\b|\bflames?\b|\bburning\b|\bheavy fire\b|\bfire (in|on|from)\b/ },
      { id: 'action', name: 'Action taken', tip: 'What you’re doing: investigating, laying a line, attacking with a 1¾, assuming command.', re: /\binvestigat\w*|\blay(ing)?\b|\bpull\w*|\battack\w*|\bstretch\w*|\btransitional\b|\bforc\w* entry\b|\bassum\w* command\b|\bgoing (in|interior|to)\b|\breset\w*\b|\bsearch\w*\b/ },
      { id: 'strategy', name: 'Strategy', tip: 'Declare it: offensive or defensive.', re: /\b(offensive|defensive)\b/ },
      // The command NAME comes last ("Mariposa Command"), so use the last mention, not "assuming command".
      { id: 'command', last: true, name: 'Command name', tip: 'Confirm command with a name: "Maple Command."', re: /\b(?!assuming\b|has\b|establish\w*\b)[a-z]+ command\b/g }
    ]
  },
  followup: {
    title: 'Follow-up report',
    src: 'Command-process deck · M.P. 201.01, 201.03',
    items: [
      { id: 'safety', name: 'Immediate safety concerns', tip: 'Anything crews must know now, or "no safety concerns."', re: /\b(safety|hazard\w*|concern\w*|collapse|power lines?|wires? down)\b/ },
      { id: 'accountability', name: 'Accountability started, with location', tip: 'Announce where the initial accountability location is: "E1 is Side A accountability."', re: /\b(accountability|passport\w*)\b/ },
      { id: 'resources', name: 'Disposition of resources', tip: 'Hold, add, or return: "Give me the balance of the 1st Alarm" or "upgrade to a 3 & 1."', re: /\b(hold|holding|add\w*|return\w*|balance of\b|upgrade|first alarm|second alarm|1st alarm|2nd alarm|additional|cancel\w*|continue in|3 ?(&|and) ?1|three and one)/ },
      { id: 'iric', name: 'IRIC in place', tip: 'Initial rapid intervention crew established: "E1 has IRIC in place."', re: /\b(iric|i\.r\.i\.c|initial rapid intervention|rapid intervention|ric)\b/ }
    ]
  }
};

/* Grade a report: which elements are present, and are they in order? */
function gradeRadio(kind, text) {
  var F = RADIO_FORMATS[kind], t = ' ' + String(text || '').toLowerCase().replace(/[’']/g, '') + ' ';
  var found = F.items.map(function (it) {
    var at = -1;
    if (it.last) { var re = new RegExp(it.re.source, 'g'), m; while ((m = re.exec(t))) { at = m.index; if (re.lastIndex === m.index) re.lastIndex++; } }
    else { var m1 = it.re.exec(t); at = m1 ? m1.index : -1; }
    return { it: it, at: at };
  });
  var present = found.filter(function (f) { return f.at >= 0; });
  // Out of order: said before something the format puts earlier. Items in the same
  // group (the building description) can come in any order among themselves.
  var outOfOrder = {};
  for (var i = 0; i < present.length; i++) for (var j = i + 1; j < present.length; j++) {
    var a = present[i].it, b = present[j].it;
    if (a.grp && a.grp === b.grp) continue;
    if (present[j].at < present[i].at) outOfOrder[b.id] = true;
  }
  var score = Math.round((present.length - Object.keys(outOfOrder).length * 0.5) / F.items.length * 100);
  return { found: found, outOfOrder: outOfOrder, score: Math.max(0, score), words: t.trim().split(/\s+/).filter(Boolean).length };
}

/* The scenario's own MP-checked report, when it has one, is the model answer. */
function radioModel(sc, kind) {
  var label = kind === 'onscene' ? 'On-scene report' : 'Follow-up report';
  var st = (sc.steps || []).filter(function (s) { return s.label === label; })[0];
  if (!st || typeof st.best !== 'number' || !st.opts) return null;
  var o = st.opts[st.best];
  return typeof o === 'string' ? o : o && o.t;
}

function startRadioRun(kind) {
  if (!kind) {
    openSheet('Radio reports', 'Pick a report. You get a scene; give the report out loud or type it, then see what you missed.', [
      { label: 'On-scene report', sub: 'First-arriving officer: 10 elements in order', onPick: function () { startRadioRun('onscene'); } },
      { label: 'Follow-up report', sub: 'Safety, accountability, resources, IRIC', onPick: function () { startRadioRun('followup'); } }
    ]);
    return;
  }
  loadScenarios(function () {
    var pool = SCENARIOS.filter(function (s) { return radioModel(s, kind); });
    if (!pool.length) pool = SCENARIOS;
    var sc = pool[Math.floor(Math.random() * pool.length)];
    state.radioRun = { kind: kind, scen: SCENARIOS.indexOf(sc), text: '', graded: null };
    render(); window.scrollTo(0, 0);
  });
}
var radioRec = null;
function stopRadioMic() { if (radioRec) { try { radioRec.stop(); } catch (e) { /* already stopped */ } radioRec = null; } }
function endRadioRun() { stopRadioMic(); state.radioRun = null; render(); window.scrollTo(0, 0); }

function renderRadioView(root) {
  var run = state.radioRun, F = RADIO_FORMATS[run.kind], sc = SCENARIOS[run.scen];
  var head = el('div', 'view-head');
  head.innerHTML = '<span class="kicker">Radio reports</span><h2></h2><p></p>';
  head.querySelector('h2').textContent = F.title;
  head.querySelector('p').textContent = sc.title;
  root.appendChild(head);

  var disp = el('div', 'call-dispatch');
  disp.innerHTML = '<span class="call-dispatch-tag">DISPATCH</span><p></p>';
  disp.querySelector('p').textContent = sc.dispatch;
  root.appendChild(disp);
  var img = document.createElement('img'); img.className = 'scen-img'; img.src = sc.image; img.alt = sc.imageAlt || '';
  root.appendChild(img);
  var arr = el('div', 'card call-narr'); arr.appendChild(el('p', null, sc.arrival)); root.appendChild(arr);

  if (!run.graded) {
    root.appendChild(el('h2', 'sec-head', 'Key up'));
    root.appendChild(el('p', 'sec-sub', run.kind === 'onscene'
      ? 'You’re the first-arriving officer. Give your on-scene report the way you’d say it on the radio.'
      : 'Command is established. Give your follow-up report.'));
    var ta = document.createElement('textarea');
    ta.className = 'time-input radio-text'; ta.rows = 5; ta.value = run.text;
    ta.placeholder = run.kind === 'onscene' ? 'Alarm, Engine 1 on scene…' : 'Command to Alarm, no safety concerns…';
    ta.setAttribute('aria-label', 'Your radio report');
    ta.addEventListener('input', function () { run.text = ta.value; });
    root.appendChild(ta);

    var row = el('div', 'btn-row');
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      var mic = el('button', 'btn ghost press mic-btn', radioRec ? 'Stop' : 'Talk'); mic.type = 'button';
      mic.innerHTML = icon('mic', 18) + '<span>' + (radioRec ? 'Stop' : 'Talk') + '</span>';
      mic.addEventListener('click', function () {
        if (radioRec) { stopRadioMic(); render(); return; }
        try {
          var r = new SR(); r.lang = 'en-US'; r.continuous = true; r.interimResults = true;
          var base = run.text ? run.text.replace(/\s*$/, ' ') : '';
          r.onresult = function (ev) {
            var fin = '', interim = '';
            for (var i = 0; i < ev.results.length; i++) { if (ev.results[i].isFinal) fin += ev.results[i][0].transcript; else interim += ev.results[i][0].transcript; }
            run.text = base + fin + interim;
            var box = document.querySelector('.radio-text'); if (box) box.value = run.text;
          };
          r.onend = function () { radioRec = null; var m = document.querySelector('.mic-btn span'); if (m) m.textContent = 'Talk'; };
          r.onerror = function () { radioRec = null; render(); };
          r.start(); radioRec = r; render();
        } catch (e) { radioRec = null; alert('The microphone isn’t available here. Use the keyboard’s dictation button instead.'); }
      });
      row.appendChild(mic);
    }
    var go2 = el('button', 'btn press', 'Check my report'); go2.type = 'button';
    go2.addEventListener('click', function () {
      stopRadioMic();
      if (!run.text.trim()) { var b = document.querySelector('.radio-text'); if (b) b.focus(); return; }
      run.graded = gradeRadio(run.kind, run.text);
      store.games.radio = store.games.radio || { best: 0, plays: 0 };
      store.games.radio.plays++;
      if (run.graded.score > store.games.radio.best) store.games.radio.best = run.graded.score;
      touchDay(); saveStore();
      render(); window.scrollTo(0, 0);
    });
    row.appendChild(go2);
    root.appendChild(row);
    if (!SR) root.appendChild(el('p', 'src-note', 'Tip: tap the microphone on your keyboard to dictate.'));
  } else {
    var g = run.graded;
    var sum = el('div', 'card mp-summary');
    sum.innerHTML = '<b class="tabular">' + g.score + '%</b><span>' + g.found.filter(function (f) { return f.at >= 0; }).length + ' of ' + F.items.length + ' elements' + (Object.keys(g.outOfOrder).length ? ', some out of order' : ', in order') + '</span>';
    root.appendChild(sum);
    root.appendChild(el('h2', 'sec-head', 'What you said'));
    root.appendChild(el('div', 'card radio-said', run.text));
    root.appendChild(el('h2', 'sec-head', 'Element by element'));
    var list = el('div', 'card check-list');
    g.found.forEach(function (f, i) {
      var ok = f.at >= 0, late = g.outOfOrder[f.it.id];
      var r2 = el('div', 'check-row radio-row ' + (ok ? (late ? 'late' : 'ok') : 'miss'));
      r2.appendChild(el('span', 'check-num tabular', String(i + 1)));
      var t = el('span', 'check-t'); t.appendChild(el('b', null, f.it.name));
      t.appendChild(el('small', null, ok ? (late ? 'Said, but out of order. ' + f.it.tip : 'Got it.') : 'Missing. ' + f.it.tip));
      r2.appendChild(t);
      r2.appendChild(el('span', 'radio-mark', ok ? (late ? 'Order' : '✓') : '✗'));
      list.appendChild(r2);
    });
    root.appendChild(list);
    var model = radioModel(sc, run.kind);
    if (model) {
      root.appendChild(el('h2', 'sec-head', 'This scenario\u2019s model report (MP-checked)'));
      var mc = el('div', 'mp-check note'); mc.appendChild(el('p', 'mp-text', model)); root.appendChild(mc);
    }
    root.appendChild(el('p', 'src-note', 'Checked against: ' + F.src + '. The checker looks for each element’s key words; your captain is the final judge of how it sounds.'));
    var cta = el('div', 'drill-cta');
    var again = el('button', 'btn block press', 'Try this scene again'); again.type = 'button';
    again.addEventListener('click', function () { run.graded = null; render(); window.scrollTo(0, 0); });
    var next = el('button', 'btn ghost block press', 'New scene'); next.type = 'button';
    var kind = run.kind;
    next.addEventListener('click', function () { startRadioRun(kind); });
    cta.appendChild(again); cta.appendChild(next); root.appendChild(cta);
  }
  var q = el('div', 'drill-cta');
  var qb = el('button', 'btn ghost block press', 'Done'); qb.type = 'button';
  qb.addEventListener('click', endRadioRun);
  q.appendChild(qb); root.appendChild(q);
}
