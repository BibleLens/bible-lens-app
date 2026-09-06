---
title: "Three Temple studies in the Bible Lens Explorer"
author: Pat Robinson
date: 2026-09-06
status: local-preview
---

# Three Temple studies

The collection is at `/explore/temples`. Solomon, Herod and Ezekiel each have an original procedural model, a source-backed study and a six-moment guided journey. The models share controls and the existing site themes, but use separate geometry and content.

| Study | Route | Guided focus | Assemblies |
| --- | --- | --- | --- |
| Solomon’s Temple | `/explore/temples/solomon` | Architecture, garden imagery, cherubim and the ark | 12 |
| Herod’s Temple | `/explore/temples/herod` | Boundaries, courts, Gospel encounters and the room without the ark | 11 |
| Ezekiel’s Temple vision | `/explore/temples/ezekiel` | Measurement, returning glory and water flowing outward | 10 |

## Exploring

Select an assembly in the list or directly in the model. Use **Open the interior** to remove obstructing walls and roofs. **Isolate part** brings an assembly into its own inspection view; **Look closer at selection** moves the camera closer while keeping the surroundings. The separation slider moves the assemblies apart and returns them to their original positions. Moving that slider restores the whole structure and closes the cutaway so the separated pieces remain visible. You can reopen the interior or isolate a part afterwards.

Each object has an explanation, source links, reconstruction notes and connections. **Measurements** displays selected textual dimensions, rather than a continuously calibrated measuring tool. The three scenes fit their own viewports and aren't rendered at the same scale.

The guided journeys run for 90 seconds. They can be paused, replayed or advanced manually. Reduced motion uses immediate transitions and manual story progression. Leaving the tab pauses playback. If WebGL is unavailable, the reading content and manual story remain usable.

**Keep this view** copies the temple, selected component, interior state, isolation, separation and reading lens. Camera angles, zoom, labels, measurement visibility and playback position aren't saved in that link. Relevant chapters link back into the matching model.

## Source and geometry decisions

### Solomon

The main source is [1 Kings 6](https://biblehub.com/bsb/1_kings/6.htm), followed by [1 Kings 7](https://biblehub.com/bsb/1_kings/7.htm), 1 Kings 8 and [2 Chronicles 3–4](https://biblehub.com/bsb/2_chronicles/3.htm). These are descriptions, not an excavated building plan. The model treats the sanctuary’s 60-by-20 plan as clear room lengths for this reconstruction, with a 40-by-20 main hall and a 20-cubit inner cube.

The porch uses the 20-cubit height selected by the BSB; the Hebrew 120-cubit reading is identified and linked to the translation’s textual note. The pillar shafts follow Kings’ 18 cubits and their capitals five. Chronicles’ ten lampstands and ten tables are shown, with Kings’ different table wording acknowledged.

The Sea has a 10-cubit diameter and 5-cubit bowl height, twelve stylised oxen and an illustrative support height. Rounded circumference and differing capacity figures are documented rather than treated as fabrication data. Side galleries, court dimensions, wall thicknesses, decorative details and object placement include reconstruction choices. The 140-by-110 display court is illustrative.

[Tel Moẓa](https://english.tau.ac.il/news/new_temple) supplies a regional archaeological comparison. Its excavated remains aren't measurements of Solomon’s Temple.

### Herod

The core plan follows [Mishnah Middot](https://www.sefaria.org/Mishnah_Middot?lang=en), especially 2:5, 3:1–3, 4:6–7 and 5:1, read alongside [Josephus, Jewish War 5.5](https://penelope.uchicago.edu/josephus/war-5.html#Ch.5). These sources differ. The model uses Middot’s 32-cubit altar, rather than Josephus’s 50-cubit figure, and Middot’s interior height and body width.

The inner court is 187 by 135 cubits; the Women’s Court is 135 square. The former’s east-west allocations follow Middot 5:1. Fifteen curved steps lead toward the eastern inner gateway. That threshold isn't presented as a securely identified Beautiful Gate from Acts.

The model provides a selective portico setting around the inner courts. It doesn't reconstruct the complete Temple Mount, Royal Stoa, Antonia, topography or all gates and service rooms. Gospel connections explicitly avoid fixing event coordinates beyond what the passage states.

Josephus’s inner room is empty; [Yoma 5:2](https://www.sefaria.org/Mishnah_Yoma.5.2?lang=en) remembers a foundation stone after the ark was removed. The model therefore contains no ark. The inner curtain isn't silently identified with Josephus’s outer cosmic curtain or with the curtain in the crucifixion accounts.

The [Israel Museum’s warning-inscription record](https://artsandculture.google.com/asset/no-foreigner-shall-enter-greek-inscription-forbidding-entry-to-the-temple-unknown/KAG6mO4plErdgw?hl=en) is linked as material evidence. The model’s notice tablets carry no invented text.

### Ezekiel

The source is Ezekiel 40–48, especially the architecture in [40](https://biblehub.com/bsb/ezekiel/40.htm), [41](https://biblehub.com/bsb/ezekiel/41.htm), [42](https://biblehub.com/bsb/ezekiel/42.htm), the altar and glory in [43](https://biblehub.com/bsb/ezekiel/43.htm), and the river in [47](https://biblehub.com/bsb/ezekiel/47.htm).

The study identifies the building as a vision. The 500-long-cubit enclosure follows the Septuagint-based reading used in the BSB. The Masoretic text’s 500 reeds would be six times the linear extent. The source panel includes a direct link to this textual note.

Six gateways preserve 50-by-25 footprints. The inner court is 100 square. The main hall and inner room preserve 40-by-20 and 20-by-20 proportions, and the sanctuary walls are six cubits thick. Elevations and roof forms remain illustrative where the text doesn't supply a full specification. The displayed porch depth follows the BSB’s twelve-cubit reading, whose note records eleven in the Hebrew.

Water begins south of the sanctuary threshold, goes south of the altar and flows east. Its distance outside the precinct is compressed to keep the river and model legible together; the four thousand-cubit stages are explained in the narrative, not plotted to geographical scale. Trees, channel width and depth are illustrative. No modern geographical alignment or particular fulfilment scheme is asserted.

## Implementation

- `src/data/temples/`: typed source records, interpretive connections, study content and guided moments.
- `src/components/temples/model-kit.ts`: geometry helpers, materials, assembly transforms, selection and cleanup.
- `src/components/temples/models.ts`: separate source-conscious models for all three studies.
- `src/components/temples/TempleScene.tsx`: Three.js view, ray selection, visible-geometry camera fitting, labels and rendering lifecycle.
- `src/components/temples/TempleStudy.tsx`: shared interface, source reader, tours and accessible controls.
- `src/lib/temples/state.ts`: validated, temple-specific shared views.
- `src/app/explore/temples/`: collection, comparison and per-study routes.
- `tests/temples.test.ts`: source-link integrity, state, geometry and reversible exploration checks.

The editable originals are the procedural TypeScript models. There are no downloaded third-party meshes, paid generation calls, Blender files or exported films in this increment. The shared Tabernacle model remains its own separately attributed study. Existing layout metadata and the original logo remain in use.

Run `npm run test:temples`, `npm run test:tabernacle`, `npm run test:explorer` and the production build. Browser verification and captures are recorded separately. These models are local study previews; detailed archaeological peer review and a finished narrated film remain separate work.
