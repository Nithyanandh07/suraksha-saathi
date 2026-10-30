// Suraksha Saathi Offline Service Worker
const CACHE_NAME = 'suraksha-saathi-cache-v1';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/public/icon.svg'
];

// Offline fallback response for safety manual analysis if network is completely dead
const OFFLINE_FALLBACK_ANALYSIS = {
  success: true,
  source: 'offline_service_worker',
  data: {
    title: "रोलर व मशीन सुरक्षा निर्देशिका (ऑफलाइन मोड)",
    hazardLevel: "DANGER",
    explanation: "आप अभी बिना इंटरनेट (ऑफलाइन) क्षेत्र में हैं। फैक्ट्री की सभी चलती मशीनों, रोलर्स और गियरबॉक्स के पास हमेशा सुरक्षा गार्ड लगा होना चाहिए। बिना गार्ड के काम न करें।",
    dos: [
      "काम शुरू करने से पहले चेक करें कि सेफ्टी गार्ड लगा हुआ है।",
      "आस्तीन को कोहनी तक मोड़ें और बाल टोपी में बांधकर रखें।",
      "कोई भी आपातकाल होने पर लाल इमरजेंसी स्टॉप (E-Stop) बटन दबाएं।"
    ],
    donts: [
      "चलती मशीन के अंदर हाथ डालकर सफाई कभी न करें।",
      "गमछा, मफलर या अंगूठी पहनकर रोलर के पास कभी न जाएं।",
      "सेफ्टी सेंसर को कभी भी बाईपास या बंद न करें।"
    ],
    requiredPPE: ["सेफ्टी जूते", "फिटिंग दस्ताने", "आई प्रोटेक्शन चश्मा"],
    audioScript: "ऑफलाइन मोड सक्रिय। साथी ध्यान दें: बिना सेफ्टी गार्ड के कोई मशीन न चलाएं। खतरे पर तुरंत लाल इमरजेंसी बटन दबाएं।"
  }
};

// Install Event: Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching offline app shell');
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('[SW] Some precache items skipped:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean old caches and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[SW] Clearing old cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Cache-First for static assets, Network-First for API with offline fallback
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore non-GET requests for standard caching (pass through directly)
  if (request.method !== 'GET') {
    // If it's a POST to /api/analyze-safety-manual and offline, provide offline fallback
    if (url.pathname.includes('/api/analyze-safety-manual')) {
      event.respondWith(
        fetch(request).catch(() => {
          return new Response(JSON.stringify(OFFLINE_FALLBACK_ANALYSIS), {
            headers: { 'Content-Type': 'application/json' }
          });
        })
      );
    }
    return;
  }

  // Handle navigation requests (SPA index.html fallback)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const indexCached = await caches.match('/index.html');
          if (indexCached) return indexCached;
          return caches.match('/');
        })
    );
    return;
  }

  // Handle API GET requests (Network first, then cache)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Handle static assets (Stale-While-Revalidate)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
