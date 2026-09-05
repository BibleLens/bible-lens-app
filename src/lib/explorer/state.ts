import { birthModels, passages, subjectById } from "./data";

export type StudyView = "read" | "connections" | "map";
export type StudyState = {
  view: StudyView;
  subject: string;
  passage: string;
  model: string;
  verse: number;
};
export const DEFAULT_STATE: StudyState = {
  view: "read",
  subject: "event-jesus-birth",
  passage: "passage-luke-birth",
  model: "birth-range-herod4",
  verse: 1,
};
export const STUDY_PATH = "/explore/jesus-birth";

export function readStudyState(params: {
  get(name: string): string | null;
}): StudyState {
  const requestedView = params.get("view");
  const passage = params.get("passage") || DEFAULT_STATE.passage;
  const validPassage = Object.hasOwn(passages, passage)
    ? passage
    : DEFAULT_STATE.passage;
  const verse = Number(params.get("verse"));
  return {
    view:
      requestedView === "connections" || requestedView === "map"
        ? requestedView
        : "read",
    subject: subjectById.has(params.get("subject") || "")
      ? params.get("subject")!
      : DEFAULT_STATE.subject,
    passage: validPassage,
    model: birthModels.includes(params.get("model") || "")
      ? params.get("model")!
      : DEFAULT_STATE.model,
    verse: passages[validPassage].verses.some((v) => v.number === verse)
      ? verse
      : passages[validPassage].verses[0].number,
  };
}
export function studyUrl(state: Partial<StudyState> = {}) {
  const s = { ...DEFAULT_STATE, ...state };
  return `${STUDY_PATH}?${new URLSearchParams({ view: s.view, subject: s.subject, passage: s.passage, model: s.model, verse: String(s.verse) })}`;
}
export function savedPlace(state: StudyState) {
  return {
    format: "bible-lens-place",
    version: 1,
    studyId: "jesus-birth",
    author: "Pat Robinson",
    state,
  };
}
export function restorePlace(input: unknown): StudyState {
  if (!input || typeof input !== "object")
    throw new Error("This isn’t a Bible Lens saved place.");
  const data = input as ReturnType<typeof savedPlace>;
  if (
    data.format !== "bible-lens-place" ||
    data.version !== 1 ||
    data.studyId !== "jesus-birth" ||
    !data.state ||
    typeof data.state !== "object"
  )
    throw new Error("Choose a saved place from the Jesus’ birth study.");
  const s = data.state;
  const normalized = readStudyState(
    new URLSearchParams(Object.entries(s).map(([k, v]) => [k, String(v)])),
  );
  if (
    ["view", "subject", "passage", "model", "verse"].some(
      (k) => normalized[k as keyof StudyState] !== s[k as keyof StudyState],
    )
  )
    throw new Error(
      "This saved place references a passage or proposal that isn’t available.",
    );
  return normalized;
}
