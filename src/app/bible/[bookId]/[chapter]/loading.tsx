// Route-level pending UI — chapter pages block on the server-side commentary
// fetch (Qdrant + embeddings), so navigation needs immediate feedback
export default function ChapterLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 pb-12 pt-[248px]">
        <div className="glass-card p-5 animate-pulse">
          <p className="text-base" style={{ color: "var(--color-text-muted)" }}>
            Loading chapter...
          </p>
        </div>
      </main>
    </div>
  );
}
