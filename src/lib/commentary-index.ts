// Canonical source of truth for all commentary metadata. All v2.2 features import from here.
// No React, no Qdrant, no side effects.

export const COMMENTARY_CHAPTERS: Record<string, number[]> = {
  genesis: [1, 2, 3, 6, 7, 8, 9, 11, 12, 15, 18, 22, 28, 37],
  daniel: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  matthew: [24],
  revelation: [1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 17, 18, 19, 20, 21, 22],
  isaiah: [1, 2, 6, 7, 9, 11, 52, 53, 65, 66],
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
  "genesis-15":
    "The most one-sided deal in the ancient world — a covenant where only God walks between the pieces. Genesis 15's self-maledictory oath, tardemah theophany, and ANE treaty framework reveal why Abraham doesn't even sign. Through this lens, the covenant God made alone.",
  "genesis-18":
    "Who were the three visitors at Mamre? The Christophany interpretation runs into three interlocking problems — and the agency model resolves them. What the original audience understood about divine council messengers, Abraham's intercession, and the justice question behind Sodom.",
  "isaiah-1":
    "Isaiah opens not with a sermon but with a lawsuit. The rib covenant lawsuit form — heaven and earth summoned as witnesses, the charges read in court — transforms everything about Isaiah 1. Here's where it gets interesting: verse 18 is not an invitation. It's a sarcastic legal challenge.",
  "isaiah-2":
    "Two visions, one chapter — breathtaking hope followed by cosmic terror. The har-YHWH oracle (shared almost word-for-word with Micah 4) describes Millennial conditions, not the eternal state. What the original audience understood about the cosmic mountain tradition and the Day of the LORD that follows.",
  "isaiah-6":
    "In the year that King Uzziah died, Isaiah walks into a throne room with seraphim. The trisagion — holy, holy, holy — is not a proof of Trinity. It is a Hebrew superlative. Through this lens, the ANE throne-guardian iconography, the hardening mandate, and the anomaly in Isaiah's call narrative structure.",
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

// Total: 29 + 16 + 10 + 5 = 60 chapters (all COMMENTARY_DESCRIPTIONS keys covered)
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
      "isaiah-1", "isaiah-2",
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
      "genesis-18", "isaiah-6",
    ],
  },
  {
    id: "covenant-arc",
    title: "Covenant Arc",
    description: "The covenant thread from Abraham through the exile and restoration.",
    chapterKeys: [
      "genesis-12", "genesis-15", "genesis-22", "genesis-28", "genesis-37",
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
      { bookId: "genesis", chapter: 15, annotation: "The covenant cutting ceremony — God alone walks between the pieces, binding himself with a self-maledictory oath." },
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

// Phase 51 — topic landing page data. All three exports follow the interface-then-constant
// pattern established by ThematicSection and ReadingPath above.
// TopicPage.prose targets theme-level queries; COMMENTARY_DESCRIPTIONS target passage-level queries.
// No keyword or prose overlap between the two sets is intentional and enforced by the keyword strategy.
export interface TopicPage {
  slug: string;          // URL segment — e.g. "daniel-7-son-of-man"
  title: string;         // H1 — theme-level, question-framed
  description: string;   // Meta description, 100-170 chars, theme-level
  keywords: string[];    // Theme-level SEO queries — NO passage overlap
  chapterKeys: string[]; // "{bookId}-{chapter}" keys from COMMENTARY_DESCRIPTIONS
  prose: string;         // 200-400 words original editorial prose in Bible Lens voice
}

export const TOPIC_PAGES: TopicPage[] = [
  {
    slug: "daniel-7-son-of-man",
    title: "The Son of Man in Daniel 7: Ascent, Not Descent",
    description: "Who is the Son of Man in Daniel 7, and which direction does he travel? The ascent vision that shaped Jesus, Paul, and first-century Judaism.",
    keywords: [
      "son of man theology",
      "Daniel 7 ascent vision",
      "ancient of days meaning",
      "son of man christology",
      "Daniel 7 first century interpretation",
    ],
    chapterKeys: ["daniel-7", "daniel-2", "matthew-24", "revelation-1", "revelation-5"],
    prose: `The question that unlocks Daniel 7 is deceptively simple: which direction does the son of man travel?

Read the verse carefully. In Daniel 7:13, the one like a son of man comes "with the clouds of heaven" and approaches the Ancient of Days — moving toward the throne, not away from it. He is being escorted upward into the divine courtroom to receive dominion, glory, and kingdom. The direction of travel is an ascent, not a descent to earth.

Here's where it gets interesting: this is how Second Temple Judaism universally read the passage. The author of 1 Enoch wrote entire chapters dramatizing this heavenly enthronement scene. The Dead Sea Scrolls community prized the Daniel vision precisely because it described a figure approaching God and receiving cosmic authority. None of these readers pictured a descent to a battle on earth. They pictured a coronation in heaven.

What the original audience would have understood is that Daniel's four beasts emerge from the sea — the ancient symbol of chaos and non-order — and they are progressively stripped of dominion until the court is seated and judgment is given. Into this scene steps the one like a son of man, the human-shaped figure who represents what the beasts are not: ordered, dignified, image-bearing humanity, vindicated before God.

Through this lens, Revelation 5 becomes unmistakable. John weeps because no one can open the sealed scroll. Then the Lamb steps forward — and the imagery collapses back into Daniel 7:13. The unsealing of the scroll in Revelation 5 is the throne room scene of Daniel 7:13, applied to Jesus at his ascension. Matthew 24:30 follows the same logic: "the Son of Man coming on the clouds" is the enthronement language of Daniel, not a description of a physical landing on earth.

This is a minority reading in popular Christianity but the majority reading among scholars who work with Second Temple literature. The distinction matters because it changes everything downstream: what "coming with clouds" means in Mark 14:62, what Pentecost announces, and what the early church meant when they said Jesus was exalted to the right hand of the Father.

Ancient wisdom doesn't always travel in straight lines. Sometimes it ascends.`,
  },
  {
    slug: "revelation-666-beast",
    title: "666 and the Beast of Revelation: What the Number Actually Meant",
    description: "The number 666 was a first-century code, not a future mystery. Gematria, Nero Caesar, and the imperial cult that demanded worship.",
    keywords: [
      "mark of the beast 666 meaning",
      "Nero gematria 666",
      "beast identity revelation",
      "666 gematria explanation",
      "imperial cult revelation 13",
    ],
    chapterKeys: ["revelation-13", "daniel-7", "daniel-2", "revelation-17"],
    prose: `The number 666 was never meant to be a mystery. For the original audience of Revelation, it was a riddle with an answer — and the answer was politically explosive.

Here's where it gets interesting: ancient Hebrew and Greek letters doubled as numbers, a practice called gematria. In Hebrew, "Neron Qesar" — Nero Caesar, rendered in Hebrew letters — totals 666. Not approximately. Exactly. And when scribes copying early manuscripts of Revelation encountered a variant that read 616 instead of 666, that variant corresponds to the Latin spelling of Nero's name, which drops one letter and changes the total by 50. Two independent numbering systems. Same man.

What the original audience would have understood is that they were living under Domitian's reign while the shadow of Nero — the emperor who had launched the first systematic persecution of Christians — still shaped their world. The beast from the sea in Revelation 13 bears the marks of Daniel 7's composite monster: the lion, the bear, the leopard. But Daniel's four beasts represented successive empires. Revelation's beast is Rome itself — the final imperial power in Daniel's sequence — and the number is its emperor's signature.

The land beast, the one that enforces worship of the sea beast, maps cleanly onto the imperial cult priesthood of Asia Minor. Cities like Ephesus, Smyrna, and Pergamum were not abstract symbols in Revelation 2-3 — they were places with temples dedicated to Rome and Augustus, where commerce and civic life required participation in emperor worship.

Through this lens, "the mark of the beast" was never about a microchip or a barcode. It was about the social and economic pressure to signal loyalty to the empire — to have Caesar's mark on your hand or forehead in the same way a Roman citizen might display imperial tokens in trade.

Daniel 2's statue, with its feet of iron and clay, provides the backdrop. Four kingdoms, then the stone that fills the earth. Revelation 13 is the fourth kingdom's final form, the beast at its most demanding — and 666 is the name written in numbers for those who have wisdom to see it.`,
  },
  {
    slug: "genesis-creation-ancient-cosmology",
    title: "Genesis and Ancient Cosmology: The Cosmic Temple Framework",
    description: "Genesis 1-2 through ancient Near Eastern eyes — the cosmic temple, the firmament, and why the creation week was never a science textbook.",
    keywords: [
      "ancient cosmology Bible",
      "cosmic temple Genesis",
      "firmament Hebrew cosmology",
      "Genesis 1 ANE background",
      "creation week framework",
    ],
    chapterKeys: ["genesis-1", "genesis-2", "genesis-3", "genesis-6", "genesis-11", "ezekiel-1"],
    prose: `What did Genesis 1 communicate to its first audience — and what was it not trying to say?

The question changes everything. Because the ancient audience of Genesis did not live in a world asking about natural selection or the age of the cosmos. They lived in a world saturated with creation stories: Enuma Elish from Babylon, Atrahasis from Sumer, the Memphite Theology from Egypt. Every surrounding culture had a cosmogony that justified its own gods, its own king, its own view of humanity's purpose. Genesis was written into that contest.

What the original audience would have understood is that Genesis 1 is structured as a cosmic temple inauguration. In ancient Near Eastern thought, the world was built as a dwelling place for the gods, and a temple was the microcosm of the universe. The seven-day structure of Genesis 1 mirrors the dedication week of a temple: six days of preparation, followed by the seventh day when the deity takes up residence in the completed structure. The Sabbath is not a command to rest arbitrarily — it is the climactic moment when YHWH "rests" in his cosmic temple, as a king enthroned.

The firmament — raqia in Hebrew — was not a misunderstanding of physics. It was the ancient cosmological architecture the text assumed: a solid dome holding back the waters above, with the earth resting on waters below. Genesis 1 does not correct this picture; it uses it to declare who made it and why it was made.

Here's where it gets interesting: Ezekiel 1's chariot vision employs the same cosmic architecture. The expanse above the living creatures, the throne above the expanse — this is the cosmic temple described in visual terms. When Ezekiel's exilic audience heard this, they recognized the vocabulary immediately. YHWH was not confined to Jerusalem's ruined temple. He sat enthroned above the entire cosmos.

Genesis 3's garden, Genesis 6's divine council crisis, and Genesis 11's ziggurat judgment all extend this framework. The cosmic temple was invaded, the boundaries were breached, and the nations were scattered — but the covenant with one family (Genesis 12) began the project of restoring what was lost.

Ancient wisdom, cosmic clarity.`,
  },
  {
    slug: "matthew-24-olivet-discourse",
    title: "Matthew 24 and the Olivet Discourse: The AD 70 Reading",
    description: "Did Jesus describe a distant future event or the fall of Jerusalem in AD 70? The partial preterist case for the Olivet Discourse explained.",
    keywords: [
      "Olivet Discourse explained",
      "Matthew 24 AD 70",
      "partial preterism Jesus",
      "Olivet Discourse preterist interpretation",
      "when were these things fulfilled Matthew 24",
    ],
    chapterKeys: ["matthew-24", "daniel-9", "daniel-7", "revelation-6"],
    prose: `Jesus began the Olivet Discourse in response to a specific question from specific people. The disciples pointed to the temple stones. Jesus said not one stone would be left on another. They asked, in effect: when? What will be the sign?

The partial preterist reading takes that question at face value. The disciples were not asking about a distant apocalypse two thousand years away. They were asking about the temple they could see from where they were sitting on the Mount of Olives. And Jesus answered them.

Here's where it gets interesting: Matthew 24:34 is one of the most discussed verses in all of eschatology. "This generation will not pass away until all these things take place." The Greek genea consistently means a biological generation — roughly forty years — in Matthew's Gospel. Forty years after the Olivet Discourse puts us squarely at AD 70, when the Roman general Titus destroyed Jerusalem and the temple exactly as Jesus described, with the horror of "those days" and the flight from Judea.

What the original audience would have understood is that Daniel's framework structures Jesus's response. Daniel 9's seventy weeks prophesied a coming desolation — "an abomination that causes desolation" — and Jesus invoked that language directly. The abomination Daniel foresaw in the context of Antiochus IV had a second iteration: the Roman armies surrounding and then defiling Jerusalem. "When you see Jerusalem surrounded by armies, know that its desolation has come near" (Luke 21:20).

Through this lens, the cosmic language of Matthew 24:29-30 — sun darkened, stars falling, son of man coming on clouds — is not literal astronomy. It is the prophetic convention the Hebrew prophets used to describe the fall of earthly powers. Isaiah 13 uses identical language to describe Babylon's fall. Ezekiel uses it for Egypt. Jesus is using the same stock vocabulary to describe Rome's judgment on Jerusalem.

Revelation 6's four horsemen follow the same covenant curse sequence: conquest, war, famine, death — Leviticus 26 enacted in history.

Where Bible Lens parts from full preterism: Revelation 19-20 describes a future physical return and a literal millennium that still lies ahead.`,
  },
  {
    slug: "isaiah-suffering-servant",
    title: "Isaiah's Suffering Servant: Corporate Israel and Typological Fulfillment",
    description: "Who is Isaiah's Suffering Servant? The historically prior corporate reading alongside typological fulfillment in Jesus — both as layers, not competitors.",
    keywords: [
      "suffering servant Isaiah meaning",
      "Isaiah 53 Jewish interpretation",
      "servant songs theology",
      "Isaiah 53 corporate Israel reading",
      "suffering servant who is it",
    ],
    chapterKeys: ["isaiah-52", "isaiah-53", "isaiah-7", "isaiah-9", "isaiah-11", "isaiah-1", "isaiah-2", "isaiah-6"],
    prose: `The most contested chapter in the Hebrew Bible was not always contested in the same way. The question of who Isaiah 53 describes — Israel or Jesus — is a modern framing of an ancient text that was originally designed to hold multiple readings at once.

Here's where it gets interesting: the historically prior reading, the one dominant among Jewish interpreters before Christianity recontextualized the passage, understood the servant as corporate Israel. Rashi in the eleventh century argued systematically that the servant who bears the iniquities of the nations is Israel itself — exiled, suffering, carrying the weight of history, and destined for vindication. Ibn Ezra followed the same trajectory. This was not a minority opinion among pre-modern Jewish scholars; it was the mainstream.

What the original audience would have understood is that Isaiah uses "servant" in multiple registers throughout chapters 40-55. Sometimes the servant is Israel collectively (Isaiah 41:8-9). Sometimes the servant is a faithful remnant within Israel (Isaiah 49:3-6). The oscillation between corporate and individual is built into the text's structure — and that oscillation is the key.

Through this lens, Isaiah 52:13 is where the passage actually begins, not chapter 53. The servant is "exalted and lifted up" — the same Hebrew verbs used for YHWH's own exaltation. The shocking reversal is the point: from disfigurement to exaltation, from being despised to being acknowledged by kings.

The typological reading — that Jesus fulfilled the servant's role — does not cancel the corporate reading. It layers on top of it. What Israel was called to be (a light to the nations, a redemptive presence among the peoples), Jesus embodied in concentrated, singular form. Both as layers, not competitors.

Isaiah 7's Immanuel sign, the throne names of Isaiah 9, and the Branch of Isaiah 11 all work this way: they address an original crisis first, then carry a typological weight that later generations recognize in light of Jesus.

This is a reading that takes the text's historical context seriously before reaching for christological application — and finds both dimensions more compelling as a result.`,
  },
  {
    slug: "ezekiel-gog-magog",
    title: "Gog and Magog in Ezekiel: Geography, Identity, and Eschatology",
    description: "Who is Gog of the land of Magog? Ancient Anatolian geography, Ezekiel 38-39, and Revelation 20's end-of-millennium placement explained.",
    keywords: [
      "Gog Magog prophecy",
      "Ezekiel 38 39 meaning",
      "end times battle Bible",
      "Gog Magog geography ancient",
      "Revelation 20 Gog Magog",
    ],
    chapterKeys: ["ezekiel-38", "ezekiel-39", "revelation-20", "daniel-11"],
    prose: `The identification of Gog has generated more confident speculation than almost any passage in prophetic literature — and most of that speculation has been wrong.

The text itself is the place to start. Ezekiel 38's "Gog of the land of Magog, chief prince of Meshech and Tubal" is not pointing toward Russia or a modern nation-state. The Table of Nations in Genesis 10 places Magog, Meshech, Tubal, and Gomer in ancient Anatolia — the geographic region we now call Turkey. Togarmah, also named, is associated in ANE sources with the Hittite heartland. These were the peoples at the outer northern horizon of the ancient Israelite world, the far peoples beyond the known map.

Here's where it gets interesting: Ezekiel deliberately evokes an enemy from "the uttermost parts of the north" (38:15) — the directional extreme in the ancient Near Eastern cosmological geography. This is the literary equivalent of describing an invader from the ends of the earth. The point is not ethnicity but cosmic extremity: this attack comes from the furthest reaches of the known world.

What the original audience would have understood is that Gog's defeat is a demonstration of YHWH's sovereignty over all nations — even those the exiles had never encountered. The prophecy was not a news report filed in advance about 21st century geopolitics. It was a theological statement about the scope of divine authority after the exile, addressed to a community wondering whether YHWH could still act in history.

Through this lens, Revelation 20:8 is significant precisely because it names Gog and Magog as a future event, placed explicitly after the thousand years. John is not re-running Ezekiel 38-39 as a past event that occurred in the first century. He is reserving Ezekiel's ultimate "nations gathered against God's people" scenario for an end-of-millennium judgment. The birds-feasting aftermath in Ezekiel 39:17-20 is quoted verbatim by Revelation 19:17-21 — connecting Ezekiel's aftermath to Revelation's final battle sequence.

Daniel 11's detailed Seleucid history provides the near-term backdrop: the pattern of northern aggression against God's people reaches a final, cosmic iteration in Gog's campaign.`,
  },
];

// Derived reverse index: chapter key → array of topic slugs.
// Never authored manually — always derived from TOPIC_PAGES to prevent drift.
export const CHAPTER_TOPICS: Record<string, string[]> = {};
for (const topic of TOPIC_PAGES) {
  for (const key of topic.chapterKeys) {
    (CHAPTER_TOPICS[key] ??= []).push(topic.slug);
  }
}

// key: "{bookId}-{chapter}", values: array of "{bookId}-{chapter}" keys
export const RELATED_PASSAGES: Record<string, string[]> = {
  // Genesis — Flood cluster
  "genesis-6": ["ezekiel-28", "daniel-10", "revelation-12"],
  "genesis-7": ["genesis-6", "genesis-8", "genesis-9"],
  "genesis-8": ["genesis-7", "genesis-9"],
  "genesis-9": ["genesis-8", "genesis-12"],

  // Genesis — Covenant cluster
  "genesis-12": ["genesis-15", "genesis-22", "genesis-28"],
  "genesis-22": ["genesis-12", "isaiah-53", "revelation-5"],
  "genesis-28": ["genesis-12", "ezekiel-1"],

  // Genesis — Divine council / cosmos cluster
  "genesis-1": ["genesis-2", "ezekiel-1", "genesis-11"],
  "genesis-2": ["genesis-1", "genesis-3", "ezekiel-28"],
  "genesis-3": ["genesis-2", "revelation-12", "ezekiel-28"],
  "genesis-11": ["genesis-6", "daniel-2", "revelation-17"],

  // Genesis — Narrative
  "genesis-37": ["genesis-28", "genesis-12", "daniel-1"],

  // Daniel — Court tales
  "daniel-1": ["daniel-2", "daniel-3", "ezekiel-2"],
  "daniel-3": ["daniel-1", "daniel-6", "ezekiel-3"],
  "daniel-4": ["daniel-5", "daniel-2", "ezekiel-28"],
  "daniel-5": ["daniel-4", "daniel-6", "revelation-17"],
  "daniel-6": ["daniel-3", "daniel-5", "ezekiel-3"],

  // Daniel — Visions cluster
  "daniel-2": ["daniel-7", "revelation-13", "matthew-24"],
  "daniel-7": ["daniel-2", "revelation-1", "matthew-24"],
  "daniel-8": ["daniel-7", "daniel-9", "revelation-13"],
  "daniel-9": ["daniel-7", "matthew-24", "revelation-1"],
  "daniel-10": ["daniel-9", "daniel-11", "revelation-12"],
  "daniel-11": ["daniel-10", "daniel-12", "revelation-6"],
  "daniel-12": ["daniel-7", "revelation-20", "ezekiel-37"],

  // Matthew
  "matthew-24": ["daniel-9", "revelation-6", "daniel-7"],

  // Revelation
  "revelation-1": ["daniel-7", "matthew-24", "revelation-22"],
  "revelation-2": ["revelation-3", "revelation-1", "daniel-1"],
  "revelation-3": ["revelation-2", "revelation-1", "daniel-6"],
  "revelation-4": ["isaiah-6", "ezekiel-1", "revelation-5"],
  "revelation-5": ["revelation-4", "daniel-7", "genesis-22"],
  "revelation-6": ["matthew-24", "daniel-9", "revelation-7"],
  "revelation-7": ["revelation-6", "revelation-12", "revelation-14"],
  "revelation-12": ["genesis-3", "daniel-7", "revelation-13"],
  "revelation-13": ["daniel-7", "revelation-12", "daniel-2"],
  "revelation-14": ["revelation-7", "revelation-19", "revelation-6"],
  "revelation-17": ["revelation-18", "daniel-5", "genesis-11"],
  "revelation-18": ["revelation-17", "daniel-5", "matthew-24"],
  "revelation-19": ["revelation-20", "ezekiel-39", "daniel-7"],
  "revelation-20": ["revelation-19", "ezekiel-38", "daniel-12"],
  "revelation-21": ["revelation-22", "isaiah-65", "ezekiel-37"],
  "revelation-22": ["revelation-21", "isaiah-66", "daniel-12"],

  // Isaiah — Messianic cluster
  "isaiah-7": ["isaiah-9", "isaiah-11", "matthew-24"],
  "isaiah-9": ["isaiah-7", "isaiah-6", "isaiah-11"],
  "isaiah-11": ["isaiah-9", "isaiah-65", "revelation-20"],
  "isaiah-52": ["isaiah-53", "daniel-9", "revelation-5"],
  "isaiah-53": ["isaiah-52", "genesis-22", "daniel-9"],
  "isaiah-65": ["isaiah-66", "revelation-21", "ezekiel-37"],
  "isaiah-66": ["isaiah-65", "revelation-22", "ezekiel-39"],

  // Ezekiel — Exile/restoration cluster
  "ezekiel-1": ["isaiah-6", "ezekiel-2", "revelation-4"],
  "ezekiel-2": ["ezekiel-3", "ezekiel-1", "daniel-1"],
  "ezekiel-3": ["ezekiel-2", "daniel-6", "ezekiel-37"],
  "ezekiel-28": ["genesis-3", "genesis-6", "daniel-8"],
  "ezekiel-37": ["ezekiel-38", "daniel-12", "revelation-20"],
  "ezekiel-38": ["ezekiel-39", "revelation-20", "daniel-11"],
  "ezekiel-39": ["ezekiel-38", "revelation-19", "revelation-20"],

  // New chapters — Genesis 15/18 and Isaiah 1/2/6
  "genesis-15": ["genesis-12", "genesis-22", "isaiah-53"],
  "genesis-18": ["genesis-12", "isaiah-6", "daniel-10"],
  "isaiah-1": ["isaiah-2", "ezekiel-2", "matthew-24"],
  "isaiah-2": ["isaiah-1", "isaiah-11", "ezekiel-38"],
  "isaiah-6": ["isaiah-1", "ezekiel-1", "revelation-4"],
};
