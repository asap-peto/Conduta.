var CACHE = 'conduta-cache';
var ASSETS = [
  './',
  './index.html',
  './styles.css',
  './storage.js',
  './icons.js',
  './auth.js',
  './levels.js',
  './levels-data.js',
  './gamification.js',
  './ui-state.js',
  './ui-shell.js',
  './ui-onboarding.js',
  './ui-home.js',
  './ui-league.js',
  './ui-progress.js',
  './ui-profile.js',
  './ui.js',
  './game.js',
  './register-sw.js',
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

  var reqUrl = new URL(e.request.url);
  if (reqUrl.origin !== self.location.origin) return;

  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(function(response) {
        var copy = response.clone();
        caches.open(CACHE).then(function(c) { c.put('./index.html', copy); });
        return response;
      }).catch(function() {
        return caches.match('./index.html');
      })
    );
    return;
  }

  e.respondWith(
    fetch(e.request).then(function(response) {
      var copy = response.clone();
      caches.open(CACHE).then(function(c) { c.put(e.request, copy); });
      return response;
    }).catch(function() {
      return caches.match(e.request);
    })
  );
});
