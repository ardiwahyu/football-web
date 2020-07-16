const CACHE_NAME = "football-v2";
const urlsToCache = [
    "/",
    "/index.html",
    "/detail.html",
    "/nav.html",
    "/index.bundle.js",
    "/detail.bundle.js",
    "/vendor.bundle.js",
    "/icon_512x512.png",
    "/manifest.json",
    "./src/register.js",
    "./src/styles/main.css",
    "./src/script/api-services.js",
    "./src/script/local-services.js",
    "./src/script/index-controller.js",
    "./src/script/detail-controller.js",
    "./src/data/data-logo.js",
    "./src/component/list-item.js",
    "./src/component/list-match.js",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener("fetch", function (event) {
    const baseUrl = "https://api.football-data.org/v2";
    if (event.request.url.indexOf(baseUrl) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', function (event) {
    let body, title;
    if (event.data) {
        try {
            const json = JSON.parse(event.data.text());
            body = json.body;
            title = json.title;
        } catch{
            body = event.data.text();
            title = ''
        }
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: './src/icon/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});