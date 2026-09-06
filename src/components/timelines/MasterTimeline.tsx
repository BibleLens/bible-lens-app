import Link from "next/link";
import { MASTER_TIMELINE_ERAS } from "@/lib/timelines-data";
import { ClaimStatusBadge } from "./ClaimStatusBadge";

export function MasterTimeline() {
  return (
    <div className="relative">
      <div className="absolute bottom-8 left-[11px] top-8 w-px bg-gradient-to-b from-amber-300 via-cyan-300 to-cyan-300/10 md:bottom-auto md:left-8 md:right-8 md:top-[63px] md:h-px md:w-auto" aria-hidden="true" />
      <ol className="grid gap-7 md:grid-cols-5 md:gap-4">
        {MASTER_TIMELINE_ERAS.map((era, eraIndex) => (
          <li key={era.id} className="relative grid grid-cols-[24px_1fr] gap-5 md:block">
            <div className="relative z-10 mt-5 h-6 w-6 rounded-full border-4 border-[var(--color-bg-secondary)] bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.5)] md:mx-5 md:mb-7 md:mt-13" aria-hidden="true" />
            <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 transition-colors hover:border-cyan-300/25">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--homepage-primary)]">{era.range}</p>
              <h3 className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                <span className="mr-2 text-[var(--color-text-muted)]">{String(eraIndex + 1).padStart(2, "0")}</span>
                {era.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">{era.summary}</p>
              <ul className="mt-5 space-y-4">
                {era.events.map((event) => (
                  <li key={`${event.date}-${event.label}`} className="border-t border-[var(--color-border)] pt-4">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-[var(--color-text-secondary)]">{event.date}</span>
                      <ClaimStatusBadge status={event.status} />
                    </div>
                    {event.href ? (
                      <Link href={event.href} className="text-sm font-medium leading-snug text-[var(--color-text-primary)] transition-colors hover:text-[var(--homepage-primary)]">
                        {event.label} <span aria-hidden="true">→</span>
                      </Link>
                    ) : (
                      <span className="text-sm font-medium leading-snug text-[var(--color-text-primary)]">{event.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
