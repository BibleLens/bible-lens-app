---
title: Bible Lens — light and dark themes
author: Pat Robinson
date: 2026-09-06
status: local-review
---

# Light and dark themes

The website now offers a cream, blue and gold light theme alongside its dark theme. Open the [local preview](http://127.0.0.1:3017/) and use the sun/moon button in the header. It names the theme it will switch to. On phones the icon retains its accessible label and a 44px touch target.

Dark remains the default for a new visitor. A reader's choice is remembered across navigation and reloads. The Bible chapter header and full Psalms reader include the same switch. Browser chrome follows the selected colour scheme.

## Coverage

The theme applies to the homepage, collection overview, all three Explorer views, library, chapter reader, commentary, topic and long-form study pages, timelines, search, Scholar interface and shared navigation. Existing shared colours also carry it into About, Privacy and status/error surfaces.

Light mode uses warm cream backgrounds, pale panels, blue text and links, and gold details. Evidence badges retain their labelled distinctions with darker text on pale backgrounds. Dark mode retains dark reading surfaces and luminous accents. Photographs, infographic assets and conventional map colours remain intact. The light logo uses a quiet diamond outline; the original glowing mark remains available in dark mode.

Changing the theme does not change the selected person, passage, verse or date proposal in the Explorer. No study content, date models or source records were changed.

## Implementation

- `src/app/themes.css` defines the shared light palette, website shell roles, switch and theme-specific treatments. Existing dark library defaults remain in `globals.css`.
- `src/app/site-shell.css` uses those roles instead of fixed light colours. `src/app/explore/explorer-themes.css` separates theme selection from view selection, with a light Connections view and dark reading/map controls.
- `ThemeProvider` uses the existing `next-themes` preference persistence without forcing dark. `ThemeToggle` renders safely across server rendering and hydration; `ThemeChrome` updates browser colour metadata.
- Library, timeline, article and navigation components use theme-aware surfaces and text. The mobile navigation uses inline SVG icons so an unavailable icon font cannot expose ligature names.

## Verification

The optimized production build and TypeScript checks pass, targeted ESLint is clean, and all 14 existing Explorer tests pass. Browser checks covered desktop, 768px tablet and 390px phone layouts; both preference/reload round trips; keyboard operation; chapter and Psalms controls; library, timeline and long-form reading; and preservation of Explorer context while switching.

Ten representative foreground/background pairs exceed 4.5:1 contrast, including muted light text at 4.62:1, light body text at 10.93:1 and the light primary button at 8.35:1. This is a representative contrast check, not an independent accessibility audit. Results are in `theme-verification.json` and preview captures are in `theme-screenshots/`.

The Scholar and search interfaces were visually checked without submitting AI queries. No email subscriptions or other external service actions were performed. The changes are local to `codex/explorer-centrepiece`; production has not been deployed.
