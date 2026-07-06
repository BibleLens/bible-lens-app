// Timeline pillar content — one module drives the /timelines index, the three
// /timelines/<slug> pages, their Article + ImageObject JSON-LD, and the sitemap.
//
// The six Pinterest pins in Content/Timelines/pinterest-campaign map onto THREE
// topics; the four Israel-in-Egypt pins are facets of one argument, rendered here
// as anchored sections so each pin can deep-link to its own hook. Copy is adapted
// from that campaign's RUNBOOK Appendix A.

export interface TimelineSection {
  /** URL fragment a Pinterest pin can deep-link to (e.g. #galatians). */
  id: string;
  heading: string;
  /** Explainer paragraphs. */
  body: string[];
  image?: string;
  imageAlt?: string;
  /** Scripture / source citation shown under the section. */
  cite?: string;
}

export interface Timeline {
  slug: string;
  kicker: string;
  title: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  heroAlt: string;
  heroWidth: number;
  heroHeight: number;
  heroDownload: string;
  /** Lead paragraphs above the hero-anchored section. */
  intro: string[];
  /** Anchor id for the hero/intro block (the topic's headline pin). */
  introId: string;
  introCite?: string;
  sections: TimelineSection[];
  sources: string;
  datePublished: string;
  dateModified: string;
}

export const TIMELINES: Timeline[] = [
  {
    slug: "israel-in-egypt",
    kicker: "OLD TESTAMENT CHRONOLOGY",
    title: "Israel in Egypt: 215 vs 430 Years",
    tagline:
      "The dropped phrase from Exodus 12:40 — and the four ancient witnesses who read it differently.",
    metaTitle: "Israel in Egypt: 215 vs 430 Years | Bible Lens",
    metaDescription:
      "Every modern English Bible says Israel spent 430 years in Egypt. The Septuagint, Samaritan Pentateuch, Josephus, and Paul preserve a different reading — 215 years in Canaan plus 215 in Egypt. Here is the phrase most Bibles dropped, and the genealogy math that settles it.",
    heroImage: "/timelines/israel-in-egypt-hero.png",
    heroAlt:
      "Vertical infographic comparing two readings of Exodus 12:40. Left lane: the Masoretic Text reading of 430 years in Egypt, de-emphasised. Right lane: the Septuagint reading of 215 years in Canaan plus 215 years in Egypt, highlighted. Centre callout: the phrase 'and the land of Canaan' that the Masoretic text omits.",
    heroWidth: 1000,
    heroHeight: 1500,
    heroDownload: "bible-lens-israel-in-egypt-215-vs-430.png",
    introId: "dropped-phrase",
    intro: [
      "Every modern English Bible says Israel was in Egypt for 430 years. The Greek Septuagint, the Samaritan Pentateuch, Josephus, and Paul in Galatians 3:17 preserve a different reading: 215 years in Canaan plus 215 years in Egypt — 430 years in total, but measured from the promise to Abraham, not from the arrival in Egypt.",
      "The difference comes down to a single phrase. Where the Masoretic Text of Exodus 12:40 reads that Israel dwelt in Egypt 430 years, the Septuagint and Samaritan witnesses read that they dwelt in Egypt and in the land of Canaan 430 years. Drop 'and the land of Canaan,' and the whole sojourn is forced inside Egypt. Keep it, and the timeline comes back into focus.",
    ],
    introCite: "Exodus 12:40 · Galatians 3:17",
    sections: [
      {
        id: "galatians",
        heading: "Paul read it differently than your Bible does",
        image: "/timelines/israel-in-egypt-galatians.png",
        imageAlt:
          "Infographic showing where Paul starts the 430-year clock: at Abraham's promise, not at the entry into Egypt. Centre callout: 430 years from the promise — not from Egypt.",
        body: [
          "Galatians 3:17 places the 430-year clock between the promise to Abraham and the giving of the law at Sinai — not between the entry into Egypt and the Exodus. Read Exodus 12:40 with that anchor and the chronology resolves cleanly: 215 years in Canaan with the patriarchs, then 215 years in Egypt.",
          "Paul is not correcting Scripture here; he is quoting the chronology he inherited — the same one carried by the Greek and Samaritan texts of his day.",
        ],
        cite: "Galatians 3:17 · Exodus 12:40",
      },
      {
        id: "kohath",
        heading: "350 years, max — the math the Masoretes left in",
        image: "/timelines/israel-in-egypt-kohath.png",
        imageAlt:
          "Infographic showing the genealogy ceiling for the Egypt sojourn: Kohath 133 plus Amram 137 plus Moses 80 equals 350 years maximum. Centre callout: even the Masoretic genealogy disqualifies 430 years in Egypt.",
        body: [
          "Even on the Masoretic Text's own numbers, 430 years in Egypt does not fit. Kohath entered Egypt with Jacob. Add his full lifespan (133), then his son Amram's (137), then Moses' age at the Exodus (80), and the absolute ceiling is 350 years — and that requires every father to die the very day his son was born.",
          "The same genealogy that is used to defend 430 years in Egypt quietly rules it out. It is the strongest internal witness that the 430 figure was always measured from Abraham.",
        ],
        cite: "Exodus 6:18–20 · Numbers 26:59",
      },
      {
        id: "witnesses",
        heading: "Four witnesses agreed before the Codex was copied",
        image: "/timelines/israel-in-egypt-witnesses.png",
        imageAlt:
          "Infographic showing four ancient witnesses to Exodus 12:40 — the Septuagint, the Samaritan Pentateuch, Josephus, and Paul — all reading 215 plus 215. Centre callout: the Leningrad Codex is the outlier, not the rule.",
        body: [
          "Four independent witnesses carry the 215-plus-215 reading: the Greek Septuagint (c. 250 BC), the Samaritan Pentateuch, Flavius Josephus in the first century, and Paul citing the chronology in Galatians 3:17. All four agree the 430 years run from the promise to Abraham through the law at Sinai.",
          "The Leningrad Codex — the oldest complete Masoretic manuscript, copied in AD 1008 — is the outlier, not the rule. On this verse the older and more numerous witnesses line up on the other side.",
        ],
        cite: "Exodus 12:40 · Galatians 3:17",
      },
    ],
    sources:
      "Sources: the Septuagint (LXX), the Samaritan Pentateuch, Flavius Josephus, and Paul (Galatians 3:17); genealogy from Exodus 6:18–20 and Numbers 26:59.",
    datePublished: "2026-05-28",
    dateModified: "2026-07-06",
  },
  {
    slug: "the-flood",
    kicker: "OLD TESTAMENT CHRONOLOGY",
    title: "Genesis 11: The 650 Missing Years",
    tagline:
      "Why the pyramids are older than the young-earth Flood — and what the ancient chronologies preserved.",
    metaTitle: "Genesis 11: The 650 Years Missing From Modern Bibles | Bible Lens",
    metaDescription:
      "Young-earth chronology dates the Flood to 2348 BC — but the Step Pyramid is older and shows no water damage. The Septuagint, Samaritan Pentateuch, Josephus, and three early church chroniclers carry 650 extra years across the patriarchs of Genesis 11.",
    heroImage: "/timelines/genesis-11-flood.png",
    heroAlt:
      "Vertical infographic on Flood dating and the pyramids puzzle. Left lane: the Masoretic chronology placing the Flood at 2348 BC, de-emphasised. Right lane: the Septuagint chronology placing the Flood around 3000 BC, highlighted. Centre callout: 650 years missing from Genesis 11 in modern English Bibles.",
    heroWidth: 1000,
    heroHeight: 1500,
    heroDownload: "bible-lens-genesis-11-650-years.png",
    introId: "the-650-years",
    intro: [
      "Young-earth chronology dates the Flood to 2348 BC. The Step Pyramid at Saqqara dates to about 2450 BC — a century earlier — and its lower chambers show no water damage. On the standard reading, a global flood swept the earth a century after the pyramid was built, and left the pyramid dry.",
      "The Septuagint, the Samaritan Pentateuch, Josephus, and three early church chroniclers — Theophilus of Antioch, Julius Africanus, and Eusebius — all carry roughly 650 extra years across the post-Flood patriarchs of Genesis 11. Restore them and the Flood moves back to around 3000 BC, comfortably before the pyramids, and the puzzle quietly resolves.",
    ],
    introCite: "Genesis 11:10–26 · Eusebius, Chronicon",
    sections: [],
    sources:
      "Sources: the Septuagint, the Samaritan Pentateuch, Josephus, and the early chroniclers Theophilus of Antioch, Julius Africanus, and Eusebius (Chronicon); genealogy from Genesis 11:10–26.",
    datePublished: "2026-05-28",
    dateModified: "2026-07-06",
  },
  {
    slug: "joseph-at-avaris",
    kicker: "BIBLICAL ARCHAEOLOGY",
    title: "The Empty Tomb at Avaris",
    tagline:
      "A twelve-column Syrian palace in the Nile Delta, a non-royal pyramid tomb with no bones, and a statue in a multicoloured coat.",
    metaTitle: "Avaris: The Empty Pyramid Tomb That Pattern-Matches Joseph | Bible Lens",
    metaDescription:
      "In the eastern Nile Delta — biblical Goshen — Manfred Bietak's team excavated a Syrian-style palace with twelve columns and twelve principal tombs, and a non-royal pyramid tomb whose burial chamber sits empty. Read the finds again with Genesis 41 and Exodus 13:19 in view.",
    heroImage: "/timelines/joseph-avaris.png",
    heroAlt:
      "Vertical infographic on the Avaris excavation in the Nile Delta. Left lane: the conventional reading of the Israelite arrival in Egypt, de-emphasised. Right lane: the archaeological evidence at Tell el-Dab'a, highlighted. Centre callout: a pyramid tomb, a multicoloured coat, and no bones.",
    heroWidth: 1000,
    heroHeight: 1500,
    heroDownload: "bible-lens-joseph-avaris.png",
    introId: "avaris",
    intro: [
      "In the eastern Nile Delta — the region the Bible calls Goshen — Manfred Bietak's team excavated a Syrian-style palace at Tell el-Dab'a with twelve columns and twelve principal tombs set in its garden. One of those tombs is a non-royal pyramid tomb: an honour normally reserved for Egyptian royalty, granted here to a foreigner.",
      "Its burial chamber sits empty. Inside the funeral chapel was a smashed colossal statue with pale yellow skin, red hair, a throw-stick of office — and paint fragments of a multicoloured, striped coat. Read the finds again with Genesis 41:45 and Exodus 13:19 in view — a Semite raised to Egyptian office, whose bones were carried out at the Exodus — and the pattern is hard to unsee.",
    ],
    introCite: "Genesis 41:45 · Exodus 13:19",
    sections: [],
    sources:
      "Sources: Manfred Bietak's excavations at Tell el-Dab'a (ancient Avaris); Genesis 41:45 and Exodus 13:19; cf. the Patterns of Evidence documentary series.",
    datePublished: "2026-05-28",
    dateModified: "2026-07-06",
  },
];

export function getTimeline(slug: string): Timeline | undefined {
  return TIMELINES.find((t) => t.slug === slug);
}

export const TIMELINE_SLUGS = TIMELINES.map((t) => t.slug);
