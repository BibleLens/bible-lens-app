---
title: About page and timeline card refresh
author: Pat Robinson
date: 2026-09-06
status: local-preview
---

# About page and timeline cards

The [About page](http://127.0.0.1:3017/about) introduces Bible Lens as Christian and explains the beliefs Pat supplied in ordinary language. Its title and search description follow the same approach. The page covers the Father, Jesus' humanity and faithfulness, his death and resurrection, granted immortality, fulfilled prophecy, future reign, the condition of the dead, and resurrection to life on earth. It retains the invitation to examine sources and the introduction to Pat.

The linked passages resolve to 24 distinct chapters in the existing BSB reader. Exact quoted words were checked against that text. The historical reference links to [Josephus, Jewish War 6.4](https://penelope.uchicago.edu/josephus/war-6.html#Ch.4); the conclusion about the fulfilment of all predictions for Jesus' contemporaries is stated as Bible Lens's conviction.

The [timeline comparison cards](http://127.0.0.1:3017/timelines#investigations-heading) use a compact presentation with headings sized to their card width, reduced padding and stacked source notes. Text remains complete. Very narrow cards place the comparison columns one above the other. Full investigation pages retain the larger presentation.

Validation: targeted ESLint, the production build including TypeScript, and diff checks passed. All six comparison headings fit their text boxes at 1280px, 1024px and 390px viewport widths. About was checked on desktop and phone, in light and dark themes, with a Scripture-reading round trip. Its visible copy and metadata contain none of the previous doctrinal labels. Review captures are in `about-review-screenshots/`.

The local production preview has been refreshed. No deployment or push was made.
