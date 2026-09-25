import { test } from "node:test";
import assert from "node:assert/strict";
import { isKingdomVideoAvailable } from "../src/lib/kingdom-availability";
const film = { videoId: "example", releaseAt: "2026-09-27T15:00:00.000Z" };
const due = Date.parse(film.releaseAt);
test("does not expose a scheduled private film early", async () => {
  const request = (async () => { throw new Error("Should not be called"); }) as typeof fetch;
  assert.equal(await isKingdomVideoAvailable(film, due - 1, request), false);
});
test("checks public availability after the release time", async () => {
  const publicVideo = (async () => Response.json({ provider_name: "YouTube", title: "The Kingdom" })) as typeof fetch;
  assert.equal(await isKingdomVideoAvailable(film, due, publicVideo), true);
  const privateVideo = (async () => new Response("Unauthorized", { status: 401 })) as typeof fetch;
  assert.equal(await isKingdomVideoAvailable(film, due, privateVideo), false);
});
test("keeps a safe fallback if verification fails", async () => {
  const failure = (async () => { throw new Error("Timed out"); }) as typeof fetch;
  assert.equal(await isKingdomVideoAvailable(film, due, failure), false);
  const malformed = (async () => Response.json({ error: "Missing video" })) as typeof fetch;
  assert.equal(await isKingdomVideoAvailable(film, due, malformed), false);
});
