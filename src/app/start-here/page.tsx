import type { Metadata } from "next";
import Link from "next/link";
import { READING_PATHS } from "@/lib/commentary-index";
import { EmailCapture } from "@/components/EmailCapture";
import { GlassCard } from "@/components/GlassCard";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Start Here | Bible Lens",
  description:
    "New to Bible Lens? Find your entry point — whether you're questioning tradition, curious about ancient context, or tracing biblical threads through history.",
  alternates: { canonical: "https://biblelens.faith/start-here" },
  openGraph: {
    title: "Start Here | Bible Lens",
    description:
      "New to Bible Lens? Find your entry point — whether you're questioning tradition, curious about ancient context, or tracing biblical threads through history.",
    url: "https://biblelens.faith/start-here",
    siteName: "Bible Lens",
    type: "website",
  },
};

export default function StartHerePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-obsidian)" }}>
      <main id="main-content" className="flex-1 w-full pt-20">

        {/* Editorial Hero (STH-01) */}
        <section
          className="grain-overlay min-h-[40vh] flex items-end pb-16 px-6"
          style={{ background: "var(--color-obsidian)" }}
        >
          <div className="max-w-6xl mx-auto w-full">
            <span
              className="micro-label mb-4 block"
              style={{ color: "var(--color-cyan-400)" }}
            >
              THE ETHEREAL PATH TO UNDERSTANDING
            </span>
            <div className="border-l-2 pl-6" style={{ borderColor: "var(--color-cyan-400)" }}>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
              >
                The Ethereal Path to Understanding
              </h1>
              <p
                className="mt-3 max-w-2xl text-lg"
                style={{ color: "var(--color-text-muted-warm)" }}
              >
                New to Bible Lens? Find your entry point.
              </p>
            </div>
          </div>
        </section>

        {/* Reading Path Bento Grid (STH-02) */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bento-grid">
            {READING_PATHS.slice(0, 6).map((path, index) => {
              const isFocus = index === 0;
              const firstStep = path.steps[0];
              return (
                <Link
                  key={path.id}
                  href={`/bible/${firstStep.bookId}/${firstStep.chapter}`}
                  className={
                    isFocus
                      ? "col-span-12 md:col-span-8 row-span-2 glass-card group p-10 flex flex-col justify-end min-h-[300px] relative"
                      : "col-span-12 md:col-span-4 glass-card group p-8 flex flex-col justify-end min-h-[200px] relative"
                  }
                >
                  <div className="shimmer-layer" />
                  <div className="relative z-10">
                    <span
                      className="micro-label mb-3 block"
                      style={{ color: "var(--color-cyan-400)" }}
                    >
                      READING PATH
                    </span>
                    <h2
                      className={isFocus ? "text-3xl font-semibold" : "text-2xl font-semibold"}
                      style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
                    >
                      {path.title}
                    </h2>
                    <span
                      className="micro-label mt-2 block"
                      style={{ color: "var(--color-text-muted-warm)" }}
                    >
                      {path.steps.length} CHAPTERS
                    </span>
                    <div className="animate-content mt-4">
                      <p
                        className="text-sm leading-relaxed line-clamp-3"
                        style={{ color: "var(--color-text-muted-warm)" }}
                      >
                        {path.throughLine.slice(0, 180)}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* "Still not sure?" CTA (STH-03) */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <GlassCard as="section" className="p-12 text-center">
            <span
              className="micro-label mb-4 block"
              style={{ color: "var(--color-cyan-400)" }}
            >
              SCHOLAR AI
            </span>
            <h2
              className="text-2xl md:text-3xl font-semibold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
            >
              Still not sure where to start?
            </h2>
            <p
              className="mb-6 max-w-lg mx-auto"
              style={{ color: "var(--color-text-muted-warm)" }}
            >
              Ask Bible Lens anything — the AI chat draws from our full commentary library and
              scholarly research.
            </p>
            <Link
              href="/chat"
              className="inline-block px-6 py-3 font-semibold transition-all hover:brightness-110"
              style={{
                background: "var(--color-cyan-400)",
                color: "var(--color-bg-primary)",
                borderRadius: 0,
              }}
            >
              Start a Conversation
            </Link>
          </GlassCard>
        </div>

        {/* Email Capture in Glass Card (STH-04) */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <GlassCard className="p-10">
            <EmailCapture
              headline="Stay in the loop"
              subtext="Get notified when new commentary drops — no spam, just fresh perspectives on ancient texts."
            />
          </GlassCard>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t py-6 mt-auto" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-base" style={{ color: "var(--color-text-muted)" }}>
            Ancient wisdom, modern clarity.
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
