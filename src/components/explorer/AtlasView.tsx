"use client";

import { useState } from "react";
import {
  absoluteRange,
  dateFor,
  geography,
  locationDescription,
  mapContext,
  shortName,
  study,
  subjectById,
} from "@/lib/explorer/data";
import type { StudyState } from "@/lib/explorer/state";

export function StudyTimeline({
  state,
  select,
  compare,
}: {
  state: StudyState;
  select: (id: string) => void;
  compare: () => void;
}) {
  const percent = (year: number) => ((year + 6) / 13) * 100;
  return (
    <section className="timeline-strip" aria-label="Dates in context">
      <div className="eyebrow">
        <span>Dates in context</span>
        <button onClick={compare}>Compare proposals ⇄</button>
      </div>
      <div className="date-scale">
        {[
          [-6, "7 BC"],
          [-4, "5 BC"],
          [-2, "3 BC"],
          [0, "1 BC"],
          [1, "AD 1"],
          [3, "AD 3"],
          [6, "AD 6"],
        ].map(([year, label]) => (
          <span key={year} style={{ left: `${percent(Number(year))}%` }}>
            {label}
          </span>
        ))}
      </div>
      {["event-jesus-birth", "event-herod-death", "event-census"].map((id) => {
        const date = dateFor(id, state.model),
          range = absoluteRange(date);
        return (
          <div className="timeline-row" key={id}>
            <button className="timeline-caption" onClick={() => select(id)}>
              {id === "event-jesus-birth"
                ? "Jesus’ birth"
                : id === "event-herod-death"
                  ? "Herod’s death"
                  : "Quirinius’ assessment"}
              <small>{date?.label}</small>
            </button>
            <div className="timeline-track">
              {range ? (
                <button
                  className={`timeline-mark ${state.subject === id ? "selected" : ""}`}
                  style={{
                    left: `${percent(range[0])}%`,
                    width: `${Math.max(percent(range[1]) - percent(range[0]), 1)}%`,
                  }}
                  onClick={() => select(id)}
                  aria-label={`Explore ${shortName(id)}: ${date?.label}`}
                />
              ) : (
                <span className="unplaced-date">
                  No absolute year established
                </span>
              )}
            </div>
          </div>
        );
      })}
      <p className="timeline-note">
        No year zero. Changing a proposal updates its dependent dates. The AD 6
        assessment remains a separate event.
      </p>
    </section>
  );
}
export function AtlasView({
  state,
  select,
  compare,
  details,
  mapSources,
}: {
  state: StudyState;
  select: (id: string) => void;
  compare: () => void;
  details: () => void;
  mapSources: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  const context = mapContext(state.subject, state.passage),
    place = context.place;
  const pin = place?.location?.geometry
    ? place
    : place?.location?.contextPlaceId
      ? subjectById.get(place.location.contextPlaceId)
      : undefined;
  const [west, south, east, north] = geography.bbox,
    w = 740,
    h = 630;
  const project = ([lon, lat]: number[]) => [
    ((lon - west) / (east - west)) * w,
    ((north - lat) / (north - south)) * h,
  ];
  const path = (ring: number[][]) =>
    ring
      .map(
        (p, i) =>
          `${i ? "L" : "M"}${project(p)
            .map((v) => v.toFixed(2))
            .join(",")}`,
      )
      .join(" ") + "Z";
  const [cx, cy] =
    zoom > 1 && pin?.location?.geometry
      ? project(pin.location.geometry.coordinates)
      : [w / 2, h / 2];
  const places = study.subjects.filter((s) => s.location?.geometry);
  return (
    <section className="atlas-main" aria-label="Study map">
      <div className="atlas-map">
        <svg
          className="atlas-canvas"
          viewBox="0 0 740 630"
          role="group"
          aria-label="Geography around Bethlehem, Jerusalem and Nazareth"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="maptexture"
              width="19"
              height="19"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="5" cy="5" r=".5" fill="#637d62" opacity=".14" />
            </pattern>
          </defs>
          <rect width="740" height="630" fill="#cfdfeb" />
          <g
            transform={`translate(${w / 2},${h / 2}) scale(${zoom}) translate(${-cx},${-cy})`}
          >
            {geography.land.map((g, i) => (
              <path key={i} className="map-land" d={path(g.ring)} />
            ))}
            <rect width="740" height="630" fill="url(#maptexture)" />
            {geography.lakes.map((g, i) => (
              <path key={i} className="map-lake" d={path(g.ring)} />
            ))}
            {[35, 35.5, 36].map((lon) => (
              <path
                className="map-grid"
                key={lon}
                d={`M${project([lon, 32])[0]},0V630`}
              />
            ))}
            {[31, 31.5, 32, 32.5, 33].map((lat) => (
              <path
                className="map-grid"
                key={lat}
                d={`M0,${project([35, lat])[1]}H740`}
              />
            ))}
            {zoom === 1 && (
              <>
                <text
                  className="map-label water sea-wide"
                  x="20"
                  y="340"
                  transform="rotate(-25 20 340)"
                >
                  Mediterranean Sea
                </text>
                <text
                  className="map-label water sea-narrow"
                  x="140"
                  y="250"
                  transform="rotate(-65 140 250)"
                >
                  Mediterranean Sea
                </text>
              </>
            )}
            <text className="map-label" x="465" y="94">
              GALILEE
            </text>
            <text className="map-label" x="443" y="350">
              JUDAEA
            </text>
            {places.map((p) => {
              const [x, y] = project(p.location!.geometry!.coordinates),
                selected = p.id === pin?.id;
              return (
                <g
                  key={p.id}
                  className={`map-marker ${selected ? "selected" : ""}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Explore ${p.label} on the map`}
                  onClick={() => select(p.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      select(p.id);
                    }
                  }}
                >
                  <circle
                    className="halo"
                    cx={x}
                    cy={y}
                    r={selected ? 22 : 16}
                  />
                  <circle cx={x} cy={y} r={selected ? 7 : 5} />
                  <text
                    x={x + 16}
                    y={
                      y +
                      (p.id === "place-jerusalem"
                        ? -10
                        : p.id === "place-bethlehem"
                          ? 18
                          : 4)
                    }
                  >
                    {p.label}
                  </text>
                </g>
              );
            })}
          </g>
          <text
            x="685"
            y="110"
            fontFamily="Georgia"
            fontSize="17"
            fill="#506f5b"
          >
            N
          </text>
          <path d="m692 119 -5 24 5-6 5 6Z" fill="#66846b" />
        </svg>
        <div className="atlas-heading">
          <div className="eyebrow">A place in the story</div>
          <h1>The world around the words.</h1>
          <p>
            Three towns. Connected accounts.
            <br />A birthday still open to discussion.
          </p>
        </div>
        <div className="map-controls" aria-label="Map controls">
          <button
            onClick={() => setZoom((z) => Math.min(2, z + 0.35))}
            disabled={zoom >= 2}
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(1, z - 0.35))}
            disabled={zoom <= 1}
            aria-label="Zoom out"
          >
            −
          </button>
          <button onClick={() => setZoom(1)} aria-label="Reset map view">
            ⌖
          </button>
        </div>
        <div className="map-location-card">
          <span className="eyebrow">
            {context.basis === "passage"
              ? "Current passage setting"
              : pin
                ? "Town-level context"
                : "Regional context"}
          </span>
          <h3>{place?.label || "The historical setting"}</h3>
          <p>
            {place
              ? locationDescription(place)
              : "This account supplies no precise geographical location to plot."}
          </p>
          <button
            className="panel-action"
            onClick={place ? () => select(place.id) : details}
          >
            Open place details →
          </button>
        </div>
        <div className="map-attribution">
          Natural Earth · modern physical context ·{" "}
          <button onClick={mapSources}>Map sources</button>
        </div>
      </div>
      <div className="regional-tray">
        <span>Broader locations</span>
        {[
          "place-hill-country",
          "place-egypt",
          "place-syria",
          "place-galilee",
        ].map((id) => (
          <button
            key={id}
            onClick={() => {
              setZoom(1);
              select(id);
            }}
          >
            {shortName(id)} ↗
          </button>
        ))}
      </div>
      <StudyTimeline state={state} select={select} compare={compare} />
    </section>
  );
}
