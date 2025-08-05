
const CACHE = 'seaside-v34';
const ASSETS = [
  '/', '/index.html', '/style.css',
  '/js/app.js','/js/dashboard.js','/js/dividends.js','/js/rentals.js','/js/kids.js','/js/goals.js','/js/family.js','/js/settings.js',
  '/data/demo.json','/assets/logo.svg','/assets/favicon.svg'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch', e=>{
  const url = new URL(e.request.url);
  if(url.origin === location.origin){
    e.respondWith(caches.match(e.request).then(res=>res || fetch(e.request)));
  }
});
