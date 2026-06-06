/* ============================================================
   TravelNest - Service Worker
   Enables the site to work as a Progressive Web App (PWA).
   Uses a cache-first strategy: serve from cache when available,
   otherwise fetch from the network.
   ============================================================ */

const CACHE_NAME = 'travelnest-v1';

/* List of files to cache when the service worker installs */
const FILES_TO_CACHE = [
    './',
    './index.html',
    './destinations.html',
    './budget.html',
    './generator.html',
    './mood.html',
    './feedback.html',
    './css/style.css',
    './js/data.js',
    './js/utils.js',
    './js/home.js',
    './js/destinations.js',
    './js/budget.js',
    './js/generator.js',
    './js/mood.js',
    './js/feedback.js',
    './manifest.json',
    './images/favicon.svg',
    './images/icon.svg'
];

/* Install event - cache all required files */
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

/* Activate event - delete old caches */
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(name) {
                    return name !== CACHE_NAME;
                }).map(function(name) {
                    return caches.delete(name);
                })
            );
        })
    );
    self.clients.claim();
});

/* Fetch event - serve from cache first, then network */
self.addEventListener('fetch', function(event) {
    /* Only handle GET requests */
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then(function(cachedResponse) {
            if (cachedResponse) {
                return cachedResponse;
            }
            /* Not in cache - fetch from network */
            return fetch(event.request).catch(function() {
                /* If both cache and network fail, return index for navigation requests */
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});
