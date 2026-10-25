import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
          // Compatible with static rendering and existing scripts and media.
          // A nonce-based script policy would require a separate rendering change.
          { key: 'Content-Security-Policy', value: "base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'" },
        ],
      },
      { source: '/api/:path*', headers: [{ key: 'Cache-Control', value: 'no-store' }] },
      { source: "/temples/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
      {
        source: '/timelines/israel-in-egypt-hero.png',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment; filename="bible-lens-israel-in-egypt-215-vs-430.png"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
