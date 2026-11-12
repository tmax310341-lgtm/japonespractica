// KotoDojo · Service worker: permite instalar la app y usarla sin conexión.
//
// Estrategias:
//   - Archivos propios (HTML, CSS, JS, datos): primero la red, para tener siempre la última
//     versión publicada; si no hay conexión (o tarda demasiado), la copia guardada.
//   - Librerías y fuentes de CDN (Font Awesome, Google Fonts, SDK de Firebase): primero la copia
//     guardada, porque sus URLs incluyen la versión y no cambian.
//   - Llamadas a Firebase (inicio de sesión, Firestore): no se tocan.
//
// Si añades un archivo a la app, inclúyelo en APP_SHELL (npm test lo comprueba).
// Sube CACHE_VERSION solo si cambias la lógica de este archivo.

const CACHE_VERSION = 'v1';
const APP_CACHE = `kotodojo-app-${CACHE_VERSION}`;
const CDN_CACHE = `kotodojo-cdn-${CACHE_VERSION}`;
const NETWORK_TIMEOUT_MS = 4000;

const APP_SHELL = [
    './',
    'index.html',
    'manifest.json',
    'css/app.css',
    'css/base.css',
    'css/tailwind.css',
    'css/theme-overrides.css',
    'data/kana-strokes-svg.js',
    'data/kana.js',
    'data/vocabulary.js',
    'data/stroke-steps.js',
    'data/number-kanji.js',
    'js/utils.js',
    'js/actions.js',
    'js/state.js',
    'js/audio.js',
    'js/ui-themes.js',
    'js/stroke-engine.js',
    'js/kana-utils.js',
    'js/stroke-modal.js',
    'js/study.js',
    'js/drawing.js',
    'js/game-lookalikes.js',
    'js/game-shiritori.js',
    'js/game-wordbuilder.js',
    'js/game-wordsearch.js',
    'js/game-memory.js',
    'js/game-quiz.js',
    'js/progress-srs.js',
    'js/stages.js',
    'js/numbers.js',
    'js/time.js',
    'js/parcial.js',
    'js/main.js',
    'js/progress-merge.js',
    'js/firebase-config.js',
    'js/cloud-sync.js',
    'icons/icon-192.png',
    'icons/icon-512.png',
    'icons/icon-maskable-512.png',
    'icons/apple-touch-icon.png',
    'icons/favicon-48.png'
];

const CDN_HOSTS = ['cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];
const isFirebaseSdk = url => url.hostname === 'www.gstatic.com' && url.pathname.startsWith('/firebasejs/');

self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(APP_CACHE);
        // Uno a uno: si un archivo falla, el resto se guarda igualmente.
        await Promise.all(APP_SHELL.map(path => cache.add(new Request(path, { cache: 'reload' })).catch(() => {})));
        await self.skipWaiting();
    })());
});

self.addEventListener('activate', event => {
    event.waitUntil((async () => {
        const keep = [APP_CACHE, CDN_CACHE];
        const names = await caches.keys();
        await Promise.all(names.filter(n => n.startsWith('kotodojo-') && !keep.includes(n)).map(n => caches.delete(n)));
        await self.clients.claim();
    })());
});

self.addEventListener('fetch', event => {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);

    if (url.origin === self.location.origin) {
        event.respondWith(networkFirst(req, event));
    } else if (CDN_HOSTS.includes(url.hostname) || isFirebaseSdk(url)) {
        event.respondWith(cacheFirst(req));
    }
});

async function networkFirst(req, event) {
    const cache = await caches.open(APP_CACHE);
    const network = fetch(req).then(res => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
    });
    // Mantener vivo el worker hasta que termine de actualizar la copia
    event.waitUntil(network.catch(() => {}));

    const timeout = new Promise(resolve => setTimeout(resolve, NETWORK_TIMEOUT_MS, null));
    try {
        const res = await Promise.race([network, timeout]);
        if (res) return res;
    } catch (err) {
        // sin conexión: usar la copia guardada
    }
    const cached = await cache.match(req, { ignoreSearch: true })
        || (req.mode === 'navigate' ? await cache.match('index.html') : null);
    return cached || network;
}

async function cacheFirst(req) {
    const cache = await caches.open(CDN_CACHE);
    const cached = await cache.match(req);
    if (cached) return cached;
    const res = await fetch(req);
    // Las respuestas opacas (status 0) de hojas de estilo y fuentes también sirven sin conexión
    if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
    return res;
}
