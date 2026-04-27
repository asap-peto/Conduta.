var CACHE = 'conduta-v53';
var ASSETS = [
  './',
  './index.html',
  './styles.css?v=30',
  './storage.js?v=15',
  './icons.js?v=10',
  './auth.js?v=17',
  './levels.js?v=11',
  './levels-data.js?v=4',
  './gamification.js?v=20',
  './ui.js?v=43',
  './game.js?v=26',
  './register-sw.js?v=25',
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
