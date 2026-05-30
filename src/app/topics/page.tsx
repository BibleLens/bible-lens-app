import type { Metadata } from "next";
import Link from "next/link";
import { TOPIC_PAGES } from "@/lib/commentary-index";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Topics | Bible Lens",
  description:
    "Explore Bible Lens topics — theme-level deep dives into Scripture through the lens of history, archaeology, and the original audience.",
  alternates: {
    canonical: "https://biblelens.faith/topics",
  },
  openGraph: {
    type: "website",
    title: "Topics | Bible Lens",
    description:
      "Explore Bible Lens topics — theme-level deep dives into Scripture through historical context.",
    url: "https://biblelens.faith/topics",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Bible Lens" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Topics | Bible Lens",
    description:
      "Explore Bible Lens topics — theme-level deep dives into Scripture through historical context.",
    images: ["/og-image.png"],
  },
};

export default function TopicsIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)]">
      <main id="main-content" className="flex-1 w-full pt-[248px]">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 pt-2 pb-12">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--color-text-primary)]"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            Topics
          </h1>
          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed mt-4">
            Theme-level deep dives into Scripture — read through the lens of
            history, archaeology, and what the original audience would have
            understood.
          </p>
        </section>

        {/* Topic list */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-4">
            {TOPIC_PAGES.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="card p-4 text-left group border-l-2 border-l-[var(--color-gold-500)] hover:border-l-[var(--color-gold-400)] transition-colors block"
              >
                <p
                  className="text-lg font-semibold text-[var(--color-gold-400)] group-hover:text-[var(--color-gold-300)] mb-1 transition-colors"
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  {topic.title}
                </p>
                <p className="text-base text-[var(--color-text-secondary)] leading-relaxed group-hover:text-[var(--color-text-primary)] transition-colors">
                  {topic.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-base text-[var(--color-text-muted)]">
            Ancient wisdom, modern clarity.
          </p>
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
