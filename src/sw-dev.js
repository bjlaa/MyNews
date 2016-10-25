const staticCacheName = 'MyNews-dev-v4';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cacheName) {
      return cacheName.addAll([
        '/index',
        '/bundle.js',
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('MyNews-dev') &&
                  cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {

  const requestUrl = new URL(event.request.url);
  if(requestUrl.origin === location.origin) {
    if(requestUrl.pathName === '/') {
      event.respondWith(caches.match('./index'));
      return;
    }
  }
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if(response) return response;

      return fetch(event.request);
    })
  );
});