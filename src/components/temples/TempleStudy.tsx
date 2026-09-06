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
import { TEMPLE_IDS, TEMPLE_STUDIES } from "@/data/temples/studies";
import type {
  Source,
  TempleId,
  TempleLens,
  TempleView,
} from "@/data/temples/types";
import {
  INITIAL_TEMPLE_VIEW,
  parseTempleView,
  templeHref,
} from "@/lib/temples/state";
import type { CameraCommand } from "./TempleScene";

const Scene = dynamic(() => import("./TempleScene"), {
  ssr: false,
  loading: () => <div className="dw-preparing">Preparing the sanctuary…</div>,
});
const subscribeMotion = (callback: () => void) => {
  const q = window.matchMedia("(prefers-reduced-motion: reduce)");
  q.addEventListener("change", callback);
  return () => q.removeEventListener("change", callback);
};
const getMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const SECONDS_PER_MOMENT = 15;

function Symbol({
  name,
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
    | "in"
    | "out";
}) {
  const paths = {
    play: "M8 5l11 7-11 7V5Z",
    pause: "M8 5v14M16 5v14",
    layers: "m3 7 9-4 9 4-9 4-9-4Zm0 5 9 4 9-4M3 17l9 4 9-4",
    reset: "M4 10a8 8 0 1 1 1 8M4 4v6h6",
    focus: "M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5M9 9h6v6H9Z",
    share: "M12 16V3m-4 4 4-4 4 4M5 12v8h14v-8",
    close: "m6 6 12 12M6 18 18 6",
    top: "m3 8 9-5 9 5-9 5-9-5Zm0 0v8l9 5 9-5V8M12 13v8",
    left: "m14 5-7 7 7 7",
    right: "m10 5 7 7-7 7",
    in: "M12 5v14M5 12h14",
    out: "M5 12h14",
  };
  return (
    <svg
      width="18"
      height="18"
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
function SourceLink({
  source,
  children,
}: {
  source: Source;
  children?: React.ReactNode;
}) {
  return source.href.startsWith("https://") ? (
    <a href={source.href} target="_blank" rel="noopener noreferrer">
      {children || source.title} ↗
    </a>
  ) : (
    <Link href={source.href}>{children || source.title} →</Link>
  );
}

export function TempleStudyClient({ id }: { id: TempleId }) {
  const study = TEMPLE_STUDIES[id],
    params = useSearchParams();
  const manual = useMemo(() => parseTempleView(id, params), [id, params]);
  const [labels, setLabels] = useState(false),
    [measurements, setMeasurements] = useState(true);
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
  const [motionOff, setMotionOff] = useState(false);
  const deviceReducedMotion = useSyncExternalStore(
    subscribeMotion,
    getMotion,
    () => false,
  );
  const reducedMotion = deviceReducedMotion || motionOff;
  const about = useRef<HTMLDialogElement>(null);
  const duration = study.tour.length * SECONDS_PER_MOMENT;
  const step = Math.min(
    study.tour.length - 1,
    Math.floor(tourTime / SECONDS_PER_MOMENT),
  );
  const finished = tourTime >= duration;
  const state = tourActive ? study.tour[step].view : manual;
  const part = study.parts.find((p) => p.id === state.part);
  const isPlaying = tourActive && playing && !finished && !reducedMotion;
  const onReady = useCallback(() => setReady(true), []);
  useEffect(() => {
    if (!isPlaying) return;
    let last = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now(),
        delta = (now - last) / 1000;
      last = now;
      setTourTime((t) => Math.min(duration, t + delta));
    }, 100);
    return () => window.clearInterval(timer);
  }, [isPlaying, duration]);
  useEffect(() => {
    const pause = () => {
      if (document.hidden) setPlaying(false);
    };
    const back = () => {
      setTourActive(false);
      setPlaying(false);
    };
    document.addEventListener("visibilitychange", pause);
    window.addEventListener("popstate", back);
    return () => {
      document.removeEventListener("visibilitychange", pause);
      window.removeEventListener("popstate", back);
    };
  }, []);
  const change = useCallback(
    (patch: Partial<TempleView>) => {
      const current = tourActive
        ? state
        : parseTempleView(id, new URLSearchParams(window.location.search));
      const next = { ...current, ...patch };
      if (!next.part) next.isolated = false;
      setTourActive(false);
      setPlaying(false);
      setShareMessage("");
      setShareFallback("");
      window.history.replaceState(null, "", templeHref(id, next));
    },
    [id, state, tourActive],
  );
  const select = useCallback(
    (partId: string) => {
      const next = study.parts.find((p) => p.id === partId);
      if (!next) return;
      change({
        part: partId,
        cutaway:
          partId === "roof" ? false : next.interior ? true : state.cutaway,
      });
    },
    [study, change, state.cutaway],
  );
  const cameraAction = (action: CameraCommand["action"]) =>
    setCamera((c) => ({ action, sequence: c.sequence + 1 }));
  function startTour() {
    setTourTime(0);
    setTourActive(true);
    setPlaying(!reducedMotion);
    cameraAction("home");
  }
  function stepTour(n: number) {
    setTourTime(
      Math.max(0, Math.min(study.tour.length - 1, n)) * SECONDS_PER_MOMENT,
    );
    setTourActive(true);
    setPlaying(false);
  }
  function playPause() {
    if (
      !tourActive ||
      finished ||
      (reducedMotion && step === study.tour.length - 1)
    )
      startTour();
    else if (reducedMotion) stepTour(step + 1);
    else setPlaying((p) => !p);
  }
  async function share() {
    const current = tourActive
      ? state
      : parseTempleView(id, new URLSearchParams(window.location.search));
    const url = new URL(templeHref(id, current), window.location.origin).href;
    try {
      await navigator.clipboard.writeText(url);
      setShareMessage(
        "Link copied. It opens this temple, selection and reading view.",
      );
    } catch {
      setShareFallback(url);
      setShareMessage("Copy this link to keep your place.");
    }
  }
  return (
    <main id="main-content" className={`dw-study tp-study tp-${id}`}>
      <nav className="tp-collection-nav" aria-label="Sacred spaces">
        <Link href="/explore/tabernacle">The Tabernacle</Link>
        <span aria-hidden="true">/</span>
        {TEMPLE_IDS.map((templeId, i) => (
          <Link
            key={templeId}
            href={templeHref(templeId)}
            aria-current={id === templeId ? "page" : undefined}
          >
            <small>0{i + 1}</small>
            {TEMPLE_STUDIES[templeId].name}
          </Link>
        ))}
        <Link className="tp-compare-link" href="/explore/temples">
          Compare the studies ↗
        </Link>
      </nav>
      <header className="dw-heading">
        <div>
          <nav className="dw-breadcrumb" aria-label="Breadcrumb">
            <Link href="/explore">The Explorer</Link>
            <span aria-hidden="true">/</span>
            <span>{study.name}</span>
          </nav>
          <div className="dw-title-row">
            <h1>
              {study.title} <em>{study.emphasis}</em>
            </h1>
          </div>
          <p>{study.introduction}</p>
        </div>
        <div className="dw-heading-actions">
          <button
            className="dw-study-note"
            onClick={() => about.current?.showModal()}
          >
            <span />
            {study.status}
            <span aria-hidden="true">↗</span>
          </button>
          <button className="dw-primary" onClick={startTour} disabled={!ready}>
            <Symbol name="play" />
            {reducedMotion
              ? "Step through the story"
              : "Take the guided journey"}
            <small>{reducedMotion ? "6 moments" : "90 seconds"}</small>
          </button>
        </div>
      </header>
      <div className="dw-workbench">
        <aside className="dw-parts" aria-label={`${study.name} components`}>
          <div className="dw-panel-heading">
            <span className="dw-eyebrow">Explore the spaces</span>
            <span>{study.parts.length} assemblies</span>
          </div>
          <button
            className={`dw-whole ${!part ? "is-active" : ""}`}
            aria-pressed={!part}
            onClick={() => change({ part: null, isolated: false })}
          >
            <Symbol name="layers" />
            The whole structure
          </button>
          <div className="dw-part-list">
            {study.parts.map((item, index) => (
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
            <span className="dw-eyebrow">Follow your curiosity</span>
            <p>Select a part here, or touch it in the model.</p>
            <button
              className="dw-text-button"
              onClick={() => about.current?.showModal()}
            >
              Sources & reconstruction notes ↗
            </button>
          </div>
        </aside>
        <section className="dw-stage" aria-label={`Interactive ${study.name}`}>
          <div className="dw-viewport">
            <div className="dw-stage-caption">
              <span className="dw-eyebrow">{study.name}</span>
              <span>
                {state.isolated
                  ? "Inspecting one assembly"
                  : state.cutaway
                    ? "Interior opened"
                    : study.status}
              </span>
            </div>
            <Scene
              key={id}
              id={id}
              state={state}
              labels={labels}
              command={camera}
              reducedMotion={reducedMotion}
              onSelect={select}
              onReady={onReady}
            />
            <nav className="dw-camera" aria-label="Model camera">
              {(
                [
                  ["in", "Zoom in"],
                  ["out", "Zoom out"],
                  ["left", "Rotate left"],
                  ["right", "Rotate right"],
                  ["top", "View from above"],
                  ["home", "Reset camera"],
                  ["focus", "Look closer at selection"],
                ] as [CameraCommand["action"], string][]
              ).map(([action, title]) => (
                <button
                  key={action}
                  title={title}
                  aria-label={title}
                  disabled={action === "focus" && !part}
                  onClick={() => cameraAction(action)}
                >
                  <Symbol name={action === "home" ? "reset" : action} />
                </button>
              ))}
            </nav>
            {state.isolated && part && (
              <button
                className="dw-return-model"
                onClick={() => change({ isolated: false })}
              >
                ← Return to the whole
              </button>
            )}
            {measurements && part?.measurement && (
              <div className="tp-measurement">
                <span>{part.measurement}</span>
                <small>Selected source measurements</small>
              </div>
            )}
            <div className="dw-stage-footer">
              <span>Drag to orbit · Pinch to zoom</span>
              <span>
                {id === "ezekiel"
                  ? "River distance compressed"
                  : "Entrance faces east"}
              </span>
            </div>
          </div>
          <div className="tp-open-controls">
            <button
              aria-pressed={state.cutaway}
              onClick={() =>
                change({
                  cutaway: !state.cutaway,
                  isolated: false,
                  part: state.part === "roof" ? null : state.part,
                })
              }
            >
              <Symbol name="layers" />
              {state.cutaway ? "Close the interior" : "Open the interior"}
            </button>
            <button
              aria-pressed={measurements}
              onClick={() => setMeasurements((v) => !v)}
            >
              <span className="dw-toggle" />
              Measurements
            </button>
          </div>
          <div className="dw-assembly-controls">
            <div className="dw-range-heading">
              <label htmlFor="tp-separation">
                <Symbol name="layers" />
                Separate the assemblies
              </label>
              <output htmlFor="tp-separation">
                {Math.round(state.separation)}
                <small>%</small>
              </output>
            </div>
            <input
              id="tp-separation"
              type="range"
              min="0"
              max="100"
              step="1"
              value={state.separation}
              aria-valuetext={`${Math.round(state.separation)} percent separated`}
              onChange={(e) =>
                change({
                  separation: Number(e.target.value),
                  isolated: false,
                  cutaway: false,
                })
              }
              style={
                { "--range-progress": `${state.separation}%` } as CSSProperties
              }
            />
            <div className="dw-range-labels">
              <button
                onClick={() => change({ separation: 0, isolated: false })}
              >
                Assembled
              </button>
              <button
                onClick={() =>
                  change({ separation: 100, isolated: false, cutaway: false })
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
                <Symbol name="focus" />
                {state.isolated ? "Show the whole" : "Isolate part"}
              </button>
              <button
                onClick={() => setLabels((v) => !v)}
                aria-pressed={labels}
              >
                <span className="dw-toggle" />
                Labels
              </button>
              <button
                onClick={() => {
                  change(INITIAL_TEMPLE_VIEW);
                  setLabels(false);
                  cameraAction("home");
                }}
              >
                <Symbol name="reset" />
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
                  <Symbol name="close" />
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
                    ["sources", "The sources"],
                    ["connections", "Connections"],
                  ] as [TempleLens, string][]
                ).map(([lens, label]) => (
                  <button
                    key={lens}
                    aria-pressed={state.lens === lens}
                    onClick={() => change({ lens })}
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
                    {part.measurement && (
                      <div className="tp-detail-measure">
                        <span className="dw-eyebrow">
                          Dimensions from the selected source
                        </span>
                        <p>{part.measurement}</p>
                      </div>
                    )}
                    <div className="dw-material">
                      <span className="dw-eyebrow">Materials</span>
                      <p>{part.material}</p>
                    </div>
                    <button
                      className="dw-inspector-link"
                      onClick={() => change({ lens: "sources" })}
                    >
                      Read the sources <span>→</span>
                    </button>
                    <button
                      className="dw-inspector-link"
                      onClick={() => change({ lens: "connections" })}
                    >
                      Follow the connections <span>→</span>
                    </button>
                    <details className="dw-model-note">
                      <summary>How this part is represented</summary>
                      <p>{part.note}</p>
                    </details>
                  </>
                )}
                {state.lens === "sources" && (
                  <>
                    <p className="dw-connection-intro">
                      Start with these passages and source accounts, then
                      compare the choices made in the model.
                    </p>
                    {part.sources.map((source) => (
                      <article className="tp-source" key={source.title}>
                        <h3>
                          <SourceLink source={source} />
                        </h3>
                        <p>{source.note}</p>
                      </article>
                    ))}
                    <details className="dw-model-note" open>
                      <summary>Reconstruction choices</summary>
                      <p>{part.note}</p>
                    </details>
                  </>
                )}
                {state.lens === "connections" && (
                  <>
                    <p className="dw-connection-intro">
                      Keep the space in mind as you follow the reading.
                    </p>
                    {part.connections.map((connection) => (
                      <article className="dw-connection" key={connection.title}>
                        <span className="dw-connection-kind">
                          {connection.kind}
                        </span>
                        <h3>{connection.title}</h3>
                        <p>{connection.note}</p>
                        <SourceLink source={connection}>
                          Follow this connection
                        </SourceLink>
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
                <div className="dw-line-art tp-line-art" aria-hidden="true">
                  <svg viewBox="0 0 200 120" fill="none">
                    <path d="M26 102h148M37 96V52l63-32 63 32v44M55 94V58l45-21 45 21v36M77 96V67h46v29M93 96V72h14v24M37 52l63 26 63-26M100 20v17M26 102v7h148v-7" />
                  </svg>
                </div>
                <h2>
                  Step into
                  <br />
                  <em>the story.</em>
                </h2>
                <p>{study.overview}</p>
                <div className="dw-start-points">
                  {study.starts.map((start, i) => (
                    <button key={start.part} onClick={() => select(start.part)}>
                      <span>0{i + 1}</span>
                      {start.title}
                      <b>→</b>
                    </button>
                  ))}
                </div>
                <p className="dw-intro-note">
                  {study.unit}. Each study has its own scale and source choices.
                </p>
              </div>
            </>
          )}
        </aside>
      </div>
      <section
        className={`dw-story ${tourActive ? "is-active" : ""}`}
        aria-label="Guided journey"
      >
        <div className="dw-story-controls">
          <button
            className="dw-story-play"
            aria-label={
              isPlaying
                ? "Pause the journey"
                : finished
                  ? "Replay the journey"
                  : tourActive
                    ? "Continue the journey"
                    : "Start the journey"
            }
            onClick={playPause}
            disabled={!ready}
          >
            <Symbol name={isPlaying ? "pause" : "play"} />
          </button>
          <div>
            <span className="dw-eyebrow">
              {tourActive
                ? `Moment ${step + 1} of ${study.tour.length}`
                : "A guided discovery"}
            </span>
            <strong>
              {tourActive
                ? study.tour[step].title
                : "Six moments through the sanctuary"}
            </strong>
          </div>
        </div>
        <div className="dw-story-middle">
          <p aria-live="polite">
            {tourActive
              ? study.tour[step].text
              : "Take the journey, or choose a moment. You can pause and explore at any point."}
          </p>
          <div className="dw-story-steps">
            {study.tour.map((m, i) => (
              <button
                key={m.title}
                aria-label={`Go to moment ${i + 1}: ${m.title}`}
                title={m.title}
                aria-current={tourActive && step === i ? "step" : undefined}
                onClick={() => stepTour(i)}
              >
                <span
                  style={{
                    width: `${tourActive ? Math.max(0, Math.min(100, ((tourTime - i * SECONDS_PER_MOMENT) / SECONDS_PER_MOMENT) * 100)) : 0}%`,
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
            <Symbol name="left" />
          </button>
          <span>
            {reducedMotion
              ? `${tourActive ? step + 1 : 0} / 6 moments`
              : `${String(Math.floor(tourTime / 60)).padStart(2, "0")}:${String(Math.floor(tourTime % 60)).padStart(2, "0")} / 01:30`}
          </span>
          <button
            aria-label="Next moment"
            disabled={tourActive && step === study.tour.length - 1}
            onClick={() => stepTour(tourActive ? step + 1 : 0)}
          >
            <Symbol name="right" />
          </button>
        </div>
      </section>
      <section
        className="tp-next-studies"
        aria-label="Continue through the collection"
      >
        <div>
          <span className="dw-eyebrow">Three studies, three questions</span>
          <h2>Keep exploring the sanctuary story.</h2>
        </div>
        {TEMPLE_IDS.filter((t) => t !== id).map((t) => (
          <Link key={t} href={templeHref(t)}>
            <span>{TEMPLE_STUDIES[t].name}</span>
            <strong>
              {TEMPLE_STUDIES[t].title} {TEMPLE_STUDIES[t].emphasis} ↗
            </strong>
          </Link>
        ))}
      </section>
      <footer className="dw-study-footer">
        <p>
          Original 3D reconstructions · Sources and model choices available
          throughout
        </p>
        <button onClick={() => about.current?.showModal()}>
          Sources & notes ↗
        </button>
        <button onClick={share}>
          <Symbol name="share" />
          Keep this view
        </button>
        <button
          aria-pressed={reducedMotion}
          disabled={deviceReducedMotion}
          title={
            deviceReducedMotion
              ? "Follows your device preference"
              : "Use immediate transitions and advance the story yourself"
          }
          onClick={() => {
            setPlaying(false);
            setMotionOff((v) => !v);
          }}
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
            onFocus={(e) => e.target.select()}
          />
        )}
      </footer>
      <dialog
        ref={about}
        className="dw-about"
        aria-labelledby="tp-about-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) about.current?.close();
        }}
      >
        <div>
          <button
            className="dw-about-close"
            aria-label="Close sources and notes"
            onClick={() => about.current?.close()}
          >
            <Symbol name="close" />
          </button>
          <span className="dw-eyebrow">{study.name}</span>
          <h2 id="tp-about-title">Read the model alongside its sources.</h2>
          {study.reconstruction.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h3>Principal sources</h3>
          <ul>
            {Array.from(
              new Map(
                study.parts.flatMap((p) => p.sources).map((s) => [s.href, s]),
              ).values(),
            ).map((s) => (
              <li key={s.href}>
                <SourceLink source={s} />
              </li>
            ))}
          </ul>
          <p className="dw-about-small">
            Open a component’s Sources panel for its measurements and notes. The
            guided journey is an interactive sequence; it has no recorded
            narration.
          </p>
          <button className="dw-primary" onClick={() => about.current?.close()}>
            Return to the model
          </button>
        </div>
      </dialog>
    </main>
  );
}
