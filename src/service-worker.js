const CACHE_NAME = "football-v2";
const urlsToCache = [
    "/",
    "/index.html",
    "/detail.html",
    "/nav.html",
    "/index.bundle.js",
    "/detail.bundle.js",
    "/vendor.bundle.js",
    "./src/register.js",
    "./src/styles/main.css",
    "./src/script/api-services.js",
    "./src/script/local-services.js",
    "./src/script/index-controller.js",
    "./src/script/detail-controller.js",
    "./src/icon/icon.png",
    "./src/data/data-logo.js",
    "./src/component/list-item.js",
    "./src/component/list-match.js"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
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