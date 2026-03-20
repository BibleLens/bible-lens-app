import type { Metadata } from "next";
import Link from "next/link";
import { LensIcon } from "@/components/LensIcon";
import { ThemeToggle } from "@/components/ThemeToggle";
import { EmailCapture } from "@/components/EmailCapture";

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
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-bg-primary)]/80 border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <LensIcon size={48} animate={false} />
            <h1
              className="text-2xl font-semibold tracking-wide"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              <span className="text-[var(--color-gold-400)]">Bible</span>
              <span className="text-[var(--color-cyan-400)]"> Lens</span>
            </h1>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/start-here"
              className="text-lg transition-colors font-semibold text-[var(--color-gold-400)] min-h-[44px] flex items-center"
              aria-current="page"
            >
              Start Here
            </Link>
            <Link
              href="/search"
              className="text-lg transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-cyan-400)] min-h-[44px] flex items-center"
            >
              Search
            </Link>
            <Link
              href="/chat"
              className="flex items-center gap-1.5 text-lg transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-cyan-400)] min-h-[44px]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Chat
            </Link>
            <Link
              href="/commentary"
              className="text-lg transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-cyan-400)] min-h-[44px] flex items-center font-medium"
            >
              Commentary
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            Where Do You Want to Start?
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
            Bible Lens reads Scripture through a specific lens — historically grounded, always
            questioning, never dogmatic. Pick the starting point that matches where you are right
            now.
          </p>
        </section>

        {/* Segment 1: End-times questions */}
        <section className="max-w-4xl mx-auto px-4 mb-12">
          <h2 className="text-xl font-semibold text-[var(--color-gold-400)] mb-3">
            I&apos;ve been taught end-times things I&apos;m no longer sure about
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            If you grew up hearing about the Rapture, the Antichrist, and a future seven-year
            tribulation, you&apos;re not alone in wondering where those ideas actually came from.
            Bible Lens takes a partial preterist approach — reading prophecy in its original
            first-century context, not as a coded message about modern geopolitics. Here&apos;s
            where that lens hits hardest.
          </p>
          <div className="space-y-4">
            <Link
              href="/bible/daniel/7"
              className="card block border-l-2 border-[var(--color-gold-400)] p-4 group hover:bg-[var(--color-bg-elevated)] transition-colors"
            >
              <span className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-400)] transition-colors">
                Daniel 7
              </span>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                The Son of Man isn&apos;t descending to earth — he&apos;s ascending to God&apos;s
                throne. This changes everything about how you read the Gospels.
              </p>
            </Link>
            <Link
              href="/bible/matthew/24"
              className="card block border-l-2 border-[var(--color-gold-400)] p-4 group hover:bg-[var(--color-bg-elevated)] transition-colors"
            >
              <span className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-400)] transition-colors">
                Matthew 24
              </span>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                Jesus wasn&apos;t predicting the end of the world. He was warning about the fall of
                Jerusalem in 70 AD — and his original audience knew it.
              </p>
            </Link>
            <Link
              href="/bible/revelation/13"
              className="card block border-l-2 border-[var(--color-gold-400)] p-4 group hover:bg-[var(--color-bg-elevated)] transition-colors"
            >
              <span className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-400)] transition-colors">
                Revelation 13
              </span>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                666 isn&apos;t a future barcode. Ancient readers would have immediately recognized
                the gematria pointing to Nero Caesar.
              </p>
            </Link>
          </div>
        </section>

        {/* Segment 2: Ancient eyes */}
        <section className="max-w-4xl mx-auto px-4 mb-12">
          <h2 className="text-xl font-semibold text-[var(--color-gold-400)] mb-3">
            I want to understand the Bible through ancient eyes
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Modern readers bring assumptions the original authors never imagined. Bible Lens reads
            Genesis alongside Enuma Elish, Ezekiel alongside Babylonian throne-chariot iconography,
            and Daniel alongside the actual empires his audience lived under. The text makes more
            sense when you hear it the way its first audience did.
          </p>
          <div className="space-y-4">
            <Link
              href="/bible/genesis/1"
              className="card block border-l-2 border-[var(--color-gold-400)] p-4 group hover:bg-[var(--color-bg-elevated)] transition-colors"
            >
              <span className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-400)] transition-colors">
                Genesis 1
              </span>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                This isn&apos;t a science textbook — it&apos;s a temple inauguration text written
                in dialogue with Babylonian creation myths.
              </p>
            </Link>
            <Link
              href="/bible/ezekiel/1"
              className="card block border-l-2 border-[var(--color-gold-400)] p-4 group hover:bg-[var(--color-bg-elevated)] transition-colors"
            >
              <span className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-400)] transition-colors">
                Ezekiel 1
              </span>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                Ezekiel&apos;s &lsquo;wheel within a wheel&rsquo; isn&apos;t an alien spacecraft.
                It&apos;s a Babylonian throne-chariot, and every detail maps to ancient Near Eastern
                iconography.
              </p>
            </Link>
            <Link
              href="/bible/daniel/2"
              className="card block border-l-2 border-[var(--color-gold-400)] p-4 group hover:bg-[var(--color-bg-elevated)] transition-colors"
            >
              <span className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-400)] transition-colors">
                Daniel 2
              </span>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                The four kingdoms aren&apos;t a mystery — they&apos;re Babylon, Media, Persia, and
                Greece. The original audience would have recognized them immediately.
              </p>
            </Link>
          </div>
        </section>

        {/* Segment 3: Prophetic thread */}
        <section className="max-w-4xl mx-auto px-4 mb-12">
          <h2 className="text-xl font-semibold text-[var(--color-gold-400)] mb-3">
            I&apos;m tracing the prophetic thread from Abraham to the New Testament
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            The Bible isn&apos;t 66 disconnected books — it&apos;s one long conversation about
            covenant, exile, and restoration. Bible Lens traces those threads from the binding of
            Isaac through the Suffering Servant to Ezekiel&apos;s valley of dry bones, showing how
            each author built on what came before.
          </p>
          <div className="space-y-4">
            <Link
              href="/bible/genesis/22"
              className="card block border-l-2 border-[var(--color-gold-400)] p-4 group hover:bg-[var(--color-bg-elevated)] transition-colors"
            >
              <span className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-400)] transition-colors">
                Genesis 22
              </span>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                The Aqedah isn&apos;t just a test of faith — it&apos;s the theological prototype
                that every later sacrifice narrative echoes.
              </p>
            </Link>
            <Link
              href="/bible/isaiah/53"
              className="card block border-l-2 border-[var(--color-gold-400)] p-4 group hover:bg-[var(--color-bg-elevated)] transition-colors"
            >
              <span className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-400)] transition-colors">
                Isaiah 53
              </span>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                The Suffering Servant oscillates between individual and corporate identity. Both
                readings are in the text — and the tension is the point.
              </p>
            </Link>
            <Link
              href="/bible/ezekiel/37"
              className="card block border-l-2 border-[var(--color-gold-400)] p-4 group hover:bg-[var(--color-bg-elevated)] transition-colors"
            >
              <span className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-400)] transition-colors">
                Ezekiel 37
              </span>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                The dry bones aren&apos;t about individual resurrection — the text explicitly says
                so at verse 11. This is national restoration after exile.
              </p>
            </Link>
          </div>
        </section>

        <hr className="max-w-4xl mx-auto border-[var(--color-border)] mb-0" />

        {/* Chat invitation */}
        <section className="mt-16 mb-8 text-center">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
            Still not sure where to start?
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-4">
            Ask Bible Lens anything — the AI chat draws from our full commentary library and
            scholarly research.
          </p>
          <Link
            href="/chat"
            className="inline-block px-6 py-2.5 rounded-lg bg-[var(--color-cyan-400)] text-black font-medium hover:brightness-110 transition-all"
          >
            Start a Conversation
          </Link>
        </section>

        {/* Email capture */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <EmailCapture
            headline="Stay in the loop"
            subtext="Get notified when new commentary drops — no spam, just fresh perspectives on ancient texts."
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-base text-[var(--color-text-muted)]">Ancient wisdom, modern clarity.</p>
          <p className="text-base text-[var(--color-text-muted)] mt-2">
            <Link href="/" className="hover:text-[var(--color-cyan-400)] transition-colors">
              Back to Bible Lens
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
