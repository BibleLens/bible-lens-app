// public/sw.js
// Source: MDN Service Worker API + Next.js official PWA guide

self.addEventListener('install', (event) => {
  // Skip waiting: force this SW to become active immediately
  // Without this, the new SW sits in "waiting" state until all tabs are closed
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Claim clients: take control of all open pages immediately
  // Without this, pages opened before this SW became active are not controlled
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // NetworkOnly for all API routes: never cache, never buffer
  // /api/chat uses Transfer-Encoding: chunked streaming — any caching breaks it
  // /api/commentary, /api/search, /api/health are also protected
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // All other requests: let browser handle natively (no cache strategy in Phase 38)
  // Offline caching (PWA-01) is future scope — don't add it here
});
