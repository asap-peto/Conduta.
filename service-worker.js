var CACHE = 'conduta-v8';
var ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/storage.js',
  '/icons.js',
  '/auth.js',
  '/cases.js',
  '/score.js',
  '/share.js',
  '/percentile.js',
  '/ui.js',
  '/game.js',
  '/manifest.json',
  '/Conduta_mini_logo.svg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

/* HTML: network-first (atualizações chegam); resto: cache-first. */
self.addEventListener('fetch', function (e) {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(function (r) {
        var copy = r.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        return r;
      }).catch(function () { return caches.match(e.request); })
    );
    return;
  }
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || fetch(e.request); })
  );
});
