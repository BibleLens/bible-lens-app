import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getChapter, getBook, findBookById, getAdjacentBooks } from "@/lib/bible";
import { LensIcon } from "@/components/LensIcon";
import { CommentaryPanel } from "@/components/CommentaryPanel";
import { BackButton } from "@/components/BackButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getCommentaryData } from "@/lib/commentary";
import { ShareButton } from "@/components/ShareButton";
import { getVideoId } from "@/lib/video-config";
import { VideoEmbed } from "@/components/VideoEmbed";

interface ChapterPageProps {
  params: Promise<{ bookId: string; chapter: string }>;
}

// Hand-crafted descriptions for commentary chapters — these are our most valuable pages.
// Each description leads with the historical question the chapter answers, using Bible Lens voice.
const COMMENTARY_DESCRIPTIONS: Record<string, string> = {
  "genesis-1":
    "What did Genesis 1 mean to its original audience? Explore the ancient cosmology framework — the cosmic temple, the firmament, and why creation week isn't a science textbook.",
  "genesis-2":
    "Genesis 2's second creation account through ancient Near Eastern eyes — Adam as representative humanity, the garden as sacred space, and what the original audience heard.",
  "genesis-3":
    "The serpent, the tree, and the fall — what the original audience understood about Genesis 3 that modern readers often miss. Here's where it gets interesting.",
  "matthew-24":
    "Did Matthew 24 predict AD 70? The partial preterist case for the Olivet Discourse — Jesus describing the coming destruction of Jerusalem to people who would live to see it.",
  "genesis-6":
    "What did the original audience understand about the 'sons of God' and the Nephilim? Genesis 6 through the lens of ancient divine council theology and Mesopotamian flood parallels.",
  "genesis-7":
    "The Genesis flood account echoes Mesopotamian traditions — but with radical theological differences. What the original audience heard in the story of Noah entering the ark.",
  "genesis-8":
    "The waters recede and Noah sends birds — motifs the ancient audience would have recognized from Gilgamesh and Atrahasis. Here's where it gets interesting.",
  "genesis-9":
    "God's covenant with Noah — the first universal covenant in Scripture. What the rainbow, the blessing, and the dietary laws meant to the original audience.",
  "genesis-11":
    "The Tower of Babel as ancient ziggurat — what the original audience understood about Shinar, divine council judgment, and the scattering of the nations.",
  "genesis-12":
    "God's call to Abram — the covenant that reshapes everything. What 'lekh lekha' meant, why Ur matters, and how the original audience heard the promise of blessing.",
  "genesis-28":
    "Jacob's Ladder and the gateway of heaven — ancient cosmology, sacred space, and what the original audience understood about the stairway between heaven and earth.",
  "genesis-37":
    "The opening of the Joseph narrative — dreams, a coat of many colors, and the literary devices that signal where this story is going. What the original audience would have noticed.",
  "genesis-22":
    "The Binding of Isaac — was God really asking for child sacrifice? The Aqedah through ancient Near Eastern eyes, where the original audience would have understood the test, the ram, and the covenant promise very differently than modern readers.",
  "daniel-1":
    "What did Daniel's food refusal actually mean to the original audience? Explore covenant faithfulness under Babylonian imperial pressure and the court tales genre that frames all of Daniel 1-6.",
  "daniel-2":
    "The statue prophecy and its four kingdoms — what the original audience understood about Babylon, Persia, Greece, and Rome. Through this lens, the stone that fills the earth.",
  "daniel-3":
    "Shadrach, Meshach, and Abednego in the fiery furnace — imperial conformity demanded, faithful refusal, divine vindication. The court tales pattern at its most dramatic.",
  "daniel-4":
    "Nebuchadnezzar's madness and restoration — what the original audience understood about divine sovereignty over earthly rulers. The complete Nebuchadnezzar arc.",
  "daniel-5":
    "Belshazzar's feast and the writing on the wall — mene mene tekel upharsin decoded. The triple wordplay of Aramaic weights, judgment verbs, and Persian geography.",
  "daniel-6":
    "Daniel in the lions' den — the final court tale. What the original audience understood about divine protection under imperial pressure and the Babylonian-to-Persian transition.",
  "daniel-7":
    "The four beast vision and the son of man — here's where it gets interesting. The direction of travel is an ascent, not a descent. Ancient Near Eastern sea-chaos mythology meets first-century fulfillment.",
  "daniel-8":
    "The ram and the goat — Persia and Greece made explicit. The little horn of Daniel 8 is Antiochus IV Epiphanes, not the figure in Daniel 7. Why the distinction matters.",
  "daniel-9":
    "The seventy weeks — Daniel's theological centerpiece. The partial-preterist calculation, the two abominations (Antiochus and Rome), and what the original audience understood about the six goals of Daniel 9:24.",
  "daniel-10":
    "The beginning of Daniel's final vision — angelic warfare through the lens of Second Temple cosmology, Psalm 82, and the heavenly patron nations framework. Not modern spiritual warfare.",
  "daniel-11":
    "The most detailed prophecy in the Hebrew Bible — a verse-by-verse walk through Ptolemaic and Seleucid history that the original audience would have recognized as their recent past.",
  "daniel-12":
    "The clearest reference to bodily resurrection in the Hebrew Bible. Time periods as mathematical relationships, and the eschatological conclusion of Daniel's final vision.",
  "revelation-1":
    "What did Revelation 1 mean to its first readers? The time indicators 'en tachei' and 'engys' point to imminent fulfillment — here's where it gets interesting. The book that unseals what Daniel sealed.",
  "revelation-2":
    "The seven churches of Revelation weren't abstract symbols — Ephesus, Smyrna, and Pergamum were real cities under Roman pressure. What the original audience understood about faithfulness under empire.",
  "revelation-3":
    "Thyatira, Sardis, Philadelphia, Laodicea — the final four churches. Through this lens, the lukewarm water of Laodicea and the open door of Philadelphia land in their first-century Roman context.",
  "revelation-4":
    "John's throne room vision as imperial counter-narrative. The four living creatures echo Ezekiel 1 and Isaiah 6 — what the original audience heard in this cosmic alternative to Caesar's court.",
  "revelation-5":
    "The sealed scroll and the Lamb who opens it — is this the Ascension or a future event? The Daniel 7:13 connection makes the original audience's reading unmistakable. Ancient wisdom, modern clarity.",
  "revelation-6":
    "The four horsemen aren't random chaos — they follow Leviticus 26's covenant curse sequence. Here's where it gets interesting: the seventh seal opens into the trumpets, revealing Revelation's recapitulation structure.",
  "revelation-7":
    "Who are the 144,000? The hear/see pattern from Revelation 5 unlocks this chapter. What the original audience understood about symbolic arithmetic (12x12x1000) and the great multitude's relationship to Israel.",
  "revelation-12":
    "The dragon, the woman, and the war in heaven — the covenant community under siege. What the original audience understood about this apocalyptic retelling of Israel's story through the lens of first-century conflict.",
  "revelation-13":
    "The beast from the sea has a name: gematria points to Nero Caesar (nrwn qsr = 666), with 616 as independent confirmation. The land beast enforces the imperial cult. Here's where it gets interesting.",
  "revelation-14":
    "The Lamb on Mount Zion, the harvest of the earth, and three angelic proclamations. What the original audience understood about first-century harvest imagery and the Revelation 7 parallel structure.",
  "revelation-17":
    "Who is Babylon the Great? The majority identifies her with Rome — but there's a compelling minority case for Jerusalem. Four arguments, full transparency about the debate, and why this reading changes everything.",
  "revelation-18":
    "The fall of Babylon and the bloodguilt charge from Matthew 23. Through this lens, the OT harlot typology only applies to covenant partners — which matters enormously for identifying the city.",
  "revelation-19":
    "Where Bible Lens parts ways with David Chilton: Revelation 19 describes a future physical return of Christ, anchored in Acts 1:11. Ancient wisdom, premillennial clarity — grounded in the earliest church fathers.",
  "revelation-20":
    "A future literal millennium, not a symbolic past age. The Isaiah 65:20 two-step argument, Gog and Magog as a future end-of-millennium event, and why Papias, Justin Martyr, and Irenaeus matter here.",
  "revelation-21":
    "The new creation as covenant fulfillment — not the destruction of the physical world but its renewal. Ezekiel 47-48 and Isaiah 65 show what the original audience heard in John's new Jerusalem vision.",
  "revelation-22":
    "The river of life, the tree of life, and 'come quickly' — the unsealed scroll's invitation. What the original audience understood about the contrast with Daniel 12:4: this scroll is unsealed because the time is near.",
};

function chapterHasCommentary(bookId: string, chapterNum: number): boolean {
  if (bookId === "matthew" && chapterNum === 24) return true;
  if (bookId === "genesis") {
    return (
      (chapterNum >= 1 && chapterNum <= 3) ||
      (chapterNum >= 6 && chapterNum <= 9) ||
      chapterNum === 11 ||
      chapterNum === 12 ||
      chapterNum === 22 ||
      chapterNum === 28 ||
      chapterNum === 37
    );
  }
  if (bookId === "daniel") {
    return chapterNum >= 1 && chapterNum <= 12;
  }
  if (bookId === "revelation") {
    return [1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 17, 18, 19, 20, 21, 22].includes(chapterNum);
  }
  return false;
}

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const { bookId, chapter } = await params;
  const chapterNum = parseInt(chapter, 10);
  const bookMeta = findBookById(bookId);

  if (!bookMeta) {
    return { title: "Not Found | Bible Lens" };
  }

  const hasCommentary = chapterHasCommentary(bookId, chapterNum);

  const descKey = `${bookId}-${chapterNum}`;
  const description =
    hasCommentary && COMMENTARY_DESCRIPTIONS[descKey]
      ? COMMENTARY_DESCRIPTIONS[descKey]
      : `Read ${bookMeta.name} chapter ${chapterNum} in the Berean Standard Bible with historical context.`;

  const title = hasCommentary
    ? `${bookMeta.name} ${chapterNum} Commentary — Historical Context | Bible Lens`
    : `${bookMeta.name} ${chapterNum} | Bible Lens`;

  const canonicalUrl = `https://biblelens.faith/bible/${bookId}/${chapterNum}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Bible Lens" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { bookId, chapter: chapterStr } = await params;
  const chapterNum = parseInt(chapterStr, 10);
  
  const book = getBook(bookId);
  const bookMeta = findBookById(bookId);
  const verses = getChapter(bookId, chapterNum);
  
  if (!book || !bookMeta || !verses) {
    notFound();
  }
  
  const { prev: prevBook, next: nextBook } = getAdjacentBooks(bookId);
  const totalChapters = book.chapterCount;

  const hasCommentary = chapterHasCommentary(bookId, chapterNum);

  const videoId = getVideoId(bookId, chapterNum);
  const hasVideo = Boolean(videoId);

  // Server-side commentary fetch for SEO — commentary chapters only
  const initialCommentary = hasCommentary
    ? await getCommentaryData(bookId, chapterNum)
    : [];

  const hasPrevChapter = chapterNum > 1;
  const hasNextChapter = chapterNum < totalChapters;
  
  // Determine prev/next navigation
  const prevLink = hasPrevChapter 
    ? `/bible/${bookId}/${chapterNum - 1}`
    : prevBook 
      ? `/bible/${prevBook.id}/${prevBook.chapters}`
      : null;
      
  const nextLink = hasNextChapter
    ? `/bible/${bookId}/${chapterNum + 1}`
    : nextBook
      ? `/bible/${nextBook.id}/1`
      : null;
  
  const prevLabel = hasPrevChapter
    ? `${bookMeta.abbr} ${chapterNum - 1}`
    : prevBook
      ? `${prevBook.abbr} ${prevBook.chapters}`
      : null;
      
  const nextLabel = hasNextChapter
    ? `${bookMeta.abbr} ${chapterNum + 1}`
    : nextBook
      ? `${nextBook.abbr} 1`
      : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-bg-primary)]/80 border-b border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton />
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <LensIcon size={40} animate={false} />
              <span
                className="text-2xl font-semibold tracking-wide hidden sm:inline"
                style={{ fontFamily: "var(--font-cinzel), serif" }}
              >
                <span className="text-[var(--color-gold-400)]">Bible</span>
                <span className="text-[var(--color-cyan-400)]"> Lens</span>
              </span>
            </Link>
          </div>

          {/* Current location */}
          <Link
            href={`/bible/${bookId}`}
            className="text-base font-medium text-[var(--color-text-primary)] hover:text-[var(--color-cyan-400)] transition-colors min-h-[44px] flex items-center"
          >
            {bookMeta.name} {chapterNum}
          </Link>
          
          {/* Chapter navigation */}
          <div className="flex items-center gap-1 text-base">
            {prevLink && (
              <Link
                href={prevLink}
                className="p-2.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                title={prevLabel || undefined}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            )}
            {nextLink && (
              <Link
                href={nextLink}
                className="p-2.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                title={nextLabel || undefined}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
            <ShareButton />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        {/* Chapter Title */}
        <div className="text-center mb-8">
          <Link
            href={`/bible/${bookId}`}
            className="text-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
          >
            {bookMeta.testament === 'OT' ? 'Old Testament' : 'New Testament'} • {bookMeta.name}
          </Link>
          <h1 
            className="text-3xl font-bold mt-2"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            <span className={bookMeta.testament === 'OT' ? 'text-[var(--color-gold-400)]' : 'text-[var(--color-cyan-400)]'}>
              Chapter {chapterNum}
            </span>
          </h1>
        </div>

        {/* Verses */}
        <div className="space-y-4">
          {verses.map((verse) => (
            <p 
              key={verse.verse} 
              className="text-xl leading-relaxed text-[var(--color-scripture)]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              <span className="verse-number">{verse.verse}</span>
              {verse.text}
            </p>
          ))}
        </div>

        {/* Video Embed — only when a YouTube video ID is configured in VIDEO_CONFIG */}
        {hasVideo && videoId && (
          <div className="mt-8">
            <VideoEmbed
              videoId={videoId}
              title={`${bookMeta.name} ${chapterNum} Commentary`}
            />
          </div>
        )}

        {/* Commentary Panel — for chapters with published commentary */}
        {hasCommentary && (
          <div className="mt-8">
            <CommentaryPanel
              book={bookId}
              chapter={chapterNum}
              initialCommentary={initialCommentary}
            />
          </div>
        )}

        {/* Chapter Navigation */}
        <div className="mt-12 flex items-center justify-between gap-4">
          {prevLink ? (
            <Link
              href={prevLink}
              className="flex-1 p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors text-left"
            >
              <p className="text-base text-[var(--color-text-muted)] mb-1">Previous</p>
              <p className="font-medium text-[var(--color-text-primary)]">← {prevLabel}</p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          
          <Link
            href={`/bible/${bookId}`}
            className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors text-center"
          >
            <p className="text-base text-[var(--color-text-muted)] mb-1">All Chapters</p>
            <p className="font-medium text-[var(--color-text-primary)]">{bookMeta.name}</p>
          </Link>
          
          {nextLink ? (
            <Link
              href={nextLink}
              className="flex-1 p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors text-right"
            >
              <p className="text-base text-[var(--color-text-muted)] mb-1">Next</p>
              <p className="font-medium text-[var(--color-text-primary)]">{nextLabel} →</p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-4">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-base text-[var(--color-text-muted)]">
            Berean Standard Bible • Context Over Tradition
          </p>
        </div>
      </footer>
    </div>
  );
}

