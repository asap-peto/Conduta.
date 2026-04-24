function canRegisterServiceWorker() {
  if (window.location.protocol === 'https:') return true;
  return window.location.protocol === 'http:' &&
    ['localhost', '127.0.0.1'].includes(window.location.hostname);
}

if ('serviceWorker' in navigator && canRegisterServiceWorker()) {
  var refreshing = false;

  navigator.serviceWorker.addEventListener('controllerchange', function() {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./service-worker.js?v=26').then(function(reg) {
      reg.update();
    }).catch(function(err) {
      console.warn('Falha ao registrar service worker:', err);
    });
  });
}
