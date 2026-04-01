var CACHE = 'conduta-v2';
var ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/storage.js',
  '/auth.js',
  '/game.js',
  '/ui.js',
  '/cases.js',
  '/badges.js',
  '/manifest.json',
  '/Conduta_mini_logo.svg'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) { return r || fetch(e.request); })
  );
});
