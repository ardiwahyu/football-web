importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
    { url: "/", revision: "1" },
    { url: "/index.html", revision: "1" },
    { url: "/detail.html", revision: "1" },
    { url: "/nav.html", revision: "1" },
    { url: "/index.bundle.js", revision: "1" },
    { url: "/detail.bundle.js", revision: "1" },
    { url: "/vendor.bundle.js", revision: "1" },
    { url: "/icon_512x512.png", revision: "1" },
    { url: "/manifest.json", revision: "1" },
    { url: "./src/register.js", revision: "1" },
    { url: "./src/styles/main.css", revision: "1" },
    { url: "./src/script/api-services.js", revision: "1" },
    { url: "./src/script/local-services.js", revision: "1" },
    { url: "./src/script/index-controller.js", revision: "1" },
    { url: "./src/script/detail-controller.js", revision: "1" },
    { url: "./src/data/data-logo.js", revision: "1" },
    { url: "./src/component/list-item.js", revision: "1" },
    { url: "./src/component/list-match.js", revision: "1" },
], { ignoreURLParametersMatching: [/.*/] });

workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2"),
    new workbox.strategies.StaleWhileRevalidate()
);

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