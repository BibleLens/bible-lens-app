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

// Total: 41 + 19 + 20 + 9 = 89 chapters (all COMMENTARY_DESCRIPTIONS keys covered)
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
    ],
  },
  {
    id: "messianic-prophecy",
    title: "Messianic Prophecy",
    description: "Servant songs, throne names, and the branch of Jesse.",
    chapterKeys: [
      "isaiah-7", "isaiah-9", "isaiah-11", "isaiah-52", "isaiah-53",
      "zechariah-3", "zechariah-6", "zechariah-9", "zechariah-11",
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
    chapterKeys: ["genesis-1", "genesis-2", "genesis-3", "genesis-6", "genesis-11", "ezekiel-1", "exodus-25", "exodus-26", "exodus-27"],
    prose: `What did Genesis 1 communicate to its first audience — and what was it not trying to say?

The ancient audience of Genesis did not live in a world asking about natural selection or the age of the cosmos. They lived in a world saturated with creation stories: Enuma Elish from Babylon, Atrahasis from Sumer, the Memphite Theology from Egypt. Every surrounding culture had a cosmogony that justified its own gods, its own king, its own view of humanity's purpose. Genesis was written into that contest.

What the original audience would have understood is that Genesis 1 is structured as a cosmic temple inauguration. In ancient Near Eastern thought, the world was built as a dwelling place for the gods, and a temple was the microcosm of the universe. The seven-day structure mirrors the dedication week of a temple: six days of preparation, then the deity takes up residence. The Sabbath is not a command to rest arbitrarily — it is the climactic moment when YHWH "rests" in his cosmic temple, as a king enthroned.

The firmament — raqia — was not a misunderstanding of physics. It was the ancient cosmological architecture the text assumed: a solid dome holding back the waters above, the earth resting on waters below. Genesis 1 uses this picture to declare who made it and why.

Here's where it gets interesting: Ezekiel 1's chariot vision employs the same cosmic architecture. The throne above the expanse, the living creatures below — YHWH enthroned above the entire cosmos, not confined to Jerusalem's ruined temple.

The Tabernacle of Exodus 25-27 is the cosmic temple made portable. The mishkan encodes the same three-tier cosmos: outer court as earth, holy place as heaven, holy of holies as the divine throne room. The seven-branched menorah echoes the seven days of creation. This is not forced symbolism — it is Genesis 1's architectural vocabulary rendered in acacia wood and gold, carried through the wilderness.

Genesis 3, 6, and 11 extend the framework. The cosmic temple was invaded, the boundaries breached, the nations scattered — but the covenant with one family began the project of restoring what was lost.

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
    chapterKeys: ["matthew-24", "daniel-9", "daniel-7", "revelation-6", "zechariah-14"],
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
  "genesis-1": ["genesis-2", "ezekiel-1", "exodus-25"],
  "genesis-2": ["genesis-1", "genesis-3", "ezekiel-28"],
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
  "daniel-7": ["daniel-2", "revelation-1", "matthew-24"],
  "daniel-8": ["daniel-7", "daniel-9", "revelation-13"],
  "daniel-9": ["daniel-7", "matthew-24", "revelation-1"],
  "daniel-10": ["daniel-9", "daniel-11", "revelation-12"],
  "daniel-11": ["daniel-10", "daniel-12", "revelation-6"],
  "daniel-12": ["daniel-7", "revelation-20", "zechariah-12"],

  // Matthew
  "matthew-24": ["daniel-9", "revelation-6", "zechariah-14"],

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
  "isaiah-9": ["isaiah-7", "zechariah-9", "isaiah-11"],
  "isaiah-11": ["isaiah-9", "isaiah-65", "zechariah-3"],
  "isaiah-52": ["isaiah-53", "daniel-9", "revelation-5"],
  "isaiah-53": ["isaiah-52", "genesis-22", "daniel-9"],
  "isaiah-65": ["isaiah-66", "revelation-21", "ezekiel-37"],
  "isaiah-66": ["isaiah-65", "revelation-22", "ezekiel-39"],

  // Ezekiel — Exile/restoration cluster
  "ezekiel-1": ["isaiah-6", "ezekiel-2", "revelation-4"],
  "ezekiel-2": ["ezekiel-3", "ezekiel-1", "daniel-1"],
  "ezekiel-3": ["ezekiel-2", "daniel-6", "ezekiel-37"],
  "ezekiel-28": ["genesis-3", "genesis-6", "daniel-8"],
  "ezekiel-37": ["ezekiel-38", "daniel-12", "exodus-34"],
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
  "zechariah-3": ["zechariah-6", "isaiah-11", "daniel-9"],
  "zechariah-4": ["zechariah-5", "zechariah-6", "revelation-1"],
  "zechariah-5": ["zechariah-4", "zechariah-6", "revelation-17"],
  "zechariah-6": ["zechariah-3", "zechariah-4", "isaiah-11"],
  "zechariah-7": ["zechariah-8", "isaiah-1", "isaiah-2"],
  "zechariah-8": ["zechariah-7", "isaiah-65", "revelation-21"],
  "zechariah-9": ["zechariah-3", "isaiah-9", "matthew-24"],
  "zechariah-10": ["zechariah-9", "zechariah-11", "isaiah-11"],
  "zechariah-11": ["zechariah-9", "zechariah-10", "isaiah-53"],
  "zechariah-12": ["zechariah-13", "revelation-1", "daniel-12"],
  "zechariah-13": ["zechariah-12", "zechariah-14", "ezekiel-37"],
  "zechariah-14": ["zechariah-13", "revelation-20", "ezekiel-38"],
};
