"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  birthModels,
  claimById,
  describeRelationship,
  modelById,
  searchSubjects,
  type Relationship,
} from "@/lib/explorer/data";
import { SourceList } from "./SourceList";

export type DialogState =
  | { kind: "compare" | "search" | "guide" | "map-sources" | "tools" }
  | { kind: "relationship"; relationship: Relationship };
export function StudyDialogs({
  modal,
  close,
  model,
  chooseModel,
  select,
  tools,
  begin,
}: {
  modal: DialogState | null;
  close: () => void;
  model: string;
  chooseModel: (id: string) => void;
  select: (id: string) => void;
  tools: ReactNode;
  begin: (task: "read" | "map" | "dates") => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (modal && !dialog?.open) {
      opener.current = document.activeElement as HTMLElement;
      dialog?.showModal();
    }
    if (modal?.kind === "search")
      dialog?.querySelector<HTMLInputElement>("#study-search")?.focus();
    if (!modal && dialog?.open) {
      dialog.close();
      if (opener.current?.isConnected)
        opener.current.focus({ preventScroll: true });
    }
  }, [modal]);
  const titles = {
    compare: "When was Jesus born?",
    search: "Find a thread to follow",
    guide: "Follow a question through the study",
    "map-sources": "A geographical reference",
    tools: "Keep your place",
  };
  return (
    <dialog
      ref={ref}
      aria-labelledby="study-dialog-title"
      onCancel={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const bounds = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < bounds.left ||
            e.clientX > bounds.right ||
            e.clientY < bounds.top ||
            e.clientY > bounds.bottom
          )
            close();
        }
      }}
    >
      {modal && (
        <>
          <div className="dialog-head">
            <div>
              <div className="eyebrow">Bible Lens Explorer</div>
              <h2 id="study-dialog-title">
                {modal.kind === "relationship"
                  ? describeRelationship(modal.relationship)
                  : titles[modal.kind]}
              </h2>
            </div>
            <button className="close" onClick={close} aria-label="Close dialog">
              ×
            </button>
          </div>
          <div className="dialog-content">
            {modal.kind === "search" && <SearchDialog select={select} />}
            {modal.kind === "relationship" && (
              <>
                <p className="dialog-intro">{modal.relationship.explanation}</p>
                <SourceList
                  references={
                    claimById.get(modal.relationship.claimId)!.sourceRefs
                  }
                />
              </>
            )}
            {modal.kind === "compare" && (
              <>
                <p className="dialog-intro">
                  The accounts don’t give a month and day. Compare what each
                  proposal explains and what it has to assume. These options
                  have different kinds of support; displaying them together
                  doesn’t make their evidence equal.
                </p>
                <div className="model-grid">
                  {birthModels.map((id) => {
                    const m = modelById.get(id)!;
                    return (
                      <section
                        key={id}
                        className={`model-card ${id === model ? "active" : ""}`}
                      >
                        <div className="eyebrow">
                          {id === birthModels[0]
                            ? "Working range · not an adopted date"
                            : id === birthModels[2]
                              ? "Minority birthday hypothesis"
                              : id === birthModels[3]
                                ? "Ancient observance · possible birthday"
                                : id.startsWith("service")
                                  ? "Conditional seasonal example"
                                  : "Astronomical birthday hypothesis"}
                        </div>
                        <h3>{m.label}</h3>
                        <strong>What supports it</strong>
                        <p>
                          {id === "service-winter-output"
                            ? "A winter birth follows if the proposed autumn service date and pregnancy intervals are assumed."
                            : id === "service-summer-output"
                              ? "A summer birth follows if the proposed spring service date and pregnancy intervals are assumed."
                              : m.strength}
                        </p>
                        <strong>What remains difficult</strong>
                        <ul>
                          {m.objections.map((o) => (
                            <li key={o}>{o}</li>
                          ))}
                        </ul>
                        <details>
                          <summary>Assumptions & sources</summary>
                          <ul>
                            {m.assumptions.map((a) => (
                              <li key={a}>{a}</li>
                            ))}
                          </ul>
                          <SourceList references={m.sourceRefs} />
                        </details>
                        <button
                          className={`panel-action ${id === model ? "primary" : ""}`}
                          onClick={() => chooseModel(id)}
                          aria-label={`Explore proposal: ${m.label}`}
                        >
                          {id === model
                            ? "Currently exploring"
                            : "Explore this proposal"}{" "}
                          →
                        </button>
                      </section>
                    );
                  })}
                </div>
              </>
            )}
            {modal.kind === "guide" && (
              <>
                <p className="dialog-intro">
                  Begin with a passage, follow the people and places, then
                  compare the evidence. Your selected subject and date proposal
                  stay with you as you switch views.
                </p>
                <div className="task-grid">
                  {(
                    [
                      [
                        "read",
                        "Follow a person",
                        "Select Mary in Luke 2, then follow her connection to Jesus.",
                      ],
                      [
                        "map",
                        "Find the place",
                        "Locate Bethlehem, inspect its sources and explore the unnamed hill-country town.",
                      ],
                      [
                        "dates",
                        "Compare the dates",
                        "Compare the 6–4 BC range with the September proposal. Look for the assumption about Herod.",
                      ],
                    ] as const
                  ).map(([key, title, text], i) => (
                    <section className="task-card" key={key}>
                      <span>0{i + 1}</span>
                      <h3>{title}</h3>
                      <p>{text}</p>
                      <button onClick={() => begin(key)}>Try this →</button>
                    </section>
                  ))}
                </div>
                <div className="note-box">
                  <strong>About this study preview</strong>
                  <p>
                    The first collection brings together the birth narratives
                    and their historical questions. The content is prepared for
                    editorial review. Exact birthdays and reconstructions remain
                    proposals, with sources and objections available alongside
                    them.
                  </p>
                </div>
              </>
            )}
            {modal.kind === "map-sources" && (
              <>
                <p className="dialog-intro">
                  Present-day coastlines and lakes help with orientation. Region
                  names are illustrative context, without historical boundary
                  lines. Town markers don’t identify exact houses or birth
                  buildings.
                </p>
                <div className="source-item">
                  <a
                    href="https://www.naturalearthdata.com/about/terms-of-use/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Natural Earth 1:10m ↗
                  </a>
                  <p>
                    Public-domain land and lake data cropped to this study’s
                    geography.
                  </p>
                </div>
                <SourceList
                  references={[
                    {
                      sourceId: "bethlehem-gazetteer",
                      locator: "Bethlehem settlement point; CC BY",
                    },
                    {
                      sourceId: "lmu-gazetteer",
                      locator:
                        "Nazareth and Hierusalem; underlying coordinates credited to OpenStreetMap",
                    },
                  ]}
                />
                <p className="note-box">
                  Broad regions remain records without invented pins. No travel
                  route or journey distance has been inferred.
                </p>
              </>
            )}
            {modal.kind === "tools" && tools}
          </div>
        </>
      )}
    </dialog>
  );
}
function SearchDialog({ select }: { select: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const results = searchSubjects(query);
  return (
    <>
      <label htmlFor="study-search" className="sr-only">
        Search people, places, passages and events
      </label>
      <input
        id="study-search"
        className="search-input"
        placeholder="Mary, Bethlehem, the census…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      />
      <div className="search-results" aria-live="polite">
        {results.length ? (
          results.map((s) => (
            <button
              className="search-result"
              key={s.id}
              onClick={() => select(s.id)}
            >
              <span className="eyebrow">{s.type}</span>
              <span>
                <strong>{s.label}</strong>
                <small>{s.summary}</small>
              </span>
            </button>
          ))
        ) : (
          <p>
            No subjects found. Try a person, place or passage from this study.
          </p>
        )}
      </div>
    </>
  );
}
