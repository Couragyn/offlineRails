importScripts('/workbox/workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: '/workbox/',
  debug: false
});

// Precache essential assets
workbox.precaching.precacheAndRoute([]);

// Cache HTML pages with network-first strategy
workbox.routing.registerRoute(
  ({ request }) => request.mode === 'navigate',
  new workbox.strategies.NetworkFirst({
    cacheName: 'pages-cache-v1',
    networkTimeoutSeconds: 3
  })
);

// Cache CSS files
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'style',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'css-cache-v1'
  })
);

// Cache JavaScript files
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'script',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'js-cache-v1'
  })
);

// Cache images
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache-v1',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      })
    ]
  })
);

// Fallback for offline pages
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open('pages-cache-v1');
        const cachedResponse = await cache.match('/offline.html');
        return cachedResponse || new Response('You are offline', {
          status: 503,
          headers: { 'Content-Type': 'text/html' }
        });
      })
    );
  }
});