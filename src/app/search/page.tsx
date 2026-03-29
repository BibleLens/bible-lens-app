import { Suspense } from "react";
import type { Metadata } from "next";
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
      {/* Main content */}
      <main id="main-content" className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 pt-20">
        {/* Search input */}
        <div className="mb-6 max-w-2xl">
          <Suspense
            fallback={
              <input
                className="search-input w-full px-4 py-2 rounded-none"
                defaultValue={q}
                placeholder="Search verses, topics, or ask a question..."
                readOnly
              />
            }
          >
            <SearchInput defaultValue={q} />
          </Suspense>
        </div>

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
                className="rounded-none border p-5 animate-pulse"
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
                className="rounded-none border p-5 animate-pulse"
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
