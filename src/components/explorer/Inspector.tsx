"use client";

import type { RefObject } from "react";
import {
  claimById,
  connections,
  dateFor,
  describeRelationship,
  linkedPassages,
  locationDescription,
  modelById,
  subjectById,
  type Relationship,
} from "@/lib/explorer/data";
import type { StudyState } from "@/lib/explorer/state";
import { SourceList } from "./SourceList";

export type PanelTab = "overview" | "connections" | "sources";
const glyphs = {
  person: "○",
  place: "⌖",
  event: "◇",
  group: "◌",
  passage: "▤",
};
export function ConnectionList({
  subject,
  select,
  evidence,
  limit,
}: {
  subject: string;
  select: (id: string) => void;
  evidence: (r: Relationship) => void;
  limit?: number;
}) {
  return (
    <ul className="connection-list">
      {connections(subject)
        .slice(0, limit)
        .map((r) => (
          <li key={r.id}>
            <button className="connection-row" onClick={() => select(r.other)}>
              <span className="mini-glyph" aria-hidden="true">
                {glyphs[subjectById.get(r.other)!.type]}
              </span>
              <span>
                <strong>{subjectById.get(r.other)!.label}</strong>
                <small>{describeRelationship(r)}</small>
              </span>
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </button>
            <button
              className="connection-evidence"
              onClick={() => evidence(r)}
              aria-label={`Evidence for ${describeRelationship(r)}`}
            >
              View connection evidence ↗
            </button>
          </li>
        ))}
    </ul>
  );
}
export function Inspector({
  state,
  panel,
  setPanel,
  headingRef,
  mobileOpen,
  select,
  evidence,
  compare,
  returnToReading,
  openMap,
  changePassage,
}: {
  state: StudyState;
  panel: PanelTab;
  setPanel: (tab: PanelTab) => void;
  headingRef: RefObject<HTMLHeadingElement | null>;
  mobileOpen: boolean;
  select: (id: string) => void;
  evidence: (r: Relationship) => void;
  compare: () => void;
  returnToReading: () => void;
  openMap: () => void;
  changePassage: (id: string) => void;
}) {
  const subject = subjectById.get(state.subject)!;
  const claim = claimById.get(subject.summaryClaimId)!;
  const date = dateFor(subject.id, state.model);
  const references = [
    ...claim.sourceRefs,
    ...(date?.sourceRefs || []),
    ...(subject.location?.sourceRefs || []),
  ];
  const passages = linkedPassages(subject.id);
  const tabs: PanelTab[] = ["overview", "connections", "sources"];
  return (
    <aside
      className={`inspector ${mobileOpen ? "mobile-open" : ""}`}
      aria-label="Selected subject details"
    >
      <div className="inspector-header">
        <span className="subject-glyph" aria-hidden="true">
          {glyphs[subject.type]}
        </span>
        <div>
          <div className="eyebrow">{subject.type}</div>
          <small className="muted">In this study</small>
        </div>
      </div>
      <h2 ref={headingRef} tabIndex={-1}>
        {subject.label}
      </h2>
      <div
        className="inspector-tabs"
        role="tablist"
        aria-label="Subject information"
      >
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            id={`tab-${t}`}
            className="inspector-tab"
            aria-controls="panel-content"
            aria-selected={panel === t}
            tabIndex={panel === t ? 0 : -1}
            onClick={() => setPanel(t)}
            onKeyDown={(e) => {
              if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key))
                return;
              e.preventDefault();
              const next =
                e.key === "Home"
                  ? "overview"
                  : e.key === "End"
                    ? "sources"
                    : tabs[
                        (tabs.indexOf(t) + (e.key === "ArrowRight" ? 1 : 2)) % 3
                      ];
              setPanel(next);
              document.getElementById(`tab-${next}`)?.focus();
            }}
          >
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div id="panel-content" role="tabpanel" aria-labelledby={`tab-${panel}`}>
        {panel === "sources" ? (
          <>
            <p className="subject-summary">
              Sources for this description{date ? " and date" : ""}. A text’s
              statement and a historical reconstruction remain distinct.
            </p>
            <SourceList references={references} />
          </>
        ) : panel === "connections" ? (
          <>
            <p className="subject-summary">
              Each connection has a meaning and a source. Follow one to explore
              further.
            </p>
            <ConnectionList
              subject={subject.id}
              select={select}
              evidence={evidence}
            />
          </>
        ) : (
          <>
            <p className="subject-summary">{subject.summary}</p>
            {date && (
              <div className="note-box">
                <span className="evidence-tag">
                  {date.basis.replaceAll("_", " ")}
                </span>
                <span className="date-value">{date.label}</span>
                <p>
                  {date.limitations[0] ||
                    modelById.get(date.modelId)?.objections[0]}
                </p>
                {[
                  "event-jesus-birth",
                  "event-service",
                  "event-herod-death",
                ].includes(subject.id) && (
                  <button className="return-link" onClick={compare}>
                    Compare the proposals →
                  </button>
                )}
              </div>
            )}
            {subject.location && (
              <div className="note-box">
                <strong>
                  {subject.location.geometry
                    ? "A place, not a precise event site"
                    : "Location in the account"}
                </strong>
                <p>{locationDescription(subject)}</p>
              </div>
            )}
            {subject.id === "person-joseph" && (
              <div className="note-box">
                <strong>Fatherhood in the account</strong>
                <p>
                  “Social father” describes Joseph’s household role without
                  asserting biological paternity.
                </p>
              </div>
            )}
            {subject.id === "person-elizabeth" && (
              <div className="note-box">
                <strong>How closely related?</strong>
                <p>
                  Luke calls Elizabeth Mary’s relative. He doesn’t specify
                  cousin.
                </p>
              </div>
            )}
            {subject.id === "person-quirinius" && (
              <div className="note-box">
                <strong>A historical difficulty</strong>
                <p>
                  The known assessment belongs to AD 6, later than the 6–4 BC
                  birth range. No earlier census is assumed here.
                </p>
              </div>
            )}
            <div className="panel-section-title">Follow a connection</div>
            <ConnectionList
              subject={subject.id}
              select={select}
              evidence={evidence}
              limit={4}
            />
            {connections(subject.id).length > 4 && (
              <button
                className="panel-action"
                onClick={() => setPanel("connections")}
              >
                All {connections(subject.id).length} connections →
              </button>
            )}
            <div className="inspector-actions">
              <button className="panel-action primary" onClick={openMap}>
                ⌖ Explore the setting
              </button>
              {passages[0] && (
                <button
                  className="panel-action"
                  onClick={() => changePassage(passages[0])}
                >
                  Read {subjectById.get(passages[0])!.label} →
                </button>
              )}
              <button
                className="panel-action"
                onClick={() => setPanel("sources")}
              >
                Inspect the sources
              </button>
            </div>
          </>
        )}
      </div>
      <button
        className="panel-action back-to-reading"
        onClick={returnToReading}
      >
        Back to reading →
      </button>
    </aside>
  );
}
