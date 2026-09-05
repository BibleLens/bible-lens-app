import { sourceById, type SourceRef } from "@/lib/explorer/data";

const coverage: Record<string, string> = {
  direct_text_checked: "Text inspected",
  secondary_report_only: "Secondary account",
  inherited_calculation: "Existing calculation",
};
export function SourceList({ references }: { references: SourceRef[] }) {
  const seen = new Set<string>();
  return (
    <div className="source-list">
      {references
        .filter((r) => {
          const key = `${r.sourceId}:${r.locator}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .map((r) => {
          const source = sourceById.get(r.sourceId);
          if (!source)
            return (
              <p key={r.sourceId} className="note-box">
                The reference for this claim is unavailable.
              </p>
            );
          return (
            <div className="source-item" key={`${r.sourceId}:${r.locator}`}>
              {source.url ? (
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.title} ↗
                  <span className="sr-only"> (opens a new tab)</span>
                </a>
              ) : (
                <strong>{source.title}</strong>
              )}
              <p>{r.locator}</p>
              <span className="coverage">
                {coverage[source.coverage] ||
                  source.coverage.replaceAll("_", " ")}
              </span>
              <details>
                <summary>
                  {source.url ? "Source context" : "Research note & coverage"}
                </summary>
                <p>{source.note}</p>
                {!source.url && (
                  <p>
                    This is a working research note, not a separately published
                    source. The comparison includes accessible references where
                    available.
                  </p>
                )}
              </details>
            </div>
          );
        })}
    </div>
  );
}
