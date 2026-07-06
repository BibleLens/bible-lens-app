import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmailCapture } from "@/components/EmailCapture";
import { GlassCard } from "@/components/GlassCard";
import { ZoomableTimelineImage } from "@/components/ZoomableTimelineImage";
import { getTimeline, TIMELINE_SLUGS, type Timeline } from "@/lib/timelines-data";

export const dynamic = "force-static";

const SITE_URL = "https://biblelens.faith";

interface TimelinePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return TIMELINE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TimelinePageProps): Promise<Metadata> {
  const { slug } = await params;
  const t = getTimeline(slug);
  if (!t) return {};
  const url = `${SITE_URL}/timelines/${t.slug}`;
  const image = `${SITE_URL}${t.heroImage}`;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url,
      siteName: "Bible Lens",
      type: "article",
      images: [{ url: image, width: t.heroWidth, height: t.heroHeight, alt: t.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle,
      description: t.metaDescription,
      images: [image],
    },
  };
}

function jsonLd(t: Timeline) {
  const url = `${SITE_URL}/timelines/${t.slug}`;
  const image = `${SITE_URL}${t.heroImage}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: t.title,
        description: t.metaDescription,
        image,
        datePublished: t.datePublished,
        dateModified: t.dateModified,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        author: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: url,
      },
      {
        "@type": "ImageObject",
        "@id": `${url}#primaryimage`,
        contentUrl: image,
        width: t.heroWidth,
        height: t.heroHeight,
        caption: t.heroAlt,
      },
    ],
  };
}

export default async function TimelinePage({ params }: TimelinePageProps) {
  const { slug } = await params;
  const t = getTimeline(slug);
  if (!t) notFound();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-obsidian)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(t)) }}
      />
      <main id="main-content" className="flex-1 w-full pt-[248px]">
        {/* Editorial hero */}
        <section
          className="grain-overlay min-h-[36vh] flex items-end pb-14 px-6"
          style={{ background: "var(--color-obsidian)" }}
        >
          <div className="max-w-6xl mx-auto w-full">
            <GlassCard className="p-10 md:p-16 text-center max-w-4xl mx-auto">
              <span className="micro-label mb-4 block" style={{ color: "var(--color-cyan-400)" }}>
                {t.kicker}
              </span>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-balance"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
              >
                {t.title}
              </h1>
              <p
                className="mt-3 max-w-2xl mx-auto text-lg text-pretty"
                style={{ color: "var(--color-text-muted-warm)" }}
              >
                {t.tagline}
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Hero infographic + intro (the topic's headline argument) */}
        <section id={t.introId} className="max-w-6xl mx-auto px-6 py-12 scroll-mt-[248px]">
          {/* Click/tap opens a full-screen lightbox so the baked-in fine print is
              legible. The readable content is also in the text below. */}
          <figure className="mx-auto max-w-[640px]">
            <ZoomableTimelineImage
              src={t.heroImage}
              alt={t.heroAlt}
              width={t.heroWidth}
              height={t.heroHeight}
              priority
              className="w-full h-auto"
            />
          </figure>
          <div className="max-w-2xl mx-auto mt-10 space-y-4">
            {t.intro.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                {p}
              </p>
            ))}
            {t.introCite && (
              <p className="micro-label pt-2" style={{ color: "var(--color-cyan-400)" }}>
                {t.introCite}
              </p>
            )}
          </div>
          <div className="text-center mt-10">
            <a
              href={t.heroImage}
              download={t.heroDownload}
              className="inline-block px-6 py-3 font-semibold transition-all hover:brightness-110"
              style={{ background: "var(--color-cyan-400)", color: "var(--color-bg-primary)", borderRadius: 0 }}
            >
              Download the full infographic (1000×1500 PNG)
            </a>
          </div>
        </section>

        {/* Anchored facet sections (e.g. the four Israel-in-Egypt arguments) */}
        {t.sections.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="max-w-6xl mx-auto px-6 py-10 scroll-mt-[248px]"
          >
            <div className="max-w-4xl mx-auto grid md:grid-cols-[minmax(0,1fr)_320px] gap-10 items-start">
              <div className="space-y-4 order-2 md:order-1">
                <h2
                  className="text-2xl sm:text-3xl font-semibold text-balance"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
                >
                  {s.heading}
                </h2>
                {s.body.map((p, i) => (
                  <p key={i} className="text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {p}
                  </p>
                ))}
                {s.cite && (
                  <p className="micro-label pt-1" style={{ color: "var(--color-cyan-400)" }}>
                    {s.cite}
                  </p>
                )}
              </div>
              {s.image && (
                <figure className="order-1 md:order-2">
                  <ZoomableTimelineImage
                    src={s.image}
                    alt={s.imageAlt ?? ""}
                    width={1000}
                    height={1500}
                    className="w-full h-auto"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                </figure>
              )}
            </div>
          </section>
        ))}

        {/* Sources */}
        <p className="text-xs text-center mt-6 mb-12 px-6 max-w-2xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
          {t.sources}
        </p>

        {/* Email capture */}
        <section className="max-w-6xl mx-auto px-6 pb-12">
          <GlassCard className="p-10">
            <EmailCapture
              headline="Want the next timeline in your inbox?"
              subtext="We'll send a note when a new infographic ships — no weekly newsletter, no upsell, just the next one."
            />
          </GlassCard>
        </section>

        {/* Back to index */}
        <div className="text-center pb-16">
          <Link
            href="/timelines"
            className="micro-label transition-colors hover:brightness-125"
            style={{ color: "var(--color-cyan-400)" }}
          >
            ← All timelines
          </Link>
        </div>
      </main>
    </div>
  );
}
