/* Fire Study HQ service worker.
   Each VERSION is one complete, consistent set of app files: installed together
   (bypassing the HTTP cache), served cache-first, and swapped in only when the
   user taps "Reload" on the update prompt. Old and new files never mix.
   VERSION must change on every deploy that touches an app file, or installed
   apps never see the update. Run `node tools/check.js` before pushing: it fails
   when app files changed without a bump. */
var VERSION = 'fshq-v11';
var PRECACHE = [
  './',
  'index.html',
  'styles.css',
  'data.js',
  'scenarios.js',
  'app.js',
  'pwa.js',
  'checklists.js',
  'checklists-ui.js',
  'ecg.js',
  'radio.js',
  'paramedic-exam-prep.html',
  'manifest.webmanifest',
  'fonts/fonts.css',
  'fonts/inter-latin-400-normal.woff2',
  'fonts/inter-latin-500-normal.woff2',
  'fonts/inter-latin-600-normal.woff2',
  'fonts/inter-latin-700-normal.woff2',
  'fonts/inter-latin-800-normal.woff2',
  'fonts/barlow-condensed-latin-500-normal.woff2',
  'fonts/barlow-condensed-latin-600-normal.woff2',
  'fonts/barlow-condensed-latin-700-normal.woff2',
  'fonts/barlow-latin-400-normal.woff2',
  'fonts/barlow-latin-500-normal.woff2',
  'fonts/barlow-latin-600-normal.woff2',
  'fonts/barlow-latin-700-normal.woff2',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/maskable-512.png',
  'icons/apple-touch-icon.png',
  'icons/favicon-32.png',
  'assets/scenarios/basement-arrival.jpg',
  'assets/scenarios/gilbert-arrival.jpg',
  'assets/scenarios/highrise-arrival.jpg',
  'assets/scenarios/house-arrival.jpg',
  'assets/scenarios/midrise-arrival.jpg',
  'assets/scenarios/ocotillo-arrival.jpg',
  'assets/scenarios/stickcity-arrival.jpg',
  'assets/scenarios/stripmall-arrival.jpg',
  'assets/scenarios/garage-apt-arrival.jpg',
  'assets/scenarios/ranch-arrival.jpg',
  'assets/scenarios/tileroof-arrival.jpg',
  'assets/scenarios/parkinggarage-arrival.jpg',
  'assets/scenarios/pizza-arrival.jpg'
];
self.addEventListener('install', function (e) {
  // No skipWaiting here: the page asks for it when the user taps Reload.
  e.waitUntil(caches.open(VERSION).then(function (c) {
    return c.addAll(PRECACHE.map(function (u) { return new Request(u, { cache: 'reload' }); }));
  }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    // Only this app's old caches: other apps share this origin (forgedreams-ai.github.io).
    return Promise.all(keys.filter(function (k) { return k.indexOf('fshq-') === 0 && k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('message', function (e) {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin === self.location.origin) {
    // App files: always from this version's cache, so every file matches.
    e.respondWith(caches.open(VERSION).then(function (c) {
      return c.match(req, { ignoreSearch: true }).then(function (hit) {
        if (hit) return hit;
        return fetch(req).then(function (res) {
          // Files outside the precache list (rare) are cached on first use.
          if (res && res.ok && url.pathname.indexOf('/build/') < 0) c.put(req, res.clone());
          return res;
        }).catch(function () {
          return req.mode === 'navigate' ? c.match('index.html') : Response.error();
        });
      });
    }));
  }
  // Everything else (YouTube embeds, outside links) goes straight to the network.
});
