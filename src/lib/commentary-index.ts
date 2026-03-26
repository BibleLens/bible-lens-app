// Canonical source of truth for all commentary metadata. All v2.2 features import from here.
// No React, no Qdrant, no side effects.

export const COMMENTARY_CHAPTERS: Record<string, number[]> = {
  genesis: [1, 2, 3, 6, 7, 8, 9, 11, 12, 15, 18, 22, 28, 37],
  daniel: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  matthew: [24],
  revelation: [1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 17, 18, 19, 20, 21, 22],
  isaiah: [1, 2, 6, 7, 9, 11, 52, 53, 65, 66],
  ezekiel: [1, 2, 3, 28, 37, 38, 39],
  exodus: [3, 12, 14, 19, 20, 25, 26, 27, 32, 33, 34],
  zechariah: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  psalms: [2, 8, 22, 23, 45, 51, 82, 89, 110, 139],
  jeremiah: [1, 7, 18, 19, 23, 29, 31, 36, 52],
  job: [1, 2, 3, 19, 28, 38, 39, 40, 41, 42],
  proverbs: [1, 7, 8, 10, 16, 22, 23, 25, 31],
  ecclesiastes: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12],
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

  // Exodus — 6 commentary clusters, 11 chapters
  "exodus-3":
    "What did Moses hear at the burning bush — and why does the traditional translation 'I AM WHO I AM' miss the point? The divine name ehyeh asher ehyeh is first-person imperfect Hebrew, which points forward, not upward. Here's where it gets interesting: this is not a philosophical statement about ontology. It is a covenant promise of dynamic presence — 'I will be what I will be' — addressed to a frightened shepherd about to face Pharaoh. What the original audience would have understood is that YHWH's self-introduction echoes the ANE suzerainty treaty formula, binding the deity to the liberation project before it begins. The burning bush is not a metaphysics lecture; it is a commissioning ceremony.",
  "exodus-12":
    "What was the Passover before it became a Christian symbol? Here's where it gets interesting: the night of the tenth plague was, for the original audience, an ANE apotropaic blood ritual — a rite using blood to ward off a destroying agent. The doorposts marked with hyssop and blood were not primarily a forward-pointing typology; they were ancient protective technology, operating within the visual and ritual logic of the ancient Near East. What the original audience would have understood is that YHWH was using the very categories of their Egyptian world — blood rituals, divine judgment, night terrors — and turning them toward liberation. The Passover is first a night of violent deliverance; the layers of meaning come after.",
  "exodus-14":
    "What actually happened at the Reed Sea — and what did the original audience understand about YHWH commanding the waters? The divine warrior motif is one of the oldest patterns in the ancient Near East: a deity defeats the sea-chaos monster and establishes cosmic order. Here's where it gets interesting: the Yam Suph crossing inverts this pattern. There is no monster to defeat — just Pharaoh's army swallowed by the waters YHWH commands. What the original audience would have heard is a combat myth where YHWH does not fight chaos; YHWH commands it. The sea that destroys Egypt is the same sea that walked Israel through on dry ground. This is ancient cosmological vocabulary — the divine warrior who makes and unmakes the waters.",
  "exodus-19":
    "What if the Sinai covenant was not primarily a religious experience but a legal treaty? Hittite suzerainty treaties from the late Bronze Age follow a recognizable structure: preamble identifying the great king, historical prologue recounting past acts of benevolence, treaty stipulations, deposit and reading instructions, witnesses, blessings and curses. Exodus 19 follows this structure almost exactly — including the historical prologue ('I brought you out of Egypt on eagles' wings') before any demands are made. Here's where it gets interesting: the original audience would have recognized this genre immediately. YHWH is not presenting religion; YHWH is presenting a treaty, binding a vassal people to a suzerain deity who has already acted on their behalf.",
  "exodus-20":
    "The Ten Commandments are not an ethics list. What the original audience would have understood is that the Decalogue is the stipulations section of a Hittite suzerainty treaty — the binding terms that the vassal (Israel) agrees to keep in gratitude for the suzerain's (YHWH's) acts of deliverance. This changes everything about how the commandments land. They are not universal moral principles extracted from their context. They are covenant obligations, grounded in a specific history: 'I am YHWH your God, who brought you out of the land of Egypt.' Here's where it gets interesting: the Sabbath commandment at the treaty's center echoes Genesis 1's cosmic temple — the rest of the suzerain written into the rhythms of the covenant community.",
  "exodus-25":
    "What if the Tabernacle was not a portable worship tent but a portable cosmos? Here's where it gets interesting: the Hebrew vocabulary of Exodus 25 — mishkan (dwelling), kapporet (mercy seat/cover), aron (chest), tabnit (pattern/blueprint) — is the vocabulary of cosmic architecture, not furniture assembly. What the original audience would have understood is that YHWH was re-creating the sacred space of Eden in the wilderness. The same sevenfold creation structure, the same tripartite division of space (outer court, holy place, holy of holies) mirroring the ancient three-tier cosmos, the lampstand (menorah) echoing the tree of life. The Tabernacle is Eden rebuilt in acacia wood and gold.",
  "exodus-26":
    "The mishkan structure of Exodus 26 is cosmic architecture made portable. The curtains and their measurements, the parokhet (the dividing veil), the framework of acacia boards — all of it encodes the same sacred-space logic that organized the cosmos in Genesis 1. Here's where it gets interesting: the parokhet that divides the holy place from the holy of holies in Exodus 26 is not decorating a tent. It is the boundary between the accessible and the unapproachable — the same boundary that the cherubim with the flaming sword guard at the entrance to Eden in Genesis 3. What the original audience would have understood is that approaching the Tabernacle meant approaching the portable Eden, the dwelling where YHWH had agreed to reside among his treaty people.",
  "exodus-27":
    "The outer courtyard of the Tabernacle — the altar of burnt offering, the basin, the pillars — completes the three-zone cosmos that Exodus 25-27 establishes. Through this lens, the courtyard is the outer-world zone (corresponding to the earth in the three-tier cosmos), the holy place is the heavenly mediating zone, and the holy of holies is the divine throne room. What the original audience would have understood is that worshippers moving through the courtyard were enacting a movement toward the center of the cosmos, approaching the place where heaven and earth intersect. The altar at the courtyard entrance is not incidental; it is the ritual gateway that makes approach to the divine dwelling possible.",
  "exodus-32":
    "The golden calf is not a story about idolatry in the simple sense. Here's where it gets interesting: within the suzerainty treaty framework established at Sinai, Israel's construction of an alternative divine image while Moses is on the mountain is covenant infidelity — the vassal breaking the treaty terms within weeks of signing them. What the original audience would have understood is that Aaron's proclamation ('These are your gods, O Israel, who brought you up out of Egypt') is a direct violation of the first two treaty stipulations of Exodus 20. The narrative consequence is covenant dissolution. YHWH tells Moses to step aside so he can destroy Israel and start over. Moses intercedes — and what happens next becomes the theological center of the Hebrew Bible.",
  "exodus-33":
    "What does it mean to see the face of God — and why does Moses ask? Exodus 33 is one of the most theologically dense chapters in the entire Hebrew Bible. The kavod of YHWH — the divine glory/weight — is the central concept. Here's where it gets interesting: Moses, who has spoken with YHWH 'face to face, as a man speaks with his friend' (33:11), now asks for something more. He asks to see the kabod itself. YHWH's response sets up one of the great asymmetries of the text: the face cannot be seen, but the back can. What the original audience would have understood is that this is not physics — it is a meditation on divine hiddenness and partial revelation, and it establishes the theological foundation for what follows in Exodus 34.",
  "exodus-34":
    "The Thirteen Attributes of Exodus 34:6-7 are the most theologically significant verses in the Torah — and possibly in the entire Hebrew Bible. After the covenant crisis of the golden calf, YHWH passes before Moses and proclaims his own name: 'YHWH, YHWH, a God merciful and gracious, slow to anger, and abounding in steadfast love and faithfulness...' Here's where it gets interesting: this self-declaration becomes the foundation for every subsequent appeal to divine mercy in the Hebrew Bible. The prophets cite it, the Psalms echo it, the post-exilic community recites it. What the original audience would have understood is that the covenant renewal of Exodus 34 does not just restore the broken Sinai treaty — it redefines the terms on which YHWH relates to a covenant-breaking people.",

  // Zechariah — 5 commentary clusters, 14 chapters
  "zechariah-1":
    "It is February 519 BCE, the second year of Darius I, and a young priest-prophet named Zechariah receives eight visions in a single night. The first vision opens with colored horses patrolling the earth on YHWH's behalf — Persian-period divine surveillance imagery drawn from Mesopotamian messenger traditions, not a preview of Revelation 6. The patrol reports that the earth is 'at rest,' and YHWH is distressed, not satisfied — the nations' peace has come at Judah's expense. Here's where it gets interesting: the vision's core claim is that YHWH is still governing, even in a world that looks settled under Persian control. The colored horses represent the four winds in ANE cosmological framing. They are not the four horsemen of Revelation, who appear 600 years later, by a different author, for a different audience. What the original audience would have understood is reassurance: divine agents are surveying the world, and YHWH's verdict is that Judah's suffering has not gone unnoticed.",
  "zechariah-2":
    "The third of Zechariah's night visions shows a man with a measuring line walking toward Jerusalem to map its dimensions. An angel intercepts him with a counter-message: stop measuring. Jerusalem will be inhabited as a city without walls — not because it is vulnerable, but because the multitude of people and animals will overflow any boundary, and YHWH himself will be 'a wall of fire around her and the glory in her midst.' Through this lens, the vision reframes the entire post-exilic rebuilding project. The returning community is laying foundations, measuring streets, planning defensible perimeters — standard Persian-period urban reconstruction. But the prophetic word says the future exceeds current measurement. The unwalled city is a sign of divine protection and expected expansion, not a defensive failure. What the original audience would have understood is that YHWH's presence replaces what stone walls cannot guarantee.",
  "zechariah-3":
    "In the fourth night vision, the high priest Joshua stands before the divine council in filthy garments while ha-satan — the accuser, with the Hebrew definite article — brings charges against him. This is not a cosmic adversary in the later theological sense. The definite article matters: ha-satan is 'the accuser,' a prosecuting attorney role within the divine court, the same function visible in Job 1-2. YHWH rebukes the accuser, strips Joshua of the filthy garments (representing the community's guilt and exile-contamination), and reclothes him in clean priestly vestments with the turban (tsanif). Then comes the Branch oracle: 'I am going to bring my servant the Branch (tzemach)' — a term built from the Hebrew root tsadi-mem-chet, distinct from Isaiah 11:1's netzer (nun-tsade-resh). The primary referent is Zerubbabel, the Davidic governor, with Jeremiah 23:5 as the primary cross-reference. Here's where it gets interesting: the vision simultaneously restores the priesthood and announces the royal counterpart.",
  "zechariah-4":
    "At the structural heart of the eight night visions stands a golden lampstand (menorah) with seven lamps and two olive trees flanking it. The interpreting angel identifies the two olive trees as 'the two bnei-yitzhar — sons of fresh oil — who stand beside the Lord of the whole earth.' This Zechariah-specific term describes Zerubbabel and Joshua: the Davidic governor and the Zadokite high priest, the dual leadership of post-exilic Yehud. The seven lamps are 'the eyes of YHWH, which range through the whole earth' — omniscient divine oversight of the restoration. Embedded in this vision is the oracle to Zerubbabel: 'Not by might, nor by power, but by my Spirit.' The great mountain — the combination of opposition, scarcity, and discouragement stalling the temple project — will become a plain before him. What the original audience would have understood is divine authorization of their two leaders and their rebuilding program, conveyed through sacred-furniture imagery they recognized from the tabernacle tradition.",
  "zechariah-5":
    "A flying scroll (megillah) sails through the air, twenty cubits by ten — the exact dimensions of Solomon's Temple vestibule. This is not an accident. The scroll is a temple-cleansing image: covenant law administered from the sacred center, going out across the land. One side curses thieves, the other curses perjurers — two violations of covenant treaty stipulations, echoing the curse sanctions found in Hittite and Neo-Assyrian suzerainty treaties. The scroll enters the houses of violators and consumes them. Then a second vision appears: a woman named Wickedness (rishah) sealed in an ephah-measure and carried by two winged women to Shinar (Babylon), where a house is built for her. Through this lens, the visions form a purification pair — covenant enforcement within the land and moral contamination physically removed from it. What the original audience would have understood is accountability: the rebuilt temple will be a center of covenant justice, not a blank slate.",
  "zechariah-6":
    "Four chariots emerge from between two mountains of bronze — YHWH's war vehicles dispatched to the four winds. Then the night visions end and a daylight oracle arrives: take silver and gold, make a crown (atarah), and set it on the head of Joshua the high priest. But the oracle calls the crowned figure tzemach — the same Branch title given to Zerubbabel in Zechariah 3:8. Here's where it gets interesting: the crown oracle merges priestly and royal identity in a single symbolic act. The atarah is distinct from the Greek stephanos (victory wreath) and diadema (royal band) — it is a uniquely Hebrew priestly-royal crown. The tzemach who will 'build the temple of YHWH and bear royal honor and sit and rule on his throne' is described in language that blends the roles of Zerubbabel and Joshua into a single anticipated figure. What the original audience would have understood is a vision of governance where priestly holiness and royal authority converge — a dual-leadership ideal crystallized in one prophetic image.",
  "zechariah-7":
    "It is December 518 BCE, and a delegation from Bethel arrives in Jerusalem with a question that sounds simple but carries seventy years of grief: 'Should we continue weeping and fasting in the fifth month, as we have done for so many years?' The fifth-month fast commemorated the destruction of Solomon's Temple in 586 BCE. YHWH's answer is not what they expected. Instead of a procedural ruling, Zechariah delivers a devastating counter-question: 'When you fasted for these seventy years, was it for me that you fasted?' This places Zechariah squarely in the prophetic cult-critique tradition — the same line that runs from Amos 5 ('I hate, I despise your feasts') through Micah 6 ('What does YHWH require?') through Isaiah 1 ('I cannot endure iniquity and solemn assembly') through Jeremiah 7 ('Do not trust in deceptive words'). What YHWH demands is not fasting but mishpat (justice) and hesed (covenant loyalty) — 'render true judgments, show kindness and mercy to one another' (7:9). The cult-critique is sharp: empty ritual without covenant behavior is self-serving performance.",
  "zechariah-8":
    "After the sharp rebuke of chapter 7, Zechariah 8 pivots to one of the most stunning reversal-promises in the prophetic tradition. The four mourning fasts — fourth, fifth, seventh, and tenth months, each marking a stage of Jerusalem's destruction — 'shall become seasons of joy and gladness and cheerful feasts' (8:19). Old men and women will again sit in Jerusalem's streets, and children will play in its squares. Nations will come streaming to Jerusalem, grasping the garment of a Judean and saying, 'Let us go with you, for we have heard that God is with you.' Through this lens, Zech 8 is eschatological restoration at its most concrete and beautiful — not abstract theology but aged couples resting safely, children playing freely, nations drawn to a renewed city. What the original audience would have understood is a promise that exceeds anything the post-exilic community could build by itself. This is not Second Temple realization — it is future Millennial language, a vision of wholeness (shalom) that the prophetic tradition consistently places in the age to come.",
  "zechariah-9":
    "Open Zechariah 9 and you encounter a war dispatch. An oracle traces a route: Hadrach, Damascus, Hamath, then south through Tyre, Sidon, and the Philistine plain — Ashkelon, Gaza, Ekron, Ashdod. It reads like a military communique, and there is a reason: Alexander the Great's 332 BCE campaign through the Levant followed the identical route. Then the tone shifts. Into the silence after conquest, a different kind of king appears: 'righteous and having salvation, humble (ani) and mounted on a donkey.' In the ancient Near East, the mount told you the intent — a warhorse meant conquest, a donkey meant peace. The ani/anav descriptor identifies the king with the afflicted, not the powerful. Here's where it gets interesting: in the same historical moment when Alexander demonstrates that horseback conquest reshapes the world, this oracle envisions a king who arrives without a horse, whose rule extends 'from sea to sea' through disarmament, not force. Matthew 21:5 applies this imagery to Jesus's Jerusalem entry — a significant act of reception history. But for the original audience, the verse's primary weight is post-conquest political hope: a peaceful Davidic king who undoes what the war machine has done.",
  "zechariah-10":
    "Following the peaceful-king oracle, Zechariah 10 expands the restoration vision. YHWH himself will be the true shepherd of the scattered flock, gathering the houses of Judah and Ephraim from exile among the nations. The teraphim (household idols) and diviners have given empty comfort — but YHWH will 'whistle for them and gather them in, for I have redeemed them.' The military imagery reverses: 'From him shall come the cornerstone, from him the tent peg, from him the battle bow' — not weapons of imperial oppression but instruments of covenant governance. What the original audience would have understood is the counterpoint to chapters 1-8: where the night visions addressed the community already in the land, chapter 10 addresses the scattered remnant still in exile. The promise of ingathering is not yet fulfilled in the post-exilic period. It stands as eschatological hope, continuous with the restoration trajectory of Zech 8.",
  "zechariah-11":
    "One of the most unsettling passages in the Hebrew Bible. Zechariah enacts a parable: he becomes the shepherd of 'the flock doomed to slaughter,' carrying two staffs — No'am (Favor, representing YHWH's covenant loyalty) and Chovelim (Union, representing the brotherhood of Judah and Israel). The shepherd allegory uses ANE royal-pastoral governance imagery: Hammurabi's law code opens with his self-description as 'shepherd of the people,' and Ezekiel 34 denounces failed shepherds at length. When the flock's merchants reject the shepherd, he breaks the first staff — the covenant is annulled. His wages are assessed at thirty silver pieces (kesef), the price of a slave gored by an ox in Exodus 21:32 — a contemptibly low valuation. YHWH instructs: 'Throw it to the potter (ha-yotzer).' Then the second staff is broken — national unity dissolved. Matthew 27:9-10 attributes this passage to Jeremiah, not Zechariah. R.T. France (NICNT Matthew) identifies this as anthological citation: Matthew is weaving together Zechariah 11:12-13 with Jeremiah 18-19 (the potter, ha-yotzer), using Jeremiah as the heading because the potter imagery belongs to his tradition.",
  "zechariah-12":
    "One of the most extraordinary and contested verses in the Hebrew Bible appears here: 'They shall look on me, on him whom they have pierced (daqar), and they shall mourn for him as one mourns for an only child (yachid).' Before anything else, the mourning context must be understood. Verse 11 compares the grief to 'the mourning of Hadad Rimmon in the plain of Megiddo' — a Northwest Semitic penitential mourning tradition of maximum cosmic significance, possibly also evoking the historical grief for King Josiah's death at Megiddo. The Hebrew daqar means literal physical piercing (Num 25:8, Judg 9:54, 1 Sam 31:4). The Masoretic Text reads elai — 'on me' — in the first person, while the Septuagint renders the pronoun in the third person. Boda (NICOT) and Meyers-Meyers (Anchor Bible) treat the MT as the earlier, more difficult reading (lectio difficilior). The question of whether YHWH is speaking of himself as the pierced figure remains one of the most debated interpretive questions in Hebrew Bible scholarship. John 19:37 applies this passage to the crucifixion as NT reception history.",
  "zechariah-13":
    "A fountain (maqor) opens for the house of David and the inhabitants of Jerusalem 'to cleanse them from sin and uncleanness.' The Hebrew maqor connects to Levitical purification imagery — mayim chayyim (living water) used in the rituals of Numbers 19:17 and Leviticus 15:13. This is not metaphorical decoration; it is priestly vocabulary applied to communal purification on a national scale. Through this lens, the fountain of Zech 13:1 is the ritual-purification answer to the mourning of Zech 12:10-14 — the grief over the pierced one leads directly to cleansing. Then a sharp turn: 'Strike the shepherd, and the sheep will be scattered' (13:7). The shepherd motif from chapters 9-11 returns in its darkest form. Two-thirds will be cut off, one-third refined through fire. What the original audience would have understood is a purification theology that moves from mourning through cleansing through suffering — the mayim chayyim of 13:1 connecting forward to the living waters of 14:8.",
  "zechariah-14":
    "The Day of the LORD arrives in full force. 'Behold, a day is coming for YHWH when the spoil taken from you will be divided in your midst. For I will gather all the nations against Jerusalem to battle' (14:1-2). The military imagery is severe: the city captured, houses plundered, half the population going into exile. Then YHWH's feet stand on the Mount of Olives, which splits east-west, and 'living waters (mayim chayyim) shall flow out from Jerusalem, half to the eastern sea and half to the western sea' (14:8). The partial preterist reading is important here: the siege imagery of 14:1-5 has its primary historical referent in the 70 CE Roman siege. But YHWH's universal reign — 'YHWH will be king over all the earth; on that day YHWH will be one and his name one' (14:9) — and the Sukkot pilgrimage of the nations (14:16-19) are future eschatological language, consistent with the Millennial framework. What the original audience would have understood is that not all of Zechariah 14 collapses into a single historical moment. The Day of the LORD contains both judgment accomplished and reign anticipated.",

  // Psalms — 10 commentary chapters
  "psalms-2":
    "What did 'You are my son; today I have begotten you' mean in the ancient Near East? Explore the ANE coronation adoption formula -- a performative declaration of royal status, not a statement about ontological origins.",
  "psalms-8":
    "What does ben enosh -- 'son of man' as mortal human -- reveal about Psalm 8's vision of humanity? This creation praise psalm situates human dignity within the cosmic temple, with Hebrews 2 as later reception history.",
  "psalms-22":
    "Why does Psalm 22 open with 'My God, my God, why have you forsaken me?' The individual lament structure -- complaint, petition, vow of praise -- shapes every line. The NT quotations are typological reception, not the psalm's original purpose.",
  "psalms-23":
    "What did the shepherd metaphor communicate in the ancient Near East? Shepherd-king royal ideology, tsalmaveth as 'deep darkness' rather than 'shadow of death,' and the dramatic voice-shift at verse 4 that changes everything.",
  "psalms-45":
    "Is Psalm 45:6 addressing the king as God? The Hebrew grammar allows both the vocative reading ('Your throne, O God') and the Harris predicate analysis ('Your throne is God-like'). Here's where it gets interesting: both readings coexist in the original.",
  "psalms-51":
    "What does ruach mean in Psalm 51 -- and why does it matter? The penitential psalm's three uses of ruach point to divine presence and animating breath, consistent with Psalm 139, rooted in the Thirteen Attributes tradition.",
  "psalms-82":
    "Who are the elohim being judged in Psalm 82? The heavenly court scene -- not human judges -- where YHWH's council members face condemnation. The word ke-adam ('like mortals') proves the beings addressed are non-human.",
  "psalms-89":
    "Why does the Psalter's most confident covenant promise end in theological crisis? Psalm 89 moves from Ugaritic Rahab combat imagery and Hittite treaty form to an unresolved lament -- the covenant's hardest question left open.",
  "psalms-110":
    "What does adoni -- a human honorific used 335 times in the Hebrew Bible, never for God -- reveal about the most-cited Old Testament verse in the New Testament? The ANE royal enthronement oracle, Melchizedek, and why NT citations are reception history.",
  "psalms-139":
    "What does 'you knit me together in my mother's womb' communicate about divine knowledge? Psalm 139's ruach vocabulary -- consistent with Psalm 51 -- frames creation in the womb as intimate relational knowledge, not surveillance.",

  // Jeremiah — 8 commentary clusters, 9 chapters
  "jeremiah-1":
    "What does it mean when YHWH says 'Before I formed you in the womb I knew you'? The answer lies not in metaphysics but in genre — Jeremiah 1 is a berufungsbericht, a prophetic call narrative with direct parallels in the commissioning of Moses (Exodus 3-4) and Isaiah (Isaiah 6). The Hebrew verb yadati functions here as a covenant designation term — the same verb Amos uses in 'You only have I known of all the families of the earth' (Amos 3:2). Through this lens, Jeremiah's call follows a four-element structure — divine confrontation, prophetic resistance, divine reassurance, and sign confirmation — placing it squarely within the ANE tradition of royal and prophetic commissioning texts. The chapter opens under the shadow of Josiah's reform and the rising Neo-Babylonian threat, framing Jeremiah's entire ministry as a commission 'over nations and over kingdoms, to pluck up and to pull down, to destroy and to overthrow, to build and to plant' (1:10).",
  "jeremiah-7":
    "When Jeremiah stood in the gate of the temple and said 'Do not trust in these deceptive words: The temple of YHWH, the temple of YHWH, the temple of YHWH,' he was making an argument from archaeology before archaeology existed. His precedent was Shiloh — the earlier sanctuary where the Ark once dwelled. Tel Seilun excavations confirm a destruction layer from the mid-eleventh century BCE, giving Jeremiah's audience a physical reminder that YHWH's presence was never guaranteed by a building. The phrase 'den of robbers' (Jer 7:11) — later quoted by Jesus in the temple courts — originates here as Jeremiah's indictment of a people who treat the temple as a talisman while breaking covenant. The sermon reframes temple theology: the institution is not the guarantee; covenant fidelity is.",
  "jeremiah-18":
    "The potter's house visit in Jeremiah 18 is the first half of a carefully constructed diptych — a two-part literary unit with Jeremiah 19. At the potter's wheel, Jeremiah watches a vessel being reshaped while still wet, and YHWH draws a lesson about conditional covenant logic: the clay that has not yet hardened can be reworked. Read through the ANE suzerain-vassal treaty framework, this is not a statement about divine determinism but about covenant conditionality — the same 'if...then' structure found in Hittite and Assyrian treaty curses. The vessel on the wheel still has a future because the terms of the treaty have not yet been irrevocably broken.",
  "jeremiah-19":
    "Jeremiah 19 completes the potter's diptych begun in chapter 18 — but this time the vessel is fired clay, and the action is irreversible. Jeremiah takes a completed flask to the Valley of Ben Hinnom (Topheth) and shatters it before the elders with the declaration that what is hardened cannot be remade. Where chapter 18 offered conditional hope at the potter's wheel, chapter 19 delivers irrevocable judgment in the valley. The two chapters together establish the full arc of covenant logic: grace before hardening, judgment after. The smashed flask becomes Jeremiah's most vivid prophetic sign-act.",
  "jeremiah-23":
    "What did 'Behold, the days are coming' mean to an audience watching the last Davidic kings fail? Jeremiah 23 opens with an indictment of the shepherds who scattered YHWH's flock — Jehoiakim, Jehoiachin, and Zedekiah named implicitly as the failed leadership — before delivering the Branch oracle: YHWH will raise up a tzemach tsaddiq, a 'righteous Branch.' Here's where it gets interesting: the reigning king's own name, Tsidqiyahu ('YHWH is my righteousness'), becomes the primary interpretive key. The oracle's throne name YHWH Tsidkenu inverts the king's name as a deliberate contrast — what Zedekiah failed to be, the coming Branch will embody. This is the source tradition that Zechariah 3:8 and 6:12 later draw upon, not the reverse. The 23:6/33:16 pronoun shift — from 'he' (the king) to 'she/it' (Jerusalem) — demonstrates ANE royal-corporate solidarity, extending the throne name to the community.",
  "jeremiah-29":
    "Everyone knows 'For I know the plans I have for you' — but almost no one reads the sentence that precedes it. Jeremiah 29 is a letter addressed to a specific community: the 597 BCE deportees living in Babylon after Nebuchadnezzar's first siege. The command is not passive optimism but an active mandate — darash shalom, 'seek the welfare of the city where I have sent you into exile.' The Hebrew root d-r-sh carries the weight of active inquiry and pursuit, not passive goodwill. Daniel 1 reads as a narrative embodiment of this ethic — a young exile seeking the welfare of a foreign court. The seventy-year timeline (29:10) anchors the promise in a specific horizon, and the communal addressee means the famous verse 29:11 is a covenant promise to a displaced people, not an individual prosperity guarantee.",
  "jeremiah-31":
    "The phrase berit chadasha — 'new covenant' — appears exactly once in the entire Hebrew Bible, here in Jeremiah 31:31. That makes it a hapax legomenon, and the rarity matters: when Jeremiah reaches for language no prophet has used before, the audience knows something unprecedented is being announced. The covenant is addressed explicitly to 'the house of Israel AND the house of Judah' — a politically specific two-house formulation, not a generic spiritual audience. Its four stipulations — Torah internalized (31:33a), renewed covenant relationship (33b), universal direct knowledge of YHWH through yadah (34a), and forgiveness of sin (34b) — describe a covenant that transforms how people relate to divine instruction. Ezekiel 36:26-27 develops a companion vision from the same exilic context using different vocabulary (new heart, new spirit). The third stipulation — universal knowledge — maps to the eschatological consummation that has not yet been fully realized. Hebrews 8-10 applies this passage typologically to an inaugurated phase of the covenant, but the two-house address remains the primary scope.",
  "jeremiah-36":
    "Jeremiah 36 is the Bible's own story about how the Bible was written. When King Jehoiakim cuts apart Jeremiah's scroll and burns it column by column in the brazier, the text reports what happened next: Baruch the scribe re-dictated the entire scroll 'and many similar words were added' (36:32). Through this lens, the chapter becomes a meta-commentary on textual transmission — the same process of dictation, destruction, and expansion that scholars observe between the shorter Septuagint and longer Masoretic editions of Jeremiah itself. Baruch's role as amanuensis is now corroborated by the Baruch Bulla — a clay seal impression reading 'Belonging to Berekhyahu son of Neriyahu the scribe' — providing direct archaeological attestation of the figure behind the text.",
  "jeremiah-52":
    "Jeremiah 52 begins immediately after the editorial marker 'Thus far are the words of Jeremiah' at 51:64 — a signal that what follows is not Jeremiah's own composition but a Deuteronomistic appendix added by later editors. The chapter parallels 2 Kings 25 nearly verbatim, recounting the fall of Jerusalem, the destruction of the temple, and the deportation lists. But it ends with a detail 2 Kings shares and that transforms the entire book's conclusion: the release of King Jehoiachin from Babylonian prison and his elevation to eat at the king's table. Corroborated by cuneiform ration tablets listing provisions for 'Yaukin, king of Yahud,' this closing coda functions as the Deuteronomistic History's final note of hope — exile is not the last word.",

  // Job — 4 RAG clusters, 10 commentary chapters
  "job-1":
    "What was actually happening in the divine council scene that opens Job? The ha-satan figure — 'the accuser' with the Hebrew definite article — holds a prosecuting attorney role in YHWH's court, not the cosmic adversary of later theology. Here's where it gets interesting: the Wisdom Literature genre signals from the first verse that this prose frame is teaching device, not biography.",
  "job-2":
    "What happens when the ha-satan returns to the divine council for a second challenge? Job 2 escalates from possessions to body — 'skin for skin' — and Job's wife speaks the line the narrator refuses to endorse. Through this lens, the second council scene tests whether the reader will side with the accuser's logic or the narrator's verdict.",
  "job-3":
    "Why does Job 3 shift from prose to poetry — and what does the 'why was I born?' lament mean in the wisdom tradition? The curse of the birthday echoes Jeremiah 20:14-18 and signals that this is not sinful rebellion but the most extreme form of legitimate grief in ancient Israelite literature.",
  "job-19":
    "What does goel mean in Job 19:25 — and who is the 'Redeemer' who lives? The legal advocate trajectory from mokiach (9:33) through ed/witness (16:19) to goel (19:25) reveals an escalating legal advocacy, not a spiritual confession. The text deliberately leaves the vindicator's identity open.",
  "job-28":
    "Where can wisdom be found? Job 28's Hymn to Wisdom uses a three-strophe mining illustration to pose the question humanity cannot answer — then delivers the book's own thesis: 'the fear of the Lord, that is wisdom.' This structural midpoint speaks before the divine speeches arrive.",
  "job-38":
    "What is YHWH actually saying from the whirlwind in Job 38? The creation survey — from the sea's boundaries to the storehouses of snow — reframes Job's suffering without answering it. These are not trick questions; they are an invitation to see the cosmos from the Creator's perspective.",
  "job-39":
    "Why does YHWH's first divine speech continue with wild animals Job cannot domesticate? The mountain goat, the wild donkey, the ostrich, the war horse — each creature demonstrates that the cosmos operates on purposes beyond human utility or comprehension.",
  "job-40":
    "Who is Behemoth in Job 40? The intensive plural behemot signals a primordial category — 'the Animal' — not a species identification. Through this lens, Behemoth is the land chaos creature, the counterpart to Leviathan's sea domain, drawn from ANE mythology the original audience would have recognized.",
  "job-41":
    "Who is Leviathan in Job 41 — and why does the Ugaritic Lotan cognate matter? The seven-headed sea dragon of Chaoskampf tradition is the creature YHWH claims mastery over. This is not a crocodile; it is the chaos monster that only the Creator can subdue.",
  "job-42":
    "What does YHWH's verdict in Job 42:7 actually say? 'You have not spoken of me what is right, as my servant Job has' — the friends' retribution theology is explicitly rebuked. The restoration that follows is grace, not reward, and does not vindicate the framework Job spent 40 chapters dismantling.",

  // Proverbs — 7 RAG clusters, 9 commentary chapters
  "proverbs-1":
    "What does 'the fear of the LORD is the beginning of wisdom' actually mean in its ancient setting? Proverbs 1 opens as a father's instruction to a son — a recognized genre in ancient Near Eastern wisdom literature called sebayt, the Egyptian instructional tradition that stretches from Ptahhotep to Amenemope. The thesis statement of 1:7, yir'at YHWH, is not about terror; it is an epistemological claim — wisdom begins with a posture of reverence toward the cosmic order YHWH established, not with raw intelligence or technique. Here's where it gets interesting: Woman Wisdom makes her first appearance in 1:20-33, crying out in the public square. What the original audience would have understood is that this is a literary personification — the same move Egyptian wisdom tradition made with Maat, the goddess of cosmic order. Woman Wisdom is not a supernatural being or a proto-Christ figure; she is the voice of the moral order itself, given dramatic form to compete with Woman Folly for the son's allegiance. The father-son instruction frame that opens Proverbs is the oldest classroom in the world — and its thesis is that wisdom is not a skill to acquire but a relationship to enter.",
  "proverbs-7":
    "Who is the 'strange woman' of Proverbs 7 — and what is the bridal-courtship spine threading through chapters 1-9? The midnight-streets vignette of Proverbs 7 is the literary climax of the prologue's warning sequence: the father watches from a window as a naive young man walks into Woman Folly's trap. Here's where it gets interesting: this is not simply a warning about sexual temptation. It is the penultimate act in a carefully constructed courtship narrative. Chapters 1-9 present the son with two women and demand a choice — court Wisdom or court Folly. The father's pedagogy is deliberate: he warns the son away from Folly in chapter 7 precisely to prepare him for Woman Wisdom's cosmogonic speech in chapter 8. What the original audience would have understood is that the 'strange woman' (ishah zarah) functions as the literary counterpart to Woman Wisdom — the anti-Maat figure, representing disorder where Wisdom represents cosmic order. The entire prologue builds toward a single decision point: whom will the son choose to embrace?",
  "proverbs-8":
    "What is Woman Wisdom actually claiming in Proverbs 8:22-31 — and why does the Hebrew qanah point to bridal-acquisition language rather than the creation (Arian) or eternal possession (Nicene) that later theological traditions read into it? This is the most theologically contested chapter in all of Proverbs, and the contest itself is revealing. The cosmogonic speech of 8:22-31 presents Woman Wisdom as present at creation — the cosmic ordering principle personified, dancing before YHWH as the world takes shape (8:30). What the original audience would have understood is the Egyptian Maat parallel: cosmic order given literary voice, a figure who stands beside the creator as the world is arranged. The Hebrew verb qanah in 8:22 belongs to the semantic field of Ruth 4:10 — bridal-acquisition language — which closes the courtship spine that opened in chapter 1. Here's where it gets interesting: the reception history is enormous. Sirach 24 identifies Wisdom with Torah; the Wisdom of Solomon fuses her with divine spirit; Philo maps her onto Logos; John 1 opens with 'In the beginning was the Word.' But reception history is not primary meaning. The gendered grammar matters — Wisdom is 'she' throughout Proverbs, and the courtship frame makes a pre-existent Christ reading structurally incoherent. The grammar breaks before the theology can land.",
  "proverbs-10":
    "Why does the antithetical parallelism of Proverbs 10 present deed-consequence as observed pattern rather than divine guarantee? Chapter 10 marks the shift from the extended discourse of chapters 1-9 to the sentence proverbs — short, self-contained two-line sayings that constitute the bulk of the book. Here's where it gets interesting: every saying in this chapter works by contrast. The righteous versus the wicked, the wise versus the foolish, wealth versus poverty, speech versus silence — the antithetical form itself communicates the worldview. What the original audience would have understood is that these are the conclusions of generations of careful observation by the sages of ancient Israel and the broader ANE wisdom tradition. 'The LORD does not let the righteous go hungry' (10:3) is what the sages observed to be generally true — not a contractual guarantee that YHWH will intervene in every individual case. This distinction matters enormously because Proverbs' deed-consequence framework is precisely the theology Job's friends articulate — and which YHWH rebukes in Job 42:7. Proverbs says wisdom tends to flourish; Job says the tendency is not a guarantee. Together they define the honest space of Wisdom Literature.",
  "proverbs-16":
    "What does Proverbs 16:9 reveal about YHWH's sovereignty over royal plans? 'The heart of man plans his way, but YHWH establishes his steps' — this is the theological center of the royal wisdom cluster that runs from chapter 16 through 22:16. Here's where it gets interesting: chapter 16 sits at the editorial center of this collection, and the concentration of YHWH-sayings is no accident. The sages placed the sovereignty sayings at the structural heart of the royal wisdom tradition to frame everything that follows. What the original audience would have understood is that the sentence proverbs shift form here — from the strict antithetical parallelism of chapters 10-15 to synonymous and comparison forms ('Better a little with righteousness than much gain with injustice,' 16:8). The royal context is explicit: kings, counselors, just weights, and the administration of justice dominate this cluster. The 16:9 saying does not teach determinism; it teaches that wisdom works within the reality of YHWH's governance — human planning is real but not ultimate. The sages observed that even the best-laid plans of kings operate within a larger framework they do not control.",
  "proverbs-22":
    "What is the Amenemope parallel in Proverbs 22:17 — and why is this the strongest case of ANE literary dependency in the entire Hebrew Bible? The section beginning at 22:17 with 'Incline your ear and hear the words of the wise' opens the most significant cross-cultural literary connection in the wisdom tradition. Here's where it gets interesting: the Hebrew word shalishim in 22:20 — traditionally rendered 'excellent things' — almost certainly means 'thirty,' directly paralleling the thirty chapters of the Egyptian Instruction of Amenemope preserved on BM Papyrus 10474. The structural correspondence is not a coincidence or a vague thematic similarity: specific sayings in Proverbs 22:17-24:22 map onto specific chapters of Amenemope in sequence. What the original audience would have understood is that Israel's sages were not working in isolation. They were actively engaging with the best wisdom of the ancient Near East — borrowing, adapting, and reframing Egyptian instruction within a YHWH-centered theological framework. This is not an apologetic problem to minimize; it is evidence of how wisdom crossed cultural borders in the ANE world.",
  "proverbs-23":
    "How do the warning speeches of Proverbs 23 map onto the instruction chapters of the Egyptian Amenemope — and what does parallel structure tell us about how wisdom crossed cultural borders? The Amenemope literary dependency continues into Proverbs 23 with some of the most specific parallels in the collection. The warning against eating at a ruler's table (23:1-3) corresponds to Amenemope's chapter on dining with a superior. The drunkard passages (23:29-35) follow the same structural sequence as their Egyptian counterparts. Here's where it gets interesting: the parallels are not just thematic — they follow the same order, suggesting the Israelite compiler had access to an Amenemope source text or a closely related Egyptian instruction. What the original audience would have understood is that reframing foreign wisdom within YHWH-centered theology was not plagiarism but standard practice in the ANE scribal world. The sages took what was observationally true in Egyptian wisdom and set it within the covenant framework of Israel — the same God who governs the moral order the Egyptians also observed.",
  "proverbs-25":
    "What does the editorial superscription in Proverbs 25:1 — 'these also are proverbs of Solomon that the men of Hezekiah king of Judah copied' — reveal about how biblical wisdom was transmitted? This is one of the most historically revealing verses in the entire book. The 'men of Hezekiah' are royal scribes working in the late eighth century BCE, and their act of copying is itself evidence of the editorial process behind the Hebrew Bible. Here's where it gets interesting: the verb he'etiqu ('copied, transmitted') tells us that the Proverbs collection as we have it is the product of deliberate scribal activity across centuries — not a single moment of Solomonic composition but a tradition that grew, was curated, and was transmitted by institutional hands. What the original audience would have understood is that wisdom was preserved by the same scribal infrastructure that produced the royal archives. The comparative proverb form that dominates this section ('Like snow in summer or rain in harvest, so honor is not fitting for a fool,' 26:1) represents a distinct literary style — the 'Like X, so Y' pattern that characterizes the Hezekian collection.",
  "proverbs-31":
    "Who is the eshet chayil — the 'woman of valor' — in Proverbs 31, and why does the Hebrew chayil refuse to let this poem become a domesticity prescription? The word chayil appears throughout the Hebrew Bible as military vocabulary — gibbore chayil ('mighty warriors'), tzeva chayil ('army of valor'). When the closing poem of Proverbs calls its subject eshet chayil, it is reaching for the strongest word the language has for strength, capacity, and power. Here's where it gets interesting: the 22-line acrostic structure (each line beginning with a successive letter of the Hebrew alphabet) signals that this is a carefully composed literary portrait, not a spontaneous description of an actual woman. What the original audience would have understood is the inclusio — the literary bracket with chapter 8. Woman Wisdom cries out in the public square in Proverbs 1 and 8; Woman of Valor closes the book in chapter 31. The bridal-courtship spine that opened in the prologue is here brought to resolution: the son who was told to seek Wisdom has found her — embodied, active, powerful, praised at the city gates. The 'virtuous wife' translation deflates the vocabulary. This is Wisdom incarnate in the world the cosmos built.",

  // Ecclesiastes — 5 RAG clusters, 11 commentary chapters
  "ecclesiastes-1":
    "What does hebel actually mean — and why does the difference between 'meaningless' and 'vapor' reshape everything Ecclesiastes says? The opening line of Ecclesiastes — hebel hebalim, 'vapor of vapors' — is the thesis statement of the entire book. The Hebrew noun hebel literally means breath or vapor: something real, observable, and present, but transient and ungraspable. You can see your breath on a cold morning; you cannot hold it. That sensory image is Qoheleth's central metaphor for human endeavor. The NIV's 'meaningless' and the KJV's 'vanity' flatten this vivid Hebrew metaphor into an abstract nihilistic verdict. Qoheleth is not saying nothing matters; he is saying nothing can be grasped permanently. Here's where it gets interesting: Qoheleth is a literary persona — the name means 'the assembler' or 'the one who convenes.' The royal framing of 1:12 ('I, Qoheleth, was king over Israel in Jerusalem') is a rhetorical device, not autobiography. The sage adopts the persona of the ultimate wealth-and-wisdom possessor to test whether privilege resolves the hebel problem. The cosmological poem of 1:4-11 frames the thesis with ANE cyclic observation — sun, wind, and rivers as recurring natural phenomena observed 'under the sun,' the realm of human experience bounded by the heavens above.",
  "ecclesiastes-2":
    "What happens when the richest, wisest person in the world runs the ultimate experiment — and finds that even privilege cannot resolve the hebel problem? The royal experiment of 1:12-2:26 is the most extensive literary thought experiment in the Hebrew Bible. Qoheleth adopts the persona of a king who commands unlimited resources and tests whether wisdom, pleasure, grand building projects, or accumulated wealth can produce yitron — lasting profit, a permanent gain that outlasts the vapor. The verdict is devastating: there is no yitron under the sun. Here's where it gets interesting: this is not nihilism. Qoheleth distinguishes sharply between yitron (lasting profit — which he denies exists) and heleq (allotted portion — which he affirms as a gift from God). The difference matters enormously. What the original audience would have understood is that the sage is not saying life is worthless; he is saying that the attempt to extract permanent advantage from transient experience is the category error. The constructive response emerges already in 2:24-26: eating, drinking, and finding enjoyment in one's toil is the heleq — the creaturely good one can actually hold, not as permanent possession but as present gift.",
  "ecclesiastes-3":
    "What does 'a time for everything' actually mean in its ancient context — and why is it observational wisdom, not a divine masterplan? The fourteen antithetical pairs of Ecclesiastes 3:1-8 — a time to be born and a time to die, a time to plant and a time to uproot — are among the most quoted lines in the Hebrew Bible. But what the original audience would have understood is that these are observations about the rhythms of the human condition, not a theological claim that God micromanages every event. Qoheleth is describing what he sees in the created order: life has seasons, and those seasons come and go whether you welcome them or not. This is wisdom observation about the structure of lived experience, not Calvinist providentialism. Here's where it gets interesting: 3:11 introduces the word olam — variously translated 'eternity,' 'long duration,' or 'the world.' 'He has made everything beautiful in its time. He has also set olam in the human heart; yet no one can fathom what God has done from beginning to end.' The emphasis falls on the limitation: 'yet they cannot fathom.' The human heart longs for comprehensive understanding — olam as the ache for transcendence — but the capacity to grasp the whole is precisely what is denied. This is not proof of an immortal soul; it is the observation that humans are wired to want more than they can see. Through this lens, 3:19-21 becomes the mortality observation that completes the picture: humans and animals share the same death, the same breath (ruah), the same return to dust. Qoheleth asks 'who knows whether the human spirit rises upward and the spirit of the animal goes down?' — a rhetorical question that resists answering what cannot be observed from under the sun.",
  "ecclesiastes-5":
    "What does Qoheleth's temple speech reveal about ancient Israelite worship — and why does 'guard your steps when you go to the house of God' cut against modern casual piety? Ecclesiastes 5:1-7 is the only explicit cultic instruction in the entire book. Where Qoheleth elsewhere speaks as sage-observer, here he speaks with the directness of a wisdom teacher issuing a command: guard your steps, let your words be few, do not be hasty with your mouth before God. The instruction centers on vow theology (neder): when you make a vow to God, fulfill it — better not to vow at all than to vow and not pay. Here's where it gets interesting: this is not generic piety advice. In the ancient Israelite temple context, a neder was a binding legal-religious obligation. Breaking a vow was not merely disappointing; it carried real consequences in the covenantal framework. What the original audience would have understood is that Qoheleth is addressing a specific institutional practice — the making and keeping of sacred vows — with the same unflinching realism he brings to everything else. Words before God should be few because God is in heaven and you are on earth. The asymmetry is the point.",
  "ecclesiastes-6":
    "Why does Qoheleth observe that a man can have a hundred children and live many years, yet if his appetite is not satisfied, a stillborn child is better off? The wealth critique of 5:10-6:9 is Qoheleth's most sustained examination of the gap between accumulation and enjoyment. The problem is not wealth itself but the inability to enjoy it — having much without having heleq, the capacity to take pleasure in one's allotted portion. Here's where it gets interesting: the 'better than' proverbs of this section — 'better a stillborn child than a man who cannot enjoy his prosperity' — are deliberately provocative. They are designed to shock the listener into recognizing that possession without enjoyment is worse than non-existence. What the original audience would have understood is that Qoheleth is distinguishing between two categories the modern world often collapses: having and enjoying. Through this lens, the wealth critique is not anti-wealth; it is anti-accumulation-without-presence. The sage observes that appetite (nephesh) is never satisfied, that the eye is never filled — and that this restless grasping is the hebel condition at its most acute.",
  "ecclesiastes-7":
    "What does 'who can find out?' mean as a refrain — and why does Qoheleth's observation that 'God made mankind upright, but they have sought out many schemes' resist being read as a fall-of-man doctrine? The controlling question of Ecclesiastes 7 is the refrain 'who can find out?' — repeated to mark the boundary of human wisdom. Qoheleth tests the limits of wisdom and finds them real: 'I said, I will be wise, but it was far from me. That which has been is far off, and deep, very deep — who can find it out?' Here's where it gets interesting: 7:29 uses the Hebrew words yashar (upright, straight) and heshbon (schemes, devices, calculations). 'God made mankind yashar, but they have sought out many heshbon.' What the original audience would have understood is that this is Qoheleth's observational register, not a fall-of-man doctrine imported from Genesis 3. The echo of Genesis 1:31 ('God saw all that he had made, and it was very good') is present — creation goodness is affirmed. But Qoheleth's point is about human complexity, not about a historical fall event. Humanity was made straightforward; humanity has become complicated. That is an observation about the human condition, not a systematic theology of original sin.",
  "ecclesiastes-8":
    "Why does Qoheleth's endorsement of joy in 8:15 — 'I commend enjoyment' — function as positive ANE creaturely wisdom rather than resignation? Ecclesiastes 8:15 is the clearest and most direct of Qoheleth's joy commands: 'So I commend enjoyment, for there is nothing better for a person under the sun than to eat and drink and be glad, for this will accompany them in their toil throughout the days of their life that God has given them under the sun.' Here's where it gets interesting: this is not hedonism, not resignation, and not a consolation prize. This is the constructive response to the hebel observation. The sage commends enjoyment precisely because the cosmos is not fully comprehensible — and the correct response to inscrutability is not paralysis but present engagement. The direct ANE parallel is the Siduri speech in the Gilgamesh epic (Tablet X, Old Babylonian version): 'When the gods created mankind, they allotted death to mankind, but life they retained in their own keeping. As for you, Gilgamesh, let your belly be full, make merry day and night.' What the original audience would have understood is that Qoheleth stands in this ancient tradition of creaturely wisdom — the sage who has looked at mortality squarely and commends joy not despite death but because of it.",
  "ecclesiastes-9":
    "What does 'the living know that they will die, but the dead know nothing' mean in its original context — and why is this a mortality observation, not an ontological claim about the soul? Ecclesiastes 9:1-6 is the death-as-equalizer passage that has generated more theological anxiety than almost any other in the Wisdom Literature corpus. The righteous and the wicked, the clean and the unclean, those who sacrifice and those who do not — 'one fate comes to all.' Here's where it gets interesting: Qoheleth's observation that 'the dead know nothing, and they have no more reward, and even the memory of them is forgotten' (9:5) is a phenomenological statement about what is observable from under the sun. It is not a systematic treatise on the soul's ontology. Do not project annihilationism, soul sleep, or conscious afterlife onto this text. Qoheleth is describing what the living can see: the dead no longer participate in anything under the sun. Through this lens, the carpe diem commands of 9:7-10 are not a desperate pivot away from death but the sage's positive counsel in full view of mortality: 'Go, eat your bread with joy, and drink your wine with a merry heart, for God has already approved what you do. Let your garments always be white. Let not oil be lacking on your head. Enjoy life with the wife whom you love.' This is the most tender passage in Ecclesiastes — the sage at his most humane, commending present joy as the creaturely good that death cannot retroactively erase.",
  "ecclesiastes-10":
    "How does Ecclesiastes 10 function as practical wisdom delivered under the shadow of the death-equalizer observation — and why do the proverbs about fools, rulers, and chance operate differently from the Proverbs of Solomon? The practical wisdom sayings of Ecclesiastes 10 — dead flies in perfumer's ointment, the folly of a ruler's anger, the snake that bites before it is charmed — are delivered after the death-equalizer frame of chapter 9 has been established. This context changes everything. What the original audience would have understood is that these are wisdom-under-hebel, not wisdom-as-guarantee. Where Proverbs presents its sentence sayings as observed patterns that tend to hold, Qoheleth's proverbs operate in the register of 'even so' — even knowing that death equalizes all, here is how the wise person navigates the world. Through this lens, the observation that 'time and chance happen to them all' (9:11) is the controlling frame for chapter 10's practical advice. The sage offers wisdom not because it guarantees outcomes but because it is the appropriate posture for creatures who cannot control the cosmos.",
  "ecclesiastes-11":
    "What does 'send your bread upon the waters' mean — and why is Qoheleth's final instruction to 'rejoice, young person, in your youth' the climactic carpe diem command of the entire book? Ecclesiastes 11:1-6 counsels risk-taking in the face of uncertainty: send your bread upon the waters, for after many days you may find it again. Divide your portion among seven or even eight, for you do not know what disaster may come upon the land. The sage's advice is not recklessness but diversified engagement — act generously and broadly because the future is unknowable. Here's where it gets interesting: 11:7-10 is the book's climactic positive command. 'Light is sweet, and it is pleasant for the eyes to see the sun. Rejoice, young person, in your youth, and let your heart cheer you in the days of your youth.' This is ANE creaturely wisdom at its most direct, with parallels in the Siduri speech tradition of the Gilgamesh epic. What the original audience would have understood is that this is not hedonism or resignation — it is the sage's final constructive word before the aging allegory of chapter 12 closes the book. Enjoy while you can, not because life is trivial, but because it is fleeting.",
  "ecclesiastes-12":
    "What is the aging allegory of Ecclesiastes 12 — and why does 'the spirit returns to God who gave it' reverse Genesis 2:7 rather than promise conscious afterlife? The aging allegory of 12:1-7 is the most sustained piece of extended metaphor in Ecclesiastes: the grinders cease because they are few, the doors on the street are shut, the sound of the grinding is low, one rises up at the sound of a bird, the almond tree blossoms white, the grasshopper drags itself along. What the original audience would have understood is that every image maps onto the aging body — teeth, ears, hair, vitality — in a poetic catalogue of mortal decline. Here's where it gets interesting: 12:7 is the theological crux of the entire book. 'The dust returns to the ground it came from, and the spirit returns to God who gave it.' This directly reverses Genesis 2:7, where YHWH formed the human from dust and breathed the breath of life (nishmat hayyim) into its nostrils. At death, the act of creation is undone: dust to dust, breath (ruah) back to the one who breathed it. This is not saying 'the soul goes to heaven' or 'we will be with God when we die.' It is saying the animating life-force returns to its source — the creation is disassembled. Through this lens, the epilogue narrator of 12:9-14 performs a canonical editorial move: 'Fear God and keep his commandments, for this is the whole duty of humanity.' The narrator steps outside Qoheleth's voice to anchor the book's radical observations within the broader wisdom-and-Torah framework — a framing device the original audience would have recognized as the compiler's last word, not Qoheleth's.",
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

// Total: 41 + 33 + 47 + 14 = 135 chapters (all COMMENTARY_DESCRIPTIONS keys covered)
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
      "zechariah-1", "zechariah-2", "zechariah-3", "zechariah-4", "zechariah-5", "zechariah-6",
      "zechariah-9", "zechariah-10", "zechariah-11", "zechariah-12", "zechariah-13", "zechariah-14",
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
      "exodus-25", "exodus-26", "exodus-27",
      "psalms-8", "psalms-82", "psalms-139",
      "job-1", "job-2", "job-38", "job-39", "job-40", "job-41",
      "proverbs-8", "proverbs-31",
      "ecclesiastes-1", "ecclesiastes-3", "ecclesiastes-7",
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
      "exodus-3", "exodus-12", "exodus-14", "exodus-19", "exodus-20", "exodus-32", "exodus-33", "exodus-34",
      "zechariah-7", "zechariah-8",
      "psalms-23", "psalms-51", "psalms-89",
      "jeremiah-1", "jeremiah-29", "jeremiah-31", "jeremiah-36", "jeremiah-52",
      "job-3", "job-19", "job-28", "job-42",
      "proverbs-1", "proverbs-7", "proverbs-10", "proverbs-16", "proverbs-22", "proverbs-23", "proverbs-25",
      "ecclesiastes-2", "ecclesiastes-5", "ecclesiastes-6", "ecclesiastes-8", "ecclesiastes-9", "ecclesiastes-10", "ecclesiastes-11", "ecclesiastes-12",
    ],
  },
  {
    id: "messianic-prophecy",
    title: "Messianic Prophecy",
    description: "Servant songs, throne names, and the branch of Jesse.",
    chapterKeys: [
      "isaiah-7", "isaiah-9", "isaiah-11", "isaiah-52", "isaiah-53",
      "zechariah-3", "zechariah-6", "zechariah-9", "zechariah-11",
      "psalms-2", "psalms-22", "psalms-45", "psalms-110",
      "jeremiah-23",
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
      { bookId: "jeremiah", chapter: 31, annotation: "The new covenant (berit chadasha) — written on the heart after the old covenant breaks under exile." },
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
      { bookId: "jeremiah", chapter: 23, annotation: "The Branch oracle — tzemach tsaddiq, the source tradition Zechariah will later develop." },
      { bookId: "isaiah", chapter: 52, annotation: "The servant's exaltation: where Isaiah 53 actually begins." },
      { bookId: "isaiah", chapter: 53, annotation: "Corporate Israel first, then typological Christ — both as layers." },
    ],
  },
  {
    id: "liberation-arc",
    title: "Liberation Arc",
    throughLine:
      "From divine encounter through liberation, covenant, dwelling-place, to covenant crisis and renewal — the arc of God establishing a people and a place to dwell among them. What the original audience would have understood is that Exodus traces a single movement: YHWH calls, delivers, binds himself to a people by treaty, then builds a dwelling-place in their midst — and when the covenant shatters at the golden calf, the Thirteen Attributes of Exodus 34 become the theological foundation for everything that follows.",
    steps: [
      { bookId: "exodus", chapter: 3, annotation: "The divine encounter: ehyeh asher ehyeh — a first-person promise of presence that launches the liberation." },
      { bookId: "exodus", chapter: 12, annotation: "The night of deliverance: Passover as apotropaic blood ritual — protection before exodus." },
      { bookId: "exodus", chapter: 14, annotation: "The divine warrior acts: Yam Suph crossing as combat myth inversion — YHWH commands the chaos waters." },
      { bookId: "exodus", chapter: 19, annotation: "Sinai as suzerainty treaty: the covenant-making ceremony that transforms liberated slaves into a treaty people." },
      { bookId: "exodus", chapter: 25, annotation: "The cosmic temple: Tabernacle as Eden rebuilt — YHWH's dwelling-place in the midst of the camp." },
      { bookId: "exodus", chapter: 32, annotation: "Covenant crisis and renewal: the golden calf shatters the treaty, and the Thirteen Attributes of Exodus 34:6-7 become the theological center of the Hebrew Bible." },
    ],
  },
  {
    id: "prophetic-arc",
    title: "Prophetic Arc",
    throughLine:
      "From Persian-period restoration visions through dual leadership, covenant demands, royal hope, and final purification — Zechariah traces a single arc across all 14 chapters: YHWH is still governing, even in the shadow of empire. What the original audience would have understood is that every cluster answers the same underlying question: is YHWH still present and active in a post-exilic world governed by Persia? The night visions say yes through reassurance, the fasting oracles say yes through covenant demand, and the final chapters say yes through eschatological promise.",
    steps: [
      { bookId: "zechariah", chapter: 1, annotation: "Patrol vision: YHWH's agents surveying the Persian world — reassurance that he is still governing." },
      { bookId: "zechariah", chapter: 4, annotation: "Lampstand and olive trees: dual leadership of Zerubbabel and Joshua — 'not by might, not by power, but by my Spirit.'" },
      { bookId: "zechariah", chapter: 7, annotation: "Fasting oracle: justice and mercy over empty ritual — the prophetic cult-critique tradition at its sharpest." },
      { bookId: "zechariah", chapter: 9, annotation: "The peaceful king: ANE donkey-vs-warhorse contrast — the oracle that anticipates a ruler through peace, not force." },
      { bookId: "zechariah", chapter: 12, annotation: "The pierced one: Hadad Rimmon mourning, MT/LXX variant, and communal grief opening into fountain and universal reign." },
    ],
  },
  {
    id: "psalmic-arc",
    title: "Psalmic Arc",
    throughLine:
      "From royal coronation through individual lament, divine judgment, covenant crisis, enthronement oracle, and penitential restoration -- the Psalter traces a theological heartbeat that Israel kept returning to. What the original audience would have understood is that these psalms were never isolated poems; they formed a liturgical arc from commission to failure to lament to renewal, revealing that Israel's relationship with YHWH was a repeated pattern of enthronement and penitence, not a smooth ascent.",
    steps: [
      { bookId: "psalms", chapter: 2, annotation: "The ANE coronation adoption formula: YHWH installs the Davidic king as royal son -- 'today I have begotten you' as performative declaration." },
      { bookId: "psalms", chapter: 22, annotation: "Individual lament structure: complaint, petition, vow of praise -- the psalm Jesus quotes from the cross, but the genre logic comes first." },
      { bookId: "psalms", chapter: 82, annotation: "The heavenly court: YHWH rises to judge the elohim of his own council -- ke-adam proves they are non-human beings." },
      { bookId: "psalms", chapter: 89, annotation: "Covenant lament: the Psalter's most confident promises crash into theological crisis -- the Davidic covenant's hardest question left unresolved." },
      { bookId: "psalms", chapter: 110, annotation: "The royal enthronement oracle: adoni as human honorific, Melchizedek typology, the most-cited OT verse in the NT -- all as reception history." },
      { bookId: "psalms", chapter: 51, annotation: "Penitential restoration: ruach as divine presence and animating breath -- the covenant cycle's answer to failure, rooted in the Thirteen Attributes." },
    ],
  },
  {
    id: "prophetic-crisis-arc",
    title: "Prophetic Crisis Arc",
    throughLine:
      "From the commissioning of a reluctant prophet to the fall of the city he warned — Jeremiah's ministry traces forty years of institutional collapse and covenant faithfulness under pressure. Here's where it gets interesting: every chapter in this arc answers the same question: is YHWH's covenant still operative when the temple fails, the kings fail, and the city falls?",
    steps: [
      { bookId: "jeremiah", chapter: 1, annotation: "Prophetic commissioning in the berufungsbericht genre — yadati as covenant designation before the Neo-Babylonian shadow arrives." },
      { bookId: "jeremiah", chapter: 7, annotation: "Temple sermon: Shiloh's destruction layer proves the institution is not the guarantee of YHWH's presence." },
      { bookId: "jeremiah", chapter: 18, annotation: "Potter's house: conditional covenant logic — YHWH can reshape what is not yet hardened." },
      { bookId: "jeremiah", chapter: 23, annotation: "Branch oracle: YHWH's answer to failed shepherds — tzemach tsaddiq as the source tradition Zechariah will draw on." },
      { bookId: "jeremiah", chapter: 29, annotation: "Exile letter: darash shalom as active mandate — seek the welfare of Babylon, for in its welfare you will find yours." },
      { bookId: "jeremiah", chapter: 31, annotation: "New covenant: berit chadasha hapax — uniquely in the Hebrew Bible, a covenant written on the heart." },
      { bookId: "jeremiah", chapter: 36, annotation: "Scroll burning: royal resistance cannot stop the prophetic word — Baruch re-dictates with additions." },
      { bookId: "jeremiah", chapter: 52, annotation: "Deuteronomistic appendix: the fall of Jerusalem, and Jehoiachin's release as the coda of hope." },
    ],
  },
  {
    id: "wisdom-arc",
    title: "Wisdom Arc",
    throughLine:
      "From Proverbs' systematic framework — wisdom as cosmic ordering principle, the deed-consequence nexus as observable pattern — to Job's devastating counter-test when that framework collapses under innocent suffering, to Ecclesiastes' unflinching conclusion: hebel, vapor, the ungraspable nature of human experience under the sun. Here's where it gets interesting: Proverbs says wisdom tends to flourish; Job says the tendency is not a guarantee; Ecclesiastes says even the distinction between wisdom and folly dissolves before death. What the original audience would have understood is that these three books form a canonical dialogue, not a contradiction. Together they define the honest space of Wisdom Literature — observational, not mechanical, and ending with Qoheleth's radical counsel to enjoy the portion you are given.",
    steps: [
      { bookId: "proverbs", chapter: 1, annotation: "The oldest classroom in the world: yir'at YHWH as epistemological thesis — wisdom begins with posture, not intelligence." },
      { bookId: "proverbs", chapter: 8, annotation: "Woman Wisdom at creation: ANE Maat parallel, qanah as bridal-acquisition, the cosmogonic claim that grounds all instruction." },
      { bookId: "proverbs", chapter: 10, annotation: "Deed-consequence as observational wisdom: the sentence collection poses retribution as probabilistic pattern, not divine guarantee." },
      { bookId: "job", chapter: 1, annotation: "Divine council opening: ha-satan as prosecuting attorney — Wisdom Literature genre primer." },
      { bookId: "job", chapter: 3, annotation: "The lament hinge: prose to poetry, 'why was I born?' as theologically legitimate protest." },
      { bookId: "job", chapter: 19, annotation: "Goel legal trajectory: from arbiter to witness to vindicator — the legal advocate escalation." },
      { bookId: "job", chapter: 28, annotation: "(Job 28) Hymn to Wisdom: where can wisdom be found? The canonical complement to Proverbs — the same question, a different answer." },
      { bookId: "job", chapter: 38, annotation: "Divine speeches creation survey: rhetorical reframing, not answering Job's questions." },
      { bookId: "job", chapter: 40, annotation: "Behemoth and Leviathan: Ugaritic Lotan cognate, Chaoskampf — chaos creatures, not zoology." },
      { bookId: "job", chapter: 42, annotation: "Epilogue verdict: YHWH rebukes retribution theology — Job spoke what is right, the friends did not." },
      { bookId: "ecclesiastes", chapter: 1, annotation: "Qoheleth enters the conversation: hebel — vapor, breath, fleeting — reframes everything. The question is not 'is life meaningful?' but 'can you hold it?'" },
      { bookId: "ecclesiastes", chapter: 3, annotation: "Appointed times: the created order has rhythms you can observe but not control — and olam in the heart means you will always long to see the whole picture." },
      { bookId: "ecclesiastes", chapter: 9, annotation: "Death as equalizer: the living know they will die, the dead know nothing — and from this observation, the most radical carpe diem in Scripture: eat, drink, enjoy." },
      { bookId: "ecclesiastes", chapter: 12, annotation: "The aging allegory closes the trilogy: dust returns to dust, breath to the one who breathed it. Genesis 2:7 undone. The epilogue narrator gets the last word." },
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
    chapterKeys: ["daniel-7", "daniel-2", "matthew-24", "revelation-1", "revelation-5", "psalms-2", "psalms-110"],
    prose: `The question that unlocks Daniel 7 is deceptively simple: which direction does the son of man travel?

Read the verse carefully. In Daniel 7:13, the one like a son of man comes "with the clouds of heaven" and approaches the Ancient of Days — moving toward the throne, not away from it. He is being escorted upward into the divine courtroom to receive dominion, glory, and kingdom. The direction of travel is an ascent, not a descent to earth.

Here's where it gets interesting: this is how Second Temple Judaism universally read the passage. The author of 1 Enoch wrote entire chapters dramatizing this heavenly enthronement scene. The Dead Sea Scrolls community prized the Daniel vision precisely because it described a figure approaching God and receiving cosmic authority. None of these readers pictured a descent to a battle on earth. They pictured a coronation in heaven.

What the original audience would have understood is that Daniel's four beasts emerge from the sea — the ancient symbol of chaos and non-order — and they are progressively stripped of dominion until the court is seated and judgment is given. Into this scene steps the one like a son of man, the human-shaped figure who represents what the beasts are not: ordered, dignified, image-bearing humanity, vindicated before God.

Through this lens, Revelation 5 becomes unmistakable. John weeps because no one can open the sealed scroll. Then the Lamb steps forward — and the imagery collapses back into Daniel 7:13. The unsealing of the scroll in Revelation 5 is the throne room scene of Daniel 7:13, applied to Jesus at his ascension. Matthew 24:30 follows the same logic: "the Son of Man coming on the clouds" is the enthronement language of Daniel, not a description of a physical landing on earth.

This is a minority reading in popular Christianity but the majority reading among scholars who work with Second Temple literature. The distinction matters because it changes everything downstream: what "coming with clouds" means in Mark 14:62, what Pentecost announces, and what the early church meant when they said Jesus was exalted to the right hand of the Father.

Psalms 2 and 110 are the Psalter's two coronation bookends -- the same enthronement vocabulary, the same upward trajectory, the same throne-room audience with the Ancient of Days. Ancient wisdom doesn't always travel in straight lines. Sometimes it ascends.`,
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
    chapterKeys: ["genesis-1", "genesis-2", "genesis-3", "genesis-6", "genesis-11", "ezekiel-1", "exodus-25", "exodus-26", "exodus-27", "psalms-8", "psalms-82", "job-38", "job-39", "job-40", "job-41", "proverbs-8", "proverbs-31", "ecclesiastes-3"],
    prose: `What did Genesis 1 communicate to its first audience — and what was it not trying to say?

The ancient audience of Genesis did not live in a world asking about natural selection or the age of the cosmos. They lived in a world saturated with creation stories: Enuma Elish from Babylon, Atrahasis from Sumer, the Memphite Theology from Egypt. Every surrounding culture had a cosmogony that justified its own gods, its own king, its own view of humanity's purpose. Genesis was written into that contest.

What the original audience would have understood is that Genesis 1 is structured as a cosmic temple inauguration. In ancient Near Eastern thought, the world was built as a dwelling place for the gods, and a temple was the microcosm of the universe. The seven-day structure mirrors the dedication week of a temple: six days of preparation, then the deity takes up residence. The Sabbath is not a command to rest arbitrarily — it is the climactic moment when YHWH "rests" in his cosmic temple, as a king enthroned.

The firmament — raqia — was the solid dome holding back the waters above. Genesis 1 uses this picture to declare who made it and why.

Here's where it gets interesting: Ezekiel 1's chariot vision employs the same cosmic architecture — YHWH enthroned above the cosmos, not confined to Jerusalem's ruined temple. The Tabernacle of Exodus 25-27 is the cosmic temple made portable: outer court as earth, holy place as heaven, holy of holies as the divine throne room.

Proverbs 8 presents Woman Wisdom as present at creation itself — the cosmic ordering principle personified, dancing before YHWH as the world takes shape (8:30). Proverbs 31's Woman of Valor closes the arc — Wisdom embodied in the world the cosmos built.

Ecclesiastes 3 maps the same created order from a different angle: the fourteen antithetical pairs — a time to be born, a time to die — are the rhythms of the cosmos observed from within. Where Genesis 1 builds the temple, Ecclesiastes 3 watches its seasons turn.

Genesis 3, 6, and 11 extend the framework. The cosmic temple was invaded, the boundaries breached, the nations scattered — but the covenant with one family began the project of restoring what was lost.

Psalm 8's creation praise and Psalm 82's heavenly court scene extend this cosmic architecture into the Psalter's liturgical voice.

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
    chapterKeys: ["matthew-24", "daniel-9", "daniel-7", "revelation-6", "zechariah-14", "jeremiah-7"],
    prose: `Jesus began the Olivet Discourse in response to a specific question from specific people. The disciples pointed to the temple stones. Jesus said not one stone would be left on another. They asked, in effect: when? What will be the sign?

The partial preterist reading takes that question at face value. The disciples were not asking about a distant apocalypse two thousand years away. They were asking about the temple they could see from where they were sitting on the Mount of Olives. And Jesus answered them.

Here's where it gets interesting: Matthew 24:34 is one of the most discussed verses in all of eschatology. "This generation will not pass away until all these things take place." The Greek genea consistently means a biological generation — roughly forty years — in Matthew's Gospel. Forty years after the Olivet Discourse puts us squarely at AD 70, when the Roman general Titus destroyed Jerusalem and the temple exactly as Jesus described, with the horror of "those days" and the flight from Judea.

What the original audience would have understood is that Daniel's framework structures Jesus's response. Daniel 9's seventy weeks prophesied a coming desolation — "an abomination that causes desolation" — and Jesus invoked that language directly. The abomination Daniel foresaw in the context of Antiochus IV had a second iteration: the Roman armies surrounding and then defiling Jerusalem. "When you see Jerusalem surrounded by armies, know that its desolation has come near" (Luke 21:20).

Through this lens, the cosmic language of Matthew 24:29-30 — sun darkened, stars falling, son of man coming on clouds — is not literal astronomy. It is the prophetic convention the Hebrew prophets used to describe the fall of earthly powers. Isaiah 13 uses identical language to describe Babylon's fall. Ezekiel uses it for Egypt. Jesus is using the same stock vocabulary to describe Rome's judgment on Jerusalem.

Zechariah 14 provides the OT Day of the LORD narrative that the Olivet Discourse echoes — Jerusalem besieged, nations gathered, YHWH intervening on the Mount of Olives — the same geography Jesus stands on when his disciples ask "when will these things be?"

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
    chapterKeys: ["isaiah-52", "isaiah-53", "isaiah-7", "isaiah-9", "isaiah-11", "isaiah-1", "isaiah-2", "isaiah-6", "psalms-2", "psalms-22", "psalms-45", "psalms-110", "jeremiah-23", "job-3", "job-19", "ecclesiastes-9"],
    prose: `The most contested chapter in the Hebrew Bible was not always contested in the same way. The question of who Isaiah 53 describes — Israel or Jesus — is a modern framing of an ancient text that was originally designed to hold multiple readings at once.

Here's where it gets interesting: the historically prior reading, dominant among Jewish interpreters before Christianity recontextualized the passage, understood the servant as corporate Israel. Rashi argued systematically that the servant who bears the iniquities of the nations is Israel itself — exiled, suffering, destined for vindication. Ibn Ezra followed the same trajectory. This was not a minority opinion; it was the mainstream.

What the original audience would have understood is that Isaiah uses "servant" in multiple registers throughout chapters 40-55. Sometimes the servant is Israel collectively (Isaiah 41:8-9). Sometimes the servant is a faithful remnant within Israel (Isaiah 49:3-6). The oscillation between corporate and individual is built into the text's structure — and that oscillation is the key.

Through this lens, Isaiah 52:13 is where the passage actually begins, not chapter 53. The servant is "exalted and lifted up" — the same Hebrew verbs used for YHWH's own exaltation. The shocking reversal is the point: from disfigurement to exaltation, from being despised to being acknowledged by kings.

The typological reading — that Jesus fulfilled the servant's role — does not cancel the corporate reading. It layers on top of it. What Israel was called to be (a light to the nations, a redemptive presence among the peoples), Jesus embodied in concentrated, singular form. Both as layers, not competitors.

Isaiah 7's Immanuel sign, the throne names of Isaiah 9, and the Branch of Isaiah 11 all work this way: they address an original crisis first, then carry a typological weight that later generations recognize in light of Jesus.

The Psalter's royal messianic cluster -- Psalm 2's coronation formula, Psalm 22's lament-to-vindication arc, Psalm 45's royal wedding, Psalm 110's enthronement oracle -- forms the second OT pillar alongside the servant songs.

Ecclesiastes 9's death-as-equalizer observation — 'the righteous and the wicked share the same fate' — extends the canonical tension. Where Job's friends insist suffering proves guilt, and the servant songs transform suffering into vocation, Qoheleth simply observes: death does not distinguish.

This reading takes the text's historical context seriously before reaching for christological application — and finds both dimensions more compelling as a result.`,
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
    chapterKeys: ["ezekiel-38", "ezekiel-39", "revelation-20", "daniel-11", "zechariah-14"],
    prose: `The identification of Gog has generated more confident speculation than almost any passage in prophetic literature — and most of that speculation has been wrong.

The text itself is the place to start. Ezekiel 38's "Gog of the land of Magog, chief prince of Meshech and Tubal" is not pointing toward Russia or a modern nation-state. The Table of Nations in Genesis 10 places Magog, Meshech, Tubal, and Gomer in ancient Anatolia — the geographic region we now call Turkey. Togarmah, also named, is associated in ANE sources with the Hittite heartland. These were the peoples at the outer northern horizon of the ancient Israelite world, the far peoples beyond the known map.

Here's where it gets interesting: Ezekiel deliberately evokes an enemy from "the uttermost parts of the north" (38:15) — the directional extreme in the ancient Near Eastern cosmological geography. This is the literary equivalent of describing an invader from the ends of the earth. The point is not ethnicity but cosmic extremity: this attack comes from the furthest reaches of the known world.

What the original audience would have understood is that Gog's defeat is a demonstration of YHWH's sovereignty over all nations — even those the exiles had never encountered. The prophecy was not a news report filed in advance about 21st century geopolitics. It was a theological statement about the scope of divine authority after the exile, addressed to a community wondering whether YHWH could still act in history.

Through this lens, Revelation 20:8 is significant precisely because it names Gog and Magog as a future event, placed explicitly after the thousand years. John is not re-running Ezekiel 38-39 as a past event that occurred in the first century. He is reserving Ezekiel's ultimate "nations gathered against God's people" scenario for an end-of-millennium judgment. The birds-feasting aftermath in Ezekiel 39:17-20 is quoted verbatim by Revelation 19:17-21 — connecting Ezekiel's aftermath to Revelation's final battle sequence.

Zechariah 14 adds a third node to this eschatological frame — the Day of the LORD with nations gathered against Jerusalem, living waters flowing out, and Sukkot pilgrimage under YHWH's universal reign.

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
  "genesis-22": ["genesis-12", "isaiah-53", "exodus-12"],
  "genesis-28": ["genesis-12", "ezekiel-1"],

  // Genesis — Divine council / cosmos cluster
  "genesis-1": ["genesis-2", "ezekiel-1", "job-38"],
  "genesis-2": ["genesis-1", "genesis-3", "ecclesiastes-12"],
  "genesis-3": ["genesis-2", "revelation-12", "ezekiel-28"],
  "genesis-11": ["genesis-6", "daniel-2", "revelation-17"],

  // Genesis — Narrative
  "genesis-37": ["genesis-28", "genesis-12", "daniel-1"],

  // Daniel — Court tales
  "daniel-1": ["daniel-2", "daniel-3", "ezekiel-2"],
  "daniel-3": ["daniel-1", "daniel-6", "ezekiel-3"],
  "daniel-4": ["daniel-5", "daniel-2", "ezekiel-28"],
  "daniel-5": ["daniel-4", "daniel-6", "exodus-20"],
  "daniel-6": ["daniel-3", "daniel-5", "ezekiel-3"],

  // Daniel — Visions cluster
  "daniel-2": ["daniel-7", "revelation-13", "matthew-24"],
  "daniel-7": ["daniel-2", "psalms-110", "matthew-24"],
  "daniel-8": ["daniel-7", "daniel-9", "revelation-13"],
  "daniel-9": ["daniel-7", "matthew-24", "jeremiah-29"],
  "daniel-10": ["daniel-9", "daniel-11", "revelation-12"],
  "daniel-11": ["daniel-10", "daniel-12", "revelation-6"],
  "daniel-12": ["daniel-7", "revelation-20", "zechariah-12"],

  // Matthew
  "matthew-24": ["daniel-9", "revelation-6", "jeremiah-7"],

  // Revelation
  "revelation-1": ["daniel-7", "matthew-24", "zechariah-12"],
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
  "revelation-19": ["revelation-20", "ezekiel-39", "exodus-14"],
  "revelation-20": ["revelation-19", "ezekiel-38", "zechariah-14"],
  "revelation-21": ["revelation-22", "isaiah-65", "zechariah-8"],
  "revelation-22": ["revelation-21", "isaiah-66", "daniel-12"],

  // Isaiah — Messianic cluster
  "isaiah-7": ["isaiah-9", "isaiah-11", "matthew-24"],
  "isaiah-9": ["isaiah-7", "zechariah-9", "psalms-2"],
  "isaiah-11": ["isaiah-9", "isaiah-65", "jeremiah-23"],
  "isaiah-52": ["isaiah-53", "daniel-9", "revelation-5"],
  "isaiah-53": ["isaiah-52", "genesis-22", "psalms-22"],
  "isaiah-65": ["isaiah-66", "revelation-21", "ezekiel-37"],
  "isaiah-66": ["isaiah-65", "revelation-22", "ezekiel-39"],

  // Ezekiel — Exile/restoration cluster
  "ezekiel-1": ["isaiah-6", "ezekiel-2", "revelation-4"],
  "ezekiel-2": ["ezekiel-3", "ezekiel-1", "daniel-1"],
  "ezekiel-3": ["ezekiel-2", "daniel-6", "ezekiel-37"],
  "ezekiel-28": ["genesis-3", "genesis-6", "job-40"],
  "ezekiel-37": ["ezekiel-38", "daniel-12", "jeremiah-31"],
  "ezekiel-38": ["ezekiel-39", "revelation-20", "zechariah-14"],
  "ezekiel-39": ["ezekiel-38", "revelation-19", "revelation-20"],

  // New chapters — Genesis 15/18 and Isaiah 1/2/6
  "genesis-15": ["genesis-12", "genesis-22", "exodus-19"],
  "genesis-18": ["genesis-12", "isaiah-6", "daniel-10"],
  "isaiah-1": ["isaiah-2", "ezekiel-2", "matthew-24"],
  "isaiah-2": ["isaiah-1", "isaiah-11", "ezekiel-38"],
  "isaiah-6": ["isaiah-1", "ezekiel-1", "exodus-33"],

  // Exodus — Liberation Arc cluster
  "exodus-3": ["genesis-15", "isaiah-6", "exodus-12"],
  "exodus-12": ["exodus-3", "exodus-14", "genesis-22"],
  "exodus-14": ["exodus-12", "exodus-19", "revelation-19"],
  "exodus-19": ["exodus-20", "exodus-14", "genesis-15"],
  "exodus-20": ["exodus-19", "exodus-32", "daniel-5"],
  "exodus-25": ["exodus-26", "exodus-27", "genesis-1"],
  "exodus-26": ["exodus-25", "exodus-27", "ezekiel-1"],
  "exodus-27": ["exodus-25", "exodus-26", "revelation-21"],
  "exodus-32": ["exodus-33", "exodus-34", "exodus-20"],
  "exodus-33": ["exodus-32", "exodus-34", "isaiah-6"],
  "exodus-34": ["exodus-32", "exodus-33", "ezekiel-37"],

  // Zechariah — 5 commentary clusters, 14 chapters
  "zechariah-1": ["ezekiel-1", "daniel-10", "revelation-6"],
  "zechariah-2": ["zechariah-1", "ezekiel-38", "revelation-21"],
  "zechariah-3": ["zechariah-6", "jeremiah-23", "job-1"],
  "zechariah-4": ["zechariah-5", "zechariah-6", "revelation-1"],
  "zechariah-5": ["zechariah-4", "zechariah-6", "revelation-17"],
  "zechariah-6": ["zechariah-3", "zechariah-4", "jeremiah-23"],
  "zechariah-7": ["zechariah-8", "isaiah-1", "isaiah-2"],
  "zechariah-8": ["zechariah-7", "isaiah-65", "revelation-21"],
  "zechariah-9": ["zechariah-3", "isaiah-9", "matthew-24"],
  "zechariah-10": ["zechariah-9", "zechariah-11", "isaiah-11"],
  "zechariah-11": ["zechariah-9", "zechariah-10", "isaiah-53"],
  "zechariah-12": ["zechariah-13", "revelation-1", "daniel-12"],
  "zechariah-13": ["zechariah-12", "zechariah-14", "ezekiel-37"],
  "zechariah-14": ["zechariah-13", "revelation-20", "ezekiel-38"],

  // Psalms -- 10 commentary chapters
  "psalms-2": ["psalms-110", "daniel-7", "proverbs-16"],
  "psalms-8": ["psalms-82", "genesis-1", "genesis-2"],
  "psalms-22": ["psalms-89", "psalms-51", "isaiah-53"],
  "psalms-23": ["psalms-22", "psalms-89", "exodus-33"],
  "psalms-45": ["psalms-2", "psalms-110", "isaiah-9"],
  "psalms-51": ["psalms-139", "psalms-22", "ezekiel-37"],
  "psalms-82": ["genesis-6", "ezekiel-28", "job-1"],
  "psalms-89": ["psalms-2", "psalms-22", "genesis-15"],
  "psalms-110": ["psalms-2", "psalms-45", "daniel-7"],
  "psalms-139": ["psalms-51", "psalms-8", "genesis-1"],

  // Jeremiah — 8 commentary clusters, 9 chapters
  "jeremiah-1": ["exodus-3", "isaiah-6", "ezekiel-1"],
  "jeremiah-7": ["isaiah-1", "matthew-24", "exodus-20"],
  "jeremiah-18": ["jeremiah-19", "exodus-32", "genesis-18"],
  "jeremiah-19": ["jeremiah-18", "isaiah-1", "exodus-14"],
  "jeremiah-23": ["zechariah-3", "zechariah-6", "isaiah-11"],
  "jeremiah-29": ["daniel-1", "jeremiah-31", "daniel-9"],
  "jeremiah-31": ["isaiah-65", "jeremiah-29", "ezekiel-37"],
  "jeremiah-36": ["isaiah-6", "exodus-34", "jeremiah-52"],
  "jeremiah-52": ["daniel-1", "jeremiah-36", "ezekiel-37"],

  // Job — 4 RAG clusters, 10 commentary chapters (each entry has exactly 3 related passages)
  "job-1": ["psalms-82", "ezekiel-28", "zechariah-3"],
  "job-2": ["job-1", "psalms-82", "genesis-6"],
  "job-3": ["job-19", "jeremiah-1", "ecclesiastes-9"],
  "job-19": ["job-3", "isaiah-53", "psalms-22"],
  "job-28": ["ecclesiastes-7", "job-42", "proverbs-8"],
  "job-38": ["job-39", "genesis-1", "psalms-8"],
  "job-39": ["job-38", "job-40", "genesis-2"],
  "job-40": ["job-41", "genesis-6", "ezekiel-28"],
  "job-41": ["job-40", "genesis-3", "psalms-89"],
  "job-42": ["job-28", "psalms-89", "jeremiah-23"],

  // Proverbs — 7 RAG clusters, 9 commentary chapters
  "proverbs-1": ["proverbs-7", "proverbs-8", "ecclesiastes-1"],
  "proverbs-7": ["proverbs-1", "proverbs-8", "proverbs-31"],
  "proverbs-8": ["proverbs-1", "proverbs-31", "job-28"],
  "proverbs-10": ["proverbs-16", "proverbs-25", "ecclesiastes-2"],
  "proverbs-16": ["proverbs-10", "proverbs-25", "psalms-2"],
  "proverbs-22": ["proverbs-23", "proverbs-25", "genesis-12"],
  "proverbs-23": ["proverbs-22", "proverbs-25", "exodus-20"],
  "proverbs-25": ["proverbs-16", "proverbs-22", "jeremiah-36"],
  "proverbs-31": ["proverbs-8", "proverbs-1", "job-28"],

  // Ecclesiastes — 5 RAG clusters, 11 commentary chapters
  "ecclesiastes-1": ["ecclesiastes-2", "proverbs-1", "job-3"],
  "ecclesiastes-2": ["ecclesiastes-1", "proverbs-10", "job-42"],
  "ecclesiastes-3": ["ecclesiastes-9", "genesis-1", "job-38"],
  "ecclesiastes-5": ["ecclesiastes-6", "exodus-20", "proverbs-22"],
  "ecclesiastes-6": ["ecclesiastes-5", "proverbs-10", "job-28"],
  "ecclesiastes-7": ["ecclesiastes-8", "proverbs-8", "job-28"],
  "ecclesiastes-8": ["ecclesiastes-7", "proverbs-16", "job-42"],
  "ecclesiastes-9": ["ecclesiastes-3", "ecclesiastes-12", "job-3"],
  "ecclesiastes-10": ["ecclesiastes-9", "ecclesiastes-11", "proverbs-25"],
  "ecclesiastes-11": ["ecclesiastes-10", "ecclesiastes-12", "proverbs-31"],
  "ecclesiastes-12": ["ecclesiastes-9", "ecclesiastes-11", "genesis-2"],
};
