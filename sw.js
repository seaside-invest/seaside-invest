// Service Worker — Seaside Invest v4 cache reset
// Generated: 2025-08-05T23:52:21.343856
// Change CACHE_NAME on each release to force fresh assets.
const CACHE_NAME = 'seaside-v4-20250805-235221';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([
      '/', '/index.html',
      '/css/styles.css',
      '/js/app.js',
      '/js/data.js'
      // legg til flere filer ved behov
    ]);
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Network-first for HTML to always see new version
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try { return await fetch(req); }
      catch { return caches.match('/index.html'); }
    })());
    return;
  }
  // Cache-first for static assets with runtime fallback
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    const res = await fetch(req);
    const cache = await caches.open(CACHE_NAME);
    cache.put(req, res.clone());
    return res;
  })());
});
