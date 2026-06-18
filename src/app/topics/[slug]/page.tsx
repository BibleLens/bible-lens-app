import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  "genesis-2-conditional-immortality": "Through the conditional-immortality reading, ",
};

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = TOPIC_PAGES.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: topic.title,
    description: topic.description,
    url: `https://biblelens.faith/topics/${slug}`,
    author: { "@type": "Organization", name: "Bible Lens" },
    publisher: { "@type": "Organization", name: "Bible Lens" },
    ...(topic.datePublished ? { datePublished: topic.datePublished } : {}),
    ...(topic.dateModified ? { dateModified: topic.dateModified } : {}),
  };

  // FAQPage schema — only when there is a visible FAQ to mirror (never inject
  // structured Q&A that isn't rendered on the page).
  const faqJsonLd = topic.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: topic.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  // VideoObject schema for the source episode — mirrored by the visible
  // "Watch the episode" card below.
  const videoJsonLd = topic.video
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: topic.video.name,
        description: topic.video.description,
        uploadDate: topic.video.uploadDate,
        thumbnailUrl:
          topic.video.thumbnailUrl ??
          `https://i.ytimg.com/vi/${topic.video.youtubeId}/maxresdefault.jpg`,
        embedUrl: `https://www.youtube.com/embed/${topic.video.youtubeId}`,
        contentUrl: `https://www.youtube.com/watch?v=${topic.video.youtubeId}`,
        publisher: { "@type": "Organization", name: "Bible Lens" },
      }
    : null;

  const { gold, primary } = splitTitleForGold(topic.title);
  const framingPrefix = TOPIC_FRAMING[slug] ?? "";
  const proseParagraphs = topic.prose.split("\n\n");

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)]">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {videoJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
        />
      )}

      <main id="main-content" className="flex-1 w-full pt-[248px]">
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
              className="text-lg text-[var(--color-text-primary)] leading-relaxed mb-5"
            >
              {paragraph}
            </p>
          ))}
        </section>

        {/* Watch the Episode — mirrors VideoObject schema */}
        {topic.video && (
          <section className="max-w-4xl mx-auto px-4 pb-12">
            <a
              href={`https://www.youtube.com/watch?v=${topic.video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-4 flex items-center gap-4 group border-l-2 border-l-[var(--color-cyan-500)] hover:border-l-[var(--color-cyan-400)] transition-colors block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  topic.video.thumbnailUrl ??
                  `https://i.ytimg.com/vi/${topic.video.youtubeId}/maxresdefault.jpg`
                }
                alt={topic.video.name}
                width={160}
                height={90}
                className="rounded-md w-40 h-auto flex-shrink-0"
              />
              <div>
                <p className="text-xs uppercase tracking-wide text-[var(--color-cyan-400)] mb-1">
                  Watch the episode
                </p>
                <p
                  className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-cyan-300)] transition-colors"
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  {topic.video.name}
                </p>
              </div>
            </a>
          </section>
        )}

        {/* Doctrinal boundary — the "not this" line, visible and in voice */}
        {topic.boundary && (
          <section className="max-w-4xl mx-auto px-4 pb-12">
            <div className="card p-6 border-l-2 border-l-[var(--color-gold-500)]">
              <h2
                className="text-sm uppercase tracking-wide text-[var(--color-gold-400)] mb-3"
                style={{ fontFamily: "var(--font-cinzel), serif" }}
              >
                Where this parts from the inherited reading
              </h2>
              {topic.boundary.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-4 last:mb-0"
                >
                  {para}
                </p>
              ))}
            </div>
          </section>
        )}

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
                    className="text-lg font-semibold text-[var(--color-gold-400)] group-hover:text-[var(--color-gold-300)] mb-1 transition-colors"
                    style={{ fontFamily: "var(--font-cinzel), serif" }}
                  >
                    {bookName} {chapter}
                  </p>
                  <p className="text-base text-[var(--color-text-secondary)] leading-relaxed group-hover:text-[var(--color-text-primary)] transition-colors">
                    {annotation}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FAQ — mirrors FAQPage schema (visible content required) */}
        {topic.faq?.length ? (
          <section className="max-w-4xl mx-auto px-4 pb-16">
            <h2
              className="text-2xl sm:text-3xl font-semibold text-[var(--color-gold-400)] mb-6"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              Common Questions
            </h2>
            <div className="space-y-6">
              {topic.faq.map((item, i) => (
                <div key={i}>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                    {item.question}
                  </h3>
                  <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Email Capture */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <EmailCapture />
        </section>
      </main>
    </div>
  );
}
