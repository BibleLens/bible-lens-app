"use client";

// Route-level error boundary — a failed Qdrant/embedding call during the
// server-side commentary fetch previously had no recovery UI
export default function ChapterError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("[chapter] route error:", error);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 pb-12 pt-[248px]">
        <div className="glass-card p-5">
          <h2
            className="text-xl font-medium mb-2"
            style={{ color: "var(--color-text-primary)" }}
          >
            This chapter didn&apos;t load
          </h2>
          <p className="text-base mb-4" style={{ color: "var(--color-text-muted)" }}>
            Something went wrong fetching the passage. It&apos;s usually temporary.
          </p>
          <button
            type="button"
            onClick={reset}
            className="glass-card px-4 py-2 transition-colors"
            style={{ color: "var(--color-text-primary)" }}
          >
            Try again
          </button>
        </div>
      </main>
    </div>
  );
}
