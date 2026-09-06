import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { GlassCard } from "@/components/GlassCard";
import { ClaimStatusBadge } from "@/components/timelines/ClaimStatusBadge";
import { MasterTimeline } from "@/components/timelines/MasterTimeline";
import { TimelineVisual } from "@/components/timelines/TimelineVisual";
import { CLAIM_STATUS_COPY, TIMELINES, type ClaimStatus } from "@/lib/timelines-data";

export const dynamic = "force-static";

const SITE_URL = "https://www.biblelens.faith";

export const metadata: Metadata = {
  title: "Bible Timelines: Genesis to the Conquest | Bible Lens",
  description: "Explore a source-led biblical timeline from Genesis to the conquest, with documented evidence separated from calculations, disputes and hypotheses.",
  alternates: { canonical: `${SITE_URL}/timelines` },
  openGraph: {
    title: "Bible Timelines: Genesis to the Conquest | Bible Lens",
    description: "A source-led chronology with the evidence—and the uncertainty—kept visible.",
    url: `${SITE_URL}/timelines`,
    siteName: "Bible Lens",
    type: "website",
    images: [{ url: "/timelines/og/master-timeline.png", width: 1200, height: 630, alt: "Bible Lens chronology from Genesis to the conquest" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bible Timelines: Genesis to the Conquest | Bible Lens",
    description: "A source-led chronology with the evidence—and the uncertainty—kept visible.",
    images: ["/timelines/og/master-timeline.png"],
  },
};

const statuses = Object.keys(CLAIM_STATUS_COPY) as ClaimStatus[];

export default function TimelinesIndexPage() {
  return (
    <div className="min-h-screen bg-[var(--color-obsidian)] text-[var(--color-text-primary)]">
      <main id="main-content" className="w-full">
        <section className="grain-overlay px-6 pb-16 pt-10">
          <div className="mx-auto max-w-6xl">
            <p className="micro-label text-[var(--homepage-primary)]">BIBLE LENS · CHRONOLOGY</p>
            <div className="mt-5 grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">
              <div>
                <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] text-balance sm:text-6xl lg:text-8xl" style={{ fontFamily: "var(--font-display)" }}>
                  The Bible,<br /><span className="text-[var(--homepage-primary)]">placed in time.</span>
                </h1>
              </div>
              <div className="border-l border-cyan-300/35 pl-6">
                <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                  A working chronology from Genesis to the conquest—built from biblical figures, ancient manuscripts and archaeology, with the uncertainty left where you can see it.
                </p>
                <p className="mt-4 text-sm text-[var(--color-text-muted)]">Dates marked “derived” are reconstructions, not dates printed in the text.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-6 py-8" aria-labelledby="evidence-key">
          <div className="mx-auto max-w-6xl">
            <h2 id="evidence-key" className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">How to read the evidence</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {statuses.map((status) => (
                <div key={status} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
                  <ClaimStatusBadge status={status} />
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">{CLAIM_STATUS_COPY[status].description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1500px] px-6 py-20" aria-labelledby="master-timeline-heading">
          <div className="mb-12 max-w-3xl">
            <p className="micro-label text-[var(--color-gold-400)]">THE MASTER VIEW</p>
            <h2 id="master-timeline-heading" className="mt-3 text-4xl font-semibold text-balance sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
              Genesis to the conquest
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">Follow the spine of the story, then open any linked investigation to inspect the argument behind the date.</p>
          </div>
          <MasterTimeline />
        </section>

        <section className="border-t border-[var(--color-border)] bg-[var(--color-obsidian)] px-6 py-20" aria-labelledby="investigations-heading">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-3xl">
              <p className="micro-label text-[var(--homepage-primary)]">OPEN THE EVIDENCE</p>
              <h2 id="investigations-heading" className="mt-3 text-4xl font-semibold sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
                Three investigations. No hidden leaps.
              </h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {TIMELINES.map((timeline) => (
                <article key={timeline.slug} className="group flex flex-col overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] transition-all hover:-translate-y-1 hover:border-cyan-300/30">
                  <TimelineVisual visual={timeline.visual} />
                  <div className="flex flex-1 flex-col p-7">
                    <p className="micro-label text-[var(--homepage-primary)]">{timeline.kicker}</p>
                    <h3 className="mt-3 text-2xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>{timeline.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">{timeline.tagline}</p>
                    <Link href={`/timelines/${timeline.slug}`} className="mt-7 inline-flex min-h-11 items-center font-semibold text-[var(--homepage-primary)] hover:text-[var(--homepage-primary)]">
                      Examine the evidence <span className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <GlassCard className="p-8 sm:p-12">
            <EmailCapture headline="Follow the timeline as it grows" subtext="New investigations arrive when the evidence is ready—sources included, uncertainty intact." />
          </GlassCard>
        </section>
      </main>
    </div>
  );
}
