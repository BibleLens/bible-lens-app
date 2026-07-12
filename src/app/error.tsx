"use client";

// Global error boundary — catches render/data failures on any route that
// lacks its own error.tsx and offers a retry instead of a blank crash
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("[app] route error:", error);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 pb-12 pt-[248px]">
        <div className="glass-card p-5">
          <h2
            className="text-xl font-medium mb-2"
            style={{ color: "var(--color-text-primary)" }}
          >
            Something went wrong
          </h2>
          <p className="text-base mb-4" style={{ color: "var(--color-text-muted)" }}>
            An unexpected error interrupted this page. It&apos;s usually temporary.
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
