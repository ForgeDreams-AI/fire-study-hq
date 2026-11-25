/* ============================================================
   Installed-app layer: install prompt, offline service worker,
   and a daily study reminder (calendar). Loaded before app.js; it only
   calls app.js helpers (el, icon, store, render...) at render time.
   ============================================================ */
(function () {
  var DISMISS_KEY = 'fshq_install_dismissed_v1';
  var REMINDER_KEY = 'fshq_reminder_v1';
  var deferredPrompt = null;

  function isStandalone() {
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
  }
  function isIOS() {
    var ua = navigator.userAgent || '';
    return /iphone|ipad|ipod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  function rerenderIf(tab) { if (typeof state !== 'undefined' && (!tab || state.tab === tab) && typeof render === 'function') render(); }

  /* ---------- install ---------- */
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    rerenderIf('home'); rerenderIf('progress');
  });
  window.addEventListener('appinstalled', function () {
    deferredPrompt = null;
    rerenderIf();
  });
  function canInstall() { return !isStandalone() && (!!deferredPrompt || isIOS()); }

  function startInstall() {
    if (deferredPrompt) {
      var p = deferredPrompt;
      deferredPrompt = null;
      p.prompt();
      p.userChoice.then(function () { rerenderIf(); }, function () {});
      return;
    }
    if (isIOS()) { showIOSSteps(); return; }
    showSheet('Install Fire Study HQ', 'Your browser handles this from its menu.', function (body) {
      body.appendChild(stepsList([
        'Open the browser menu (⋮ or the address-bar install icon).',
        'Tap “Install app” or “Add to Home screen”.',
        'Open Fire Study from your home screen from now on.'
      ]));
    });
  }
  function showIOSSteps() {
    showSheet('Add to Home Screen', 'iPhone and iPad install from Safari’s Share menu.', function (body) {
      body.appendChild(stepsList([
        'Open this page in Safari (not Chrome or an in-app browser).',
        'Tap the Share button — the square with the arrow pointing up.',
        'Scroll down and tap “Add to Home Screen”, then “Add”.',
        'Open Fire Study from the new home-screen icon.'
      ]));
    });
  }
  function stepsList(items) {
    var ol = el('ol', 'ios-steps');
    items.forEach(function (t) { ol.appendChild(el('li', null, t)); });
    return ol;
  }

  function renderInstallBanner(root) {
    if (!canInstall() || lsGet(DISMISS_KEY)) return;
    var b = el('div', 'install-banner animate-fade-in');
    b.innerHTML = '<img src="icons/icon-192.png" alt="" /><span class="t"><b>Put it on your home screen</b>'
      + '<small>Opens like an app. Works with no signal.</small></span>';
    var go = el('button', 'btn sm press', 'Install'); go.type = 'button';
    go.addEventListener('click', startInstall);
    var x = el('button', 'x press'); x.type = 'button';
    x.setAttribute('aria-label', 'Dismiss');
    x.innerHTML = icon('x', 18);
    x.addEventListener('click', function () { lsSet(DISMISS_KEY, '1'); b.remove(); });
    b.appendChild(go); b.appendChild(x);
    root.appendChild(b);
  }

  /* ---------- generic sheet with custom body ---------- */
  function showSheet(title, sub, build) {
    closeSheet();
    var root = document.getElementById('sheet-root');
    var scrim = el('div', 'scrim animate-fade-in');
    var sheet = el('div', 'sheet animate-sheet-up');
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-label', title);
    sheet.appendChild(el('div', 'sheet-grab'));
    sheet.appendChild(el('h3', null, title));
    sheet.appendChild(el('p', 'sub', sub));
    build(sheet);
    var cancel = el('button', 'btn ghost block press', 'Close'); cancel.type = 'button';
    cancel.style.marginTop = '6px';
    cancel.addEventListener('click', closeSheet);
    sheet.appendChild(cancel);
    scrim.addEventListener('click', closeSheet);
    root.appendChild(scrim); root.appendChild(sheet);
  }

  /* ---------- daily reminder via calendar ----------
     A web app with no server can't wake itself to notify you while closed.
     A repeating calendar event with an alert can, on every phone. */
  function pad(n) { return ('0' + n).slice(-2); }
  function buildICS(hhmm) {
    var parts = hhmm.split(':'), now = new Date();
    var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +parts[0], +parts[1]);
    if (start < now) start.setDate(start.getDate() + 1);
    function local(d) { return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + 'T' + pad(d.getHours()) + pad(d.getMinutes()) + '00'; }
    var end = new Date(start.getTime() + 15 * 60000);
    var stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
    var url = location.origin + location.pathname.replace(/[^/]*$/, '');
    return [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Fire Study HQ//Reminder//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:fshq-daily-' + stamp + '@firestudyhq',
      'DTSTAMP:' + stamp,
      'DTSTART:' + local(start),
      'DTEND:' + local(end),
      'RRULE:FREQ=DAILY',
      'SUMMARY:Fire Study HQ — put in the reps',
      'DESCRIPTION:Grade at least one card to keep the streak alive. ' + url,
      'URL:' + url,
      'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:Fire Study HQ — study time', 'TRIGGER:PT0M', 'END:VALARM',
      'END:VEVENT', 'END:VCALENDAR', ''
    ].join('\r\n');
  }
  function saveFile(name, mime, text, openInPlace) {
    var blob = new Blob([text], { type: mime });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    // iOS opens .ics straight into "Add to Calendar" when it isn't forced to download.
    if (!openInPlace) a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 30000);
  }
  function fmtTime(hhmm) {
    var p = hhmm.split(':'), h = +p[0], ap = h >= 12 ? 'PM' : 'AM';
    return ((h % 12) || 12) + ':' + p[1] + ' ' + ap;
  }
  function showReminder() {
    var cur = lsGet(REMINDER_KEY) || '19:00';
    showSheet('Daily study reminder', 'Pick a time. It adds a repeating event with an alert to your phone’s calendar.', function (body) {
      var inp = el('input', 'time-input'); inp.type = 'time'; inp.value = cur;
      inp.setAttribute('aria-label', 'Reminder time');
      body.appendChild(inp);
      var add = el('button', 'btn block press', 'Add to calendar'); add.type = 'button';
      add.addEventListener('click', function () {
        var t = inp.value || '19:00';
        lsSet(REMINDER_KEY, t);
        saveFile('fire-study-reminder.ics', 'text/calendar', buildICS(t), isIOS());
        closeSheet();
        rerenderIf('progress');
      });
      body.appendChild(add);
      var note = el('p', 'sub');
      note.style.marginTop = '12px';
      note.textContent = 'To change the time later, delete the old event in your calendar and add a new one here.';
      body.appendChild(note);
    });
  }

  /* ---------- Progress tab: App section ---------- */
  function appRow(ic, title, sub, right, onTap) {
    var b = el('button', 'app-row press'); b.type = 'button';
    b.innerHTML = '<span class="ico">' + icon(ic, 22) + '</span><span class="t"><b></b><small></small></span>';
    b.querySelector('b').textContent = title;
    b.querySelector('small').textContent = sub;
    if (right) b.appendChild(el('span', 'ok', right));
    if (onTap) b.addEventListener('click', onTap); else b.disabled = true;
    return b;
  }
  function renderAppSection(root) {
    var h = el('h2', 'sec-head'); h.textContent = 'App';
    root.appendChild(h);
    if (isStandalone()) {
      root.appendChild(appRow('phone', 'Installed', 'Running from your home screen. Works offline.', 'On', null));
    } else {
      root.appendChild(appRow('phone', 'Install on this phone',
        isIOS() ? 'Safari → Share → Add to Home Screen' : 'Home-screen icon, full screen, works offline', null, startInstall));
    }
    var rem = lsGet(REMINDER_KEY);
    root.appendChild(appRow('bell', 'Daily study reminder',
      rem ? 'Set for ' + fmtTime(rem) + ' in your calendar' : 'A daily calendar alert so the streak doesn’t die', rem ? 'Set' : null, showReminder));
    root.appendChild(appRow('flame', 'Stage: ' + (store.stage ? STAGES[store.stage].label : 'not set'), 'Academy, probation or paramedic prep \u2014 sets what Home shows', null, pickStage));
    root.appendChild(appRow('chart', 'Share progress with your captain', 'A plain-text summary you can text or email', null, shareSummary));
    var last = lsGet(BACKUP_AT_KEY);
    root.appendChild(appRow('download', 'Back up progress', last ? 'Last backup ' + new Date(+last).toLocaleDateString() : 'Never backed up \u2014 do this before you change phones', null, exportBackup));
    root.appendChild(appRow('upload', 'Restore from a backup', 'Replaces the progress on this phone', null, importBackup));
  }

  /* ---------- stage ---------- */
  function pickStage() {
    openSheet('Where are you right now?', 'Sets what Home puts in front of you.', Object.keys(STAGES).map(function (k) {
      return { label: STAGES[k].label, sub: STAGES[k].sub, onPick: function () { setStage(k); } };
    }));
  }

  /* ---------- backup / restore / captain summary ---------- */
  var BACKUP_AT_KEY = 'fshq_backup_at_v1';
  // The reminder lives in the phone's calendar, so it isn't backed up (it would show "Set" on a new phone).
  var BACKUP_KEYS = ['fireStudyHQ.v1', 'fshq_drillstyle_v1', 'pep.known.v1', 'pep.missed.v1', 'pep.best.v1', 'pep.theme'];
  function validBackupValue(k, v) {
    if (typeof v !== 'string' || v.length > 5e6) return false;
    if (k === 'pep.theme') return v === 'dark' || v === 'light';
    var j; try { j = JSON.parse(v); } catch (e) { return false; }
    if (k === 'fireStudyHQ.v1') return !!parseStore(v);
    if (k === 'fshq_drillstyle_v1' || k === 'pep.known.v1') return !!j && typeof j === 'object' && !Array.isArray(j);
    if (k === 'pep.missed.v1') return Array.isArray(j);
    if (k === 'pep.best.v1') return typeof j === 'number' && j >= 0 && j <= 100;
    return false;
  }
  function backupBlobText() {
    if (typeof saveStore === 'function') saveStore();
    var data = { app: 'fire-study-hq', version: 2, exported: new Date().toISOString(), keys: {} };
    BACKUP_KEYS.forEach(function (k) { var v = lsGet(k); if (v != null) data.keys[k] = v; });
    return JSON.stringify(data);
  }
  function exportBackup() {
    var d = new Date(), name = 'fire-study-hq-backup-' + d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + '.json';
    var text = backupBlobText();
    try {
      var file = new File([text], name, { type: 'application/json' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], title: 'Fire Study HQ backup' })
          .then(function () { lsSet(BACKUP_AT_KEY, String(Date.now())); rerender(); })
          .catch(function () { /* cancelled: not a backup */ });
        return;
      }
    } catch (e) { /* fall through to download */ }
    saveFile(name, 'application/json', text, false);
    lsSet(BACKUP_AT_KEY, String(Date.now()));
    rerender();
  }
  function importBackup() {
    var inp = document.createElement('input');
    inp.type = 'file'; inp.accept = '.json,application/json';
    inp.addEventListener('change', function () {
      var f = inp.files && inp.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        var data; try { data = JSON.parse(r.result); } catch (e) { data = null; }
        if (!data || data.app !== 'fire-study-hq' || !data.keys || typeof data.keys !== 'object' || typeof data.keys['fireStudyHQ.v1'] !== 'string') { alert('That file isn\u2019t a Fire Study HQ backup.'); return; }
        var bad = BACKUP_KEYS.filter(function (k) { return data.keys[k] != null && !validBackupValue(k, data.keys[k]); });
        if (bad.length || !validBackupValue('fireStudyHQ.v1', data.keys['fireStudyHQ.v1'])) { alert('That backup is damaged and can\u2019t be restored. Nothing was changed.'); return; }
        var when = typeof data.exported === 'string' ? data.exported.slice(0, 10) : 'that file';
        if (!confirm('Replace the progress on this phone with the backup from ' + when + '?')) return;
        // Clear first so nothing from the old progress mixes with the backup.
        BACKUP_KEYS.forEach(function (k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } });
        BACKUP_KEYS.forEach(function (k) { if (typeof data.keys[k] === 'string') lsSet(k, data.keys[k]); });
        try { localStorage.setItem('fshq_restored_at', String(Date.now())); } catch (e) { /* ignore */ }
        location.reload();
      };
      r.readAsText(f);
    });
    inp.click();
  }
  function shareSummary() {
    var lines = [], now = new Date();
    lines.push('Fire Study HQ progress \u2014 ' + now.toLocaleDateString());
    if (store.stage) lines.push('Stage: ' + STAGES[store.stage].label);
    lines.push('Study streak: ' + dayStreak() + ' days');
    var retained = 0, solid = 0, total = 0;
    TOPICS.forEach(function (tp, t) { tp.cards.forEach(function (_, i) { total++; if (isRetained(t, i)) retained++; if (isMastered(t, i)) solid++; }); });
    lines.push('Cards retained 2+ weeks: ' + retained + ' of ' + total + ' \u00b7 solid now: ' + solid + ' \u00b7 due: ' + dueCount());
    HUBS.forEach(function (hub, h) {
      var n = 0, r2 = 0; hubTopicIdx(h).forEach(function (t) { TOPICS[t].cards.forEach(function (_, i) { n++; if (isRetained(t, i) || isMastered(t, i)) r2++; }); });
      lines.push('  ' + hub.title + ': ' + Math.round(r2 / Math.max(1, n) * 100) + '% solid');
    });
    var ex = (store.exams || []).slice(-5);
    if (ex.length) { lines.push('Recent exams:'); ex.forEach(function (e) { lines.push('  ' + new Date(e.date).toLocaleDateString() + ' ' + (EXAM_KINDS[e.kind] ? EXAM_KINDS[e.kind].title : e.kind) + ': ' + Math.round(e.score / e.n * 100) + '% (' + e.score + '/' + e.n + ')'); }); }
    var signed = CHECKLISTS.filter(function (c) { return store.checks && store.checks[c.id] && store.checks[c.id].signedAt; });
    lines.push('Checklists signed off: ' + signed.length + ' of ' + CHECKLISTS.length);
    signed.forEach(function (c) { var r = store.checks[c.id]; lines.push('  ' + c.title + ' \u2014 ' + r.signedBy + ', ' + new Date(r.signedAt).toLocaleDateString()); });
    var text = lines.join('\n');
    if (navigator.share) { navigator.share({ title: 'Fire Study HQ progress', text: text }).catch(function () {}); return; }
    showSheet('Progress summary', 'Copy this and send it to your captain.', function (body) {
      var ta = document.createElement('textarea'); ta.className = 'time-input summary-box'; ta.value = text; ta.rows = 12; ta.readOnly = true;
      body.appendChild(ta);
      var cp = el('button', 'btn block press', 'Copy'); cp.type = 'button';
      cp.addEventListener('click', function () { ta.select(); try { navigator.clipboard.writeText(text); } catch (e) { document.execCommand('copy'); } cp.textContent = 'Copied'; });
      body.appendChild(cp);
    });
  }
  function rerender() { if (typeof render === 'function') render(); }

  /* ---------- offline support ---------- */
  if ('serviceWorker' in navigator && /^https:|^http:\/\/(localhost|127\.)/.test(location.href)) {
    var reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      // Fires when the user accepted an update (or on the very first install, when nothing was controlling).
      if (reloading || !hadController) return;
      reloading = true; location.reload();
    });
    var hadController = !!navigator.serviceWorker.controller;
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').then(function (reg) {
        function watch(w) {
          if (!w) return;
          if (w.state === 'installed' && navigator.serviceWorker.controller) { showUpdateToast(w); return; }
          w.addEventListener('statechange', function () { if (w.state === 'installed' && navigator.serviceWorker.controller) showUpdateToast(w); });
        }
        watch(reg.waiting); watch(reg.installing);
        reg.addEventListener('updatefound', function () { watch(reg.installing); });
        // Installed apps can stay open for days: look for a new version whenever the app comes back.
        document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') reg.update().catch(function () {}); });
      }).catch(function () {});
    });
  }
  function showUpdateToast(worker) {
    if (document.getElementById('update-toast')) return;
    var t = el('div', 'update-toast'); t.id = 'update-toast'; t.setAttribute('role', 'status');
    t.appendChild(el('span', null, 'New version ready.'));
    var later = el('button', 'later press', 'Later'); later.type = 'button';
    later.addEventListener('click', function () { t.remove(); });
    var b = el('button', 'press', 'Reload'); b.type = 'button';
    b.addEventListener('click', function () {
      if (typeof activeWork === 'function' && activeWork() && !confirm('Reload now? You\u2019ll leave ' + activeWork() + '.')) return;
      if (typeof saveStore === 'function') saveStore();
      worker.postMessage('SKIP_WAITING');
    });
    t.appendChild(later); t.appendChild(b);
    document.body.appendChild(t);
  }
  // Ask the browser not to clear saved progress when storage runs low.
  if (navigator.storage && navigator.storage.persist) { navigator.storage.persist().catch(function () {}); }

  window.FSHQ_PWA = { renderInstallBanner: renderInstallBanner, renderAppSection: renderAppSection };
})();
