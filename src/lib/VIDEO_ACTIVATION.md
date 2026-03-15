# Video Activation Guide — Bible Lens

This guide explains how to activate a YouTube video embed on any commentary chapter page. No source code knowledge required — just follow the steps below.

---

## Quick Start

**3 steps to activate a video:**

1. Open `src/lib/video-config.ts`
2. Find the chapter entry and paste the YouTube video ID as the value.
   For example, change `"genesis-1": ""` to `"genesis-1": "dQw4w9WgXcQ"`
3. Deploy — the video appears on that chapter's page immediately on next build.

**Finding the YouTube video ID**

The video ID is the 11-character code in the YouTube URL:
- `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → ID is `dQw4w9WgXcQ`
- `https://youtu.be/dQw4w9WgXcQ` → ID is `dQw4w9WgXcQ`

---

## How It Works

- `VIDEO_CONFIG` maps chapter keys (`{bookId}-{chapterNumber}`) to YouTube video IDs
- **Empty string** (`""`) = no video shown (graceful no-render, no errors)
- **Invalid ID** (wrong length, bad characters) = console warning + no video shown (never a broken page)
- **Valid ID** = YouTube embed appears between the scripture text and the commentary panel
- The embed uses a click-to-play facade — no autoplay, no performance penalty on page load

Each chapter entry is independent. Activating Genesis 1 does not affect Genesis 2 or any other page.

---

## Available Chapters

All 41 commentary chapters are pre-configured in `VIDEO_CONFIG`. Activate any entry independently by adding a YouTube video ID.

### Genesis (12 chapters)

| Key           | Page              |
| ------------- | ----------------- |
| `genesis-1`   | Genesis Chapter 1 |
| `genesis-2`   | Genesis Chapter 2 |
| `genesis-3`   | Genesis Chapter 3 |
| `genesis-6`   | Genesis Chapter 6 |
| `genesis-7`   | Genesis Chapter 7 |
| `genesis-8`   | Genesis Chapter 8 |
| `genesis-9`   | Genesis Chapter 9 |
| `genesis-11`  | Genesis Chapter 11 |
| `genesis-12`  | Genesis Chapter 12 |
| `genesis-22`  | Genesis Chapter 22 |
| `genesis-28`  | Genesis Chapter 28 |
| `genesis-37`  | Genesis Chapter 37 |

### Daniel (12 chapters)

| Key          | Page              |
| ------------ | ----------------- |
| `daniel-1`   | Daniel Chapter 1  |
| `daniel-2`   | Daniel Chapter 2  |
| `daniel-3`   | Daniel Chapter 3  |
| `daniel-4`   | Daniel Chapter 4  |
| `daniel-5`   | Daniel Chapter 5  |
| `daniel-6`   | Daniel Chapter 6  |
| `daniel-7`   | Daniel Chapter 7  |
| `daniel-8`   | Daniel Chapter 8  |
| `daniel-9`   | Daniel Chapter 9  |
| `daniel-10`  | Daniel Chapter 10 |
| `daniel-11`  | Daniel Chapter 11 |
| `daniel-12`  | Daniel Chapter 12 |

### Matthew (1 chapter)

| Key           | Page               |
| ------------- | ------------------ |
| `matthew-24`  | Matthew Chapter 24 |

### Revelation (16 chapters)

| Key              | Page                  |
| ---------------- | --------------------- |
| `revelation-1`   | Revelation Chapter 1  |
| `revelation-2`   | Revelation Chapter 2  |
| `revelation-3`   | Revelation Chapter 3  |
| `revelation-4`   | Revelation Chapter 4  |
| `revelation-5`   | Revelation Chapter 5  |
| `revelation-6`   | Revelation Chapter 6  |
| `revelation-7`   | Revelation Chapter 7  |
| `revelation-12`  | Revelation Chapter 12 |
| `revelation-13`  | Revelation Chapter 13 |
| `revelation-14`  | Revelation Chapter 14 |
| `revelation-17`  | Revelation Chapter 17 |
| `revelation-18`  | Revelation Chapter 18 |
| `revelation-19`  | Revelation Chapter 19 |
| `revelation-20`  | Revelation Chapter 20 |
| `revelation-21`  | Revelation Chapter 21 |
| `revelation-22`  | Revelation Chapter 22 |

---

## Adding a New Chapter

When a new commentary chapter is added to the app in the future, add a corresponding entry to `VIDEO_CONFIG` in `src/lib/video-config.ts`.

The key format is `"{bookId}-{chapterNumber}"` where `bookId` matches the URL path segment (e.g., `genesis`, `daniel`, `matthew`, `revelation`). Start with an empty string and activate when the video is ready.

---

## Removing a Video

Set the value back to `""` (empty string) and deploy. The video disappears with no other changes needed.

```
"genesis-1": "",
```

That's it — no broken pages, no errors.
