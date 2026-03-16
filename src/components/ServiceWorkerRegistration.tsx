'use client';

// src/components/ServiceWorkerRegistration.tsx
// Source: Next.js official PWA guide (nextjs.org/docs/app/guides/progressive-web-apps)

import { useEffect } from 'react';

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', {
          scope: '/',
          updateViaCache: 'none', // Always re-fetch sw.js — critical for deploy updates
        })
        .then((reg) => {
          console.log('[SW] Registered:', reg.scope);
        })
        .catch((err) => {
          console.error('[SW] Registration failed:', err);
        });
    }
  }, []);

  return null;
}
