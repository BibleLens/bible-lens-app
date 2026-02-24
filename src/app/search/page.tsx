import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { LensIcon } from "@/components/LensIcon";
import { SearchInput } from "@/components/SearchInput";
import { BibleSearch } from "@/components/BibleSearch";
import { SemanticSearch } from "@/components/SemanticSearch";
import { BackButton } from "@/components/BackButton";

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
      {/* Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{
          background: "var(--color-bg-primary)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <BackButton />
            <Link href="/" className="flex items-center gap-3">
              <LensIcon size={36} animate={false} />
              <span
                className="text-lg font-semibold tracking-wide hidden sm:block"
                style={{ fontFamily: "var(--font-cinzel), serif" }}
              >
                <span style={{ color: "var(--color-gold-400)" }}>Bible</span>
                <span style={{ color: "var(--color-cyan-400)" }}> Lens</span>
              </span>
            </Link>
          </div>

          {/* Search input fills remaining space */}
          <div className="flex-1 max-w-2xl">
            <Suspense
              fallback={
                <input
                  className="search-input w-full px-4 py-2 rounded-xl"
                  defaultValue={q}
                  placeholder="Search verses, topics, or ask a question..."
                  readOnly
                />
              }
            >
              <SearchInput defaultValue={q} />
            </Suspense>
          </div>

          {/* Chat navigation link */}
          <Link
            href="/chat"
            className="flex items-center gap-1.5 text-lg transition-colors shrink-0 min-h-[44px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Chat
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Page title */}
        <div className="mb-6">
          {q ? (
            <p
              className="text-lg"
              style={{ color: "var(--color-text-muted)" }}
            >
              Results for{" "}
              <span style={{ color: "var(--color-text-primary)" }}>
                &ldquo;{q}&rdquo;
              </span>
            </p>
          ) : (
            <p
              className="text-lg"
              style={{ color: "var(--color-text-muted)" }}
            >
              Enter a query above to search Bible text and theological commentary.
            </p>
          )}
        </div>

        {/* Dual results grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Suspense
            fallback={
              <div
                className="rounded-xl border p-5 animate-pulse"
                style={{
                  background: "var(--color-bg-elevated)",
                  borderColor: "var(--color-border)",
                }}
              >
                <p
                  className="text-base"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Loading Bible search...
                </p>
              </div>
            }
          >
            <BibleSearch query={q} />
          </Suspense>

          <Suspense
            fallback={
              <div
                className="rounded-xl border p-5 animate-pulse"
                style={{
                  background: "var(--color-bg-elevated)",
                  borderColor: "var(--color-border)",
                }}
              >
                <p
                  className="text-base"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Loading theological search...
                </p>
              </div>
            }
          >
            <SemanticSearch query={q} />
          </Suspense>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="border-t py-6 mt-auto"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-base" style={{ color: "var(--color-text-muted)" }}>
            Ancient wisdom, modern clarity.
          </p>
        </div>
      </footer>
    </div>
  );
}
