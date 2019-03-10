const cacheName = 'cache-1';
const cacheUrls = [
    '/',
    '/index.html',
    '/style.css',
];

/**
 * Install
 */
self.addEventListener('install', event => {
    console.log('install: キャッシュを追加');
    const openCache = async () => {
        const cache = await caches.open(cacheName);
        return await cache.addAll(cacheUrls);
    };
    event.waitUntil(openCache());
});

/**
 * fetch
 */
self.addEventListener('fetch', event => {
    console.log('fetch: キャッシュを取得 なければ通信');
    const matchCache = async () => {
        const response = await caches.match(event.request);
        if (response) {
            return response;
        }

        // return fetch(event.request);

        // Cacheに逐次追加したい場合はリクエストが成功した時にCacheに追加
        const fetchRequest = event.request.clone(); // Streamのためclone()
        const fetchResponse = await fetch(fetchRequest);
        if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
            return fetchResponse;
        }

        const fetchResponseCache = fetchResponse.clone(); // Streamのためclone()
        const cache = await caches.open(cacheName);
        cache.put(event.request, fetchResponseCache);

        return fetchRequest;
    }; 
    event.respondWith(matchCache()); 
});

/**
 * activate
 */
self.addEventListener('activate', event => {
    console.log('activate: 不要なキャッシュを削除');
    const cacheWhitelist = ['page-cache', 'blog-cache'];

    // Whitelistに
    const deleteCaches = async () => {
        const cacheNames = await caches.keys();
        return Promise.all(
            cacheNames.map(name => {
                if (cacheWhitelist.indexOf(name) === -1) {
                    console.log(`   ${name}`);
                    return caches.delete(name);
                }
            })
        );
    };

    event.waitUntil(deleteCaches);

});