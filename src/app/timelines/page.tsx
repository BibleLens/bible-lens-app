import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { GlassCard } from "@/components/GlassCard";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Bible Chronology Through Ancient Eyes | Bible Lens",
  description:
    "Visual timelines of the Old Testament — scholarly chronology, ancient sources, and the conflicts that most Bibles skip over.",
  alternates: { canonical: "https://biblelens.faith/timelines" },
  openGraph: {
    title: "Bible Chronology Through Ancient Eyes | Bible Lens",
    description:
      "Visual timelines of the Old Testament — scholarly chronology, ancient sources, and the conflicts that most Bibles skip over.",
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
      "Visual timelines of the Old Testament — scholarly chronology, ancient sources, and the conflicts that most Bibles skip over.",
    images: ["/timelines/israel-in-egypt-hero.png"],
  },
};

export default function TimelinesPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-obsidian)" }}>
      <main id="main-content" className="flex-1 w-full pt-20">

        {/* Editorial Hero */}
        <section
          className="grain-overlay min-h-[40vh] flex items-end pb-16 px-6"
          style={{ background: "var(--color-obsidian)" }}
        >
          <div className="max-w-6xl mx-auto w-full">
            <span
              className="micro-label mb-4 block"
              style={{ color: "var(--color-cyan-400)" }}
            >
              OLD TESTAMENT CHRONOLOGY
            </span>
            <div className="border-l-2 pl-6" style={{ borderColor: "var(--color-cyan-400)" }}>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-balance max-w-4xl"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
              >
                Bible Chronology Through Ancient Eyes
              </h1>
              <p
                className="mt-3 max-w-2xl text-lg"
                style={{ color: "var(--color-text-muted-warm)" }}
              >
                Visual timelines of the Old Testament — the chronology questions ancient sources don&apos;t agree on, drawn in a way you can actually share.
              </p>
            </div>
          </div>
        </section>

        {/* Hero infographic */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="mx-auto" style={{ maxWidth: "640px" }}>
            <Image
              src="/timelines/israel-in-egypt-hero.png"
              alt="Israel in Egypt: 215 years (LXX, Galatians 3:17) vs 430 years (Masoretic) — the dropped phrase from Exodus 12:40"
              width={1000}
              height={1500}
              priority
              className="w-full h-auto"
            />
          </div>
        </section>

        {/* Download CTA */}
        <section className="max-w-6xl mx-auto px-6 pb-12 text-center">
          <a
            href="/timelines/israel-in-egypt-hero.png"
            download="bible-lens-israel-in-egypt-215-vs-430.png"
            className="inline-block px-6 py-3 font-semibold transition-all hover:brightness-110"
            style={{
              background: "var(--color-cyan-400)",
              color: "var(--color-bg-primary)",
              borderRadius: 0,
            }}
          >
            Download the full pin (1000×1500 PNG)
          </a>
        </section>

        {/* Email Capture in Glass Card */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <GlassCard className="p-10">
            <EmailCapture
              headline="Want the next infographic in your inbox?"
              subtext="We'll send a note when a new timeline ships — no weekly newsletter, no upsell, just the next pin."
            />
          </GlassCard>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t py-6 mt-auto" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Sources: Nathan Hoffmann, David Rohl, Paul of Tarsus (Galatians 3:17).
          </p>
          <p className="text-base mt-2" style={{ color: "var(--color-text-muted)" }}>
            <Link href="/" className="hover:text-[var(--color-cyan-400)] transition-colors">
              Back to Bible Lens
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
