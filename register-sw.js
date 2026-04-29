function canRegisterServiceWorker() {
  if (window.location.protocol === 'https:') return true;
  return false;
}

function isLocalDevHost() {
  return window.location.protocol === 'http:' &&
    ['localhost', '127.0.0.1'].includes(window.location.hostname);
}

if ('serviceWorker' in navigator && isLocalDevHost()) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.getRegistrations().then(function(regs) {
      regs.forEach(function(reg) { reg.unregister(); });
    }).catch(function() {});

    if (window.caches && caches.keys) {
      caches.keys().then(function(keys) {
        keys.filter(function(k) { return k.indexOf('conduta-') === 0; })
          .forEach(function(k) { caches.delete(k); });
      }).catch(function() {});
    }
  });
}

if ('serviceWorker' in navigator && canRegisterServiceWorker()) {
  var refreshing = false;

  navigator.serviceWorker.addEventListener('controllerchange', function() {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./service-worker.js?v=27').then(function(reg) {
      reg.update();
    }).catch(function(err) {
      console.warn('Falha ao registrar service worker:', err);
    });
  });
}
