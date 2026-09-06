"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import {
  PARTS,
  PART_BY_ID,
  TOUR,
  type PartId,
  type Lens,
} from "@/data/tabernacle/study";
import {
  INITIAL_STATE,
  parseStudyState,
  studyHref,
  type StudyState,
} from "@/lib/tabernacle/state";
import type { CameraCommand } from "./DwellingScene";
const Scene = dynamic(() => import("./DwellingScene"), {
  ssr: false,
  loading: () => <div className="dw-preparing">Preparing the dwelling…</div>,
});
const subscribeMotion = (callback: () => void) => {
  const q = window.matchMedia("(prefers-reduced-motion: reduce)");
  q.addEventListener("change", callback);
  return () => q.removeEventListener("change", callback);
};
const motionSnapshot = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function Icon({
  name,
  size = 18,
}: {
  name:
    | "play"
    | "pause"
    | "layers"
    | "reset"
    | "focus"
    | "share"
    | "close"
    | "top"
    | "left"
    | "right"
    | "plus"
    | "minus";
  size?: number;
}) {
  const paths = {
    play: "M8 5l11 7-11 7V5Z",
    pause: "M8 5v14M16 5v14",
    layers: "m3 8 9-5 9 5-9 5-9-5Zm0 5 9 5 9-5M3 18l9 5 9-5",
    reset: "M4 10a8 8 0 1 1 1 8M4 4v6h6",
    focus: "M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5M9 9h6v6H9Z",
    share: "M12 16V3m-4 4 4-4 4 4M5 12v8h14v-8",
    close: "m6 6 12 12M6 18 18 6",
    top: "m3 8 9-5 9 5-9 5-9-5Zm0 0v8l9 5 9-5V8M12 13v8",
    left: "m14 5-7 7 7 7",
    right: "m10 5 7 7-7 7",
    plus: "M12 5v14M5 12h14",
    minus: "M5 12h14",
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}

export function TabernacleStudy() {
  const params = useSearchParams();
  const [manual, setManual] = useState<StudyState>(() =>
    parseStudyState(params),
  );
  const [labels, setLabels] = useState(false);
  const [camera, setCamera] = useState<CameraCommand>({
    action: "home",
    sequence: 0,
  });
  const [tourActive, setTourActive] = useState(false),
    [playing, setPlaying] = useState(false),
    [tourTime, setTourTime] = useState(0);
  const [ready, setReady] = useState(false),
    [shareMessage, setShareMessage] = useState(""),
    [shareFallback, setShareFallback] = useState("");
  const about = useRef<HTMLDialogElement>(null);
  const deviceReducedMotion = useSyncExternalStore(
    subscribeMotion,
    motionSnapshot,
    () => false,
  );
  const [motionOff, setMotionOff] = useState(false);
  const reducedMotion = deviceReducedMotion || motionOff;
  const step = Math.min(4, Math.floor(tourTime / 15));
  const finished = tourTime >= 75;
  const state = useMemo<StudyState>(
    () =>
      tourActive
        ? {
            part: TOUR[step].part,
            separation: TOUR[step].separation,
            isolated: TOUR[step].isolated,
            lens: TOUR[step].lens,
          }
        : manual,
    [tourActive, step, manual],
  );
  const part = state.part ? PART_BY_ID[state.part] : null;
  const isPlaying = tourActive && playing && !finished && !reducedMotion;
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (!isPlaying) return;
    let last = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now(),
        delta = (now - last) / 1000;
      last = now;
      setTourTime((time) => Math.min(75, time + delta));
    }, 100);
    return () => window.clearInterval(timer);
  }, [isPlaying]);
  useEffect(() => {
    const pause = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", pause);
    return () => document.removeEventListener("visibilitychange", pause);
  }, []);

  const change = useCallback(
    (patch: Partial<StudyState>) => {
      const next = { ...state, ...patch };
      if (!next.part) next.isolated = false;
      setManual(next);
      setTourActive(false);
      setPlaying(false);
      window.history.replaceState(null, "", studyHref(next));
      setShareMessage("");
      setShareFallback("");
    },
    [state],
  );
  const select = useCallback(
    (id: PartId) => {
      change({
        part: id,
        separation: Math.max(
          state.separation,
          id === "covering" || id === "court" ? 30 : 70,
        ),
      });
    },
    [change, state.separation],
  );
  function cameraAction(action: CameraCommand["action"]) {
    setCamera((current) => ({ action, sequence: current.sequence + 1 }));
  }
  function startTour() {
    setTourTime(0);
    setTourActive(true);
    setPlaying(!reducedMotion);
    cameraAction("home");
  }
  function stepTour(next: number) {
    setTourTime(Math.max(0, Math.min(4, next)) * 15);
    setTourActive(true);
    setPlaying(false);
  }
  async function shareView() {
    const url = new URL(studyHref(state), window.location.origin).href;
    try {
      await navigator.clipboard.writeText(url);
      setShareMessage("Link copied. It opens this selection and view.");
    } catch {
      setShareFallback(url);
      setShareMessage("Copy this link to return to your view.");
    }
  }
  const showAbout = () => about.current?.showModal();

  return (
    <main id="main-content" className="dw-study">
      <header className="dw-heading">
        <div>
          <nav className="dw-breadcrumb" aria-label="Breadcrumb">
            <Link href="/explore">The Explorer</Link>
            <span aria-hidden="true">/</span>
            <span>Sacred spaces</span>
          </nav>
          <div className="dw-title-row">
            <h1>
              Inside the <em>Dwelling.</em>
            </h1>
            <span className="dw-edition">01</span>
          </div>
          <p>
            A tent. A world of connections. Take it apart and follow what you
            find.
          </p>
        </div>
        <div className="dw-heading-actions">
          <button className="dw-study-note" onClick={showAbout}>
            <span /> Circular Tabernacle · Schematic study{" "}
            <span aria-hidden="true">↗</span>
          </button>
          <button className="dw-primary" onClick={startTour} disabled={!ready}>
            <Icon name="play" />{" "}
            {reducedMotion ? "Step through the story" : "Watch the reveal"}
            <small>{reducedMotion ? "5 moments" : "75 seconds"}</small>
          </button>
        </div>
      </header>

      <div className="dw-workbench">
        <aside className="dw-parts" aria-label="Tabernacle components">
          <div className="dw-panel-heading">
            <span className="dw-eyebrow">The dwelling</span>
            <span>11 assemblies</span>
          </div>
          <button
            className={`dw-whole ${!part ? "is-active" : ""}`}
            aria-pressed={!part}
            onClick={() => change({ part: null, isolated: false })}
          >
            <Icon name="layers" /> The whole structure
          </button>
          <div className="dw-part-list">
            {PARTS.map((item, index) => (
              <button
                key={item.id}
                className={`dw-part ${state.part === item.id ? "is-active" : ""}`}
                aria-pressed={state.part === item.id}
                onClick={() => select(item.id)}
                style={{ "--part-color": item.color } as CSSProperties}
              >
                <span className="dw-part-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="dw-part-swatch" />
                <span>{item.name}</span>
                <span className="dw-part-arrow" aria-hidden="true">
                  ↗
                </span>
              </button>
            ))}
          </div>
          <div className="dw-parts-footer">
            <span className="dw-eyebrow">Explore at your pace</span>
            <p>Select a part here, or touch it in the model.</p>
            <button className="dw-text-button" onClick={showAbout}>
              Sources & reconstruction notes ↗
            </button>
          </div>
        </aside>

        <section className="dw-stage" aria-label="Interactive Tabernacle">
          <div className="dw-viewport">
            <div className="dw-stage-caption">
              <span className="dw-eyebrow">The wilderness dwelling</span>
              <span>
                {state.isolated
                  ? "Inspecting one assembly"
                  : "Circular interpretation"}
              </span>
            </div>
            <Scene
              state={state}
              labels={labels}
              command={camera}
              reducedMotion={reducedMotion}
              onSelect={select}
              onReady={onReady}
            />
            <nav className="dw-camera" aria-label="Model camera">
              <button
                title="Zoom in"
                aria-label="Zoom in"
                onClick={() => cameraAction("in")}
              >
                <Icon name="plus" />
              </button>
              <button
                title="Zoom out"
                aria-label="Zoom out"
                onClick={() => cameraAction("out")}
              >
                <Icon name="minus" />
              </button>
              <span />
              <button
                title="Rotate left"
                aria-label="Rotate left"
                onClick={() => cameraAction("left")}
              >
                <Icon name="left" />
              </button>
              <button
                title="Rotate right"
                aria-label="Rotate right"
                onClick={() => cameraAction("right")}
              >
                <Icon name="right" />
              </button>
              <button
                title="View from above"
                aria-label="View from above"
                onClick={() => cameraAction("top")}
              >
                <Icon name="top" />
              </button>
              <button
                title="Reset camera"
                aria-label="Reset camera"
                onClick={() => cameraAction("home")}
              >
                <Icon name="reset" />
              </button>
            </nav>
            {state.isolated && part && (
              <button
                className="dw-return-model"
                onClick={() => change({ isolated: false })}
              >
                ← Return to the dwelling
              </button>
            )}
            <div className="dw-stage-footer">
              <span>Drag to orbit · Pinch to zoom</span>
              <span>Illustrative proportions</span>
            </div>
          </div>
          <div className="dw-assembly-controls">
            <div className="dw-range-heading">
              <label htmlFor="dw-separation">
                <Icon name="layers" /> Unfold the dwelling
              </label>
              <output htmlFor="dw-separation">
                {Math.round(state.separation)}
                <small>%</small>
              </output>
            </div>
            <input
              id="dw-separation"
              type="range"
              min="0"
              max="100"
              step="1"
              value={state.separation}
              aria-valuetext={`${Math.round(state.separation)} percent separated`}
              onChange={(event) =>
                change({
                  separation: Number(event.target.value),
                  isolated: false,
                })
              }
              style={
                { "--range-progress": `${state.separation}%` } as CSSProperties
              }
            />
            <div className="dw-range-labels">
              <button
                onClick={() =>
                  change({ separation: 0, isolated: false, part: null })
                }
              >
                Assembled
              </button>
              <button
                onClick={() =>
                  change({ separation: 100, isolated: false, part: null })
                }
              >
                Separated
              </button>
            </div>
            <div className="dw-secondary-controls">
              <button
                onClick={() => change({ isolated: !state.isolated })}
                disabled={!part}
                aria-pressed={state.isolated}
              >
                <Icon name="focus" />
                {state.isolated ? "Show the whole" : "Isolate part"}
              </button>
              <button
                onClick={() => setLabels((value) => !value)}
                aria-pressed={labels}
              >
                <span className="dw-toggle" />
                Labels
              </button>
              <button
                onClick={() => {
                  change(INITIAL_STATE);
                  setLabels(false);
                  cameraAction("home");
                }}
              >
                <Icon name="reset" />
                Reset
              </button>
            </div>
          </div>
        </section>

        <aside className="dw-inspector" aria-label="Selected component details">
          {part ? (
            <>
              <div className="dw-panel-heading">
                <span className="dw-eyebrow">A closer look</span>
                <button
                  aria-label="Close component details"
                  onClick={() => change({ part: null, isolated: false })}
                >
                  <Icon name="close" size={16} />
                </button>
              </div>
              <div className="dw-inspector-title">
                <span
                  className="dw-material-dot"
                  style={{ background: part.color }}
                />
                <span>{part.subtitle}</span>
                <h2>{part.name}</h2>
              </div>
              <nav
                className="dw-lenses"
                aria-label="Ways to study this component"
              >
                {(
                  [
                    ["object", "The object"],
                    ["passage", "The text"],
                    ["connections", "Connections"],
                  ] as [Lens, string][]
                ).map(([id, label]) => (
                  <button
                    key={id}
                    aria-pressed={state.lens === id}
                    onClick={() => change({ lens: id })}
                  >
                    {label}
                  </button>
                ))}
              </nav>
              <div
                className="dw-inspector-content"
                key={`${part.id}-${state.lens}`}
              >
                {state.lens === "object" && (
                  <>
                    <p className="dw-description">{part.description}</p>
                    <div className="dw-material">
                      <span className="dw-eyebrow">Materials</span>
                      <p>{part.material}</p>
                    </div>
                    <button
                      className="dw-inspector-link"
                      onClick={() => change({ lens: "passage" })}
                    >
                      Read {part.reference} <span>→</span>
                    </button>
                    <button
                      className="dw-inspector-link"
                      onClick={() => change({ lens: "connections" })}
                    >
                      Follow the connections <span>→</span>
                    </button>
                    <details className="dw-model-note">
                      <summary>How this part is represented</summary>
                      <p>{part.modelNote}</p>
                    </details>
                  </>
                )}
                {state.lens === "passage" && (
                  <>
                    <span className="dw-eyebrow">{part.reference}</span>
                    <blockquote>“{part.excerpt}”</blockquote>
                    <span className="dw-translation">
                      Excerpt · Berean Standard Bible
                    </span>
                    <p className="dw-description">{part.description}</p>
                    <Link className="dw-inspector-link" href={part.passage}>
                      Open the full chapter <span>↗</span>
                    </Link>
                    <button
                      className="dw-inspector-link"
                      onClick={() => change({ lens: "connections" })}
                    >
                      Where does the imagery lead? <span>→</span>
                    </button>
                  </>
                )}
                {state.lens === "connections" && (
                  <>
                    <p className="dw-connection-intro">
                      Keep the object in view. Follow the thread into another
                      passage or an ancient reading.
                    </p>
                    {part.connections.map((connection) => (
                      <article className="dw-connection" key={connection.title}>
                        <span className="dw-connection-kind">
                          {connection.kind}
                        </span>
                        <h3>{connection.title}</h3>
                        <span className="dw-connection-reference">
                          {connection.reference}
                        </span>
                        <p>{connection.text}</p>
                        {connection.href.startsWith("https://") ? (
                          <a
                            href={connection.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Read the source ↗
                          </a>
                        ) : (
                          <Link href={connection.href}>Read the passage ↗</Link>
                        )}
                      </article>
                    ))}
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="dw-panel-heading">
                <span className="dw-eyebrow">An invitation to explore</span>
                <span className="dw-small-star" aria-hidden="true">
                  ✧
                </span>
              </div>
              <div className="dw-introduction">
                <div className="dw-line-art" aria-hidden="true">
                  <svg viewBox="0 0 200 120" fill="none">
                    <path d="M20 95C20 25 180 25 180 95M45 95C45 25 155 25 155 95M77 95C77 25 123 25 123 95M20 95h160M28 81h144" />
                    <ellipse cx="100" cy="94" rx="80" ry="13" />
                    <path d="M100 21v-9m-4 4h8" />
                  </svg>
                </div>
                <h2>
                  Every layer
                  <br />
                  <em>has a story.</em>
                </h2>
                <p>
                  Start with the whole. Lift the covering. Bring one detail
                  closer, then let the text take you further.
                </p>
                <div className="dw-start-points">
                  <button onClick={() => select("covering")}>
                    <span>01</span> Lift the covering <b>→</b>
                  </button>
                  <button onClick={() => select("veil")}>
                    <span>04</span> Pause at the veil <b>→</b>
                  </button>
                  <button
                    onClick={() => {
                      change({
                        part: "lampstand",
                        separation: 80,
                        isolated: true,
                        lens: "connections",
                      });
                    }}
                  >
                    <span>06</span> Follow the light <b>→</b>
                  </button>
                </div>
                <p className="dw-intro-note">
                  Inspired by Andrew Hoy’s circular proposal. This study
                  explores a minority reconstruction and identifies its
                  interpretive choices.
                </p>
              </div>
            </>
          )}
        </aside>
      </div>

      <section
        className={`dw-story ${tourActive ? "is-active" : ""}`}
        aria-label="Guided reveal"
      >
        <div className="dw-story-controls">
          <button
            className="dw-story-play"
            aria-label={
              isPlaying
                ? "Pause the reveal"
                : finished || (reducedMotion && tourActive && step === 4)
                  ? "Replay the reveal"
                  : tourActive
                    ? "Continue the reveal"
                    : "Start the reveal"
            }
            onClick={() => {
              if (!tourActive || finished || (reducedMotion && step === 4))
                startTour();
              else if (reducedMotion) stepTour(step + 1);
              else setPlaying((value) => !value);
            }}
            disabled={!ready}
          >
            <Icon name={isPlaying ? "pause" : "play"} size={20} />
          </button>
          <div>
            <span className="dw-eyebrow">
              {tourActive ? `Moment ${step + 1} of 5` : "A guided discovery"}
            </span>
            <strong>
              {tourActive
                ? TOUR[step].title
                : "From the whole to one meaningful detail"}
            </strong>
          </div>
        </div>
        <div className="dw-story-middle">
          <p aria-live="polite">
            {tourActive
              ? TOUR[step].text
              : "Five moments through the dwelling. Pause whenever something catches your attention."}
          </p>
          <div className="dw-story-steps">
            {TOUR.map((moment, i) => (
              <button
                key={moment.title}
                title={moment.title}
                aria-label={`Go to moment ${i + 1}: ${moment.title}`}
                aria-current={tourActive && step === i ? "step" : undefined}
                onClick={() => stepTour(i)}
              >
                <span
                  style={{
                    width: `${tourActive ? Math.max(0, Math.min(100, ((tourTime - i * 15) / 15) * 100)) : 0}%`,
                  }}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="dw-story-navigation">
          <button
            aria-label="Previous moment"
            disabled={!tourActive || step === 0}
            onClick={() => stepTour(step - 1)}
          >
            <Icon name="left" />
          </button>
          <span>
            {reducedMotion ? (
              `${tourActive ? step + 1 : 0} / 5 moments`
            ) : (
              <>
                {tourActive
                  ? `${String(Math.floor(tourTime / 60)).padStart(2, "0")}:${String(Math.floor(tourTime % 60)).padStart(2, "0")}`
                  : "00:00"}{" "}
                / 01:15
              </>
            )}
          </span>
          <button
            aria-label="Next moment"
            disabled={tourActive && step === 4}
            onClick={() => stepTour(tourActive ? step + 1 : 0)}
          >
            <Icon name="right" />
          </button>
        </div>
      </section>

      <section className="dw-reading-entries" aria-label="Begin with the text">
        <div>
          <span className="dw-eyebrow">Prefer to start reading?</span>
          <h2>Let a passage open the model.</h2>
        </div>
        <div className="dw-passage-buttons">
          {[
            { label: "Exodus 25", detail: "The furnishings", part: "ark" },
            { label: "Exodus 26", detail: "The veil", part: "veil" },
            { label: "Exodus 30", detail: "Water & incense", part: "basin" },
          ].map((entry) => (
            <button
              key={entry.label}
              onClick={() => {
                change({
                  part: entry.part as PartId,
                  separation: 80,
                  isolated: true,
                  lens: "passage",
                });
                document.querySelector(".dw-workbench")?.scrollIntoView({
                  behavior: reducedMotion ? "instant" : "smooth",
                  block: "start",
                });
              }}
            >
              <strong>{entry.label}</strong>
              <span>{entry.detail} ↗</span>
            </button>
          ))}
        </div>
      </section>
      <footer className="dw-study-footer">
        <p>
          Original 3D study · Sources available throughout · Geometry remains
          schematic
        </p>
        <button onClick={shareView}>
          <Icon name="share" size={16} />
          Keep this view
        </button>
        <button
          aria-pressed={reducedMotion}
          disabled={deviceReducedMotion}
          title={
            deviceReducedMotion
              ? "Reduced motion follows your device preference"
              : "Use immediate transitions and advance the story yourself"
          }
          onClick={() => setMotionOff((value) => !value)}
        >
          <span className="dw-toggle" />
          Reduce motion
        </button>
        <span className="dw-share-message" role="status">
          {shareMessage}
        </span>
        {shareFallback && (
          <input
            aria-label="Link to this view"
            readOnly
            value={shareFallback}
            onFocus={(event) => event.target.select()}
          />
        )}
      </footer>

      <dialog
        ref={about}
        className="dw-about"
        aria-labelledby="dw-about-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) about.current?.close();
        }}
      >
        <div>
          <button
            className="dw-about-close"
            aria-label="Close sources and notes"
            onClick={() => about.current?.close()}
          >
            <Icon name="close" />
          </button>
          <span className="dw-eyebrow">About this study</span>
          <h2 id="dw-about-title">A model you can question.</h2>
          <p>
            This is an original, illustrative model inspired by Andrew Hoy’s
            circular Tabernacle proposal. It is a minority reconstruction, not
            an archaeologically established plan.
          </p>
          <p>
            Exodus provides the textual starting point. Hoy’s interview,
            illustrated article and public book preview inform the broad
            circular arrangement. Detailed ribs, joints, roof dimensions and
            internal locations remain unresolved. The model’s proportions,
            decoration and separation paths make the study readable; they aren’t
            a verified construction sequence.
          </p>
          <h3>Follow the sources</h3>
          <ul>
            <li>
              <Link href="/bible/exodus/26">
                Exodus 26: curtains, frames and veil
              </Link>
            </li>
            <li>
              <a
                href="https://www.ancient-hebrew.org/biblical-history/the-tabernacle-an-ancient-journey-with-the-ancient-hebrew-language.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Andrew Hoy’s illustrated explanation ↗
              </a>
            </li>
            <li>
              <a
                href="https://www.project314.org/images/product/90/el-shaddai-hardcover-isbn-978-0-9911166-8-3-preferred-interior-look-inside-sample-section.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                The House of El Shaddai: public book preview ↗
              </a>
            </li>
            <li>
              <a
                href="https://penelope.uchicago.edu/josephus/ant-3.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Josephus, Antiquities III: an ancient cosmic reading ↗
              </a>
            </li>
          </ul>
          <p className="dw-about-small">
            Biblical descriptions, visual reconstruction choices and later
            interpretations are identified separately in each component’s notes.
            Josephus’s cosmic reading doesn’t establish a circular sanctuary.
          </p>
          <button className="dw-primary" onClick={() => about.current?.close()}>
            Return to the dwelling
          </button>
        </div>
      </dialog>
    </main>
  );
}
