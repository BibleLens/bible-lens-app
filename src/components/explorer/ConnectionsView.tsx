"use client";

import { useState } from "react";
import {
  connections,
  dateFor,
  describeRelationship,
  predicateLabel,
  subjectById,
} from "@/lib/explorer/data";
import type { StudyState } from "@/lib/explorer/state";

export function ConnectionsView({
  state,
  select,
  showConnections,
}: {
  state: StudyState;
  select: (id: string) => void;
  showConnections: () => void;
}) {
  const [filter, setFilter] = useState<"all" | "people">("all");
  const subject = subjectById.get(state.subject)!;
  const seen = new Set<string>();
  const rank = { person: 0, group: 1, place: 2, event: 3, passage: 4 };
  const all = connections(subject.id)
    .filter(
      (r) =>
        filter === "all" ||
        ["person", "group"].includes(subjectById.get(r.other)!.type),
    )
    .filter((r) => {
      if (seen.has(r.other)) return false;
      seen.add(r.other);
      return true;
    })
    .sort(
      (a, b) =>
        rank[subjectById.get(a.other)!.type] -
        rank[subjectById.get(b.other)!.type],
    );
  const visible = all.slice(0, 6);
  const slots = [
    [23, 16],
    [77, 16],
    [84, 51],
    [77, 85],
    [23, 85],
    [16, 51],
  ];
  return (
    <section className="graph-main" aria-label="Connected subjects">
      <div className="graph-intro">
        <div>
          <div className="eyebrow">
            Connections · {visible.length} of {all.length} shown
          </div>
          <h1>One detail opens a world.</h1>
          <p>Select a neighbour to follow the story.</p>
        </div>
        <div className="graph-filter" aria-label="Connection filters">
          <button
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All subjects
          </button>
          <button
            aria-pressed={filter === "people"}
            onClick={() => setFilter("people")}
          >
            People
          </button>
        </div>
      </div>
      <div
        className="graph-board"
        aria-label={`Connections around ${subject.label}`}
      >
        <svg
          className="graph-lines"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {visible.map((r, i) => {
            const [x, y] = slots[i];
            return (
              <path
                key={r.id}
                d={`M500,306 Q${500 + (x * 10 - 500) * 0.3},${y * 6} ${x * 10},${y * 6}`}
              />
            );
          })}
        </svg>
        <div className="graph-node center" style={{ left: "50%", top: "51%" }}>
          <span className="node-type">{subject.type} · selected</span>
          <strong>{subject.label}</strong>
          <small>
            {subject.id === "event-jesus-birth"
              ? dateFor(subject.id, state.model)?.label
              : "Follow the labelled connections"}
          </small>
        </div>
        {visible.map((r, i) => {
          const [x, y] = slots[i],
            other = subjectById.get(r.other)!;
          return (
            <div key={r.id} className="graph-neighbour">
              <span
                className="graph-edge-label"
                style={{
                  left: `${50 + (x - 50) * 0.55}%`,
                  top: `${51 + (y - 51) * 0.55}%`,
                }}
                aria-hidden="true"
              >
                {predicateLabel(r.predicate)}
              </span>
              <button
                className="graph-node"
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() => select(other.id)}
                aria-label={`Explore ${other.label}: ${describeRelationship(r)}`}
              >
                <span className="node-type">{other.type}</span>
                <strong>{other.label}</strong>
                <span className="mobile-edge">
                  {predicateLabel(r.predicate)}
                </span>
                <small>
                  {r.from === subject.id
                    ? "from selected subject"
                    : "to selected subject"}
                </small>
              </button>
            </div>
          );
        })}
        {!visible.length && (
          <p className="graph-empty">
            No people are directly connected in this study. Try All subjects.
          </p>
        )}
      </div>
      <div className="graph-hint">
        <div className="graph-legend">
          <span>Selected subject</span>
          <span>Sources on every connection</span>
        </div>
        <button className="small-button" onClick={showConnections}>
          Show all connections →
        </button>
      </div>
    </section>
  );
}
