"use client";

import Link from "next/link";
import type { RefObject } from "react";
import {
  fullChapterUrl,
  passageSubjects,
  passages,
  passageTitles,
  subjectById,
} from "@/lib/explorer/data";
import type { StudyState } from "@/lib/explorer/state";

const names: [string, string][] = [
  ["Caesar Augustus", "person-augustus"],
  ["Augustus", "person-augustus"],
  ["Quirinius", "person-quirinius"],
  ["Zacharias", "person-zechariah"],
  ["Zechariah", "person-zechariah"],
  ["Elizabeth", "person-elizabeth"],
  ["Gabriel", "person-gabriel"],
  ["Joseph", "person-joseph"],
  ["Mary", "person-mary"],
  ["Jesus", "person-jesus"],
  ["Simeon", "person-simeon"],
  ["Anna", "person-anna"],
  ["Herod", "person-herod"],
  ["Nazareth", "place-nazareth"],
  ["Bethlehem", "place-bethlehem"],
  ["Jerusalem", "place-jerusalem"],
  ["Galilee", "place-galilee"],
  ["Syria", "place-syria"],
  ["Egypt", "place-egypt"],
  ["Abijah", "group-abijah"],
  ["shepherds", "group-shepherds"],
];
const targets = new Map(names);
const namePattern = new RegExp(
  `\\b(${names.map(([name]) => name).join("|")})\\b`,
  "g",
);

function VerseText({
  text,
  selected,
  onSelect,
}: {
  text: string;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const parts = [];
  let last = 0;
  for (const match of text.matchAll(namePattern)) {
    parts.push(text.slice(last, match.index));
    const id = targets.get(match[0])!;
    parts.push(
      <button
        key={match.index}
        className={`word ${selected === id ? "selected" : ""}`}
        onClick={() => onSelect(id)}
        aria-label={`Explore ${match[0]}`}
      >
        {match[0]}
      </button>,
    );
    last = match.index! + match[0].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}
export function ReadingView({
  state,
  readerRef,
  select,
  changePassage,
  openMap,
  showSources,
}: {
  state: StudyState;
  readerRef: RefObject<HTMLElement | null>;
  select: (id: string, verse?: number) => void;
  changePassage: (id: string) => void;
  openMap: () => void;
  showSources: () => void;
}) {
  const passage = passages[state.passage];
  return (
    <>
      <aside className="chapter-nav" aria-label="Passages in this study">
        <div className="nav-title">The birth narratives</div>
        {passageSubjects.map((s) => (
          <button
            key={s.id}
            className="passage-button"
            onClick={() => changePassage(s.id)}
            aria-current={s.id === state.passage ? "true" : undefined}
          >
            {s.label}
            <small>{s.summary}</small>
          </button>
        ))}
        <div className="nav-divider" />
        <Link className="passage-button" href="/books">
          Browse all 66 books ↗
        </Link>
        <p className="nav-note">
          Follow a detail.
          <br />
          See the wider story.
        </p>
      </aside>
      <article
        className="reading-content"
        ref={readerRef}
        aria-label="Scripture passage"
      >
        <div className="only-mobile">
          <label className="sr-only" htmlFor="passage-select">
            Choose a passage
          </label>
          <select
            id="passage-select"
            className="mobile-passage"
            value={state.passage}
            onChange={(e) => changePassage(e.target.value)}
          >
            {passageSubjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label} · {s.summary}
              </option>
            ))}
          </select>
        </div>
        <div className="reading-topline">
          <span className="eyebrow">
            {subjectById.get(state.passage)!.label}
          </span>
          <span className="translation">WEB · ENGLISH</span>
        </div>
        <h1>{passageTitles[state.passage]}</h1>
        <p className="reading-deck">
          The words on the page. The world around them.
        </p>
        <div className="reading-actions">
          <button className="small-button" onClick={openMap}>
            ⌖ Explore the setting
          </button>
          <button className="small-button" onClick={showSources}>
            ↗ Passage sources
          </button>
          <Link className="small-button" href={fullChapterUrl(state.passage)}>
            Read the full chapter →
          </Link>
        </div>
        <div className="verses">
          {passage.verses.map((v) => (
            <p
              key={v.number}
              className="verse"
              data-verse={v.number}
              id={`verse-${v.number}`}
            >
              <span className="verse-number">{v.number}</span>
              <VerseText
                text={v.text}
                selected={state.subject}
                onSelect={(id) => select(id, v.number)}
              />
            </p>
          ))}
        </div>
        <div className="reading-footnote">
          <a href={passage.url} target="_blank" rel="noopener noreferrer">
            World English Bible Classic ↗
          </a>
          Public-domain text. Verse wording is retained; footnote markers are
          omitted. The full-chapter reader uses the Berean Standard Bible.
        </div>
      </article>
    </>
  );
}
