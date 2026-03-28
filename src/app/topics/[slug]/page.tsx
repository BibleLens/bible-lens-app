import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LensIcon } from "@/components/LensIcon";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TOPIC_PAGES, COMMENTARY_DESCRIPTIONS } from "@/lib/commentary-index";
import { findBookById } from "@/lib/bible";
import { EmailCapture } from "@/components/EmailCapture";

export const dynamic = "force-static";

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TOPIC_PAGES.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = TOPIC_PAGES.find((t) => t.slug === slug);

  if (!topic) {
    return { title: "Not Found | Bible Lens" };
  }

  return {
    title: `${topic.title} | Bible Lens`,
    description: topic.description,
    keywords: topic.keywords,
    alternates: {
      canonical: `https://biblelens.faith/topics/${slug}`,
    },
    openGraph: {
      type: "article",
      title: `${topic.title} | Bible Lens`,
      description: topic.description,
      url: `https://biblelens.faith/topics/${slug}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Bible Lens" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${topic.title} | Bible Lens`,
      description: topic.description,
      images: ["/og-image.png"],
    },
  };
}

/** Split a title at the first colon: text before colon is gold, text after is primary.
 *  If no colon, the whole title is rendered in primary (no gold portion). */
function splitTitleForGold(title: string): { gold: string; primary: string } {
  const colonIdx = title.indexOf(":");
  if (colonIdx === -1) {
    return { gold: "", primary: title };
  }
  return {
    gold: title.slice(0, colonIdx),
    primary: title.slice(colonIdx), // includes the colon
  };
}

/** Topic-contextual framing prefix for chapter annotations. */
const TOPIC_FRAMING: Record<string, string> = {
  "daniel-7-son-of-man": "Through the lens of the ascent vision, ",
  "revelation-666-beast": "In the context of the beast's identity, ",
  "genesis-creation-ancient-cosmology": "Within the cosmic temple framework, ",
  "matthew-24-olivet-discourse": "Through the partial preterist reading, ",
  "isaiah-suffering-servant": "In the servant songs tradition, ",
  "ezekiel-gog-magog": "Against the backdrop of Gog's campaign, ",
};

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = TOPIC_PAGES.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: topic.title,
    description: topic.description,
    url: `https://biblelens.faith/topics/${slug}`,
    author: { "@type": "Organization", name: "Bible Lens" },
    publisher: { "@type": "Organization", name: "Bible Lens" },
  };

  const { gold, primary } = splitTitleForGold(topic.title);
  const framingPrefix = TOPIC_FRAMING[slug] ?? "";
  const proseParagraphs = topic.prose.split("\n\n");

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)]">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
              className="text-lg transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-cyan-400)] min-h-[44px] flex items-center"
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
              className="text-lg transition-colors text-[var(--color-gold-400)] min-h-[44px] flex items-center font-medium"
              aria-current="page"
            >
              Commentary
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main id="main-content" className="flex-1 w-full">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            {gold && (
              <span className="text-[var(--color-gold-400)]">{gold}</span>
            )}
            <span className="text-[var(--color-text-primary)]">{primary}</span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed mt-4">
            {topic.description}
          </p>
        </section>

        {/* Editorial Prose Section */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          {proseParagraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-base text-[var(--color-text-primary)] leading-relaxed mb-4"
            >
              {paragraph}
            </p>
          ))}
        </section>

        {/* Related Chapters Section */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2
            className="text-2xl sm:text-3xl font-semibold text-[var(--color-gold-400)] mb-6"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            Explore the Chapters
          </h2>
          <div className="space-y-4">
            {topic.chapterKeys.map((key) => {
              const [bookId, chapterStr] = key.split("-");
              const chapter = parseInt(chapterStr, 10);
              const bookName = findBookById(bookId)?.name ?? bookId;
              const description = COMMENTARY_DESCRIPTIONS[key] ?? "";
              const annotation = framingPrefix
                ? `${framingPrefix}${description.charAt(0).toLowerCase()}${description.slice(1)}`
                : description;

              return (
                <Link
                  key={key}
                  href={`/bible/${bookId}/${chapter}`}
                  className="card p-4 text-left group border-l-2 border-l-[var(--color-gold-500)] hover:border-l-[var(--color-gold-400)] transition-colors block"
                >
                  <p
                    className="text-base font-semibold text-[var(--color-gold-400)] group-hover:text-[var(--color-gold-300)] mb-1 transition-colors"
                    style={{ fontFamily: "var(--font-cinzel), serif" }}
                  >
                    {bookName} {chapter}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed group-hover:text-[var(--color-text-primary)] transition-colors">
                    {annotation}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Email Capture */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <EmailCapture />
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
