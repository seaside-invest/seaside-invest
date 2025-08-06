// Register Service Worker with version query to bust CDN caches
(function() {
  if (!('serviceWorker' in navigator)) return;
  const v = '2025-08-05';
  navigator.serviceWorker.register('/sw.js?v=' + v).catch(console.error);
})();
