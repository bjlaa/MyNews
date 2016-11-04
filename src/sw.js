const DEBUG = false;

const CacheName = 'MyNews-dev-v7';

const {
  assets,
} = global.serviceWorkerOption;

let assetsToCache = [
  ...assets,
  './',
];

assetsToCache = assetsToCache.map((path) => {
  return new URL(path, global.location).toString();
});
/* eslint-disable */
self.addEventListener('install', (event) => {
  if (DEBUG) {
    console.log('[SW] Install event');
  }

  event.waitUntil(
    global.caches
    .open(CacheName)
    .then((cache) => {
      return cache.addAll(assetsToCache);
    })
    .then(() => {
      if (DEBUG) {
        console.log('Cached assets: main', assetsToCache);
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    })
  );
});

self.addEventListener('activate', function(event) {
  if (DEBUG) {
    console.log('[SW] Activate event');
  }

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('MyNews-dev') &&
                  cacheName !== CacheName;
        }).map(function(cacheName) {
          return global.caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {

  const request = event.request;
  // Ignore not GET request.
  if (request.method !== 'GET') {
    if (DEBUG) {
      console.log(`[SW] Ignore non GET request ${request.method}`);
    }
    return;
  }

  const requestUrl = new URL(request.url);

  // Ignore difference origin.
  if (requestUrl.origin !== location.origin) {
    if (DEBUG) {
      console.log(`[SW] Ignore difference origin ${requestUrl.origin}`);
    }
    return;
  }

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
/* eslint-enable */