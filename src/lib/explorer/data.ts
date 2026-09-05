import rawStudy from "@/data/explorer/jesus-birth.json";
import rawSources from "@/data/explorer/sources.json";
import rawPassages from "@/data/explorer/passages.json";
import geography from "@/data/explorer/geography.json";

export type SourceRef = { sourceId: string; locator: string };
export type Subject = {
  id: string;
  type: "person" | "place" | "event" | "group" | "passage";
  label: string;
  summary: string;
  summaryClaimId: string;
  passages: string[];
  relationshipIds: string[];
  aliases?: string[];
  location?: {
    precision: string;
    geometry: { type: string; coordinates: number[] } | null;
    contextPlaceId?: string;
    sourceRefs?: SourceRef[];
    unresolvedIdentification?: string;
  };
};
export type Relationship = {
  id: string;
  from: string;
  to: string;
  predicate: string;
  explanation: string;
  claimId: string;
};
export type Claim = {
  id: string;
  statement: string;
  basis: string;
  sourceRefs: SourceRef[];
  reviewStatus: string;
};
export type DateModel = {
  id: string;
  label: string;
  assumptions: string[];
  strength: string;
  objections: string[];
  sourceRefs: SourceRef[];
  status: string;
};
export type HistoricalDate = {
  year: number;
  era: "BC" | "AD";
  month?: number;
  day?: number;
  calendar?: string;
};
export type DateClaim = {
  id: string;
  subjectId: string;
  modelId: string;
  label: string;
  basis: string;
  sourceRefs: SourceRef[];
  limitations: string[];
  value: {
    kind: string;
    at?: HistoricalDate;
    earliest?: HistoricalDate;
    latest?: HistoricalDate;
    [key: string]: unknown;
  };
};
export type Source = {
  id: string;
  title: string;
  url?: string;
  kind: string;
  coverage: string;
  note: string;
};
export type Passage = {
  verses: { number: number; text: string }[];
  url: string;
  translation: string;
};

export const study = rawStudy as unknown as {
  title: string;
  status: string;
  schemaVersion: string;
  subjects: Subject[];
  relationships: Relationship[];
  claims: Claim[];
  dateModels: DateModel[];
  dateClaims: DateClaim[];
};
export const sources = rawSources.sources as Source[];
export const passages = rawPassages as Record<string, Passage>;
export { geography };
export const subjectById = new Map(study.subjects.map((s) => [s.id, s]));
export const claimById = new Map(study.claims.map((s) => [s.id, s]));
export const sourceById = new Map(sources.map((s) => [s.id, s]));
export const modelById = new Map(study.dateModels.map((s) => [s.id, s]));
export const birthModels = [
  "birth-range-herod4",
  "birth-march-molnar-early",
  "birth-september-martin",
  "birth-december-tradition",
  "service-winter-output",
  "service-summer-output",
];
export const passageSubjects = study.subjects.filter(
  (s) => s.type === "passage",
);

const predicateLabels: Record<string, string> = {
  mother_of: "Mother of",
  social_father_of: "Social father of",
  father_of: "Father of",
  husband_of: "Husband of",
  wife_of: "Wife of",
  relative_of: "Relative of",
  member_of: "Belongs to",
  participant_in: "Takes part in",
  messenger_in: "Messenger in",
  located_at: "Located in",
  within: "Within",
  after: "After",
  describes: "Describes",
  interpreted_as_sky_by: "Sky interpretation",
  ruler_in_narrative_of: "Ruler in the account",
  decree_frames: "Decree frames the account",
  visit_after: "Visit follows",
  conducted: "Conducted",
  chronological_tension_with: "Dates in tension",
  commemorates: "Commemorates",
  proposed_sign_of: "Proposed sign of",
  office_located_in: "Office in",
  three_calendar_days_after: "Three calendar days later",
};
export const predicateLabel = (id: string) =>
  predicateLabels[id] || id.replaceAll("_", " ");
export const shortName = (id: string) =>
  subjectById.get(id)?.label.replace(", Mary's husband", "") || id;
export function connections(id: string) {
  return study.relationships
    .filter((r) => r.from === id || r.to === id)
    .map((r) => ({ ...r, other: r.from === id ? r.to : r.from }));
}
export const describeRelationship = (r: Relationship) =>
  `${shortName(r.from)} → ${predicateLabel(r.predicate).toLowerCase()} → ${shortName(r.to)}`;
export function linkedPassages(id: string) {
  if (subjectById.get(id)?.type === "passage") return [id];
  return connections(id)
    .filter((r) => subjectById.get(r.other)?.type === "passage")
    .map((r) => r.other);
}
export function dateFor(subject: string, model: string) {
  const dates = study.dateClaims.filter((d) => d.subjectId === subject);
  return (
    dates.find((d) => d.modelId === model) ||
    dates.find((d) => d.modelId === "historical-context") ||
    dates.find((d) => d.modelId === "text-sequence") ||
    dates[0]
  );
}
export function astronomicalYear(date: HistoricalDate): number {
  if (
    !Number.isInteger(date.year) ||
    date.year < 1 ||
    !["BC", "AD"].includes(date.era)
  )
    throw new Error("A historical date requires a positive year and BC or AD.");
  return date.era === "BC" ? 1 - date.year : date.year;
}
export function absoluteRange(date?: DateClaim): [number, number] | null {
  if (date?.value.kind === "range" && date.value.earliest && date.value.latest)
    return [
      astronomicalYear(date.value.earliest),
      astronomicalYear(date.value.latest),
    ];
  if (date?.value.kind === "point" && date.value.at)
    return [astronomicalYear(date.value.at), astronomicalYear(date.value.at)];
  return null;
}
const passagePlaces: Record<string, string> = {
  "passage-luke-service": "place-temple",
  "passage-luke-announcement": "place-nazareth",
  "passage-luke-visitation": "place-hill-country",
  "passage-luke-john": "place-hill-country",
  "passage-luke-birth": "place-bethlehem",
  "passage-luke-presentation": "place-temple",
  "passage-matthew-magi": "place-bethlehem",
  "passage-matthew-egypt": "place-egypt",
};
export function mapContext(
  subjectId: string,
  passageId: string,
): { place?: Subject; basis: "subject" | "passage" } {
  const subject = subjectById.get(subjectId);
  if (subject?.type === "place") return { place: subject, basis: "subject" };
  const location = connections(subjectId).find(
    (r) => r.from === subjectId && r.predicate === "located_at",
  );
  if (location)
    return { place: subjectById.get(location.to), basis: "subject" };
  return {
    place: subjectById.get(
      passagePlaces[subject?.type === "passage" ? subjectId : passageId],
    ),
    basis: "passage",
  };
}
export function locationDescription(subject: Subject) {
  if (subject.location?.geometry)
    return "The marker locates the settlement. It doesn’t identify the house, birth building or ancient town boundary.";
  if (subject.id === "place-temple")
    return "The account names the Jerusalem Temple. Its location is shown at city scale, without an inferred sanctuary footprint.";
  if (subject.id === "place-hill-country")
    return "Luke doesn’t name the town. The later identification with Ein Karem isn’t assumed here.";
  return "The account gives a broad location. A regional record doesn’t locate a particular event site.";
}
export function searchSubjects(query: string) {
  const q = query.toLocaleLowerCase().trim();
  if (!q)
    return [
      "person-mary",
      "place-bethlehem",
      "event-jesus-birth",
      "person-quirinius",
      "event-service",
      "place-hill-country",
    ].map((id) => subjectById.get(id)!);
  return study.subjects.filter((s) =>
    [s.label, s.summary, ...(s.aliases || [])]
      .join(" ")
      .toLocaleLowerCase()
      .includes(q),
  );
}
export function fullChapterUrl(passage: string) {
  const routes: Record<string, string> = {
    "LUK01.htm": "/bible/luke/1",
    "LUK02.htm": "/bible/luke/2",
    "MAT01.htm": "/bible/matthew/1",
    "MAT02.htm": "/bible/matthew/2",
    "REV12.htm": "/bible/revelation/12",
  };
  return routes[passages[passage]?.url.split("/").at(-1) || ""] || "/books";
}
export const passageTitles: Record<string, string> = {
  "passage-luke-birth": "A birth in Bethlehem",
  "passage-luke-service": "A priest, an unexpected promise",
  "passage-luke-announcement": "An announcement in Nazareth",
  "passage-luke-visitation": "Into the hill country",
  "passage-luke-john": "The birth of John",
  "passage-luke-presentation": "A child at the Temple",
  "passage-matthew-family": "Joseph and Mary",
  "passage-matthew-magi": "Visitors from the east",
  "passage-matthew-egypt": "Egypt, then home",
  "passage-revelation-woman": "A woman, a child, a dragon",
};

export function studyExport() {
  return {
    format: "bible-lens-study",
    version: 1,
    studyId: "jesus-birth",
    author: "Pat Robinson",
    status: study.status,
    subjects: study.subjects,
    relationships: study.relationships,
    claims: study.claims,
    dateModels: study.dateModels,
    dateClaims: study.dateClaims,
    sources: sources.map(({ id, title, url, kind, coverage, note }) => ({
      id,
      title,
      url,
      kind,
      coverage,
      note,
    })),
    passages,
    geography,
  };
}
