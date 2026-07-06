import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { GlassCard } from "@/components/GlassCard";
import { TIMELINES } from "@/lib/timelines-data";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Bible Chronology Through Ancient Eyes | Bible Lens",
  description:
    "Visual timelines of the Old Testament — scholarly chronology, ancient sources, and the conflicts most Bibles skip over. How long was Israel in Egypt? When did the Flood happen? What was buried at Avaris?",
  alternates: { canonical: "https://biblelens.faith/timelines" },
  openGraph: {
    title: "Bible Chronology Through Ancient Eyes | Bible Lens",
    description:
      "Visual timelines of the Old Testament — scholarly chronology, ancient sources, and the conflicts most Bibles skip over.",
    url: "https://biblelens.faith/timelines",
    siteName: "Bible Lens",
    type: "website",
    images: [
      {
        url: "/timelines/israel-in-egypt-hero.png",
        width: 1000,
        height: 1500,
        alt: "Israel in Egypt: 215 vs 430 — the dropped phrase from Exodus 12:40",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bible Chronology Through Ancient Eyes | Bible Lens",
    description:
      "Visual timelines of the Old Testament — scholarly chronology, ancient sources, and the conflicts most Bibles skip over.",
    images: ["/timelines/israel-in-egypt-hero.png"],
  },
};

export default function TimelinesIndexPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-obsidian)" }}>
      <main id="main-content" className="flex-1 w-full pt-[248px]">
        {/* Editorial hero */}
        <section
          className="grain-overlay min-h-[36vh] flex items-end pb-14 px-6"
          style={{ background: "var(--color-obsidian)" }}
        >
          <div className="max-w-6xl mx-auto w-full">
            <GlassCard className="p-10 md:p-16 text-center max-w-4xl mx-auto">
              <span className="micro-label mb-4 block" style={{ color: "var(--color-cyan-400)" }}>
                OLD TESTAMENT CHRONOLOGY
              </span>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-balance"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
              >
                Bible Chronology Through Ancient Eyes
              </h1>
              <p
                className="mt-3 max-w-2xl mx-auto text-lg text-pretty"
                style={{ color: "var(--color-text-muted-warm)" }}
              >
                Visual timelines of the Old Testament — the chronology questions ancient sources
                don&apos;t agree on, drawn in a way you can actually share.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Timeline cards */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            {TIMELINES.map((t) => (
              <Link
                key={t.slug}
                href={`/timelines/${t.slug}`}
                className="group block glass-card overflow-hidden"
                aria-label={t.title}
              >
                <div className="relative aspect-[1000/1500] overflow-hidden">
                  <Image
                    src={t.heroImage}
                    alt={t.heroAlt}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <span className="micro-label" style={{ color: "var(--color-cyan-400)" }}>
                    {t.kicker}
                  </span>
                  <h2
                    className="mt-2 text-xl font-semibold text-balance"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
                  >
                    {t.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-text-muted-warm)" }}>
                    {t.tagline}
                  </p>
                  <span
                    className="mt-4 inline-block micro-label transition-colors group-hover:brightness-125"
                    style={{ color: "var(--color-cyan-400)" }}
                  >
                    View timeline →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Email capture */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <GlassCard className="p-10">
            <EmailCapture
              headline="Want the next infographic in your inbox?"
              subtext="We'll send a note when a new timeline ships — no weekly newsletter, no upsell, just the next pin."
            />
          </GlassCard>
        </section>
      </main>
    </div>
  );
}
