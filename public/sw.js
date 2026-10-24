// The app used to run on quidey.com with a service worker (and its cache) at this address.
// Browsers that still have it look here for updates and get this one instead: it deletes the
// old app's caches and removes itself, so quidey.com is plain web pages again.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
        await self.registration.unregister();
    })());
});
