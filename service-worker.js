var CACHE = 'conduta-v7';
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

// Network-first: sempre busca do servidor, fallback para cache se offline
self.addEventListener('fetch', function(e) {
  e.respondWith(
    fetch(e.request).then(function(response) {
      // Atualiza o cache com a resposta fresca
      if (response.ok) {
        var clone = response.clone();
        caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
      }
      return response;
    }).catch(function() {
      return caches.match(e.request);
    })
  );
});
