import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchInput } from "@/components/SearchInput";
import { BibleSearch } from "@/components/BibleSearch";
import { SemanticSearch } from "@/components/SemanticSearch";
import { SuggestionBubbles } from "@/components/SuggestionBubbles";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q = "" } = await searchParams;
  return {
    title: q ? `"${q}" — Search | Bible Lens` : "Search | Bible Lens",
    description: q
      ? `Search results for "${q}" — Bible verses and theological insights from Bible Lens.`
      : "Search the Bible and theological commentary. Instant keyword search across all 31,729 BSB verses plus semantic search via AI.",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Full-screen glass hero (SRC-01) */}
      <section
        className="grain-overlay relative min-h-[40vh] flex flex-col items-center justify-center px-6 py-20 pt-28"
        style={{ background: "var(--color-obsidian)" }}
      >
        {/* Editorial heading with border-left accent */}
        <div
          style={{ borderLeft: "3px solid var(--homepage-primary)", paddingLeft: "1.5rem" }}
          className="mb-8 text-left w-full max-w-2xl"
        >
          <p className="micro-label mb-2" style={{ color: "var(--homepage-primary)" }}>
            BIBLE LENS — SEARCH
          </p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            color: "var(--color-text-primary)",
            lineHeight: 1.15,
          }}>
            What seeks your discernment?
          </h1>
        </div>

        {/* Lens-frame search input wrapper */}
        <div
          className="w-full max-w-2xl"
          style={{
            outline: "2px solid rgba(0,229,255,0.25)",
            outlineOffset: "4px",
            boxShadow: "0 0 40px rgba(0,229,255,0.08)",
          }}
        >
          <Suspense fallback={
            <input className="search-input w-full px-4 py-2 rounded-none" defaultValue={q} placeholder="Search verses, topics, or ask a question..." readOnly />
          }>
            <SearchInput defaultValue={q} />
          </Suspense>
        </div>

        {/* Suggestion bubbles below input when no query */}
        {!q && (
          <div className="mt-8 w-full max-w-2xl">
            <Suspense fallback={null}>
              <SuggestionBubbles />
            </Suspense>
          </div>
        )}
      </section>

      {/* Results section */}
      <main id="main-content" className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {q && (
          <div className="mb-6">
            <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
              Results for{" "}
              <span style={{ color: "var(--color-text-primary)" }}>&ldquo;{q}&rdquo;</span>
            </p>
          </div>
        )}

        {/* Dual results grid — two glass columns */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Suspense fallback={
            <div className="glass-card p-5 animate-pulse">
              <p className="text-base" style={{ color: "var(--color-text-muted)" }}>Loading Bible search...</p>
            </div>
          }>
            <BibleSearch query={q} />
          </Suspense>

          <Suspense fallback={
            <div className="glass-card p-5 animate-pulse">
              <p className="text-base" style={{ color: "var(--color-text-muted)" }}>Loading theological search...</p>
            </div>
          }>
            <SemanticSearch query={q} />
          </Suspense>
        </div>

        {/* Suggestion bubbles below results when query is set */}
        {q && (
          <div className="mt-8">
            <p className="micro-label mb-3" style={{ color: "var(--homepage-primary)" }}>EXPLORE MORE</p>
            <Suspense fallback={null}>
              <SuggestionBubbles />
            </Suspense>
          </div>
        )}
      </main>

      <footer className="border-t py-6 mt-auto" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-base" style={{ color: "var(--color-text-muted)" }}>Ancient wisdom, modern clarity.</p>
        </div>
      </footer>
    </div>
  );
}
