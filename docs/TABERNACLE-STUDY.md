---
title: "Inside the Dwelling: circular Tabernacle study"
author: Pat Robinson
date: 2026-09-06
status: local-preview
---

# Inside the Dwelling

Open the [local study](http://127.0.0.1:3017/explore/tabernacle), integrated into the Explorer collection page. The original Bible Lens logo and both site themes continue throughout.

## Explore the prototype

- Watch the 75-second, five-part guided reveal. Pause, replay or jump directly to a moment. The sequence reveals the structure, isolates the veil, opens its connections and returns to the assembled whole.
- Move the separation slider in either direction. Use the component list or select a visible mesh to inspect one of eleven assemblies.
- Isolate a selected assembly, orbit it, zoom, view it from above or restore the camera. Keyboard users have matching component and camera buttons.
- Read the object description, a BSB excerpt or its connected passages and interpretations. Relevant Exodus chapters link back into the model.
- Use the passage entry buttons to start from the text and reveal a corresponding object.
- Keep this view copies a link containing the component, separation, isolation and reading lens. Camera orbit and zoom aren't included in the link.

The eleven assemblies are the outer covering, inner linen, supporting frame, veil, ark, lampstand, table and bread, incense altar, bronze basin, bronze altar and surrounding court.

## Geometry and source boundaries

The geometry is original procedural Three.js work. It isn't a downloaded model or a dimensioned reproduction of Project 314's plans. The circular enclosure, dome concept and ten supports draw on Hoy's proposal; the inner decagonal presentation draws on an intermediate diagram in his public book preview.

Model coordinates are illustrative display units. Do not interpret the overall footprint as a surveyed or verified scale model. The ark, table and two altars preserve the proportions described in their passages, but their placement and relative scale within the larger scene remain schematic. The court uses illustrative post spacing. Textile decoration, the canopy seams and centre, frame joints, basin shape and separation paths are also illustrative. The wing motifs acknowledge the cherubim imagery without claiming an exact ancient appearance.

Every component includes its own reconstruction note. The sources dialog explains the scope, and the page identifies the circular arrangement as a minority reconstruction. Biblical descriptions, thematic connections and Josephus's ancient interpretations are named distinctly. Josephus's cosmic interpretation doesn't establish Hoy's circular geometry.

The complete source guide is in the BibleLensWorkspace project at `Research/Analysis/PROJECT314-2026-09-06/SOURCE-GUIDE.md`. Exact dome profile, ribs and joints, crown-ring dimensions, support coordinates and internal layout still need detailed evidence.

## Implementation

- `src/data/tabernacle/study.ts`: component descriptions, excerpts, links and guided moments.
- `src/lib/tabernacle/state.ts`: validated view state and share links.
- `src/components/tabernacle/model.ts`: original geometry, reversible poses and resource cleanup.
- `src/components/tabernacle/DwellingScene.tsx`: Three.js rendering, picking, labels, camera fitting and theme updates.
- `src/components/tabernacle/TabernacleStudy.tsx`: study interface and guided sequence.
- `src/app/explore/tabernacle/`: route metadata and responsive styles.

The 3D bundle loads only on the study route. Geometry stays consistent during separation and reassembly. Rendering settles when the camera and model stop moving; hidden tabs suspend rendering and pause the guided reveal. The Reduce motion control and the device’s reduced-motion preference make transitions immediate and offer manual story steps. If WebGL fails, component reading remains available with a reload option.

There is no external model fetch, AI service call or new account requirement. Rendering video with captions, narration and final camera direction is a later output workflow; this prototype contains an interactive timed sequence, not an exported film.

## Verification

Verification results are recorded in `tabernacle-verification.json` after the final browser and production checks.

Run the focused checks with `npm run test:tabernacle`. Existing Explorer checks remain available with `npm run test:explorer`.
