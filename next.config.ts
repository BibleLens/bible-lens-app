import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
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
