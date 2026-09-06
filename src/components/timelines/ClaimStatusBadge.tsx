import { CLAIM_STATUS_COPY, type ClaimStatus } from "@/lib/timelines-data";

const styles: Record<ClaimStatus, string> = {
  documented: "border-cyan-300/35 bg-cyan-300/10 text-cyan-200",
  derived: "border-amber-300/35 bg-amber-300/10 text-amber-200",
  disputed: "border-orange-300/35 bg-orange-300/10 text-orange-200",
  hypothesis: "border-fuchsia-300/35 bg-fuchsia-300/10 text-fuchsia-200",
};

export function ClaimStatusBadge({ status }: { status: ClaimStatus }) {
  return (
    <span
      data-status={status}
      className={`claim-badge inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${styles[status]}`}
    >
      {CLAIM_STATUS_COPY[status].label}
    </span>
  );
}
