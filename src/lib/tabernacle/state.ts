import { PARTS, type PartId, type Lens } from "@/data/tabernacle/study";
export type StudyState = {
  part: PartId | null;
  separation: number;
  isolated: boolean;
  lens: Lens;
};
export const INITIAL_STATE: StudyState = {
  part: null,
  separation: 0,
  isolated: false,
  lens: "object",
};
export function parseStudyState(
  params: Pick<URLSearchParams, "get">,
): StudyState {
  const id = params.get("part");
  const part = PARTS.some((p) => p.id === id) ? (id as PartId) : null;
  const raw = Number(params.get("separation") ?? 0);
  const separation = Number.isFinite(raw)
    ? Math.round(Math.max(0, Math.min(100, raw)))
    : 0;
  const rawLens = params.get("lens");
  const lens =
    rawLens === "passage" || rawLens === "connections" ? rawLens : "object";
  return {
    part,
    separation,
    isolated: !!part && params.get("isolate") === "1",
    lens,
  };
}
export function studyHref(state: StudyState) {
  const params = new URLSearchParams();
  if (state.part) params.set("part", state.part);
  if (state.separation)
    params.set("separation", String(Math.round(state.separation)));
  if (state.isolated && state.part) params.set("isolate", "1");
  if (state.lens !== "object") params.set("lens", state.lens);
  return `/explore/tabernacle${params.size ? `?${params}` : ""}`;
}
