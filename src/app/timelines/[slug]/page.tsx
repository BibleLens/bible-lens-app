import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmailCapture } from "@/components/EmailCapture";
import { GlassCard } from "@/components/GlassCard";
import { ZoomableTimelineImage } from "@/components/ZoomableTimelineImage";
import { ClaimStatusBadge } from "@/components/timelines/ClaimStatusBadge";
import { TimelineVisual } from "@/components/timelines/TimelineVisual";
import { getTimeline, TIMELINE_SLUGS, type Timeline } from "@/lib/timelines-data";

export const dynamic = "force-static";

const SITE_URL = "https://www.biblelens.faith";

interface TimelinePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return TIMELINE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TimelinePageProps): Promise<Metadata> {
  const { slug } = await params;
  const timeline = getTimeline(slug);
  if (!timeline) return {};
  const url = `${SITE_URL}/timelines/${timeline.slug}`;
  const image = `${SITE_URL}${timeline.socialImage}`;

  return {
    title: timeline.metaTitle,
    description: timeline.metaDescription,
    authors: [{ name: "Pat Robinson", url: `${SITE_URL}/about` }],
    alternates: { canonical: url },
    openGraph: {
      title: timeline.metaTitle,
      description: timeline.metaDescription,
      url,
      siteName: "Bible Lens",
      type: "article",
      publishedTime: timeline.datePublished,
      modifiedTime: timeline.dateModified,
      authors: [`${SITE_URL}/about`],
      images: [{ url: image, width: 1200, height: 630, alt: timeline.posterAlt }],
    },
    twitter: { card: "summary_large_image", title: timeline.metaTitle, description: timeline.metaDescription, images: [image] },
  };
}

function jsonLd(timeline: Timeline) {
  const url = `${SITE_URL}/timelines/${timeline.slug}`;
  const image = `${SITE_URL}${timeline.socialImage}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: timeline.title,
        description: timeline.metaDescription,
        image: { "@id": `${url}#primaryimage` },
        datePublished: timeline.datePublished,
        dateModified: timeline.dateModified,
        inLanguage: "en-GB",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        author: { "@type": "Person", "@id": `${SITE_URL}/about#pat-robinson`, name: "Pat Robinson", url: `${SITE_URL}/about` },
        mainEntityOfPage: url,
      },
      {
        "@type": "ImageObject",
        "@id": `${url}#primaryimage`,
        contentUrl: image,
        width: 1200,
        height: 630,
        caption: timeline.posterAlt,
      },
    ],
  };
}

export default async function TimelinePage({ params }: TimelinePageProps) {
  const { slug } = await params;
  const timeline = getTimeline(slug);
  if (!timeline) notFound();

  return (
    <div className="min-h-screen bg-[var(--color-obsidian)] text-[var(--color-text-primary)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(timeline)) }} />
      <main id="main-content" className="w-full">
        <section className="grain-overlay px-6 pb-14 pt-10">
          <div className="mx-auto max-w-5xl">
            <Link href="/timelines" className="micro-label inline-flex min-h-11 items-center text-[var(--homepage-primary)] hover:text-[var(--homepage-primary)]">← Bible timelines</Link>
            <p className="micro-label mt-7 text-[var(--homepage-primary)]">{timeline.kicker}</p>
            <h1 className="mt-4 max-w-4xl text-[2.5rem] font-semibold leading-[1.04] text-balance sm:text-5xl lg:text-[3.5rem]" style={{ fontFamily: "var(--font-display)" }}>
              {timeline.title}
            </h1>
            <p className="mt-6 max-w-[40rem] text-xl leading-relaxed text-[var(--color-text-secondary)]">{timeline.tagline}</p>
            <p className="mt-6 text-sm text-[var(--color-text-muted)]">
              Research and commentary by <Link href="/about" className="text-[var(--color-text-secondary)] underline decoration-cyan-300/45 underline-offset-4 hover:text-[var(--homepage-primary)]">Pat Robinson</Link>
              <span aria-hidden="true"> · </span>Updated 25 August 2026
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-10">
          <TimelineVisual visual={timeline.visual} />
        </section>

        <section className="mx-auto grid max-w-5xl gap-10 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-5">
            {timeline.intro.map((paragraph) => <p key={paragraph} className="text-lg leading-8 text-[var(--color-text-secondary)]">{paragraph}</p>)}
          </div>
          <aside className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.05] p-6">
            <p className="micro-label text-[var(--homepage-primary)]">BIBLE LENS CONCLUSION</p>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-secondary)]">{timeline.conclusion}</p>
          </aside>
        </section>

        <div className="mx-auto max-w-5xl px-6">
          {timeline.sections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-[calc(var(--site-nav-offset)+16px)] border-t border-[var(--color-border)] py-12">
              <div className="grid gap-6 md:grid-cols-[60px_minmax(0,1fr)]">
                <span className="text-4xl font-semibold text-[var(--color-text-muted)]" style={{ fontFamily: "var(--font-display)" }}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-3xl font-semibold text-balance" style={{ fontFamily: "var(--font-display)" }}>{section.heading}</h2>
                    {section.status && <ClaimStatusBadge status={section.status} />}
                  </div>
                  <div className="mt-5 max-w-3xl space-y-4">
                    {section.body.map((paragraph) => <p key={paragraph} className="text-lg leading-8 text-[var(--color-text-secondary)]">{paragraph}</p>)}
                    {section.cite && <p className="pt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--homepage-primary)]">{section.cite}</p>}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="border-y border-[var(--color-border)] bg-[var(--color-obsidian)] px-6 py-16" aria-labelledby="evidence-ledger-heading">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-3xl">
              <p className="micro-label text-[var(--homepage-primary)]">SOURCE CHECK</p>
              <h2 id="evidence-ledger-heading" className="mt-3 text-4xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>Evidence ledger</h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">This is the line between what the sources say and what the reconstruction proposes.</p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {timeline.evidence.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6">
                  <ClaimStatusBadge status={item.status} />
                  <h3 className="mt-4 text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">{item.summary}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                    Sources {item.sourceIds.map((id) => `[${timeline.sources.findIndex((source) => source.id === id) + 1}]`).join(" ")}
                  </p>
                </article>
              ))}
            </div>
            <aside className="mt-8 rounded-2xl border border-orange-300/20 bg-orange-300/[0.045] p-7">
              <div className="flex flex-wrap items-center gap-3"><ClaimStatusBadge status="disputed" /><h3 className="text-lg font-semibold">The strongest objection</h3></div>
              <p className="mt-4 max-w-[40rem] leading-7 text-[var(--color-text-secondary)]">{timeline.strongestObjection}</p>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16" aria-labelledby="sources-heading">
          <h2 id="sources-heading" className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>Sources and further reading</h2>
          <ol className="mt-8 space-y-5">
            {timeline.sources.map((source, index) => (
              <li key={source.id} className="grid gap-2 border-t border-[var(--color-border)] pt-5 sm:grid-cols-[34px_minmax(0,1fr)]">
                <span className="text-sm font-semibold text-[var(--homepage-primary)]">[{index + 1}]</span>
                <div>
                  <p className="font-semibold text-[var(--color-text-primary)]">{source.url ? <a href={source.url} target="_blank" rel="noreferrer" className="underline decoration-[var(--color-border-hover)] underline-offset-4 hover:text-[var(--homepage-primary)]">{source.title}</a> : source.title}{source.author ? ` — ${source.author}` : ""}</p>
                  <p className="mt-1 max-w-[40rem] text-sm leading-6 text-[var(--color-text-muted)]">{source.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto grid max-w-5xl gap-10 border-t border-[var(--color-border)] px-6 py-16 lg:grid-cols-[320px_minmax(0,1fr)]">
          <figure>
            <ZoomableTimelineImage src={timeline.posterImage} alt={timeline.posterAlt} width={timeline.posterWidth} height={timeline.posterHeight} className="h-auto w-full" sizes="(max-width: 1024px) 100vw, 320px" />
          </figure>
          <div className="self-center">
            <p className="micro-label text-[var(--color-gold-400)]">TAKE IT WITH YOU</p>
            <h2 className="mt-3 text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>The shareable evidence card</h2>
            <p className="mt-4 max-w-xl leading-7 text-[var(--color-text-secondary)]">A portrait summary for saving or sharing. The live page remains the source of record, where qualifications and references stay attached.</p>
            <a href={timeline.posterImage} download={timeline.posterDownload} className="mt-7 inline-flex min-h-12 items-center bg-cyan-300 px-6 font-semibold text-[#050508] transition-colors hover:bg-cyan-200">Download PNG</a>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-16">
          <GlassCard className="p-8 sm:p-10"><EmailCapture headline="Follow the evidence" subtext="New timeline investigations arrive when the source trail is ready." /></GlassCard>
        </section>
      </main>
    </div>
  );
}
