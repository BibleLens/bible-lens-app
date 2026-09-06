import { TEMPLE_STUDIES } from "@/data/temples/studies";
import type { TempleId, TempleView } from "@/data/temples/types";
export const INITIAL_TEMPLE_VIEW: TempleView = {
  part: null,
  separation: 0,
  isolated: false,
  cutaway: false,
  lens: "object",
};
export function parseTempleView(
  id: TempleId,
  params: Pick<URLSearchParams, "get">,
): TempleView {
  const candidate = params.get("part");
  const part = TEMPLE_STUDIES[id].parts.some((p) => p.id === candidate)
    ? candidate
    : null;
  const value = Number(params.get("separation") ?? 0);
  const lens = params.get("lens");
  return {
    part,
    separation: Number.isFinite(value)
      ? Math.round(Math.max(0, Math.min(100, value)))
      : 0,
    isolated: !!part && params.get("isolate") === "1",
    cutaway: params.get("cutaway") === "1",
    lens: lens === "sources" || lens === "connections" ? lens : "object",
  };
}
export function templeHref(
  id: TempleId,
  view: TempleView = INITIAL_TEMPLE_VIEW,
) {
  const p = new URLSearchParams();
  if (view.part) p.set("part", view.part);
  if (view.separation) p.set("separation", String(Math.round(view.separation)));
  if (view.part && view.isolated) p.set("isolate", "1");
  if (view.cutaway) p.set("cutaway", "1");
  if (view.lens !== "object") p.set("lens", view.lens);
  return `/explore/temples/${id}${p.size ? `?${p}` : ""}`;
}
