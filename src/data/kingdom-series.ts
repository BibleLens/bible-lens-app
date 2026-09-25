export const KINGDOM_CHANNEL_URL = "https://www.youtube.com/channel/UC8hLkEiFs9STjJxBaAtKLtw";

// Enable each watch link only after verifying the video is publicly playable.
// A scheduled date alone does not establish availability.
// Weekly Sunday releases approved by Pat on 25 September 2026.
export const KINGDOM_EPISODES = [
  {
    id: "ep017", videoId: "lCNLQrvyqKs", releaseAt: "2026-09-27T15:00:00.000Z",
    title: "What is the Kingdom of God?", duration: "About 11 minutes",
    description: "Follow the story from Eden and the prophets to Jesus, his reign and the restoration still to come.",
    releaseLabel: "Sunday 27 September · 4 pm UK time",
    readingHref: "/bible/mark/1", readingLabel: "Mark 1:14–15",
  },
  {
    id: "ep018", videoId: "0A42ddQz9sQ", releaseAt: "2026-10-04T15:00:00.000Z",
    title: "Why did Jesus perform miracles?", duration: "About 9 minutes",
    description: "Healing and freedom were signs of the King’s authority. What did those signs reveal about God’s Kingdom?",
    releaseLabel: "Sunday 4 October · 4 pm UK time",
    readingHref: "/bible/luke/11", readingLabel: "Luke 11:20",
  },
  {
    id: "ep019", videoId: "XRNZKmXk_gA", releaseAt: "2026-10-11T15:00:00.000Z",
    title: "Did Jesus say the Kingdom is within you?", duration: "About 12 minutes",
    description: "Read Jesus’ words in their original conversation, then trace how his Kingdom mission reached toward the nations.",
    releaseLabel: "Sunday 11 October · 4 pm UK time",
    readingHref: "/bible/luke/17", readingLabel: "Luke 17:20–21",
  },
] as const;
