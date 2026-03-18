// Canonical source of truth for all commentary metadata. All v2.2 features import from here.
// No React, no Qdrant, no side effects.

export const COMMENTARY_CHAPTERS: Record<string, number[]> = {
  genesis: [1, 2, 3, 6, 7, 8, 9, 11, 12, 22, 28, 37],
  daniel: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  matthew: [24],
  revelation: [1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 17, 18, 19, 20, 21, 22],
  isaiah: [7, 9, 11, 52, 53, 65, 66],
  ezekiel: [1, 2, 3, 28, 37, 38, 39],
};

export const COMMENTARY_BOOKS = Object.keys(COMMENTARY_CHAPTERS);

export function chapterHasCommentary(bookId: string, chapterNum: number): boolean {
  return (COMMENTARY_CHAPTERS[bookId] ?? []).includes(chapterNum);
}

// Hand-crafted descriptions for commentary chapters — these are our most valuable pages.
// Each description leads with the historical question the chapter answers, using Bible Lens voice.
export const COMMENTARY_DESCRIPTIONS: Record<string, string> = {
  "genesis-1":
    "What did Genesis 1 mean to its original audience? Explore the ancient cosmology framework — the cosmic temple, the firmament, and why creation week isn't a science textbook.",
  "genesis-2":
    "Genesis 2's second creation account through ancient Near Eastern eyes — Adam as representative humanity, the garden as sacred space, and what the original audience heard.",
  "genesis-3":
    "The serpent, the tree, and the fall — what the original audience understood about Genesis 3 that modern readers often miss. Here's where it gets interesting.",
  "matthew-24":
    "Did Matthew 24 predict AD 70? The partial preterist case for the Olivet Discourse — Jesus describing the coming destruction of Jerusalem to people who would live to see it.",
  "genesis-6":
    "What did the original audience understand about the 'sons of God' and the Nephilim? Genesis 6 through the lens of ancient divine council theology and Mesopotamian flood parallels.",
  "genesis-7":
    "The Genesis flood account echoes Mesopotamian traditions — but with radical theological differences. What the original audience heard in the story of Noah entering the ark.",
  "genesis-8":
    "The waters recede and Noah sends birds — motifs the ancient audience would have recognized from Gilgamesh and Atrahasis. Here's where it gets interesting.",
  "genesis-9":
    "God's covenant with Noah — the first universal covenant in Scripture. What the rainbow, the blessing, and the dietary laws meant to the original audience.",
  "genesis-11":
    "The Tower of Babel as ancient ziggurat — what the original audience understood about Shinar, divine council judgment, and the scattering of the nations.",
  "genesis-12":
    "God's call to Abram — the covenant that reshapes everything. What 'lekh lekha' meant, why Ur matters, and how the original audience heard the promise of blessing.",
  "genesis-28":
    "Jacob's Ladder and the gateway of heaven — ancient cosmology, sacred space, and what the original audience understood about the stairway between heaven and earth.",
  "genesis-37":
    "The opening of the Joseph narrative — dreams, a coat of many colors, and the literary devices that signal where this story is going. What the original audience would have noticed.",
  "genesis-22":
    "The Binding of Isaac — was God really asking for child sacrifice? The Aqedah through ancient Near Eastern eyes, where the original audience would have understood the test, the ram, and the covenant promise very differently than modern readers.",
  "daniel-1":
    "What did Daniel's food refusal actually mean to the original audience? Explore covenant faithfulness under Babylonian imperial pressure and the court tales genre that frames all of Daniel 1-6.",
  "daniel-2":
    "The statue prophecy and its four kingdoms — what the original audience understood about Babylon, Persia, Greece, and Rome. Through this lens, the stone that fills the earth.",
  "daniel-3":
    "Shadrach, Meshach, and Abednego in the fiery furnace — imperial conformity demanded, faithful refusal, divine vindication. The court tales pattern at its most dramatic.",
  "daniel-4":
    "Nebuchadnezzar's madness and restoration — what the original audience understood about divine sovereignty over earthly rulers. The complete Nebuchadnezzar arc.",
  "daniel-5":
    "Belshazzar's feast and the writing on the wall — mene mene tekel upharsin decoded. The triple wordplay of Aramaic weights, judgment verbs, and Persian geography.",
  "daniel-6":
    "Daniel in the lions' den — the final court tale. What the original audience understood about divine protection under imperial pressure and the Babylonian-to-Persian transition.",
  "daniel-7":
    "The four beast vision and the son of man — here's where it gets interesting. The direction of travel is an ascent, not a descent. Ancient Near Eastern sea-chaos mythology meets first-century fulfillment.",
  "daniel-8":
    "The ram and the goat — Persia and Greece made explicit. The little horn of Daniel 8 is Antiochus IV Epiphanes, not the figure in Daniel 7. Why the distinction matters.",
  "daniel-9":
    "The seventy weeks — Daniel's theological centerpiece. The partial-preterist calculation, the two abominations (Antiochus and Rome), and what the original audience understood about the six goals of Daniel 9:24.",
  "daniel-10":
    "The beginning of Daniel's final vision — angelic warfare through the lens of Second Temple cosmology, Psalm 82, and the heavenly patron nations framework. Not modern spiritual warfare.",
  "daniel-11":
    "The most detailed prophecy in the Hebrew Bible — a verse-by-verse walk through Ptolemaic and Seleucid history that the original audience would have recognized as their recent past.",
  "daniel-12":
    "The clearest reference to bodily resurrection in the Hebrew Bible. Time periods as mathematical relationships, and the eschatological conclusion of Daniel's final vision.",
  "revelation-1":
    "What did Revelation 1 mean to its first readers? The time indicators 'en tachei' and 'engys' point to imminent fulfillment — here's where it gets interesting. The book that unseals what Daniel sealed.",
  "revelation-2":
    "The seven churches of Revelation weren't abstract symbols — Ephesus, Smyrna, and Pergamum were real cities under Roman pressure. What the original audience understood about faithfulness under empire.",
  "revelation-3":
    "Thyatira, Sardis, Philadelphia, Laodicea — the final four churches. Through this lens, the lukewarm water of Laodicea and the open door of Philadelphia land in their first-century Roman context.",
  "revelation-4":
    "John's throne room vision as imperial counter-narrative. The four living creatures echo Ezekiel 1 and Isaiah 6 — what the original audience heard in this cosmic alternative to Caesar's court.",
  "revelation-5":
    "The sealed scroll and the Lamb who opens it — is this the Ascension or a future event? The Daniel 7:13 connection makes the original audience's reading unmistakable. Ancient wisdom, modern clarity.",
  "revelation-6":
    "The four horsemen aren't random chaos — they follow Leviticus 26's covenant curse sequence. Here's where it gets interesting: the seventh seal opens into the trumpets, revealing Revelation's recapitulation structure.",
  "revelation-7":
    "Who are the 144,000? The hear/see pattern from Revelation 5 unlocks this chapter. What the original audience understood about symbolic arithmetic (12x12x1000) and the great multitude's relationship to Israel.",
  "revelation-12":
    "The dragon, the woman, and the war in heaven — the covenant community under siege. What the original audience understood about this apocalyptic retelling of Israel's story through the lens of first-century conflict.",
  "revelation-13":
    "The beast from the sea has a name: gematria points to Nero Caesar (nrwn qsr = 666), with 616 as independent confirmation. The land beast enforces the imperial cult. Here's where it gets interesting.",
  "revelation-14":
    "The Lamb on Mount Zion, the harvest of the earth, and three angelic proclamations. What the original audience understood about first-century harvest imagery and the Revelation 7 parallel structure.",
  "revelation-17":
    "Who is Babylon the Great? The majority identifies her with Rome — but there's a compelling minority case for Jerusalem. Four arguments, full transparency about the debate, and why this reading changes everything.",
  "revelation-18":
    "The fall of Babylon and the bloodguilt charge from Matthew 23. Through this lens, the OT harlot typology only applies to covenant partners — which matters enormously for identifying the city.",
  "revelation-19":
    "Where Bible Lens parts ways with David Chilton: Revelation 19 describes a future physical return of Christ, anchored in Acts 1:11. Ancient wisdom, premillennial clarity — grounded in the earliest church fathers.",
  "revelation-20":
    "A future literal millennium, not a symbolic past age. The Isaiah 65:20 two-step argument, Gog and Magog as a future end-of-millennium event, and why Papias, Justin Martyr, and Irenaeus matter here.",
  "revelation-21":
    "The new creation as covenant fulfillment — not the destruction of the physical world but its renewal. Ezekiel 47-48 and Isaiah 65 show what the original audience heard in John's new Jerusalem vision.",
  "revelation-22":
    "The river of life, the tree of life, and 'come quickly' — the unsealed scroll's invitation. What the original audience understood about the contrast with Daniel 12:4: this scroll is unsealed because the time is near.",
  "isaiah-7": "What did Isaiah 7:14 mean to its original audience — before Matthew quoted it? The Immanuel sign is a timeline aimed at a frightened king in 735 BC. Through this lens, almah, betulah, and the near-fulfillment that comes before the typological far-fulfillment.",
  "isaiah-9": "What did 'Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace' mean to the original audience? The four throne names of Isaiah 9:6 as ANE coronation titulary — here's where it gets interesting.",
  "isaiah-11": "The stump of Jesse and the peaceful kingdom — why the dynasty appears dead before the Branch emerges. What the original audience understood about Isaiah 11 as Millennial conditions, not the eternal state.",
  "isaiah-52": "The Suffering Servant passage begins here, not at Isaiah 53. What the original audience heard in the servant's exaltation in Isaiah 52:13-15 — the oscillation between corporate and individual that defines this passage.",
  "isaiah-53": "The most contested chapter in the Hebrew Bible. Corporate-Israel reading first — Rashi, Ibn Ezra, the historically prior interpretation. Then the typological fulfillment in Jesus. Both as layers, not competitors.",
  "isaiah-65": "New heavens and new earth — but death is still present. The hinge verse: death at age 100 is dying young. What the original audience understood about Isaiah 65 as Millennial conditions, and why 65:20 rules out the eternal state.",
  "isaiah-66": "The conclusion of Isaiah's vision — cosmic worship, new moons, Sabbaths. Through this lens, the eschatological placement of Isaiah 66 and the three options for the judgment scene. Ancient wisdom, modern premillennial clarity.",
  "ezekiel-1": "What did the chariot vision mean to Ezekiel's first audience — the Judean exiles in Babylon? The chayot, ophanim, and kabod are not a riddle. They are YHWH answering the most urgent theological question of the exile in the visual vocabulary of lamassu iconography the exiles walked past every day.",
  "ezekiel-2": "The call of Ezekiel — a priest without a temple commissioned as a watchman to a rebellious house. Through this lens, the scroll Ezekiel eats and the resistance he is told to expect from the exiles at Tel-abib. Ancient wisdom about prophetic calling under imperial pressure.",
  "ezekiel-3": "Ezekiel's commissioning concludes with the watchman oracle — individual moral responsibility articulated for the first time with this clarity in the Hebrew prophets. Here's where it gets interesting: the kabod departs Ezekiel's vision site at the Chebar canal and heads toward Jerusalem.",
  "ezekiel-28": "Is Ezekiel 28 about Satan — or about a human king using divine-status language? The key is Ezekiel 31: the cedar-of-Lebanon oracle applies identical garden-of-God imagery to Pharaoh (clearly human). What the original audience understood about ANE royal poetry and the King of Tyre's pretensions.",
  "ezekiel-37": "Ezekiel doesn't leave the valley of dry bones to interpretation — he interprets it himself at verse 11. 'These bones are the whole house of Israel.' The national restoration reading anchored in self-interpreting scripture, the ruach/chayah/etsem vocabulary, and what the original exilic audience heard.",
  "ezekiel-38": "Who is Gog of the land of Magog? The Table of Nations geography — Meshech, Tubal, Gomer, Togarmah — points to ancient Anatolia and the far northern peoples at the outer horizon of the ancient world. Through this lens, the historical identification candidates and the eschatological framing the text itself provides.",
  "ezekiel-39": "The aftermath of Gog's defeat: the great burial, the burning of weapons, and the birds-feasting scene at Ezekiel 39:17-20 that Revelation 19:17-21 quotes directly. What the original audience heard in YHWH's cosmic banquet of judgment — and why Revelation 20:8 names Gog and Magog as a future end-of-Millennium event.",
};

// Truncates description text to a word limit for card teasers.
// Uses the ellipsis character (…), not three dots.
function truncateWords(text: string, wordLimit: number): string {
  const words = text.split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "\u2026";
}

// 25-30 word teasers derived from COMMENTARY_DESCRIPTIONS — used by the /commentary index page.
export const COMMENTARY_TEASERS: Record<string, string> = Object.fromEntries(
  Object.entries(COMMENTARY_DESCRIPTIONS).map(([key, desc]) => [key, truncateWords(desc, 28)])
);

export interface ThematicSection {
  id: string;
  title: string;
  description: string;
  chapterKeys: string[]; // "{bookId}-{chapter}" format matching COMMENTARY_DESCRIPTIONS keys
}

// Total: 27 + 14 + 9 + 5 = 55 chapters (all COMMENTARY_DESCRIPTIONS keys covered)
export const THEMATIC_SECTIONS: ThematicSection[] = [
  {
    id: "eschatology",
    title: "Eschatology",
    description: "End-times prophecy through the lens of partial preterism and premillennialism.",
    chapterKeys: [
      "matthew-24",
      "daniel-7", "daniel-8", "daniel-9", "daniel-10", "daniel-11", "daniel-12",
      "revelation-1", "revelation-2", "revelation-3", "revelation-4", "revelation-5",
      "revelation-6", "revelation-7", "revelation-12", "revelation-13", "revelation-14",
      "revelation-17", "revelation-18", "revelation-19", "revelation-20", "revelation-21", "revelation-22",
      "ezekiel-38", "ezekiel-39",
      "isaiah-65", "isaiah-66",
    ],
  },
  {
    id: "creation-cosmos",
    title: "Creation and Cosmos",
    description: "Ancient cosmology, the cosmic temple, and divine council theology.",
    chapterKeys: [
      "genesis-1", "genesis-2", "genesis-3", "genesis-6", "genesis-7", "genesis-8", "genesis-9", "genesis-11",
      "ezekiel-1", "ezekiel-28",
      "daniel-1", "daniel-2", "daniel-3", "daniel-4",
    ],
  },
  {
    id: "covenant-arc",
    title: "Covenant Arc",
    description: "The covenant thread from Abraham through the exile and restoration.",
    chapterKeys: [
      "genesis-12", "genesis-22", "genesis-28", "genesis-37",
      "daniel-5", "daniel-6",
      "ezekiel-2", "ezekiel-3", "ezekiel-37",
    ],
  },
  {
    id: "messianic-prophecy",
    title: "Messianic Prophecy",
    description: "Servant songs, throne names, and the branch of Jesse.",
    chapterKeys: [
      "isaiah-7", "isaiah-9", "isaiah-11", "isaiah-52", "isaiah-53",
    ],
  },
];

// Phase 50 stub types and exports — reading paths and related passage links
export interface ReadingPathStep {
  bookId: string;
  chapter: number;
  annotation: string;
}

export interface ReadingPath {
  id: string;
  title: string;
  throughLine: string;
  steps: ReadingPathStep[];
}

export const READING_PATHS: ReadingPath[] = [
  {
    id: "eschatology",
    title: "Eschatology",
    throughLine:
      "From Daniel's throne-room vision to Revelation's first-century fulfillment, this path traces the partial-preterist arc — the judgment of AD 70 as the near horizon, the beast as Nero, the four horsemen as covenant curses. Through this lens, Bible Lens parts ways with full-preterism at Revelation 19–20, where a future physical return and a literal millennium remain on the horizon.",
    steps: [
      { bookId: "daniel", chapter: 7, annotation: "The son of man ascends to the Ancient of Days — the interpretive foundation." },
      { bookId: "daniel", chapter: 9, annotation: "Seventy weeks: the prophetic timeline that changes everything." },
      { bookId: "matthew", chapter: 24, annotation: "AD 70 as the near horizon Jesus described to living witnesses." },
      { bookId: "revelation", chapter: 1, annotation: "Time indicators point to imminent first-century fulfillment." },
      { bookId: "revelation", chapter: 6, annotation: "Four horsemen as Leviticus 26 covenant curse sequence." },
      { bookId: "revelation", chapter: 13, annotation: "The beast identified: Nero's gematria, 666 confirmed." },
      { bookId: "revelation", chapter: 19, annotation: "Where Bible Lens parts from Chilton: future physical return." },
      { bookId: "revelation", chapter: 20, annotation: "A literal millennium — the premillennial conclusion anchored in church fathers." },
    ],
  },
  {
    id: "creation-cosmos",
    title: "Creation and Cosmos",
    throughLine:
      "Ancient Near Eastern cosmology runs through Genesis, Ezekiel's chariot vision, and the divine council framework — the Bible as cosmic temple narrative, not a science textbook. Here's where it gets interesting: the same visual vocabulary the Judean exiles walked past in Babylon unlocks what Genesis and Ezekiel were always saying about YHWH's sovereignty over the cosmos.",
    steps: [
      { bookId: "genesis", chapter: 1, annotation: "Cosmic temple inauguration — not an origin-science account." },
      { bookId: "genesis", chapter: 2, annotation: "The garden as sacred space, Adam as representative humanity." },
      { bookId: "genesis", chapter: 3, annotation: "The fall through ANE eyes — what the original audience heard." },
      { bookId: "genesis", chapter: 6, annotation: "Sons of God and the divine council — Mesopotamian parallels." },
      { bookId: "genesis", chapter: 11, annotation: "Babel as ziggurat judgment — the scattering of the nations." },
      { bookId: "ezekiel", chapter: 1, annotation: "The chariot vision answers the exile's most urgent question." },
      { bookId: "ezekiel", chapter: 28, annotation: "King of Tyre: divine council imagery applied to a human king." },
      { bookId: "daniel", chapter: 2, annotation: "The statue as cosmic history — four kingdoms through this lens." },
    ],
  },
  {
    id: "covenant-arc",
    title: "Covenant Arc",
    throughLine:
      "From Abraham's call through the Babylonian exile and promised restoration, this path follows the covenant that never breaks — even when the people do. What the original audience would have understood is that the dry bones of Ezekiel 37 and the new heavens of Isaiah 65 are not distant abstractions but the covenant's own answer to exile.",
    steps: [
      { bookId: "genesis", chapter: 12, annotation: "The Abrahamic call — the covenant that reshapes everything." },
      { bookId: "genesis", chapter: 22, annotation: "The Aqedah: covenant test, sacrifice, and ram-as-substitute." },
      { bookId: "genesis", chapter: 28, annotation: "Jacob's ladder — sacred geography and covenant renewal." },
      { bookId: "daniel", chapter: 5, annotation: "Belshazzar and the writing on the wall — covenant judgment in Babylon." },
      { bookId: "daniel", chapter: 6, annotation: "Lions' den: covenant faithfulness vindicated under empire." },
      { bookId: "ezekiel", chapter: 37, annotation: "Dry bones: national restoration — self-interpreted by the text." },
      { bookId: "isaiah", chapter: 65, annotation: "New heavens, new earth — Millennial conditions, not the eternal state." },
    ],
  },
  {
    id: "messianic-prophecy",
    title: "Messianic Prophecy",
    throughLine:
      "Isaiah's servant songs and throne names address original audiences first — a frightened king in 735 BC, exiles under Babylonian pressure — then find their typological fulfillment in Jesus. What the original audience would have understood is that these texts were never abstractions; they were answers to specific crises, which is exactly what makes them powerful as prophecy.",
    steps: [
      { bookId: "isaiah", chapter: 7, annotation: "Immanuel as a 735 BC timeline — before Matthew's typology." },
      { bookId: "isaiah", chapter: 9, annotation: "Throne names as ANE coronation titulary, not divine attributes." },
      { bookId: "isaiah", chapter: 11, annotation: "The Branch from Jesse's stump — Millennial conditions ahead." },
      { bookId: "isaiah", chapter: 52, annotation: "The servant's exaltation: where Isaiah 53 actually begins." },
      { bookId: "isaiah", chapter: 53, annotation: "Corporate Israel first, then typological Christ — both as layers." },
    ],
  },
];

// key: "{bookId}-{chapter}", values: array of "{bookId}-{chapter}" keys
export const RELATED_PASSAGES: Record<string, string[]> = {};
