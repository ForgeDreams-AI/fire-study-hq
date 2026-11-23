/* ============================================================
   ECG RHYTHM TRAINER — draws 6-second strips on a standard grid
   (25 mm/s: small box 0.04 s, large box 0.2 s; 10 mm = 1 mV) from a
   simple beat model, so every strip is a little different.
   Teaching tool for paramedic-school rhythm recognition, not a
   diagnostic simulator. Loaded before app.js; uses el(), icon(),
   shuffle(), store, saveStore, touchDay, render, state at call time.
   ============================================================ */
'use strict';

var ECG_FS = 250, ECG_SECS = 6, ECG_N = ECG_FS * ECG_SECS;
function ecgG(t, mu, sd, a) { var d = (t - mu) / sd; return a * Math.exp(-0.5 * d * d); }
function ecgRnd(a, b) { return a + Math.random() * (b - a); }

/* Beat builders add to the sample array y. */
function ecgP(y, tp, amp) { for (var i = 0; i < ECG_N; i++) y[i] += ecgG(i / ECG_FS, tp, 0.025, amp == null ? 0.15 : amp); }
function ecgNarrow(y, tq, tAmp) {
  for (var i = 0; i < ECG_N; i++) {
    var t = i / ECG_FS;
    y[i] += ecgG(t, tq - 0.022, 0.008, -0.12) + ecgG(t, tq, 0.011, 1.05) + ecgG(t, tq + 0.024, 0.009, -0.28) + ecgG(t, tq + 0.28, 0.05, tAmp == null ? 0.3 : tAmp);
  }
}
function ecgWide(y, tq, amp) {
  for (var i = 0; i < ECG_N; i++) {
    var t = i / ECG_FS;
    y[i] += ecgG(t, tq, 0.035, amp || 1.1) + ecgG(t, tq + 0.07, 0.03, -0.35) + ecgG(t, tq + 0.34, 0.07, -0.38);
  }
}
function ecgSinus(y, rate, prSec, opts) {
  opts = opts || {};
  var rr = 60 / rate, t = ecgRnd(0.15, rr);
  while (t < ECG_SECS + 0.5) {
    if (opts.pvcEvery && Math.random() < 0.18 && t > 0.8) { ecgWide(y, t - rr * 0.35); t += rr * 1.35; continue; }
    ecgP(y, t - prSec); ecgNarrow(y, t);
    t += rr * (1 + ecgRnd(-0.02, 0.02));
  }
}

var ECG_RHYTHMS = [
  { id: 'nsr', name: 'Normal sinus rhythm', why: 'Regular, rate 60–100, an upright P before every narrow QRS, PR 0.12–0.20 s.',
    make: function (y) { ecgSinus(y, ecgRnd(65, 95), 0.16); } },
  { id: 'brady', name: 'Sinus bradycardia', why: 'Looks like sinus (P before every QRS, normal PR) but the rate is under 60. Count QRS in 6 seconds × 10.',
    make: function (y) { ecgSinus(y, ecgRnd(38, 52), 0.17); } },
  { id: 'tach', name: 'Sinus tachycardia', why: 'Sinus P waves before every QRS, regular, rate 100–150. Gradual onset; treat the cause (pain, fever, hypovolemia).',
    make: function (y) { ecgSinus(y, ecgRnd(112, 140), 0.13, {}); } },
  { id: 'afib', name: 'Atrial fibrillation', why: 'Irregularly irregular R-to-R spacing, no distinct P waves, wavy fibrillatory baseline.',
    make: function (y) {
      var f = [ecgRnd(5, 7), ecgRnd(7, 9), ecgRnd(4, 6)], ph = [Math.random() * 6, Math.random() * 6, Math.random() * 6];
      for (var i = 0; i < ECG_N; i++) { var t = i / ECG_FS; y[i] += 0.04 * Math.sin(2 * Math.PI * f[0] * t + ph[0]) + 0.03 * Math.sin(2 * Math.PI * f[1] * t + ph[1]) + 0.025 * Math.sin(2 * Math.PI * f[2] * t + ph[2]); }
      var t2 = ecgRnd(0.1, 0.5);
      while (t2 < ECG_SECS) { ecgNarrow(y, t2, 0.22); t2 += ecgRnd(0.38, 1.05); }
    } },
  { id: 'flutter', name: 'Atrial flutter', why: 'Sawtooth flutter waves (about 300/min) between QRS complexes, usually conducting 2:1, 3:1 or 4:1.',
    make: function (y) {
      var per = 0.2, ratio = Math.random() < 0.5 ? 4 : 3;
      for (var i = 0; i < ECG_N; i++) { var t = i / ECG_FS, ph = (t % per) / per; y[i] += -0.22 * (ph < 0.8 ? ph / 0.8 : (1 - ph) / 0.2) + 0.11; }
      for (var k = 1; k * per * ratio < ECG_SECS + 0.2; k++) ecgNarrow(y, k * per * ratio - 0.05, 0.1);
    } },
  { id: 'svt', name: 'Supraventricular tachycardia (SVT)', why: 'Narrow, very regular, rate 150–250, P waves buried or not visible. Abrupt onset. Stable: vagal maneuvers, then adenosine (ALS).',
    make: function (y) { var rr = 60 / ecgRnd(170, 210), t = 0.1; while (t < ECG_SECS + 0.2) { ecgNarrow(y, t, 0.2); t += rr; } } },
  { id: 'avb1', name: 'First-degree AV block', why: 'Sinus rhythm with every P conducted, but the PR interval is fixed and longer than 0.20 s (one big box).',
    make: function (y) { ecgSinus(y, ecgRnd(60, 85), ecgRnd(0.28, 0.34)); } },
  { id: 'avb2i', name: 'Second-degree AV block, type I (Wenckebach)', why: 'PR gets longer beat by beat until a P wave isn’t followed by a QRS, then the cycle resets. "Longer, longer, longer, drop."',
    make: function (y) {
      var pp = 60 / ecgRnd(72, 88), t = 0.3, pr = 0.16, n = 0;
      while (t < ECG_SECS + 0.3) {
        ecgP(y, t);
        if (n < 3) { ecgNarrow(y, t + pr); pr += 0.08; n++; } else { pr = 0.16; n = 0; }
        t += pp;
      }
    } },
  { id: 'avb2ii', name: 'Second-degree AV block, type II', why: 'PR interval stays the same on conducted beats, then a P wave suddenly isn’t conducted. Can progress to complete block — pacing pads ready.',
    make: function (y) {
      var pp = 60 / ecgRnd(72, 90), t = 0.3, n = 0, drop = Math.random() < 0.5 ? 3 : 4;
      while (t < ECG_SECS + 0.3) { ecgP(y, t); if ((n + 1) % drop !== 0) ecgNarrow(y, t + 0.18); n++; t += pp; }
    } },
  { id: 'avb3', name: 'Third-degree (complete) AV block', why: 'P waves march through at their own regular rate; QRS complexes run at a slower, independent rate. No relationship between P and QRS.',
    make: function (y) {
      var pp = 60 / ecgRnd(75, 95), rr = 60 / ecgRnd(32, 42), t;
      for (t = ecgRnd(0.05, 0.4); t < ECG_SECS + 0.2; t += pp) ecgP(y, t);
      for (t = ecgRnd(0.3, 1); t < ECG_SECS + 0.2; t += rr) ecgWide(y, t, 0.9);
    } },
  { id: 'pvc', name: 'Sinus rhythm with PVCs', why: 'Underlying sinus rhythm with early, wide, bizarre QRS complexes that have no P wave, followed by a pause.',
    make: function (y) {
      var rr = 60 / ecgRnd(70, 88), t = 0.4, n = 0;
      while (t < ECG_SECS + 0.3) {
        if (n > 0 && n % 3 === 2) { ecgWide(y, t - rr * 0.35); t += rr * 1.4; n++; continue; }
        ecgP(y, t - 0.16); ecgNarrow(y, t); t += rr; n++;
      }
    } },
  { id: 'vtach', name: 'Ventricular tachycardia', why: 'Wide, regular, fast (over 150 here), no P waves. Check for a pulse: pulseless VT gets defibrillated like VF.',
    make: function (y) { var rr = 60 / ecgRnd(165, 200), t = 0.1; while (t < ECG_SECS + 0.2) { ecgWide(y, t, 1.2); t += rr; } } },
  { id: 'vfib', name: 'Ventricular fibrillation', why: 'Chaotic, irregular waveform with no identifiable QRS. Pulseless: CPR and defibrillate.',
    make: function (y) {
      var comps = [], k;
      for (k = 0; k < 5; k++) comps.push([ecgRnd(3.5, 8), Math.random() * 6, ecgRnd(0.12, 0.35)]);
      for (var i = 0; i < ECG_N; i++) {
        var t = i / ECG_FS, env = 0.7 + 0.3 * Math.sin(2 * Math.PI * 0.4 * t);
        for (k = 0; k < comps.length; k++) y[i] += env * comps[k][2] * Math.sin(2 * Math.PI * comps[k][0] * t + comps[k][1]);
      }
    } },
  { id: 'asystole', name: 'Asystole', why: 'Flat line with only slight wander. Confirm in a second lead and check the gain and leads. Not shockable: CPR and epinephrine.',
    make: function (y) { var ph = Math.random() * 6; for (var i = 0; i < ECG_N; i++) { var t = i / ECG_FS; y[i] += 0.03 * Math.sin(2 * Math.PI * 0.3 * t + ph) + 0.008 * Math.sin(2 * Math.PI * 9 * t); } } }
];

function ecgStripSVG(rhythm) {
  var y = new Array(ECG_N); for (var i = 0; i < ECG_N; i++) y[i] = 0;
  rhythm.make(y);
  var W = ECG_N, H = 360, base = 210, scale = 120; // 1 mV = 120 units
  var grid = '', gx;
  for (gx = 0; gx <= W; gx += 10) grid += '<line x1="' + gx + '" y1="0" x2="' + gx + '" y2="' + H + '" class="ecg-g' + (gx % 50 === 0 ? 'b' : 's') + '"/>';
  for (var gy = 0; gy <= H; gy += 12) grid += '<line x1="0" y1="' + gy + '" x2="' + W + '" y2="' + gy + '" class="ecg-g' + (gy % 60 === 0 ? 'b' : 's') + '"/>';
  var pts = [];
  for (i = 0; i < ECG_N; i += 2) pts.push(i + ',' + (base - y[i] * scale).toFixed(1));
  return '<svg class="ecg-strip" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" role="img" aria-label="Six-second ECG rhythm strip">'
    + '<rect width="' + W + '" height="' + H + '" class="ecg-bg"/>' + grid
    + '<polyline points="' + pts.join(' ') + '" class="ecg-line"/></svg>';
}

var ECG_LEN = 12;
function startEcgRun() {
  var order = [], i;
  for (i = 0; i < ECG_LEN; i++) order.push(ECG_RHYTHMS[i % ECG_RHYTHMS.length]);
  state.ecgRun = { items: shuffle(order).map(function (r) { return { r: r, svg: ecgStripSVG(r), opts: null, pick: null }; }), pos: 0, score: 0 };
  render(); window.scrollTo(0, 0);
}
function renderEcgView(root) {
  var run = state.ecgRun;
  if (run.pos >= run.items.length) {
    store.games.ecg = store.games.ecg || { best: 0, plays: 0 };
    if (!run.done) { run.done = true; store.games.ecg.plays++; if (run.score > store.games.ecg.best) store.games.ecg.best = run.score; touchDay(); saveStore(); }
    var head = el('div', 'view-head');
    head.innerHTML = '<span class="kicker">ECG rhythms</span><h2>' + run.score + ' / ' + run.items.length + '</h2><p>Best: <b class="tabular">' + store.games.ecg.best + '</b></p>';
    root.appendChild(head);
    var cta = el('div', 'drill-cta');
    var a = el('button', 'btn block press', 'New strips'); a.type = 'button'; a.addEventListener('click', startEcgRun);
    var d = el('button', 'btn ghost block press', 'Done'); d.type = 'button'; d.addEventListener('click', function () { state.ecgRun = null; render(); });
    cta.appendChild(a); cta.appendChild(d); root.appendChild(cta);
    return;
  }
  var it = run.items[run.pos];
  if (!it.opts) {
    var others = shuffle(ECG_RHYTHMS.filter(function (r) { return r.id !== it.r.id; })).slice(0, 3);
    it.opts = shuffle([it.r].concat(others));
  }
  var head2 = el('div', 'view-head');
  head2.innerHTML = '<span class="kicker">ECG rhythms · paramedic school prep</span><h2>Strip ' + (run.pos + 1) + ' of ' + run.items.length + '</h2><p>Score <b class="tabular">' + run.score + '</b> · 6-second strip, lead II</p>';
  root.appendChild(head2);
  var wrap = el('div', 'ecg-wrap'); wrap.innerHTML = it.svg; root.appendChild(wrap);
  var opts = el('div', 'call-opts');
  it.opts.forEach(function (r) {
    var b = el('button', 'call-opt press'); b.type = 'button'; b.textContent = r.name;
    if (it.pick) { b.disabled = true; if (r.id === it.r.id) b.classList.add('mc-right'); else if (r.id === it.pick) b.classList.add('mc-wrong'); }
    b.addEventListener('click', function () { if (it.pick) return; it.pick = r.id; if (r.id === it.r.id) run.score++; render(); });
    opts.appendChild(b);
  });
  root.appendChild(opts);
  if (it.pick) {
    var fb = el('div', 'mp-check ' + (it.pick === it.r.id ? 'match' : 'miss'));
    fb.appendChild(el('div', 'mp-verdict', it.pick === it.r.id ? 'Correct' : 'It’s ' + it.r.name));
    fb.appendChild(el('p', 'mp-text', it.r.why));
    var nx = el('button', 'btn block press', run.pos + 1 >= run.items.length ? 'See score' : 'Next strip'); nx.type = 'button';
    nx.addEventListener('click', function () { run.pos++; render(); window.scrollTo(0, 0); });
    fb.appendChild(nx);
    root.appendChild(fb);
  }
  var q = el('div', 'drill-cta');
  var qb = el('button', 'btn ghost block press', 'Quit'); qb.type = 'button';
  qb.addEventListener('click', function () { state.ecgRun = null; render(); window.scrollTo(0, 0); });
  q.appendChild(qb); root.appendChild(q);
}
