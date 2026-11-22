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
  }

  /* ---------- offline support ---------- */
  if ('serviceWorker' in navigator && /^https:|^http:\/\/(localhost|127\.)/.test(location.href)) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
  // Ask the browser not to clear saved progress when storage runs low.
  if (navigator.storage && navigator.storage.persist) { navigator.storage.persist().catch(function () {}); }

  window.FSHQ_PWA = { renderInstallBanner: renderInstallBanner, renderAppSection: renderAppSection };
})();
