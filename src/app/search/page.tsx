import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { LensIcon } from "@/components/LensIcon";
import { SearchInput } from "@/components/SearchInput";
import { BibleSearch } from "@/components/BibleSearch";
import { SemanticSearch } from "@/components/SemanticSearch";

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
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <LensIcon size={32} animate={false} />
            <span
              className="text-base font-semibold tracking-wide hidden sm:block"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              <span style={{ color: "var(--color-gold-400)" }}>Bible</span>
              <span style={{ color: "var(--color-cyan-400)" }}> Lens</span>
            </span>
          </Link>

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
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Page title */}
        <div className="mb-6">
          {q ? (
            <p
              className="text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              Results for{" "}
              <span style={{ color: "var(--color-text-primary)" }}>
                &ldquo;{q}&rdquo;
              </span>
            </p>
          ) : (
            <p
              className="text-sm"
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
                  className="text-sm"
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
                  className="text-sm"
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
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Ancient wisdom, modern clarity.
          </p>
        </div>
      </footer>
    </div>
  );
}
