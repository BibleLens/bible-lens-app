---
title: Bible Lens Explorer — integrated preview
author: Pat Robinson
date: 2026-09-05
status: local-review
---

# Bible Lens Explorer — integrated preview

**6 September, three Temples update:** [The Temple collection](http://127.0.0.1:3017/explore/temples) now contains Solomon’s Temple, Herod’s Temple and Ezekiel’s Temple vision. Each has its own original model, selectable assemblies, an opening interior, separation and isolation, source notes, connected readings and a six-moment guided journey. The three studies contain 33 assemblies in total. See [research and model choices](TEMPLE-STUDIES.md) and [verification](temple-verification.json). All 31 Temple, Tabernacle and Explorer tests pass, along with the production build and targeted lint checks. The models remain local study reconstructions; Ezekiel is explicitly presented as a vision.

**6 September, circular Tabernacle update:** [Inside the Dwelling](http://127.0.0.1:3017/explore/tabernacle) is now a second collection. It includes an original circular schematic, eleven selectable assemblies, reversible separation, isolation, connected passages and a 75-second guided reveal. See [the study notes](TABERNACLE-STUDY.md) for geometry limits and [verification](tabernacle-verification.json) for checks. This is a local, noindex prototype; exact Hoy dimensions and finished video production remain later work.

**6 September update:** the entire site now has selectable light and dark themes. See [theme notes](THEMES.md) for coverage and verification. The original screenshots below record the initial Explorer iteration; current theme examples are in `theme-screenshots/`.

The Explorer is now part of the existing Bible Lens application. The homepage, primary navigation and Start Here page lead into a connected study, with the Bible reader, commentary, topics and timelines still available alongside it.

Open the [homepage](http://127.0.0.1:3017/) or [begin the study](http://127.0.0.1:3017/explore/jesus-birth). If the local server has stopped, double-click **Open Explorer.command** at the application root. The launcher starts a local production build; keep its Terminal window open while reviewing.

## Try the complete journey

1. Begin in Luke 2 and select Mary in verse 5.
2. Open Connections. Follow a labelled relationship or inspect its evidence.
3. Open Map. Select Bethlehem and inspect its location sources.
4. Compare the birth-date proposals. The September hypothesis changes the dependent Herod date to 1 BC; the known Quirinius assessment stays at AD 6.
5. Return to Luke 2. Use Keep my place to copy a link, save a file, or restore a previously saved place.

The interface uses blues, golds and creams. Geography retains blue water and natural land colours. The Mediterranean label is separated from the introductory heading on both desktop and phone layouts.

## What is implemented

- One collection containing 10 WEB passages and 136 verses, 48 subjects, 66 relationships, 114 descriptive and relationship claims, 23 date claims and 32 source records.
- Read, Connections and Map views sharing the same passage, subject, selected proposal and verse. Search, browser history, keyboard controls, sources and relationship evidence are available throughout.
- Six selectable birth proposals with assumptions, objections and source coverage. Annual observances and conditional seasons do not acquire invented absolute years. BC/AD arithmetic has no historical year zero.
- A physical map with three sourced town markers. Regions without a securely identified town retain regional records. People use the current passage's location context; the Temple uses Jerusalem as context without inventing an exact footprint.
- Validated study links and small saved-place files. File restoration happens in the browser. The full study can also be downloaded as JSON at `/explore/jesus-birth/data`.
- Links from relevant Matthew, Luke and Revelation chapters into the study. The full chapter reader retains its Berean Standard Bible text; the study's WEB text is explicitly identified.
- A new homepage, collection overview, Start Here page and compact global navigation. Existing reading paths, library routes and homepage email subscription component remain available.
- The previously prepared patriarchal chronology correction is included: Joseph's arrival is 1687 BC and Abraham's Canaan entry 1880 BC under the named 1450 BC Exodus / 215-year Egypt assumptions. Two dangling timeline source references are repaired.

## Implementation and verification

The work is isolated on `codex/explorer-centrepiece`, based on `d9ce6068734e2b145917f9846a649c5f9f816dbe`. The original app checkout was left with its existing chronology candidate and no additional edits. Nothing has been pushed or deployed.

Shared records are in `src/data/explorer/`; data rules and URL/file validation are in `src/lib/explorer/`. React components are in `src/components/explorer/`, with scoped styles under `src/app/explore/`. The homepage and collection pages are server-rendered; the interactive study uses a client component inside Suspense. URL changes use Next's [documented native history integration](https://nextjs.org/docs/app/getting-started/linking-and-navigating#native-history-api).

`npm run test:explorer` passes 14 tests covering referential integrity, passage completeness, state round trips, invalid links and files, date dependencies, BC/AD arithmetic, geographical uncertainty, search and portable export. TypeScript, targeted ESLint and the optimized production build pass. The dependency audit reports zero known vulnerabilities after compatible updates, including Next 16.3.4 and its matching packages.

Browser checks cover the complete reading/connection/map journey, sources, alternate dates, Back and return-to-reading, keyboard search, Escape and tab navigation, mobile navigation, zoom/reset, and restoring both a test file and the actual downloaded saved-place file. An unrelated file produces an explanatory error. Desktop and 390px phone layouts were inspected, and representative screenshots are in `docs/explorer-screenshots/`.

The full Luke 2 chapter and the existing Books, Topics and Timelines pages were exercised through the new navigation. The export endpoint returns valid JSON with an attachment filename and `noindex` header. Browser console checks reported no warnings or errors in those journeys. These are development checks, not a completed independent accessibility audit or human reader trial.

## Decisions left for review

- **Editorial review:** the collection remains explicitly marked as a study preview. Exact birthdays, the Quirinius difficulty and the priestly service-cycle anchor are unresolved. Several sources still require fuller primary reading; source coverage remains visible. Tested software does not settle those historical questions.
- **Reader feedback:** reading is the default, with Connections and Map as companion views. This implements a practical direction for review; it does not record a final layout or chronology choice from Pat.
- **Publication:** review the collection and homepage before release. The study is currently `noindex`; its collection overview is included in the sitemap. The earlier checkout investigation found that the original local Vercel project link points to an older project, while the live project is `bible-lens`. Resolve that link explicitly before any deployment.
- **External services:** no credentials were copied into this checkout. Email submission, paid AI chat and other live service integrations were not exercised. Existing service behaviour should be checked in an authorized staging environment before release.
- **Later work:** broader collections and a separately identified Gleason explanation remain future work. The three Temple studies are now implemented locally; detailed model review and narrated film production remain separate work. Flat Earth is not an official Bible Lens position. There are no new accounts, payments or paywall features in this preview.

The formal GSD roadmap remains parked. This is an independently reviewable local application increment, recorded in the workspace Cowork log.
