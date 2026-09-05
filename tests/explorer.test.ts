import assert from "node:assert/strict";
import test from "node:test";
import {
  absoluteRange,
  astronomicalYear,
  birthModels,
  claimById,
  connections,
  dateFor,
  fullChapterUrl,
  geography,
  linkedPassages,
  mapContext,
  passages,
  searchSubjects,
  sourceById,
  study,
  studyExport,
  subjectById,
} from "../src/lib/explorer/data";
import {
  DEFAULT_STATE,
  readStudyState,
  restorePlace,
  savedPlace,
  studyUrl,
} from "../src/lib/explorer/state";

test("every subject and relationship retains a resolvable claim with sources", () => {
  assert.equal(study.subjects.length, 48);
  assert.equal(study.relationships.length, 66);
  for (const subject of study.subjects) {
    const claim = claimById.get(subject.summaryClaimId);
    assert.ok(claim, subject.id);
    assert.ok(claim.sourceRefs.length, subject.id);
    assert.deepEqual(
      new Set(subject.relationshipIds),
      new Set(connections(subject.id).map((r) => r.id)),
      subject.id,
    );
  }
  for (const r of study.relationships) {
    assert.ok(subjectById.has(r.from));
    assert.ok(subjectById.has(r.to));
    assert.ok(claimById.has(r.claimId));
  }
  for (const claim of [
    ...study.claims,
    ...study.dateClaims,
    ...study.dateModels,
  ])
    for (const ref of claim.sourceRefs)
      assert.ok(sourceById.has(ref.sourceId), `${ref.sourceId} in ${claim.id}`);
});
test("all ten passages have complete verse collections and reader links", () => {
  assert.equal(Object.keys(passages).length, 10);
  assert.equal(
    Object.values(passages).reduce((n, p) => n + p.verses.length, 0),
    136,
  );
  for (const [id, passage] of Object.entries(passages)) {
    assert.equal(subjectById.get(id)?.type, "passage");
    assert.match(passage.url, /^https:\/\/ebible\.org\//);
    assert.notEqual(fullChapterUrl(id), "/books");
    assert.equal(
      new Set(passage.verses.map((v) => v.number)).size,
      passage.verses.length,
    );
    for (const verse of passage.verses) assert.ok(verse.text.length > 0);
  }
});
test("URLs round-trip the selected passage, subject, model and verse", () => {
  const state = {
    ...DEFAULT_STATE,
    view: "map" as const,
    subject: "person-mary",
    model: "birth-september-martin",
    verse: 5,
  };
  assert.deepEqual(
    readStudyState(
      new URL(studyUrl(state), "https://example.test").searchParams,
    ),
    state,
  );
});
test("untrusted links normalize unknown IDs and invalid verse numbers safely", () => {
  assert.deepEqual(
    readStudyState(
      new URLSearchParams(
        "view=nope&subject=__proto__&passage=constructor&model=unknown&verse=-4",
      ),
    ),
    DEFAULT_STATE,
  );
  assert.equal(
    readStudyState(
      new URLSearchParams("passage=passage-luke-visitation&verse=999"),
    ).verse,
    39,
  );
});
test("save and restore retain the entire study place", () => {
  const state = {
    ...DEFAULT_STATE,
    subject: "person-mary",
    view: "connections" as const,
    verse: 19,
    model: birthModels[2],
  };
  assert.deepEqual(
    restorePlace(JSON.parse(JSON.stringify(savedPlace(state)))),
    state,
  );
});
test("restore rejects unrelated, corrupt or incompatible files instead of silently losing context", () => {
  for (const input of [
    null,
    [],
    {},
    "text",
    { ...savedPlace(DEFAULT_STATE), version: 99 },
    { ...savedPlace(DEFAULT_STATE), studyId: "other" },
    {
      ...savedPlace(DEFAULT_STATE),
      state: { ...DEFAULT_STATE, subject: "missing" },
    },
    { ...savedPlace(DEFAULT_STATE), state: { ...DEFAULT_STATE, verse: "1" } },
  ])
    assert.throws(() => restorePlace(input));
});
test("date choices update dependent Herod dates without moving the known census", () => {
  assert.deepEqual(
    absoluteRange(dateFor("event-jesus-birth", birthModels[0])),
    [-5, -3],
  );
  assert.deepEqual(
    absoluteRange(dateFor("event-herod-death", birthModels[0])),
    [-3, -3],
  );
  assert.deepEqual(
    absoluteRange(dateFor("event-jesus-birth", birthModels[2])),
    [-2, -2],
  );
  assert.deepEqual(
    absoluteRange(dateFor("event-herod-death", birthModels[2])),
    [0, 0],
  );
  for (const model of birthModels)
    assert.deepEqual(absoluteRange(dateFor("event-census", model)), [6, 6]);
});
test("relative seasonal proposals and annual observances do not acquire invented years", () => {
  for (const model of [
    "birth-december-tradition",
    "service-winter-output",
    "service-summer-output",
  ])
    assert.equal(absoluteRange(dateFor("event-jesus-birth", model)), null);
  assert.equal(
    dateFor("event-service", "service-winter-output")?.value.kind,
    "schematic_season",
  );
  assert.equal(dateFor("event-service", birthModels[0])?.value.kind, "unknown");
});
test("BC and AD arithmetic crosses the boundary without a historical year zero", () => {
  assert.equal(
    astronomicalYear({ year: 1, era: "AD" }) -
      astronomicalYear({ year: 1, era: "BC" }),
    1,
  );
  assert.throws(() => astronomicalYear({ year: 0, era: "BC" }));
});
test("uncertain locations have no invented point; the Temple uses only Jerusalem context", () => {
  const region = mapContext("place-hill-country", DEFAULT_STATE.passage);
  assert.equal(region.place?.location?.geometry, null);
  assert.equal(
    mapContext("passage-luke-visitation", DEFAULT_STATE.passage).place?.id,
    "place-hill-country",
  );
  const temple = mapContext("event-service", DEFAULT_STATE.passage).place;
  assert.equal(temple?.id, "place-temple");
  assert.equal(temple?.location?.geometry, null);
  assert.equal(temple?.location?.contextPlaceId, "place-jerusalem");
  assert.equal(study.subjects.filter((s) => s.location?.geometry).length, 3);
});
test("people shown on the map are labelled by passage context, not an invented permanent location", () => {
  assert.equal(
    mapContext("person-mary", "passage-luke-announcement").place?.id,
    "place-nazareth",
  );
  assert.equal(
    mapContext("person-mary", "passage-luke-birth").basis,
    "passage",
  );
  assert.equal(
    mapContext("person-mary", "passage-luke-birth").place?.id,
    "place-bethlehem",
  );
  assert.equal(
    mapContext("passage-revelation-woman", "passage-revelation-woman").place,
    undefined,
  );
});
test("map coordinates stay within the public-domain physical map", () => {
  const [west, south, east, north] = geography.bbox;
  for (const subject of study.subjects) {
    const p = subject.location?.geometry?.coordinates;
    if (p) {
      assert.ok(p[0] >= west && p[0] <= east, subject.id);
      assert.ok(p[1] >= south && p[1] <= north, subject.id);
    }
  }
});
test("search reaches people, places and subject aliases and handles empty results", () => {
  assert.ok(searchSubjects("  MARY ").some((s) => s.id === "person-mary"));
  assert.ok(
    searchSubjects("hill country").some((s) => s.id === "place-hill-country"),
  );
  assert.equal(searchSubjects("zzzzunmatchedzzzz").length, 0);
  assert.ok(searchSubjects("").length);
  assert.ok(
    linkedPassages("person-mary").includes("passage-luke-announcement"),
  );
});
test("portable study data round-trips its records and excludes machine-local source paths", () => {
  const data = JSON.parse(JSON.stringify(studyExport()));
  assert.equal(data.author, "Pat Robinson");
  assert.equal(data.subjects.length, 48);
  assert.equal(data.relationships.length, 66);
  assert.equal(data.sources.length, 32);
  for (const source of data.sources) {
    assert.equal(source.path, undefined);
    if (source.url) assert.match(source.url, /^https?:\/\//);
  }
  assert.deepEqual(data.passages, passages);
  assert.deepEqual(data.geography, geography);
});
