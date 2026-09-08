import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import path from "node:path";
import films from "../src/data/temples/films.json";

for (const [id, film] of Object.entries(films)) {
  test(`${id}: every public asset exists and captions match the film timeline`, () => {
    for (const asset of [film.src, film.poster, film.captionsSrc]) {
      assert.ok(asset.startsWith(`/temples/${id}/`));
      assert.ok(fs.statSync(path.join("public", asset)).size > 0);
    }
    let end = 0;
    for (const chapter of film.chapters) {
      assert.equal(chapter.start, end, "no gaps or overlaps between picture chapters");
      assert.ok(chapter.end > chapter.start);
      assert.ok(chapter.text && chapter.passage);
      end = chapter.end;
    }
    assert.equal(end, film.duration);
    const vtt = fs.readFileSync(path.join("public", film.captionsSrc), "utf8");
    assert.ok(vtt.startsWith("WEBVTT"));
    let lastEnd = 0;
    for (const cue of film.captions) {
      assert.ok(cue.start >= lastEnd && cue.end > cue.start && cue.end <= film.duration);
      assert.ok(vtt.includes(cue.text), "downloadable and on-screen captions agree");
      lastEnd = cue.end;
    }
  });
}
test("the public film package contains only finished films, posters and captions", () => {
  const allowed = new Set(Object.values(films).flatMap(f => [f.src, f.poster, f.captionsSrc]));
  for (const file of fs.readdirSync("public/temples", { recursive: true, withFileTypes: true })) {
    if (!file.isFile()) continue;
    const publicPath = "/" + path.relative("public", path.join(file.parentPath, file.name));
    assert.ok(allowed.has(publicPath), `unexpected public asset: ${publicPath}`);
  }
  assert.doesNotMatch(JSON.stringify(films), /\/Users\/|\/Volumes\/|127\.0\.0\.1|localhost|API_KEY|raw\.wav|production\//);
});
