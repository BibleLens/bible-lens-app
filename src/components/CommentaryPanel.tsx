"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { CommentaryChunk } from "@/lib/commentary";
import { RELATED_PASSAGES, CHAPTER_TOPICS, TOPIC_PAGES } from "@/lib/commentary-index";
import { findBookById } from "@/lib/bible";

interface CommentaryResponse {
  book: string;
  chapter: string;
  verse: string | null;
  commentary: CommentaryChunk[];
}

interface CommentaryPanelProps {
  book: string;
  chapter: number;
  initialCommentary?: CommentaryChunk[];
}

export function CommentaryPanel({ book, chapter, initialCommentary }: CommentaryPanelProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(!(initialCommentary && initialCommentary.length > 0));
  const [commentary, setCommentary] = useState<CommentaryChunk[]>(initialCommentary ?? []);
  const [isExpanded, setIsExpanded] = useState(false);

  const buildPassageQuestion = (): string => {
    const bookTitle = book.charAt(0).toUpperCase() + book.slice(1);
    if (book === "genesis") {
      if (chapter === 15) {
        return `What is the significance of the covenant cutting ceremony in Genesis 15 — why does only God walk between the pieces, and what did the self-maledictory oath mean to the original audience?`;
      }
      if (chapter === 18) {
        return `Who were the three visitors at Mamre in Genesis 18, and what does divine council theology tell us about how Yahweh's messengers functioned in the ancient Near East?`;
      }
      return `What does ${bookTitle} ${chapter} mean for understanding creation?`;
    }
    if (book === "matthew") {
      return `What does ${bookTitle} ${chapter} mean for understanding the Olivet Discourse?`;
    }
    if (book === "revelation") {
      return `What does ${bookTitle} ${chapter} reveal about first-century events through ancient Jewish apocalyptic imagery?`;
    }
    if (book === "isaiah") {
      if (chapter === 1) {
        return `What is the rib covenant lawsuit genre in Isaiah 1 — how does the ancient treaty lawsuit form transform the meaning of every word Isaiah speaks, including verse 18?`;
      }
      if (chapter === 2) {
        return `What does Isaiah 2's vision of the mountain of the LORD describe — and why do the peaceful conditions in verses 2-4 match Isaiah 11 and 65 rather than the eternal state?`;
      }
      if (chapter === 6) {
        return `What did the seraphim and the trisagion mean to Isaiah's original audience — and what does the ANE throne-guardian tradition reveal about the 'holy, holy, holy' declaration?`;
      }
      return `What did Isaiah ${chapter} mean to the original audience — and how does it connect to New Testament fulfillment?`;
    }
    if (book === "exodus") {
      if (chapter === 3) {
        return `What did it mean when God introduced himself as 'ehyeh asher ehyeh' at the burning bush — and why does the original Hebrew suggest a promise of presence rather than a statement about eternal self-existence?`;
      }
      if (chapter === 12) {
        return `What was the Passover before it became a Christian symbol? How does the ancient Near Eastern apotropaic blood-ritual context reshape what the original audience understood about the night of deliverance?`;
      }
      if (chapter === 14) {
        return `How does the divine warrior motif and ancient combat myth tradition illuminate the Sea crossing — and what does 'Yam Suph' actually refer to in the original text?`;
      }
      if ([19, 20].includes(chapter)) {
        return `How does the Hittite suzerainty treaty structure frame the Sinai covenant — and what changes when we read the Decalogue as treaty stipulations rather than a universal ethics list?`;
      }
      if ([25, 26, 27].includes(chapter)) {
        return `What is the cosmic temple theology behind the Tabernacle — and how do the mishkan, the kapporet, and the three-zone sacred architecture mirror the created order described in Genesis 1?`;
      }
      if ([32, 33, 34].includes(chapter)) {
        return `Why are the Thirteen Attributes of Exodus 34:6-7 considered the theological center of the Hebrew Bible — and how does the golden calf crisis redefine the covenant relationship?`;
      }
      return `What is the historical context of ${bookTitle} ${chapter}?`;
    }
    if (book === "zechariah") {
      if ([1, 2, 3].includes(chapter)) {
        return `What were Zechariah's night visions actually about — and why does the historical context of 519 BCE Persian-period Yehud change how we read the colored horses, the divine court trial, and the Branch oracle?`;
      }
      if ([4, 5, 6].includes(chapter)) {
        return `What do the lampstand, the flying scroll, and the crown oracle reveal about the dual leadership of post-exilic Yehud — and why is the bnei-yitzhar designation for Zerubbabel and Joshua significant?`;
      }
      if ([7, 8].includes(chapter)) {
        return `How does Zechariah's response to the Bethel fasting delegation connect to the prophetic cult-critique tradition from Amos through Jeremiah — and what is the eschatological significance of fasts becoming feasts?`;
      }
      if ([9, 10, 11].includes(chapter)) {
        return `What did the ancient Near Eastern donkey-vs-warhorse contrast communicate about the peaceful king of Zechariah 9 — and how does the shepherd allegory with its thirty silver pieces connect to Matthew 27:9?`;
      }
      if ([12, 13, 14].includes(chapter)) {
        return `What is the Hadad Rimmon mourning context behind the pierced one of Zechariah 12:10, what does the MT/LXX textual variant reveal, and how does the Day of the LORD in chapter 14 relate to both 70 CE and eschatological hope?`;
      }
      return `What is the historical context of ${bookTitle} ${chapter}?`;
    }
    if (book === "ezekiel") {
      if ([1, 2, 3].includes(chapter)) {
        return `What did Ezekiel's chariot vision mean to the original exilic audience — the chayot, ophanim, and the kabod of YHWH?`;
      }
      if (chapter === 28) {
        return `Is Ezekiel 28 about Satan or a human king? What did the divine council imagery mean to Ezekiel's original audience?`;
      }
      if (chapter === 37) {
        return `What does Ezekiel 37's valley of dry bones mean? How does the text interpret itself at verse 11?`;
      }
      if ([38, 39].includes(chapter)) {
        return `Who is Gog of the land of Magog in Ezekiel ${chapter}, and how does this connect to Revelation 20:8?`;
      }
    }
    if (book === "jeremiah") {
      if (chapter === 1) {
        return `What is the berufungsbericht — the 'call narrative' genre — in Jeremiah 1, and why does yadati in verse 5 function as a commissioning verb rather than a statement about universal pre-birth existence?`;
      }
      if (chapter === 7) {
        return `What did the Tel Seilun destruction layer at ancient Shiloh mean for Jeremiah's temple sermon — and how does the archaeological evidence of Shiloh's destruction reshape what 'do not trust in deceptive words' meant to the original audience?`;
      }
      if ([18, 19].includes(chapter)) {
        return `How does the potter's house diptych of Jeremiah 18-19 establish conditional vs. irrevocable covenant logic — and what does the ANE suzerain-vassal treaty framework reveal about why one pot can be reshaped while another must be smashed?`;
      }
      if (chapter === 23) {
        return `What does tzemach tsaddiq mean — and why is the Zedekiah name-contrast (Tsidqiyahu = 'YHWH is my righteousness') the primary interpretive key for the Jeremiah 23 Branch oracle?`;
      }
      if (chapter === 29) {
        return `What does darash shalom mean as an active mandate — and why does the exile letter of Jeremiah 29 address a specific community in 597 BCE Babylon rather than offering a universal promise to modern readers seeking prosperity?`;
      }
      if (chapter === 31) {
        return `Why is berit chadasha a hapax legomenon — appearing only once in the entire Hebrew Bible — and what does the two-house address ('house of Israel AND house of Judah') reveal about who the new covenant was originally made with?`;
      }
      if (chapter === 36) {
        return `What does the story of Baruch the scribe and the burning scroll reveal about how prophetic texts were transmitted — and how does 're-dictated with additions' (Jer 36:32) describe the same compositional growth process Jeremiah 36 itself documents?`;
      }
      if (chapter === 52) {
        return `Why does Jeremiah 52 begin immediately after the editorial marker 'the words of Jeremiah end here' at 51:64 — and what does the near-verbatim parallel with 2 Kings 25 reveal about the Deuteronomistic appendix's function in the book?`;
      }
      return `What is the historical context of Jeremiah ${chapter}?`;
    }
    if (book === "psalms") {
      if ([2, 110].includes(chapter)) {
        return `What does the ANE coronation adoption formula reveal about Psalm ${chapter} -- and why is the distinction between adoni and adonai critical for understanding how the New Testament cites this psalm?`;
      }
      if ([8, 139].includes(chapter)) {
        return `What does Psalm ${chapter} reveal about the ancient Israelite understanding of creation and divine presence -- and how does the ruach vocabulary connect to the cosmic temple framework?`;
      }
      if ([22, 89].includes(chapter)) {
        return `What does the lament structure of Psalm ${chapter} reveal about how ancient Israel processed theological crisis -- and why does the genre logic matter more than the New Testament citations?`;
      }
      if (chapter === 23) {
        return `What did the shepherd-king metaphor communicate in ancient Near Eastern royal ideology -- and why does tsalmaveth mean 'deep darkness' rather than 'shadow of death'?`;
      }
      if (chapter === 45) {
        return `How does the Hebrew grammar of Psalm 45:6 allow both the vocative reading ('Your throne, O God') and the predicate analysis ('Your throne is God-like') -- and why do both readings matter?`;
      }
      if (chapter === 51) {
        return `What does ruach mean in Psalm 51's three distinct uses -- and how does the penitential tradition connect to the Thirteen Attributes of Exodus 34?`;
      }
      if (chapter === 82) {
        return `Who are the elohim being judged in Psalm 82's heavenly court -- and how does ke-adam ('like mortals') prove these beings are non-human members of YHWH's council?`;
      }
      return `What is the historical context of ${bookTitle} ${chapter}?`;
    }
    if (book === "job") {
      if ([1, 2].includes(chapter)) {
        return `What was actually happening in Job's divine council opening — who is ha-satan, and how does the prosecuting-attorney role differ from the later theological concept of Satan?`;
      }
      if (chapter === 3) {
        return `What is the theological significance of Job 3's opening lament — and why does the 'why was I born?' protest represent legitimate grief rather than sinful rebellion in the wisdom literature tradition?`;
      }
      if (chapter === 19) {
        return `What does the Hebrew word goel mean in Job 19:25 — and how does the legal advocate trajectory from Job 9:33 through 16:19 to 19:25 change what the 'Redeemer who lives' is actually saying?`;
      }
      if (chapter === 28) {
        return `What is the three-strophe mining illustration doing in Job 28 — and why does the 'fear of the Lord is wisdom' conclusion of the Hymn to Wisdom function as the book's own answer before the divine speeches arrive?`;
      }
      if ([38, 39].includes(chapter)) {
        return `What is YHWH actually saying in the divine speeches of Job 38-39 — and why do these cosmic questions about creation reframe Job's suffering without answering it directly?`;
      }
      if ([40, 41].includes(chapter)) {
        return `Who are Behemoth and Leviathan in Job 40-41 — and what does the Ugaritic Lotan cognate and the Chaoskampf tradition reveal about why YHWH uses chaos creatures to answer Job's complaint?`;
      }
      if (chapter === 42) {
        return `What does YHWH's verdict in Job 42:7 actually say about retribution theology — and why does restoring Job not vindicate the friends' argument that suffering always indicates sin?`;
      }
    }
    if (book === "proverbs") {
      if ([1, 7].includes(chapter)) {
        return `What is the bridal-courtship spine of Proverbs 1-9 — and why does the father's instruction to court Woman Wisdom function as a theological frame, not just a metaphor?`;
      }
      if (chapter === 8) {
        return `What is the ANE Maat parallel behind Woman Wisdom's cosmogonic speech in Proverbs 8 — and why does the Hebrew qanah in 8:22 point to bridal-acquisition language rather than creation (Arian) or eternal possession (Nicene)?`;
      }
      if (chapter === 10) {
        return `What does the shift from instruction discourse to antithetical sentence proverbs in Proverbs 10 reveal — and why is the deed-consequence framework observational wisdom rather than a guarantee from God?`;
      }
      if (chapter === 16) {
        return `How does Proverbs 16:9 ('The heart of man plans his way, but YHWH establishes his steps') function as the theological center of the royal wisdom cluster — and what does it reveal about YHWH's sovereignty over human plans?`;
      }
      if ([22, 23].includes(chapter)) {
        return `What is the Amenemope literary dependency in Proverbs 22:17-24:22 — and why does the shalishim ('thirty') of verse 20 directly parallel the thirty chapters of the Egyptian wisdom text on BM Papyrus 10474?`;
      }
      if (chapter === 25) {
        return `What does the Hezekian editorial superscription in Proverbs 25:1 reveal about how biblical wisdom was transmitted — and why does the act of copying Solomon's proverbs itself embody the book's own courtship-of-wisdom theology?`;
      }
      if (chapter === 31) {
        return `How does the eshet chayil of Proverbs 31 close the bridal-courtship spine opened in chapter 1 — and why does chayil (military valor) refuse to let the poem become a domesticity prescription?`;
      }
      return `What is the historical context of ${bookTitle} ${chapter}?`;
    }
    if (book === "ecclesiastes") {
      if ([1, 2].includes(chapter)) {
        return `What does hebel — vapor, breath, fleeting — actually mean in Ecclesiastes, and why does the difference between 'meaningless' and 'vapor' reshape the entire book? How does the royal experiment of chapters 1-2 test whether wisdom, pleasure, or toil can resolve the hebel problem?`;
      }
      if (chapter === 3) {
        return `What does 'a time for everything' mean in its ancient context — are the fourteen antithetical pairs a divine masterplan or an observation about the rhythms of the human condition? And what does olam in 3:11 actually mean when the emphasis falls on 'yet they cannot fathom'?`;
      }
      if ([5, 6].includes(chapter)) {
        return `What does Qoheleth's temple speech in Ecclesiastes 5 reveal about ancient Israelite vow theology — and why does the wealth critique of chapters 5-6 distinguish between having much and enjoying one's portion (heleq)?`;
      }
      if ([7, 8].includes(chapter)) {
        return `What does the 'who can find out?' refrain reveal about wisdom's limits in Ecclesiastes 7-8 — and why does 8:15's joy command ('I commend enjoyment') function as positive ANE creaturely wisdom anchored in the Gilgamesh Siduri speech tradition?`;
      }
      if ([9, 10, 11, 12].includes(chapter)) {
        return `What does 'the living know that they will die, but the dead know nothing' mean in its original context — and how does the aging allegory of chapter 12, where 'the spirit returns to God who gave it,' reverse Genesis 2:7 rather than promise conscious afterlife?`;
      }
      return `What is the historical context of ${bookTitle} ${chapter}?`;
    }
    return `What is the historical context of ${bookTitle} ${chapter}?`;
  };

  const handleAskAboutPassage = () => {
    const question = buildPassageQuestion();
    router.push(`/chat?q=${encodeURIComponent(question)}&t=${Date.now()}`);
  };

  /** Split a flat commentary blob into headed sections with paragraph breaks. */
  const parseCommentarySections = (
    text: string
  ): { heading: string | null; body: string }[] => {
    // Strip leading # title (redundant with "Read our take on this passage" CTA)
    const stripped = text.replace(/^#\s+[^#]+?(?=\s*##)/, "").trim();
    // Split on ## or ### markers
    const parts = stripped.split(/\s*#{2,3}\s+/);
    return parts
      .filter(Boolean)
      .map((section) => {
        // Heading heuristic: a sentence starts where a capitalized word is
        // followed by two+ lowercase words (e.g. "If you've ever", "The name used").
        // Title words like "Cosmic Temple Framework" won't false-match because
        // they're followed by more capitalized words, not lowercase runs.
        // Guard: reject if the "heading" contains sentence-ending punctuation
        // followed by a capitalized word — that indicates body text with a proper
        // noun (e.g. "...period. Bible Lens presents...") not a real heading.
        const match = section.match(
          /^(.+?)\s+([A-Z][a-z]+[.,:;!?']*\s+[a-z][a-z']*\s+[a-z])/
        );
        if (
          match &&
          !/[.!?]\s+[A-Z]/.test(match[1]) &&
          match[1].trim().split(/\s+/).length >= 2
        ) {
          const headingEnd = match.index! + match[1].length;
          return {
            heading: section.substring(0, headingEnd).trim(),
            body: section.substring(headingEnd).trim(),
          };
        }
        return { heading: null, body: section };
      })
      .filter((s) => s.heading || s.body.trim());
  };

  /** Apply inline markdown (bold, italic) to text. */
  const inlineMarkdown = (text: string): string =>
    text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");

  useEffect(() => {
    // Skip client fetch when data was pre-populated by the server (SSR)
    if (initialCommentary && initialCommentary.length > 0) return;

    setIsLoading(true);
    setCommentary([]);

    fetch(`/api/commentary?book=${encodeURIComponent(book)}&chapter=${chapter}`)
      .then((res) => res.json())
      .then((data: CommentaryResponse) => {
        setCommentary(data.commentary ?? []);
      })
      .catch(() => {
        setCommentary([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [book, chapter, initialCommentary]);

  // Empty state — hide completely, no broken UI
  if (!isLoading && commentary.length === 0) {
    return null;
  }

  // Loading state — subtle shimmer
  if (isLoading) {
    return (
      <div
        className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5"
        aria-hidden="true"
      >
        <div className="animate-pulse space-y-3">
          <div
            className="h-4 w-40 rounded"
            style={{ background: "var(--color-bg-elevated)" }}
          />
          <div
            className="h-3 w-full rounded"
            style={{ background: "var(--color-bg-elevated)" }}
          />
          <div
            className="h-3 w-5/6 rounded"
            style={{ background: "var(--color-bg-elevated)" }}
          />
        </div>
      </div>
    );
  }

  // Content state
  return (
    <>
      <style>{`
        @keyframes ctaGlowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0); }
          50% { box-shadow: 0 0 8px 2px rgba(250, 204, 21, 0.15); }
        }
      `}</style>
      <div
        className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]"
        style={{
          borderLeft: "3px solid var(--color-gold-400)",
          animation: "ctaGlowPulse 3s ease-in-out 1s infinite",
        }}
      >
      {/* Collapsible header — "Read our take on this passage" CTA */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full flex items-center justify-between px-5 py-5 text-left hover:bg-[var(--color-bg-elevated)] transition-colors rounded-xl"
        aria-expanded={isExpanded}
      >
        <span className="flex items-center">
          {/* Inline diamond SVG — unique gradient ID to avoid collision with homepage LensIcon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 100 100"
            fill="none"
            className="flex-shrink-0 mr-2"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ctaLensGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            <path
              d="M50 10 L70 50 L50 90 L30 50 Z"
              stroke="url(#ctaLensGradient)"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <span className="flex flex-col">
            <span
              className="text-base font-semibold leading-tight"
              style={{
                fontFamily: "var(--font-cinzel), serif",
                color: "var(--color-gold-400)",
              }}
            >
              Bible Lens Commentary
            </span>
            <span
              className="text-sm leading-snug"
              style={{ color: "var(--color-text-muted)" }}
            >
              What the original audience understood
            </span>
          </span>
        </span>
        <svg
          className="w-5 h-5 flex-shrink-0 transition-transform duration-200"
          style={{
            color: "var(--color-text-muted)",
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-5 pb-5">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-cinzel), serif",
              letterSpacing: "0.12em",
            }}
          >
            Through This Lens
          </p>
          <div className="space-y-0">
            {commentary.map((chunk, index) => (
              <div key={index}>
                {index > 0 && (
                  <div className="border-t border-[var(--color-border)] my-4" />
                )}
                <div
                  className="text-lg leading-relaxed text-[var(--color-text-secondary)]"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {parseCommentarySections(chunk.text).map((section, si) => (
                    <div key={si} className={si > 0 ? "mt-5" : ""}>
                      {section.heading && (
                        <h3
                          className="text-xl font-semibold mb-2"
                          style={{ color: "var(--color-text-primary)" }}
                          dangerouslySetInnerHTML={{
                            __html: inlineMarkdown(section.heading),
                          }}
                        />
                      )}
                      {section.body.trim() && (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: inlineMarkdown(section.body.trim()),
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Attribution */}
          <p
            className="mt-5 text-base"
            style={{ color: "var(--color-text-muted)" }}
          >
            Bible Lens Commentary
          </p>

          <button
            type="button"
            onClick={handleAskAboutPassage}
            className="mt-4 w-full px-4 py-3 rounded-xl text-lg font-medium transition-colors hover:opacity-90"
            style={{
              background: "rgba(250, 204, 21, 0.08)",
              border: "1px solid rgba(250, 204, 21, 0.25)",
              color: "var(--color-gold-400)",
            }}
          >
            Ask about this passage
          </button>

          {(() => {
            const relatedKeys = RELATED_PASSAGES[`${book}-${chapter}`] ?? [];
            if (relatedKeys.length === 0) return null;
            return (
              <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
                <p className="text-xs font-semibold tracking-widest uppercase mb-3"
                  style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-cinzel), serif", letterSpacing: "0.12em" }}>
                  Related Passages
                </p>
                <ul className="space-y-1">
                  {relatedKeys.map((relKey) => {
                    const [relBook, relChapterStr] = relKey.split("-");
                    const relChapter = parseInt(relChapterStr, 10);
                    const bookName = findBookById(relBook)?.name ?? relBook;
                    return (
                      <li key={relKey}>
                        <Link href={`/bible/${relBook}/${relChapter}`}
                          className="text-sm text-[var(--color-gold-400)] hover:text-[var(--color-gold-300)] transition-colors">
                          {bookName} {relChapter}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })()}
          {(() => {
            const topicSlugs = CHAPTER_TOPICS[`${book}-${chapter}`] ?? [];
            if (topicSlugs.length === 0) return null;
            return (
              <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
                <p className="text-xs font-semibold tracking-widest uppercase mb-3"
                  style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-cinzel), serif", letterSpacing: "0.12em" }}>
                  Explore by Topic
                </p>
                <ul className="space-y-1">
                  {topicSlugs.map((slug) => {
                    const topicTitle = TOPIC_PAGES.find((t) => t.slug === slug)?.title ?? slug;
                    return (
                      <li key={slug}>
                        <Link href={`/topics/${slug}`}
                          className="text-sm text-[var(--color-cyan-400)] hover:text-[var(--color-cyan-300)] transition-colors">
                          {topicTitle}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })()}
        </div>
      )}
    </div>
    </>
  );
}
