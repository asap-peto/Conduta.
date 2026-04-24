var CACHE = 'conduta-v28';
var ASSETS = [
  './',
  './index.html',
  './styles.css?v=19',
  './storage.js?v=10',
  './icons.js?v=10',
  './auth.js?v=13',
  './levels.js?v=9',
  './levels-data.js?v=2',
  './gamification.js?v=12',
  './ui.js?v=27',
  './game.js?v=15',
  './register-sw.js?v=24',
  './manifest.json',
  './Conduta_mini_logo.svg'
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

self.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;

  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(function() {
        return caches.match('./index.html');
      })
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(function(r) { return r || fetch(e.request); })
  );
});
