export const KINGDOM_CHANNEL_URL = "https://www.youtube.com/channel/UC8hLkEiFs9STjJxBaAtKLtw";

// Enable each watch link only after verifying the video is publicly playable.
// A scheduled date alone does not establish availability.
export const KINGDOM_EPISODES = [
  {
    id: "ep017", videoId: "H4wqz5Q0fXY", published: false,
    title: "What is the Kingdom of God?", duration: "About 10 minutes",
    description: "Follow the story from Eden and the prophets to Jesus, his reign and the restoration still to come.",
    releaseDate: "2026-09-13", releaseLabel: "13 September 2026",
    readingHref: "/bible/mark/1", readingLabel: "Mark 1:14–15",
  },
  {
    id: "ep018", videoId: "bHBlATZO29Q", published: false,
    title: "Why did Jesus perform miracles?", duration: "About 9 minutes",
    description: "Healing and freedom were signs of the King’s authority. What did those signs reveal about God’s Kingdom?",
    releaseDate: "2026-09-20", releaseLabel: "20 September 2026",
    readingHref: "/bible/luke/11", readingLabel: "Luke 11:20",
  },
  {
    id: "ep019", videoId: "aCCwYtcmc6k", published: false,
    title: "Did Jesus say the Kingdom is within you?", duration: "About 12 minutes",
    description: "Read Jesus’ words in their original conversation, then trace how his Kingdom mission reached toward the nations.",
    releaseDate: "2026-09-27", releaseLabel: "27 September 2026",
    readingHref: "/bible/luke/17", readingLabel: "Luke 17:20–21",
  },
] as const;
