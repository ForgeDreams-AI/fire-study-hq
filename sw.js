/* Fire Study HQ service worker.
   Makes the app open with no signal. Every app file is cached on first visit;
   after that the cached copy loads instantly while a fresh copy is fetched in
   the background, so a new push to GitHub shows up on the next launch.
   Bump VERSION when this file's PRECACHE list changes. */
var VERSION = 'fshq-v6';
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
  'paramedic-exam-prep.html',
  'manifest.webmanifest',
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
var FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(VERSION).then(function (c) {
    // cache: 'reload' skips the HTTP cache so a new install gets fresh files.
    return c.addAll(PRECACHE.map(function (u) { return new Request(u, { cache: 'reload' }); }));
  }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});


function staleWhileRevalidate(req, e) {
  return caches.open(VERSION).then(function (c) {
    return c.match(req, { ignoreSearch: req.mode === 'navigate' }).then(function (hit) {
      var net = fetch(req).then(function (res) {
        if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone());
        return res;
      }).catch(function () { return null; });
      if (hit) { e.waitUntil(net); return hit; }
      return net.then(function (res) {
        if (res) return res;
        // Offline and never cached: fall back to the app shell for page loads.
        if (req.mode === 'navigate') return c.match('index.html');
        return Response.error();
      });
    });
  });
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin === self.location.origin || FONT_HOSTS.indexOf(url.hostname) !== -1) {
    e.respondWith(staleWhileRevalidate(req, e));
  }
  // Everything else (YouTube embeds, outside links) goes straight to the network.
});
