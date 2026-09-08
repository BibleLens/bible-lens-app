"use client";

import { useEffect, useRef, useState } from "react";
import films from "@/data/temples/films.json";
import type { TempleId } from "@/data/temples/types";

export function filmTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

export function TempleFilm({ id }: { id: TempleId }) {
  const film = films[id];
  const video = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLTrackElement>(null);
  const [time, setTime] = useState(0);
  const [captions, setCaptions] = useState(false);
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);

  const cue = film.captions.find((item) => time >= item.start && time < item.end);
  useEffect(() => {
    const player = video.current;
    const fullscreen = () => {
      if (track.current) track.current.track.mode = captions ? "showing" : "disabled";
    };
    const inline = () => {
      if (track.current) track.current.track.mode = "disabled";
    };
    player?.addEventListener("webkitbeginfullscreen", fullscreen);
    player?.addEventListener("webkitendfullscreen", inline);
    return () => {
      player?.removeEventListener("webkitbeginfullscreen", fullscreen);
      player?.removeEventListener("webkitendfullscreen", inline);
    };
  }, [captions]);

  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (frame.current?.requestFullscreen) await frame.current.requestFullscreen();
      else {
        const player = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
        player?.webkitEnterFullscreen?.();
      }
    } catch {
      setError("Fullscreen isn’t available here. You can keep watching in the page.");
    }
  }

  async function play(from?: number) {
    const player = video.current;
    if (!player) return;
    setError("");
    if (from !== undefined) player.currentTime = from;
    try {
      await player.play();
    } catch {
      setError("Use the video’s play control to start, or read the transcript below.");
    }
  }

  return (
    <section className="tf-film" aria-labelledby="tf-title">
      <div className="tf-player" ref={frame}>
        <video
          ref={video}
          controls
          controlsList="nofullscreen"
          playsInline
          preload="none"
          poster={film.poster}
          width={1280}
          height={720}
          aria-label={film.title}
          aria-describedby="tf-note"
          onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
          onPlay={() => setStarted(true)}
          onError={() => setError("The film couldn’t load. Try again, or read the transcript below.")}
        >
          <source src={film.src} type="video/mp4" />
          <track ref={track} kind="captions" srcLang="en" label="English" src={film.captionsSrc} />
          Your browser cannot play this film. The full transcript is below.
        </video>
        {captions && cue && <div className="tf-captions"><span>{cue.text}</span></div>}
        <button className="tf-fullscreen" aria-label="Toggle film fullscreen" onClick={fullscreen}>⛶</button>
        {!started && <button className="tf-play" onClick={() => play()} aria-label={`Play ${film.title}`}><span aria-hidden="true">▶</span> Watch the film <small>{filmTime(film.duration)}</small></button>}
      </div>
      <div className="tf-film-bar">
        <div><span className="dw-eyebrow">A short journey · {filmTime(film.duration)}</span><h2 id="tf-title">{film.title.split(": ")[1]}</h2></div>
        <button className="tf-caption-button" aria-pressed={captions} onClick={() => setCaptions(!captions)}>English captions {captions ? "on" : "off"}</button>
      </div>
      {error && <p className="tf-error" role="status">{error} <a href={film.src}>Open the film directly</a>.</p>}
      <p id="tf-note" className="tf-note">An artistic reconstruction guided by ancient texts. The images interpret details the sources leave open{id === "ezekiel" ? "; this study pictures Ezekiel’s vision, rather than a surviving or completed building" : ""}.</p>
      <nav className="tf-chapters" aria-label="Film chapters">
        {film.chapters.map((chapter) => <button key={chapter.start} onClick={() => play(chapter.start)} aria-current={started && time >= chapter.start && time < chapter.end ? "step" : undefined}><span>{filmTime(chapter.start)}</span>{" "}{chapter.title}</button>)}
      </nav>
      <div className="tf-reading">
        <details><summary>Read the narration</summary><div className="tf-transcript">{film.chapters.map((chapter) => <section key={chapter.start}><h3>{chapter.title}</h3><p>{chapter.text}</p><small>{chapter.passage}</small></section>)}</div></details>
        <details><summary>Sources & film credits</summary><div className="tf-sources"><ul>{film.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.passage} ↗</a><p>{source.label}</p></li>)}</ul><p>Created by Bible Lens, with AI-assisted reconstructions and narration.</p><p>Music: <a href="https://artlist.io/royalty-free-music/song/strings-and-textures/6517" target="_blank" rel="noopener noreferrer">Strings and Textures — Skygaze</a>.</p><a href={film.captionsSrc} download={`${id}-english.vtt`}>Download English captions</a></div></details>
      </div>
    </section>
  );
}
