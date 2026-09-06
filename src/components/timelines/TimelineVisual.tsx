import type { TimelineVisual as TimelineVisualData } from "@/lib/timelines-data";
import "./timeline-visual.css";

export function TimelineVisual({ visual, compact = false }: { visual: TimelineVisualData; compact?: boolean }) {
  const lanes = [visual.left, visual.right];

  return (
    <figure className={`timeline-visual ${compact ? "timeline-visual--compact" : ""} overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-obsidian)] shadow-[0_32px_100px_rgba(0,0,0,0.35)]`}>
      <figcaption className="timeline-visual-caption border-b border-[var(--color-border)] px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.24em] text-[var(--homepage-primary)]">
        {visual.eyebrow}
      </figcaption>
      <div className="timeline-visual-lanes relative grid gap-px bg-[var(--color-bg-elevated)] md:grid-cols-2">
        {lanes.map((lane) => (
          <div
            key={lane.label}
            className={`timeline-visual-lane relative min-w-0 min-h-64 bg-[var(--color-obsidian)] p-7 sm:p-10 ${
              lane.emphasis ? "before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-cyan-300" : ""
            }`}
          >
            <p className="timeline-visual-label text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">{lane.label}</p>
            <p
              className={`timeline-visual-value mt-7 text-4xl font-semibold sm:text-5xl ${lane.emphasis ? "text-[var(--homepage-primary)]" : "text-[var(--color-text-primary)]"}`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {lane.date}
            </p>
            <div className="timeline-visual-marker my-7 flex items-center gap-3" aria-hidden="true">
              <span className={`h-3 w-3 rounded-full ${lane.emphasis ? "bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.75)]" : "bg-[var(--color-bg-elevated)]"}`} />
              <span className={`h-px flex-1 ${lane.emphasis ? "bg-cyan-300/65" : "bg-[var(--color-bg-elevated)]"}`} />
            </div>
            <p className="timeline-visual-description max-w-md text-base leading-relaxed text-[var(--color-text-secondary)]">{lane.description}</p>
          </div>
        ))}
      </div>
      <div className="timeline-visual-note grid gap-4 border-t border-[var(--color-border)] bg-cyan-300/[0.05] px-6 py-6 sm:grid-cols-[1fr_2fr] sm:px-10">
        <p className="text-sm font-semibold text-[var(--homepage-primary)]">{visual.pivot}</p>
        <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{visual.note}</p>
      </div>
    </figure>
  );
}
