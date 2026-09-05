"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { dateFor, passages, shortName, subjectById } from "@/lib/explorer/data";
import {
  DEFAULT_STATE,
  readStudyState,
  restorePlace,
  savedPlace,
  studyUrl,
  type StudyState,
  type StudyView,
} from "@/lib/explorer/state";
import { ReadingView } from "./ReadingView";
import { Inspector, type PanelTab } from "./Inspector";
import { ConnectionsView } from "./ConnectionsView";
import { AtlasView } from "./AtlasView";
import { StudyDialogs, type DialogState } from "./StudyDialogs";

export function Explorer() {
  const params = useSearchParams();
  const state = readStudyState(params);
  const [panel, setPanel] = useState<PanelTab>("overview");
  const [modal, setModal] = useState<DialogState | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [backCount, setBackCount] = useState(0);
  const [notice, setNotice] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const readerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const positions = useRef(new Map<string, { reader: number; page: number }>());
  const pendingFocus = useRef(false);
  const depth = useRef(0);

  useEffect(() => {
    const onPop = () => {
      depth.current = Number(window.history.state?.explorerDepth) || 0;
      setBackCount(depth.current);
      setPanel("overview");
      setModal(null);
    };
    window.history.replaceState({ explorerDepth: 0 }, "", window.location.href);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !modal &&
        !(
          e.target instanceof HTMLElement &&
          (e.target.isContentEditable ||
            ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName))
        )
      ) {
        e.preventDefault();
        setModal({ kind: "search" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);
  useEffect(() => {
    const inspector = headingRef.current?.closest("aside");
    if (inspector) inspector.scrollTop = 0;
  }, [state.view, state.subject]);
  useEffect(() => {
    const reader = readerRef.current;
    if (state.view === "read" && reader) {
      const saved = positions.current.get(state.passage);
      const verse = reader.querySelector<HTMLElement>(
        `[data-verse="${state.verse}"]`,
      );
      if (saved) {
        reader.scrollTop = saved.reader;
        window.scrollTo({ top: saved.page });
      } else if (
        state.verse > passages[state.passage].verses[0].number &&
        verse
      ) {
        if (window.matchMedia("(max-width:850px)").matches)
          verse.scrollIntoView({ block: "center" });
        else reader.scrollTop = verse.offsetTop - reader.offsetTop - 24;
      } else window.scrollTo({ top: 0 });
    }
    if (pendingFocus.current) {
      headingRef.current?.focus({ preventScroll: true });
      if (window.matchMedia("(max-width:850px)").matches)
        headingRef.current
          ?.closest("aside")
          ?.scrollIntoView({ block: "start" });
      pendingFocus.current = false;
    }
  }, [state.view, state.passage, state.verse, state.subject, state.model]);

  function currentVerse() {
    const reader = readerRef.current;
    if (!reader || state.view !== "read") return state.verse;
    const headerBottom =
      document
        .querySelector(".explorer .product-header")
        ?.getBoundingClientRect().bottom || 80;
    const top = Math.max(reader.getBoundingClientRect().top, headerBottom);
    return (
      Number(
        [...reader.querySelectorAll<HTMLElement>("[data-verse]")].find(
          (v) => v.getBoundingClientRect().bottom > top + 12,
        )?.dataset.verse,
      ) || state.verse
    );
  }
  function navigate(patch: Partial<StudyState>, focus = false) {
    if (readerRef.current)
      positions.current.set(state.passage, {
        reader: readerRef.current.scrollTop,
        page: window.scrollY,
      });
    const next = { ...state, verse: currentVerse(), ...patch };
    if (
      patch.passage &&
      patch.passage !== state.passage &&
      patch.verse === undefined
    )
      next.verse = passages[patch.passage].verses[0].number;
    setPanel("overview");
    setMobileOpen(focus);
    pendingFocus.current = focus;
    setModal(null);
    depth.current += 1;
    setBackCount(depth.current);
    // Next adds its own history markers and notifies useSearchParams.
    window.history.pushState(
      { explorerDepth: depth.current },
      "",
      studyUrl(next),
    );
    setNotice(`${shortName(next.subject)} selected.`);
  }
  function select(id: string, verse?: number) {
    const subject = subjectById.get(id)!;
    if (subject.type === "passage")
      navigate({ subject: id, passage: id, view: "read" });
    else
      navigate(
        { subject: id, ...(verse ? { verse } : {}) },
        state.view !== "connections",
      );
  }
  function changePassage(id: string) {
    navigate({ passage: id, subject: id, view: "read" });
  }
  function returnToReading() {
    navigate({ view: "read", subject: state.passage });
  }
  function showPanel(tab: PanelTab) {
    setPanel(tab);
    setMobileOpen(true);
    requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
      if (window.matchMedia("(max-width:850px)").matches)
        headingRef.current
          ?.closest("aside")
          ?.scrollIntoView({ block: "start" });
    });
  }
  function openTools() {
    setShareUrl(
      `${window.location.origin}${studyUrl({ ...state, verse: currentVerse() })}`,
    );
    setNotice("");
    setModal({ kind: "tools" });
  }
  function savePlace() {
    const blob = new Blob(
      [
        JSON.stringify(
          savedPlace({ ...state, verse: currentVerse() }),
          null,
          2,
        ),
      ],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob),
      anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "bible-lens-jesus-birth-place.json";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Your study place has been saved.");
  }
  const birthDate = dateFor("event-jesus-birth", state.model)!;
  return (
    <div className="explorer" data-view={state.view}>
      <div className="product-header">
        <div className="study-heading">
          <Link href="/explore" className="eyebrow">
            The Explorer
          </Link>
          <span>Jesus’ birth & its historical setting</span>
        </div>
        <nav className="concept-options" aria-label="Study views">
          {(
            [
              ["read", "Read"],
              ["connections", "Connections"],
              ["map", "Map"],
            ] as [StudyView, string][]
          ).map(([view, label]) => (
            <button
              key={view}
              className="concept-option"
              aria-pressed={state.view === view}
              onClick={() => navigate({ view })}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="study-tools">
          <button
            className="search-trigger"
            onClick={() => setModal({ kind: "search" })}
            aria-label="Search this study"
          >
            <svg width="17" height="17" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" />
              <path d="m12 12 5 5" stroke="currentColor" />
            </svg>
            <span>Search this study</span>
            <kbd>/</kbd>
          </button>
          <button className="small-button save-place" onClick={openTools}>
            Keep my place
          </button>
        </div>
      </div>
      <div className="toolbar">
        <div className="trail">
          <button
            className="back"
            disabled={!backCount}
            aria-label="Back to previous selection"
            onClick={() => window.history.back()}
          >
            ‹
          </button>
          <span className="trail-name">{shortName(state.subject)}</span>
          <span className="muted">/</span>
          <button className="return-link" onClick={returnToReading}>
            Return to {subjectById.get(state.passage)!.label}
          </button>
        </div>
        <button
          className="model-pill"
          aria-label="Compare birth date proposals"
          onClick={() => setModal({ kind: "compare" })}
        >
          <span>Birth proposal</span>
          <strong>{birthDate.label}</strong>
          <span aria-hidden="true">⇄</span>
        </button>
      </div>
      <main
        id="main-content"
        tabIndex={-1}
        className={`stage ${state.view === "read" ? "reading-layout" : state.view === "connections" ? "graph-layout" : "atlas-layout"}`}
      >
        {state.view === "read" ? (
          <ReadingView
            state={state}
            readerRef={readerRef}
            select={select}
            changePassage={changePassage}
            openMap={() => navigate({ view: "map", subject: state.passage })}
            showSources={() => {
              navigate({ subject: state.passage }, true);
              setPanel("sources");
            }}
          />
        ) : state.view === "connections" ? (
          <ConnectionsView
            state={state}
            select={select}
            showConnections={() => showPanel("connections")}
          />
        ) : (
          <AtlasView
            state={state}
            select={select}
            compare={() => setModal({ kind: "compare" })}
            details={() => showPanel("overview")}
            mapSources={() => setModal({ kind: "map-sources" })}
          />
        )}
        <Inspector
          state={state}
          panel={panel}
          setPanel={setPanel}
          headingRef={headingRef}
          mobileOpen={mobileOpen}
          select={select}
          evidence={(relationship) =>
            setModal({ kind: "relationship", relationship })
          }
          compare={() => setModal({ kind: "compare" })}
          returnToReading={returnToReading}
          openMap={() => navigate({ view: "map" })}
          changePassage={changePassage}
        />
      </main>
      <div className="concept-caption">
        <span>
          Study preview · Sources and reconstructions are open to review.
        </span>
        <div>
          <button onClick={() => setModal({ kind: "guide" })}>
            How to explore
          </button>
          <button className="mobile-save" onClick={openTools}>
            Keep my place
          </button>
        </div>
      </div>
      <div className="sr-only" role="status" aria-live="polite">
        {notice}
      </div>
      <StudyDialogs
        modal={modal}
        close={() => setModal(null)}
        model={state.model}
        select={select}
        chooseModel={(model) => navigate({ model })}
        begin={(task) => {
          if (task === "dates") setModal({ kind: "compare" });
          else
            navigate(
              task === "read"
                ? DEFAULT_STATE
                : { view: "map", subject: "place-bethlehem" },
            );
        }}
        tools={
          <>
            <p className="dialog-intro">
              Keep the passage, selected subject and date proposal together. You
              can open this link later or save a small file to restore your
              place.
            </p>
            <label htmlFor="study-link">Link to this study place</label>
            <input
              id="study-link"
              className="search-input share-input"
              readOnly
              value={shareUrl}
              onFocus={(e) => e.target.select()}
            />
            <button
              className="panel-action primary"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(shareUrl);
                  setNotice("Study link copied.");
                } catch {
                  setNotice(
                    "Select the link above and copy it to keep your place.",
                  );
                }
              }}
            >
              Copy study link
            </button>
            <button className="panel-action" onClick={savePlace}>
              Save my place to a file
            </button>
            <label className="restore-label" htmlFor="restore-place">
              Restore a saved place
              <input
                id="restore-place"
                type="file"
                accept="application/json,.json"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  if (!file) return;
                  try {
                    if (file.size > 32768)
                      throw new Error(
                        "That file is too large for a saved place. Choose the small Bible Lens place file.",
                      );
                    const restored = restorePlace(
                      JSON.parse(await file.text()),
                    );
                    positions.current.clear();
                    navigate(restored);
                    positions.current.clear();
                    setNotice("Your study place has been restored.");
                  } catch (error) {
                    setNotice(
                      error instanceof Error
                        ? error.message
                        : "This file couldn’t be read.",
                    );
                  }
                }}
              />
            </label>
            <p role="status" className="tool-notice">
              {notice}
            </p>
            <details className="export-details">
              <summary>Take the study data with you</summary>
              <p>
                Download the passages, subjects, source references, date
                proposals and map data as a portable JSON file.
              </p>
              <a href="/explore/jesus-birth/data" download>
                Download study data ↗
              </a>
            </details>
          </>
        }
      />
    </div>
  );
}
