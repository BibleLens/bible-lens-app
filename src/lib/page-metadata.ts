// src/lib/page-metadata.ts
// Route-specific metadata builder. Pages that set only title/description
// inherit the HOMEPAGE openGraph block from the root layout — og:title
// "Bible Lens | Context Over Tradition" and og:url biblelens.faith — so
// sharing them produced a homepage card. This mirrors title/description
// into OG + Twitter and sets a per-route canonical.
import type { Metadata } from 'next';

const SITE_URL = 'https://biblelens.faith';

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Bible Lens' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}
