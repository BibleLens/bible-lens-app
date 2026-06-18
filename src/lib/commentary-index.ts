// Canonical source of truth for all commentary metadata. All v2.2 features import from here.
// No React, no Qdrant, no side effects.

export const COMMENTARY_CHAPTERS: Record<string, number[]> = {
  genesis: [1, 2, 3, 6, 7, 8, 9, 11, 12, 15, 18, 22, 28, 37],
  daniel: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  matthew: [1, 2, 5, 6, 7, 13, 24, 25, 28],
  revelation: [1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 17, 18, 19, 20, 21, 22],
  isaiah: [1, 2, 6, 7, 9, 11, 40, 42, 43, 44, 45, 49, 50, 52, 53, 54, 55, 65, 66],
  ezekiel: [1, 2, 3, 28, 37, 38, 39],
  exodus: [3, 12, 14, 19, 20, 25, 26, 27, 32, 33, 34],
  zechariah: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  psalms: [2, 8, 22, 23, 45, 51, 82, 89, 110, 139],
  jeremiah: [1, 7, 18, 19, 23, 29, 31, 36, 52],
  job: [1, 2, 3, 19, 28, 38, 39, 40, 41, 42],
  proverbs: [1, 7, 8, 10, 16, 22, 23, 25, 31],
  ecclesiastes: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12],
  john: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
  romans: [1, 3, 5, 6, 8, 9, 10, 11, 13, 15, 16],
  galatians: [1, 2, 3, 4, 5, 6],
  hebrews: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
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
  // Matthew — 5 RAG clusters, 9 commentary chapters (Phase 132)
  "matthew-1":
    "What does a genealogy do in ancient Mediterranean culture — and why does Matthew's 3×14 structure encode a theological argument before verse 1 ends? In Second Temple Judaism, genealogies were not family records; they were credential documents. Matthew opens with biblos geneseos — a deliberate echo of Genesis 2:4 and 5:1 — signaling that this is a new genesis, a fresh start in the story of creation and covenant. The three groups of fourteen generations (Abraham to David, David to exile, exile to Messiah) are not historical precision; they are numerological theology. In Hebrew gematria, the name David (dwd) totals fourteen. Matthew has structured the genealogy around the Davidic throne number. Here's where it gets interesting: the genealogy includes four women — Tamar, Rahab, Ruth, and Bathsheba — all Gentiles or connected to Gentile scandal. What the original audience would have understood is that Matthew is signaling the universal scope of the covenant mission from the opening verse. The formula quotation pattern that runs through chapters 1-2 (hina plērōthē — 'in order that it might be fulfilled') is Matthew's signature hermeneutical move: reading earlier texts as having a deeper referent beyond their original historical moment. This is typological-pesher reading — a minority position within evangelical scholarship — and Matthew is its most skilled practitioner. Through this lens, the genealogy is not a boring list to skip. It is the Gospel's thesis statement in genealogical form.",
  "matthew-2":
    "If Isaiah 7:14 was written for Ahaz's crisis in 735 BC, why does Matthew cite it for a birth seven hundred years later — and what does 'fulfill' mean in that reading? Here's where it gets interesting: the Hebrew text of Isaiah 7:14 reads almah — a young woman of marriageable age. The Septuagint translates this as parthenos — virgin. Matthew follows the Septuagint reading. For the original audience of Isaiah 7, the sign was immediate: the young woman was present, the pregnancy was imminent, and the child would be born before the Syro-Ephraimite threat resolved. The near-fulfillment came in Isaiah's own generation. What the original audience of Matthew would have understood is that he is doing typological-pesher interpretation — a reading practice documented in the Dead Sea Scrolls, where a text has both a historical first layer and a deeper-referent second layer. Matthew is not arguing that Isaiah 7:14 had no original meaning. He is claiming that the same divine pattern operated again, at greater depth, in the birth of Jesus. This is a minority scholarly position — acknowledge it as such. The magi narrative, Herod's slaughter, the flight to Egypt, and the return from Egypt are all structured as formula quotations from the OT. Matthew is not recording incidental fulfillments; he is constructing a theological argument through five carefully chosen proof-texts, demonstrating that the new exodus has begun. Through this lens, Matthew 2 is not primarily a birth narrative; it is an argument about how to read Scripture.",
  "matthew-5":
    "When Jesus says 'I have not come to abolish the Law but to fulfill it,' what did Torah intensification look like in Second Temple synagogue culture — and what are the antitheses actually doing? Here's where it gets interesting: the six antitheses of the Sermon on the Mount ('you have heard it said... but I say to you') are not cancellations of Torah. They are intensifications. A Second Temple rabbi commenting on the Decalogue would extend its reach inward — from external act to internal disposition, from the prohibition of murder to the prohibition of contemptuous anger, from the prohibition of adultery to the prohibition of lustful intent. The antithetical structure is a recognized didactic genre. What the original audience would have understood is that Jesus is operating within the tradition of the sages who extended Torah's reach through interpretation, not outside it. The Hebrew teleios in Matthew 5:48 ('be perfect as your Father is perfect') is better rendered 'whole' or 'undivided' — from the LXX tamim, the covenant faithfulness term used for Noah ('blameless') and Abraham ('walk before me and be blameless'). Through this lens, the Sermon on the Mount is not a new law abolishing the old; it is a Second Temple teacher's masterclass in what covenant fidelity looks like when lived from the inside out. The Beatitudes that open it are not a checklist to perform — they are declarations about who already belongs to the kingdom, reversing the honor calculations of the Roman world.",
  "matthew-6":
    "What was a hypocrite in the ancient world — and what does the Lord's Prayer's 'kingdom come' mean when you're living under Roman occupation? In classical Greek drama, a hypocrites was an actor — someone playing a role on a stage, wearing a mask. Jesus's target in Matthew 6 is not hypocrisy in the modern psychological sense of inconsistency; it is performance for the wrong audience. The Pharisees who pray at street corners and blow trumpets before their almsgiving are doing something real — but they are staging it for human observers rather than divine ones. Here's where it gets interesting: the Lord's Prayer is a profoundly political text. 'Your kingdom come' (elthato hē basileia sou) addressed to a community living under Caesar's kingdom is not a comfortable prayer. The phrase 'your will be done on earth as it is in heaven' sets up a contrast between two governance systems. What the original audience would have understood is that the prayer is a covenant petition — using the language of the Jewish kaddish prayer tradition — asking YHWH to act as the real sovereign over the world he created. The section on wealth and anxiety (6:19-34) extends the kingdom ethics: you cannot serve two masters (YHWH and mammon). Through this lens, Matthew 6 is not piety advice; it is a manifesto about who governs the world and what it looks like to live as if that were true. The practical instruction on prayer, fasting, and giving is organized around one question: who is your real audience?",
  "matthew-7":
    "Why does the Sermon on the Mount end with two roads, two builders, and a crowd that is astonished — and what does teleios in Matthew 5:48 actually mean for how we read the whole? Here's where it gets interesting: the closing sections of Matthew 7 are a rhetorical escalation. The narrow gate and the wide gate, the good tree and the bad tree, the false prophets and the true ones, the two builders — they all press the same binary choice. The original audience would have heard these as the choices the wisdom tradition always presented: the two ways (Proverbs 1-9's two women, Deuteronomy's blessing and curse). What the original audience would have understood is that 'Lord, Lord' language — 'we prophesied in your name, cast out demons in your name, did many mighty works' — is not the language of hypocrites who know they are rejected. These are people who genuinely believe they have served the king. The verdict ('I never knew you') uses the covenant knowledge term yadati — the same term used for Abraham and Jeremiah's commissioning. 'I never had covenant relationship with you' is more precise than 'I didn't recognize you.' Through this lens, the Sermon on the Mount's conclusion is not a threat to make disciples anxious; it is an invitation to the teleios life — whole, undivided, covenant-faithful — that was the goal of the Torah all along. The crowd's astonishment (exeplēssonto) is because Jesus taught as one having authority, not as their scribes: Second Temple teachers cited authorities. Jesus cited himself.",
  "matthew-13":
    "What is a mashal in Second Temple Jewish teaching — and why does Matthew 13 begin with an insider/outsider structure before any parable content arrives? A mashal is not simply a story with a moral. In Hebrew wisdom tradition, a mashal is a riddle-teaching, a comparative saying that requires interpretive work from the hearer. The word comes from the root meaning 'to be like' and runs from Proverbs' extended mashalim through the Psalter's riddles to the Similitudes of 1 Enoch. Here's where it gets interesting: Jesus's explanation of why he speaks in parables (Matthew 13:10-17) quotes Isaiah 6:9-10 — the hardening mandate from the prophet's commissioning vision. The insider/outsider structure is not incidental; it is the declared pedagogical purpose. Those with ears to hear will understand; those without will hear but not perceive. What the original audience would have understood is that the mysterion ton ouranon — 'the mystery of the kingdom of the heavens' (the plural ouranon is distinctively Matthean) — is a literary-theological category, not an esoteric secret. The mystery is that the kingdom is arriving in unexpected form: not imperial conquest but mustard seed, not visible triumph but leaven working through flour. Through this lens, the seven parables of Matthew 13 form a unified mashal discourse about the nature of the kingdom's presence in the world — hidden, small, mixed (wheat and weeds together), of incomparable value (treasure in the field, pearl of great price). Ancient wisdom: the kingdom that looks like nothing is the one worth everything.",
  "matthew-24":
    "Did Matthew 24 predict AD 70? The partial preterist case for the Olivet Discourse — Jesus describing the coming destruction of Jerusalem to people who would live to see it.",
  "matthew-25":
    "When the Son of Man separates sheep from goats, what does the phrase 'all the nations' mean — and does this scene describe a final cosmic judgment or a first-century crisis? Here's where it gets interesting: Matthew 25 contains three eschatological parables that function as the sequel to the Olivet Discourse of chapter 24. The ten virgins, the talents, and the sheep-and-goats parable all develop the same theme: the people of God living with faithful vigilance in the time between the announcement and the consummation. The partial-preterist reading, which this resource acknowledges as one serious scholarly option, locates the sheep-and-goats judgment scene within the AD 70 horizon — the Son of Man arriving in the judicial-heavenly sense described in Daniel 7:13 (ascent to the Ancient of Days to receive judgment authority), with 'all the nations' as the Roman-era Gentile world. On this reading, 'the least of these my brothers' refers to the persecuted Jewish-Christian community, and the judgment of the nations turns on how they treated that community during the siege. What the original audience would have understood is that this reading is labeled here as one scholarly position among others — not the only reading, and acknowledged as a minority view within mainstream evangelical interpretation. The second-coming reading of a universal final judgment remains the majority position in Christian tradition, and both readings deserve honest engagement. Through this lens, D-09 (the partial-preterist eschatological framework) provides the primary cross-reference for the Son of Man arrival language shared between Matthew 24 and 25.",
  "matthew-28":
    "When Matthew writes that 'all authority has been given to me,' what does the passive verb edothē reveal — and what does the shaliach commissioning pattern tell us about who gives and who receives? The passive verb edothē — 'was given' — is a theological key. Passive voice in this context indicates divine causation: all authority was given to Jesus by the Father. This is not Jesus claiming inherent, self-grounded cosmic authority; it is Jesus reporting a received commission. Here's where it gets interesting: the shaliach principle in Jewish agency law held that a duly authorized agent was 'as the one who sent him' — carried the sender's full authority within the scope of the mission. Matthew's commissioning scene deploys exactly this pattern: the risen Jesus, having received authority from the Father, now commissions the disciples as his own agents, extending the chain of authorization. What the original audience would have understood is that the Great Commission is a shaliach delegation sequence, not an ontological statement about Jesus's divine nature. The baptismal formula ('in the name of the Father and of the Son and of the Holy Spirit') is analyzed here as a commissioning triad — who authorizes, who was sent, and who will continue the mission — rather than as a Trinitarian proof-text. This reading is theologically neutral on the ontological question. Through this lens, Matthew 28 closes the Gospel with the Emmanuel inclusio: the Gospel opened with Emmanuel ('God with us') in chapter 1 and closes with 'I am with you always, to the end of the age' — the presence promise that brackets the entire narrative. Ancient wisdom: authority given is not authority possessed independently. The Great Commission's power runs through the chain of authorization, not from a self-grounded source.",
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

  // Deutero-Isaiah — 5 RAG clusters, 9 commentary chapters (Phase 105)
  "isaiah-40": "What did 'comfort, comfort my people' mean to Judean exiles in Babylon — and why is this a divine council commissioning scene, not a pastoral greeting? The Hebrew nahamu nahamu ammi opens with a command issued in the heavenly throne room: voices are dispatched, a highway is ordered through the wilderness, and YHWH's kabod is about to be revealed. Here's where it gets interesting: the 'voice crying in the wilderness' is not a lonely prophet — it is a herald announcing a new exodus that will surpass the first. The al tira salvation oracle genre frames the entire chapter: 'do not fear' because YHWH is incomparable — who measured the waters in the hollow of his hand? The Babylonian gods are nothing beside this. Through this lens, Isaiah 40 is the overture to everything that follows in chapters 40-55: the servant, the trial speeches, the Cyrus oracle, the covenant banquet. Every theme announced here finds its development in the chapters ahead. What the original audience would have understood is a message of imminent divine action — not distant hope, but active preparation for return.",
  "isaiah-42": "What is the First Servant Song — and why does the servant's method matter as much as his mission? Isaiah 42:1-4 introduces a figure commissioned to bring mishpat (justice, right order) to the nations. But the method is striking: a bruised reed he will not break, a dimly burning wick he will not snuff out. Here's where it gets interesting: the triple repetition of mishpat in four verses is the highest concentration of this term in any prophetic commission. The servant does not shout or raise his voice in the street — the opposite of the Babylonian imperial announcement style. What the original audience would have understood is a deliberate contrast with empire: justice through gentleness, not through force. Through this lens, the First Song establishes the method that all four Servant Songs develop — and the arc continues through Isaiah 49, 50, and into 52-53.",
  "isaiah-43": "What does 'I am he' mean when YHWH declares ani hu in Isaiah 43 — and why has this phrase generated one of the most significant debates in biblical theology? The trial speech genre dominates this chapter: YHWH summons the nations to court and calls Israel as witnesses. Here's where it gets interesting: the ani hu declarations of Isaiah 43:10-13 have been read by scholars like Richard Bauckham as a divine-identity formula that the Fourth Gospel's ego eimi sayings deliberately echo. The text, however, operates within a specific courtroom context — YHWH is establishing that no god existed before him and none will after, as a polemic against Babylonian deity claims. What the original audience would have understood is a legal argument for YHWH's exclusive sovereignty, delivered to exiles surrounded by Marduk worship. The passage is theologically explosive precisely because it refuses to be domesticated by any later framework — it demands to be heard in its own voice first.",
  "isaiah-44": "What does the idol polemic satire of Isaiah 44 actually describe — and why is it more structurally precise than it first appears? The craftsman who cuts down a tree, burns half for warmth, roasts meat over the coals, and carves the other half into a god is not just a joke. Here's where it gets interesting: the satire targets the Babylonian mis pi ritual — the 'mouth-washing' ceremony that was believed to animate cult statues into living divine presences. What the original audience would have understood is that Isaiah is not merely mocking woodworking; he is dismantling the theological infrastructure of Babylonian religion. The en od declarations — 'there is no other' — reach their first crescendo here, positioning YHWH as the yotzer (former/creator) of all things. Through this lens, the idol polemic is the negative argument that clears the ground for the Cyrus oracle that follows immediately in chapter 45.",
  "isaiah-45": "Why does YHWH call the Persian emperor Cyrus his mashiach — and what does this word actually mean in its original context? Isaiah 45 contains the most theologically provocative appointment in the Hebrew Bible: a foreign king given YHWH's own anointing title. Here's where it gets interesting: mashiach here is a functional title — 'the one YHWH has greased for the task' — not a proto-messianic figure in the later Christian sense. The Cyrus Cylinder (BM 90920), the Persian emperor's own propaganda text, claims Marduk chose Cyrus. Isaiah 45 counter-claims: it was YHWH, not Marduk. What the original audience would have understood is a bold theological reinterpretation of geopolitics — the same emperor, but reattributed to Israel's God. The en od ('there is no other') monotheism peak continues from chapter 44, reaching its fullest expression here. Ancient wisdom, modern clarity: the text is doing theology through political commentary.",
  "isaiah-49": "What happens when the servant is named 'Israel' in 49:3 — and then sent to Israel in 49:5-6? The Second Servant Song opens with a birth-from-womb commissioning that echoes Jeremiah 1:5, placing the servant in the prophetic-call genre. Here's where it gets interesting: the literary tension between the servant being Israel and being sent to Israel is deliberate — the text refuses to resolve it, and that refusal is the point. The servant has labored in vain (49:4), yet YHWH declares the mission is too small if it only restores Jacob — the servant will be or lagoyim, a light to the nations. What the original audience would have understood is a universalizing move: covenant faithfulness expanding beyond ethnic boundaries, through the very figure who embodies Israel's vocation. Through this lens, the arc that began in Isaiah 42's First Song takes its next step here.",
  "isaiah-50": "What is the limmud tongue — and why does the Third Servant Song describe a figure who is taught morning by morning what to say to the weary? Isaiah 50:4-9 presents a servant whose authority comes not from royal power but from disciplined listening. The Hebrew limmud (continually-taught) describes the tongue of a disciple, not a sovereign. Here's where it gets interesting: this servant does not resist when struck, does not turn away when they pull out the beard — yet the response is not passive resignation but confident legal challenge: 'Who will contend with me? Let us stand together.' What the original audience would have understood is a prophetic-disciple register: authority through suffering endured, not suffering enjoyed. Through this lens, the Third Song's morning-by-morning awakening discipline establishes the pattern the arc will complete in Isaiah 52-53.",
  "isaiah-54": "What does the marriage metaphor mean when YHWH tells Zion 'your Maker is your husband' — and why is this a legal restitution scene, not a romantic one? Isaiah 54 addresses the exilic community as a forsaken wife who will be restored: the barren woman will have more children than the married one. Here's where it gets interesting: the go'el (kinsman-redeemer) language here is a legal institution, not sentimental piety — YHWH is acting as Zion's legal advocate under the covenant. The hesed (covenant loyalty) of peace and the berith olam (everlasting covenant) declared in 54:10 mark the transition from judgment to permanent restoration. What the original audience would have understood is a post-exilic address: Zion is not abandoned, the covenant stands, and the mountains may depart before YHWH's hesed does. Through this lens, Isaiah 54 is the theological pivot between the servant's suffering and the covenant banquet invitation of chapter 55.",
  "isaiah-55": "What does 'come, everyone who thirsts, come to the waters — you who have no money, come, buy and eat' mean to people who have been buying grain in Babylon? Isaiah 55's covenant banquet invitation is counter-programming: the Babylonian temple economy charged for access to the gods, and here YHWH offers the berith olam (everlasting covenant) without price. Here's where it gets interesting: the David reference in 55:3-4 extends the Davidic covenant promises to the entire community — no longer restricted to a single royal line but democratized to all who come. What the original audience would have understood is an economic metaphor with teeth: the gods of Babylon cost something, but YHWH's covenant is free. Through this lens, Isaiah 55 closes the Deutero-Isaiah collection (chapters 40-55) with an open invitation — the servant has suffered, the covenant is renewed, and the banquet table is set. Ancient wisdom: the best things cannot be purchased.",

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

  // John — 11 RAG clusters, 21 commentary chapters (Phase 111)
  "john-1":
    "What did John's Prologue mean to its original audience — and why does the logos of John 1:1 connect to the Jewish Wisdom tradition of Proverbs 8 and Sirach 24 rather than Greek philosophical logos? Here's where it gets interesting: the Prologue opens as an overture, not a thesis statement. Before the first character appears, before the Baptist speaks or Jesus acts, John plants a cosmic framework — logos was with God (pros ton theon) and logos was theos, qualitative, not numerical identity. Philip Harner's 1973 JBL article on anarthrous predicate nouns establishes the grammatical case: the absence of the article before theos in John 1:1c signals qualitative force — what kind of being logos is — not a numerical claim about identity. What the original audience would have understood is that the logos vocabulary activates the entire Wisdom tradition: Proverbs 8's cosmic ordering figure dancing before YHWH, Sirach 24's Wisdom given a dwelling in Israel, the memra of the Aramaic Targumim. Through this lens, the Prologue is not beginning a Greek philosophical treatise but closing a Jewish theological arc: Wisdom, present at creation, now tabernacles among humanity. The NWT reading ('a god') is named here only to be rejected — it is alien to Johannine monotheism, importing polytheism into a text devoted to the unique agency of the one sent by the only true God. Ancient wisdom, Johannine clarity: the logos is the agent of creation, the embodied Wisdom of Israel, the commissioned envoy whose identity is inseparable from the One who sent him.",
  "john-2":
    "What do the early signs in John 2-4 reveal about the 'sent one' framework — and what did the Cana wedding sign mean to John's original audience? The transformation of water to wine at Cana is not simply a convenience miracle. It is a semeion — a sign that reveals glory and precipitates belief. Here's where it gets interesting: the Greek semeion differs from the Synoptic dynameis ('mighty works'). Signs in John are not demonstrations of power alone; they are revelatory acts within the shaliach commission — each one making visible the Father's authority delegated to the one he sent. The Cana sign operates at the intersection of hospitality obligation and eschatological abundance — the messianic banquet language of Isaiah 25, the new wine that signals the age to come. What the original audience would have understood is that the sign language is progressive: Cana reveals glory to the disciples, the progression will reach its climax at the Lazarus sign. Through this lens, John 2 also introduces the temple cleansing as a prophetic sign-act — not Synoptic chronology but Johannine architecture, placing the temple's judgment at the Gospel's opening.",
  "john-3":
    "What did Jesus's conversation with Nicodemus mean — and why is 'born again' a mistranslation that misses the entire point? The Greek anothen means 'from above,' not 'again' — the wordplay is between Nicodemus's literalistic 'again' reading and Jesus's 'from above' meaning. Here's where it gets interesting: this is the Fourth Gospel's first extended theological dialogue, and it operates entirely in the register of covenant renewal theology. What the original audience would have understood is that 'birth from above' echoes Ezekiel 36:26-27 — the new heart, the new spirit, the transformation that enables participation in the covenant community of the age to come. The famous 3:16 verse functions within this framework as a summary of the shaliach commission: the Father sent the Son not to condemn the world but that the world through him might be saved. Through this lens, John 3 is not primarily an evangelistic tract — it is a covenantal explanation of what the sent one's mission actually means.",
  "john-4":
    "What did the encounter with the Samaritan woman reveal — and why is 'living water' a technical term with specific covenantal resonance? The Samaritan woman meets Jesus at Jacob's well, a geography charged with covenant memory. Here's where it gets interesting: 'living water' (hydor zon) in both Hebrew (mayim chayim) and Greek refers to running water — springs and rivers, not cisterns — and carries Jeremiah 2:13's theological weight: YHWH as the fountain of living waters. What the original audience would have understood is that the offer of living water is simultaneously an offer of covenant renewal, access to the divine source that the exile described as Israel's abandonment. Through this lens, the encounter also performs a boundary-crossing mission theology: the sent one offers the covenant gift across Samaritan-Jewish division, anticipating the 'light to the nations' trajectory of Isaiah's servant.",
  "john-5":
    "How does John 5's agency defense answer the 'equal with God' charge — and why is 5:23's honor-authorization the proskyneo coherence key for the entire Gospel? The Bethesda healing precipitates a Sabbath controversy and the most concentrated agency theology in the Fourth Gospel. Here's where it gets interesting: the charge is 'making himself equal with God' (5:18), and Jesus's response is a sustained counter-argument that runs from 5:19 through 5:30. The structure is clear: 'the Son can do nothing by himself, but only what he sees the Father doing' (5:19). This is not false modesty — it is a precise description of the shaliach model: the authorized representative acts only within the commission. What the original audience would have understood is that 5:23's honor-authorization clause — 'that all may honor the Son just as they honor the Father' — is not a claim to ontological equality. It is the Father's specific authorization of proskyneo directed toward the Son. This is why the Revelation angel refuses proskyneo (he is a fellow servant, without that authorization) while Jesus accepts it: the difference is not ontological identity but the Father's explicit grant. Through this lens, John 5 is the Gospel's legal brief for the agency Christology that every other chapter presupposes. James McGrath's work on John 5:18-23 provides the scholarly framework for this reading.",
  "john-6":
    "What does the Bread of Life discourse reveal — and how does the manna typology reshape what Jesus is claiming? The feeding of five thousand and the discourse that follows operate within an elaborate typological framework: the feeding echoes the manna in the wilderness, and the claim 'I am the bread of life' answers the question 'what sign will you give?' with Moses's manna as the implicit comparison. Here's where it gets interesting: the logic is shaliach commission logic — Moses did not give the bread from heaven, the Father gives the true bread from heaven. The parallel with John 5 is exact: Jesus does not act on his own authority; he acts as the one sent by the Father. What the original audience would have understood is that the discourse escalates to a crisis around 6:41-66 — the 'hard saying' — which is not primarily about eucharistic theology but about whether the audience will accept the shaliach's commission claim. Through this lens, the sea-walking sign (the fifth of the seven) is not a nature miracle appended as an afterthought; it is a reiteration of the Father's authorization displayed in the first Cana sign.",
  "john-7":
    "What does the Feast of Tabernacles context reveal about the confrontations in John 7 — and why does the water-pouring ceremony matter for reading Jesus's declaration? John 7 is set during Sukkot, the Feast of Tabernacles, the most water-focused festival in the Jewish liturgical year. The water-pouring ceremony (Simchat Beit Ha-Sho'evah) drew water from Siloam and poured it on the altar as a rain petition and a symbol of the prophetic promise of living waters (Zechariah 14:8, Isaiah 44:3). Here's where it gets interesting: on the last day of the festival, Jesus stands and cries out 'If anyone thirsts, let him come to me and drink.' What the original audience would have understood is that this is not merely metaphorical language; it is a deliberate act of positioning within the festival's own theology — the one who provides the living water Zechariah and Isaiah promised. Through this lens, the debates in John 7 about whether Jesus is the prophet or the Messiah are not tangential; they are the audience's attempt to locate him within their existing messianic categories.",
  "john-8":
    "What is the ego eimi claim of John 8:58 — and how does the Pericope Adulterae's textual status affect how we read the chapter? First, the text-critical note: the Pericope Adulterae (7:53-8:11) is absent from the earliest and most reliable manuscripts — P66, P75, Codex Sinaiticus, Codex Vaticanus. Bruce Metzger's Textual Commentary on the Greek New Testament documents the evidence clearly. The passage has value as a tradition but should not be read as original Johannine text. The textually secure chapter 8 then proceeds to Jesus's Tabernacles discourse: 'I am the light of the world.' Here's where it gets interesting: 8:58 — 'Before Abraham was, I am' — has generated one of the most significant debates in biblical theology. Richard Bauckham, in Jesus and the God of Israel, argues that ego eimi here deliberately echoes the ani hu trial-speech formula of Isaiah 43:10-13. His divine-identity framework is a serious scholarly argument, and Bible Lens engages it directly. What the original audience would have understood, however, is that the trial-speech context of Isaiah 43 is itself a polemic against Babylonian deity claims — YHWH establishing his exclusive sovereignty before witnesses. NT-03 provides the six-point counter-reading: the shaliach model offers a better account of 8:58 within its narrative context. Through this lens, ego eimi is the sent one's claim of commissioned authority, not an ontological identity declaration.",
  "john-9":
    "What does the healing of the blind man at Siloam reveal — and why is 'I am the light of the world' enacted rather than merely declared? The sixth of John's seven signs is also the most developed narrative — it occupies an entire chapter. The Siloam pool has been archaeologically identified in Jerusalem excavations, and the pool's name ('sent') provides the chapter's interpretive key: the one who was sent sends the blind man to the pool called Sent. Here's where it gets interesting: the healing precipitates a formal investigation by the Pharisees, which becomes a trial — and the trial structure mirrors the Isaiah trial speeches. The blind man, who sees progressively (first 'the man called Jesus,' then 'a prophet,' then his act of worship), models the gospel's call to recognize the sent one's authority. What the original audience would have understood is that the chapter is structured as a theological courtroom: those who claim to see are blind, and the one who was physically blind sees. Through this lens, John 9 is not primarily about miraculous healing; it is about the discernment of commissioned authority in the face of institutional resistance.",
  "john-10":
    "What does 'I and the Father are one' in John 10:30 actually claim — and how does Jesus's Psalm 82 argument function within the agency model? The Good Shepherd discourse and the Hanukkah confrontation are the two poles of John 10. Here's where it gets interesting: the Psalm 82 argument in 10:34-36 is one of the most remarkable passages in the Gospel. When the crowd picks up stones for blasphemy, Jesus appeals to Psalm 82:6 — 'I said, you are gods' — and uses it as a halakhic argument from the lesser to the greater: if the divine council members who received God's word are called elohim, how much more can the one whom the Father sanctified and sent into the world be called Son of God? The shaliach principle is explicit: the sent one is as the one who sent him. What the original audience would have understood is that 10:30 — 'I and the Father are one' — is functional unity, not ontological identity. The Greek hen (neuter singular) is the key: 'one thing,' not 'one being.' Anthony Buzzard's work on 10:30 and the functional unity reading is directly applicable here. Through this lens, the Good Shepherd discourse establishes the commission structure before the identity controversy — the shepherd's authority comes from the Father's authorization, not from ontological equality.",
  "john-11":
    "What does the Lazarus raising reveal as the climactic seventh sign — and why does the 'I am the resurrection and the life' declaration reframe resurrection from future hope to present agency? The raising of Lazarus is the Gospel's literary and theological climax: the seventh sign, the one that precipitates the Sanhedrin's decision to kill Jesus. Here's where it gets interesting: 'I am the resurrection and the life' (11:25) is uttered not as a general theological principle but in the face of Martha's grief and her affirmation that Lazarus would rise at the last day. Jesus's response reframes resurrection from a future event to a present relational claim: the agent of resurrection is now standing before her. What the original audience would have understood is that the raising is not a private event; it is a public sign that generates both belief and hostile response. The Sanhedrin's decision in 11:47-53 directly links the sign to the crucifixion — and Caiaphas's ironic prophecy ('it is better that one man die for the people') becomes a moment of unconscious commission theology.",
  "john-12":
    "What does John 12:41 mean when it says Isaiah saw Jesus's glory — and how does the agency model account for Isaiah seeing YHWH's kabod in Isaiah 6 while John identifies it with Jesus? The triumphal entry, the Greeks' request, and the closing of Jesus's public ministry all converge in John 12. But the exegetical key is 12:41: 'Isaiah said these things because he saw his glory and spoke of him.' Here's where it gets interesting: the antecedent of 'his glory' is disputed. Raymond Brown's Anchor Bible commentary documents the full range of options: the 'his' could refer to YHWH (Isaiah saw YHWH's throne-room glory) or to Jesus (Isaiah saw the pre-existent Christ). The autou ambiguity is not a textual error; it is a deliberate theological move. What the original audience would have understood is that the agency model offers a coherent reading: the Father's glory was displayed through the authorized representative, so that seeing the one sent was, in the commission framework, seeing the authority of the one who sent him. Through this lens, John 12 marks the transition from the Book of Signs to the Book of Glory — and the transition itself enacts the theology: glory is not a property Jesus possesses independently but the display of the Father's authorization through the commissioned work.",
  "john-13":
    "What does the foot washing in John 13 reveal about the glorification theology of the Book of Glory — and why does the new commandment follow immediately after Judas's departure? The Book of Glory opens not with a throne-room vision but with a servant act: the one whom the Father had entrusted with all things, knowing his hour had come, took a towel and washed his disciples' feet. Here's where it gets interesting: the foot washing is an enacted parable of the entire Passion — the voluntary self-abasement of the commissioned one who holds authority precisely by not grasping it. What the original audience would have understood is that 13:31-33 — 'Now is the Son of Man glorified, and God is glorified in him' — is the programmatic statement of the Book of Glory. The glorification does not wait for the resurrection; it begins at the moment the betrayer departs and the cross becomes inevitable. Through this lens, the new commandment that follows — 'love one another as I have loved you' — is not an ethical appendix. It is the mission statement of the post-resurrection community, grounded in the model of the foot washing: the community lives by the pattern of the sent one's love.",
  "john-14":
    "What are the Paraclete passages in John 14-16 — and why does the delegated-authority pattern place the Paraclete within the agency-commission structure? The Farewell Discourse spans chapters 13-17, and its theological spine is the four Paraclete passages. The first and second are in chapter 14 (14:16-17 and 14:26). Here's where it gets interesting: the delegated-authority pattern is consistent across all four passages — the Paraclete is sent by the Father (14:16) or sent by the Son from the Father (15:26); he speaks what he hears (16:13), not on his own authority ('he will not speak on his own'). This is the agency model extended: just as the Son received his commission from the Father, the Paraclete receives his commission from the Son and the Father. What the original audience would have understood is that 14:28 — 'the Father is greater than I' — is the plain-sense statement of commission subordination. Wayne Grudem's Eternal Functional Subordination framework acknowledges this subordination while maintaining Trinitarian orthodoxy; Bible Lens holds the agency reading, which finds subordination built into the commission structure itself. Through this lens, the Farewell Discourse is the commission briefing for the post-resurrection community.",
  "john-15":
    "What does the vine-and-branches metaphor reveal — and why is the Paraclete described as the 'Spirit of truth' in the third Paraclete passage? The vine-and-branches metaphor of John 15 is the Fourth Gospel's most sustained agricultural allegory. The Father is the vinedresser, Jesus is the true vine, and the disciples are the branches. Here's where it gets interesting: 'true vine' positions Jesus as the genuine fulfillment of Israel's vine identity (Psalm 80, Isaiah 5:1-7, Ezekiel 19:10-14). Israel as YHWH's vine was a standard prophetic metaphor for the covenant community; Jesus's claim to be the true vine is a commission claim within that tradition — the sent one embodies what the covenant community was called to be. The third Paraclete passage (15:26-27) describes the Paraclete as the Spirit of truth who proceeds from the Father and will testify concerning Jesus. What the original audience would have understood is that this is still agency language: the Paraclete proceeds from the Father, is sent by the Son, and his testimony is directed toward the Son's identity.",
  "john-16":
    "What does the fourth Paraclete passage reveal — and why does 'he will not speak on his own' establish the delegated-authority pattern so clearly? The fourth Paraclete passage (16:7-15) is the most extended and theologically developed of the four. Here's where it gets interesting: 16:13 contains the most explicit delegated-authority statement in the entire Farewell Discourse — 'he will not speak on his own; he will speak only what he hears.' The structure is precise: whatever the Paraclete hears, he speaks; whatever belongs to Jesus, the Paraclete takes and declares to the disciples. This is the same commission logic as 5:19: the authorized representative does not act independently but within the explicit scope of the commission. What the original audience would have understood is that the fourth Paraclete passage anchors the entire Farewell Discourse's agency structure: the Father sends the Son; the Son sends the Paraclete; the Paraclete testifies to the Son. The chain of authorization runs from the Father through every commissioned agent. Through this lens, the four Paraclete passages together describe the ongoing presence of the Father's commission in the community after the Son's departure.",
  "john-17":
    "What does 'eternal life is knowing you, the only true God, and Jesus Christ whom you sent' mean for Trinitarian theology — and why did Augustine acknowledge the plain-sense pressure of this verse? John 17:3 is the theological center of the High Priestly Prayer and the clearest relational definition of eternal life in the Gospel. Here's where it gets interesting: the verse defines eternal life as relational knowing (ginōskō) of two distinct referents — 'the only true God' and 'Jesus Christ whom you sent.' The apposition is not incidental: the Father is identified as the only true God; Jesus is identified as the one the Father sent. This is not a statement about ontological equality; it is a statement about distinct identities within a commission relationship. What the original audience would have understood is that Augustine himself, in De Trinitate Book I, acknowledged the force of 17:3 as a text that does not easily yield to Trinitarian categories — he argued that the verse requires careful exegetical handling precisely because the plain sense creates pressure. The ideational pre-existence of 17:5 — 'glorify me with the glory I had with you before the world was' — is best understood through the Wisdom-tradition parallel of 1 Peter 1:20 ('foreknown before the foundation of the world'). James Dunn's Christology in the Making frames the pre-existence language as 'what kind of pre-existence?' rather than a dismissal. Through this lens, John 17 is the Gospel's own answer to the Christological question: the one sent knew his commission before the world began.",
  "john-18":
    "What happened at the Garden arrest when soldiers fell back at Jesus's 'I am he' response — and how does the Passion narrative activate the agency framework? The arrest scene of John 18:1-11 contains one of the most discussed moments in the Gospel: when Jesus says 'I am he' (ego eimi) in response to the soldiers' search, they fall backward to the ground. Here's where it gets interesting: the falling-back scene has been read as a theophanic moment — the divine name spoken causing prostration. The agency reading offers a different account: within the commission framework, the Garden ego eimi is the sent one claiming his identity at the moment of voluntary surrender. He does not flee or call for angelic intervention; he controls the arrest (18:8 — 'let these men go'). What the original audience would have understood is that the Passion in John is not a defeat but a deliberate completion of the commission — 'the cup the Father has given me, shall I not drink it?' (18:11). Through this lens, the Garden scene establishes the Passion's theological register: the sent one's completion of the assigned work, not a tragic ending to a failed mission.",
  "john-19":
    "What does 'It is finished' mean — and how does the completion vocabulary of John 19 close the commission framework opened in the Prologue? The crucifixion narrative in John is framed by completion language from beginning to end. Here's where it gets interesting: tetelestai (19:30) — 'It is finished' — is the perfect passive of teleō, the same root used for accomplishing a commissioned task. The word appears in the Septuagint and Hellenistic Greek for the completion of a vow or an assigned duty. What the original audience would have understood is that the cross is not the unexpected interruption of the mission but its deliberate culmination: the commissioned work is complete. John 19's crucifixion account also includes the 'not a bone of him shall be broken' (19:36, echoing Exodus 12:46 and Psalm 34:20) and the piercing of the side (19:37, echoing Zechariah 12:10) — both framed as fulfillments of Scripture, placing the Passion within the framework of the Father's plan. Through this lens, the Passion narrative in John is a theology of completion, not of tragedy: the sent one accomplishes precisely what he was sent to do.",
  "john-20":
    "What does Thomas's confession 'my Lord and my God' mean — and how do the same-chapter bracket of 20:17 and the Psalm 35:23 doxological parallel reshape what Thomas is actually saying? The Resurrection chapter is also the Gospel's theological climax, and 20:28 — Thomas's confession — is its most contested verse. Here's where it gets interesting: the same-chapter bracket that surrounds 20:28 is the primary contextual argument. Eleven verses earlier, in 20:17, the risen Jesus says 'I am ascending to my Father and your Father, to my God and your God.' The possessive 'my God' is Jesus's own description of his relationship to the Father — not equality but commission-relationship. Then Thomas, in 20:28, says 'my Lord and my God.' The agency-doxological reading, anchored in Psalm 35:23 ('Awake, my God and my Lord') and Psalm 88:1 ('O YHWH, God of my salvation'), shows that this doxological address pattern is Psalmic — praise directed toward the one who has acted in salvation. Murray Harris's Jesus as God (Baker, 1992) engages the Trinitarian case most rigorously; the nominative-versus-vocative grammatical argument is insufficient alone, as Harris shows. What the original audience would have understood is that 20:30-31 provides the Gospel's own interpretive key: 'these are written so that you may believe that Jesus is the Messiah, the Son of God' — not 'so that you may believe that Jesus is YHWH.' Ancient wisdom, Johannine clarity: Son of God is the category, not divine identity.",
  "john-21":
    "What does the epilogue of John 21 reveal — and why is the lakeside commission the Gospel's closing movement of restoration and authorization? John 20:30-31 functions as the Gospel's original conclusion, and John 21 is widely recognized as an epilogue, added to address the community's questions about Peter, the Beloved Disciple, and the continuation of mission. Here's where it gets interesting: the lakeside breakfast scene enacts the restoration of Peter through a triple affirmation that mirrors the triple denial of 18:17-27. The commission — 'feed my sheep' — is the pastoral authorization of Peter's post-resurrection leadership. What the original audience would have understood is that the epilogue answers two pressing community questions: what happened to Peter (he is restored and commissioned), and what about the Beloved Disciple's apparent prediction of an imminent return (Jesus never said he would not die, only 'if I want him to remain until I come'). Through this lens, John 21 is not a loose appendix but a deliberate pastoral extension of the Gospel's commission theology: the sent one's mission continues through the community he has authorized.",

  // Romans — 5 RAG clusters, 11 commentary chapters (Phase 136)
  "romans-1":
    "What kind of letter opens by introducing a messenger who has been 'appointed' to his task — and why does Paul's word choice in Romans 1:4 change everything about how we read what follows? The Greek horisthentos, typically rendered 'declared' or 'designated,' carries the force of appointment or installation. Paul opens his letter to a church he has never visited by establishing his theological credentials: Jesus, descended from David according to the flesh, was appointed Son of God in power at the resurrection. What the original audience would have understood is that this is installation language — the same performative register as a royal decree — not a retrospective confirmation of something eternally settled. Through this lens, Romans 1:3-4 frames the entire letter's Christology: the Davidic heir who was appointed/installed at the resurrection as the first-fruits of the new creation. Here's where it gets interesting: the opening movement of the letter (chapters 1-3) is Paul's argument for universal human failure before the faithfulness of the Anointed One — that is the letter's first answer to 'what went wrong and how is it fixed.' The universal diagnosis of Romans 1-3 is the dark canvas on which the pistis Christou answer of chapter 3 is painted. Ancient wisdom: the appointment that changes history is not always the one that looked impressive at the time.",
  "romans-3":
    "What does the phrase 'faithfulness of the Anointed One' mean — and why does the answer depend on whether you read a Greek genitive as subjective or objective? Romans 3:22 contains one of the most debated phrases in Pauline studies: pistis Christou. The traditional English rendering — 'faith in Christ' — reads the genitive as objective: Christ is the object of the faith. The subjective genitive reading — 'the faithfulness of Christ,' meaning Christ's own faithful obedience to the covenant mission — reads Christ as the subject who exercises faithfulness. Here's where it gets interesting: Richard Hays and N.T. Wright argue that pistis Christou should be read as Christ's own covenant faithfulness; this reading is supported by the grammatical parallel in 'the faith of Abraham' (pistis Abraam, Romans 4:16), where Abraham is clearly the subject. The BSB renders pistis Christou as 'faith in Christ Jesus' (3:22) and 'faith in Jesus' (3:26) — objective genitive. Bible Lens reads subjective genitive, following Hays and the parallel with pistis Abraam. What the original audience would have understood is that the question is grammatically open, and both readings are serious scholarly positions. Through this lens, the pistis Christou framing presents God's solution to universal human failure as grounded in the Anointed One's own faithfulness to the covenant, not only in the believer's trust in him. Both dimensions remain; the question is which is primary. Ancient wisdom: sometimes the most important argument is the one about who is acting.",
  "romans-5":
    "Why does Paul introduce Adam into a letter about the inclusion of Gentiles — and what does it mean to say that 'just as sin entered the world through one man, death spread to all because all sinned'? Romans 5 deploys Adam as a typological figure: the progenitor through whom the human condition entered, the counter-type to the Anointed One who reverses its trajectory. What the original audience would have understood is that this is corporate-representative logic — the Adam through whom the pattern spread is not invoked to make a claim about scientific human origins but to establish the structural parallel: one act of faithfulness reverses what one act of failure established. Here's where it gets interesting: the phrase 'all sinned' in 5:12 has generated enormous debate — did all humanity sin in Adam's original act (Augustinian reading), or did death spread because all humanity subsequently sinned? Paul does not settle the question, and that is likely intentional. The typological argument works either way. Through this lens, the Adam typology of Romans 5 is a representative-structural claim, not a scientific-historical one — and that distinction does not weaken the argument; it clarifies what the argument is actually for. The contrast is not between Adam and Jesus as two people but between two modes of existence: the old humanity marked by sin's reign, the new humanity marked by grace's reign. Ancient wisdom: the most powerful arguments about the human condition operate at the level of structure, not biography.",
  "romans-6":
    "What was Paul's audience meant to picture when he described baptism as dying and rising with the Anointed One — and why does that image resist both sacramental and merely symbolic readings? Romans 6's baptism language is one of the most precise passages in Paul's covenant theology: 'Do you not know that all of us who have been baptized into the Anointed One Jesus were baptized into his death?' The ritual of immersion into water is here reframed as covenant identification — the believer entering the death and resurrection narrative of the Anointed One, not as a magic act but as a covenant-entrance rite. What the original audience would have understood is that the water-crossing imagery resonates with Exodus 14: the Reed Sea crossing where Israel entered the death of Egypt and emerged as a new people. Paul's baptism language is not primarily about sacramental necessity — it is about covenant identification with the new representative human. Here's where it gets interesting: the grammar of 6:3-4 is deliberately corporate. 'We were buried with him' — the plural is the community of the new covenant. Through this lens, the logic of Romans 6 is: you have already crossed the threshold; now live as people who are on the other side. The indicative precedes the imperative. You are dead to sin's dominion — therefore, do not let sin reign. Ancient wisdom: you cannot be called to become what you already are by the covenant's own logic.",
  "romans-8":
    "What is Paul describing when he writes about 'the Spirit of God,' 'the Spirit of Christ,' and 'Christ in you' in almost interchangeable proximity — and why does the proximity not collapse into identity? Romans 8 is the most pneumatically dense chapter in Paul, and its Spirit-Christology raises questions that the agency model must address carefully. Here's where it gets interesting: in 8:9-11, Paul shifts between 'Spirit of God,' 'Spirit of Christ,' 'Christ in you,' and then 'the Spirit of him who raised Jesus' — four overlapping phrases in three verses. The interchangeability is real, but the agent is consistently the Father, who acts through the Spirit he sent: 'the Spirit of him who raised Jesus from the dead.' What the original audience would have understood is that pneuma here is agent, not a separate ontological hypostasis. The Spirit operates as the Father's active presence in the life of the community — not Trinitarian Spirit-personhood in the later creedal sense, but the dynamic power of the God who raised Jesus, now dwelling in those who are 'in Christ.' Through this lens, huiothesia — adoption — is the legal-status term that governs the entire chapter: those led by the Spirit are sons and daughters of God by adoption, not by nature. The 'firstborn among many brothers' (8:29) is the resurrection appointment of the Anointed One as the model of the new humanity; the community follows his pattern. Ancient wisdom, pneumatic clarity: the Spirit who indwells is the Father's agent, not a third co-equal person — the distinction is subtle and the language permits overlap, but the subordination is present.",
  "romans-9":
    "How does Paul move from Israel's covenant privileges to 'the one he calls my people' being the Gentile nations — without abandoning Israel's story? Romans 9-11 is the most sustained theological argument in the Pauline corpus, and its center is the question of divine faithfulness: has the word of God failed? Paul's answer is not a simple no. It is a complex, layered defense of YHWH's covenant consistency that moves through two arguments. First, the election of Israel was always corporate-covenantal — 'not all who are descended from Israel are Israel' (9:6). The covenant was never about ethnic lineage as such but about the identity of the people YHWH called. Here's where it gets interesting: Romans 9:5 is one of the most textually contested verses in the NT. The BSB renders it 'Christ, who is God over all, forever praised' — a Trinitarian punctuation. The alternative punctuation, favored by Metzger's Textual Commentary and a significant scholarly tradition, reads verse 5b as a separate doxology directed to God: 'may God who is over all be praised forever.' The scholarly case for the Trinitarian reading is careful — Moo, Harris, and others give it serious weight. But the doxological separation fits the letter's own Christology more naturally, where Paul consistently reserves the title 'God' (ho theos) for the Father. What the original audience would have understood is that both readings require honest engagement, not dismissal. The corporate election argument continues: Israel's election was never about individual predestination but about covenant vocation — 'not of works but of the one who calls' is a statement about God's freedom in covenant-making, not a doctrine of eternal individual destiny.",
  "romans-10":
    "When Paul quotes Joel 2:32 — 'everyone who calls on the name of the Lord shall be saved' — and applies it to Jesus, is he claiming that Jesus is YHWH, or deploying a different explanatory framework? Romans 10 contains one of the most significant kyrios passages in Paul's letters: the Joel 2:32 quotation with kyrios transferred from YHWH's original referent to the Anointed One. What the original audience would have understood is that this transfer operates within the Jewish shaliach principle: the one commissioned fully represents the one who sent him, to the point of carrying his name and authority. Here's where it gets interesting: Larry Hurtado argues that Paul's exalted Christology at this point reflects a genuinely novel 'binitarian' divine devotion — YHWH's name shared with a second figure in a way that breaks all Jewish parallels. Bible Lens engages Hurtado's argument on its own terms: the Joel 2:32 application in Romans 10 is the strongest evidence of divine name-sharing in Paul. The shaliach model reads this as authorized name-bearing within the commission framework, not ontological YHWH-identity. 'The same Lord is Lord of all' (10:12) names the Anointed One as the commissioned representative through whom the covenant's universal scope is enacted. Through this lens, the universality of salvation — Jew and Gentile alike — is grounded not in Jesus being YHWH but in Jesus being the authorized agent through whom YHWH's covenant reaches all nations.",
  "romans-11":
    "What does the olive tree image mean — and why does Paul insist that 'all Israel will be saved' at the end of the most complex argument he ever wrote? Romans 11 brings the corporate election argument to its climax with the olive tree parable: Israel is the cultivated tree whose natural branches were broken off to allow wild branches (Gentiles) to be grafted in. What the original audience would have understood is that this is corporate-covenantal imagery, not a metaphor for individual predestination. The tree is the covenant community; the branches represent covenant participation, which can be lost and regained. Here's where it gets interesting: 'all Israel will be saved' (11:26) has generated enormous debate. Paul's argument in context is not about every ethnic Israelite but about the corporate restoration of the covenant people — the hardening that has come upon part of Israel is not permanent but 'until the fullness of the Gentiles has come in.' Through this lens, the olive tree is Paul's answer to supersessionism before supersessionism existed as a word: Gentile inclusion does not erase Israel from the covenant. The branches were not cut off to make room for permanent Gentile ownership of the tree; they were broken off so that the roots' covenant vitality could reach the wider world — and the natural branches remain graft-able. Romans 11:33-36 closes with a doxology that Paul himself has not surpassed anywhere: 'For from him and through him and to him are all things.' Ancient wisdom: the mystery of divine faithfulness is not a problem to be solved but a depth to be entered.",
  "romans-13":
    "When Paul told the Roman church to 'be subject to the governing authorities,' what was the historical situation he was writing into — and does that context change how the command reads? Romans 13 is the most politically explosive passage in Paul, and its history of use ranges from courageous civil obedience to the justification of imperial church collaboration. What the original audience would have understood is that the letter was written during the quinquennium Neronis — the first five years of Nero's reign (54-59 CE), identified by the historian Tacitus as unusually just and moderate. Robert Jewett's social-scientific commentary argues that the command to submit to governing authorities is addressed to a specific community living in the shadow of the Claudian expulsion (49 CE), recently re-admitted to Rome, navigating the complex social politics of a city where Jewish-Christian communities were already marked as troublemakers. Here's where it gets interesting: Romans 13's submission language is calibrated to the quinquennium context — not an absolute, timeless command to obey any government at any time, but a situation-specific pastoral instruction for a vulnerable community trying to exist in imperial Rome without triggering fresh persecution. Through this lens, the 'governing authorities' are the conduit of a limited, legitimate social function — not the ultimate moral arbiter. Paul's letter was written in the space between the Claudian expulsion and the Neronian persecution, and its political counsel reflects that specific window. Ancient wisdom: context does not dissolve the command; it locates it.",
  "romans-15":
    "Why does Paul describe his entire apostolic career as a 'priestly service of the gospel' — and what does Isaiah 52:15 have to do with his ambition never to build on someone else's foundation? Romans 15 is Paul's apostolic mission charter, and it is thick with Isaiah quotations. The crowning citation is 52:15 — 'those who were never told about him will see, and those who have never heard will understand' — which Paul reads as the scriptural mandate for his Gentile mission. What the original audience would have understood is that Paul positions himself as the servant figure of Isaiah's fourth song: the one carrying the message of servant-exaltation to the nations who had not previously heard it. Here's where it gets interesting: this is a Gentile-inclusion argument grounded in the covenant story of Israel, not a replacement of that story. Paul's mission is not that Israel's calling is over — it is that through the Anointed One, the covenant's universal scope (promised to Abraham in Genesis 12) is now being enacted. Through this lens, the Gentile mission of Romans 15 is not a Gentile takeover of Israel's covenant but the covenant reaching its originally intended breadth. Paul describes himself as a leitourgos — a priestly servant — offering the Gentiles as a 'pleasing offering' to God. The priestly and sacrificial vocabulary frames Gentile inclusion as the completion of Israel's vocation, not its replacement. Ancient wisdom: the mission that looks like it is moving away from the center is sometimes moving most faithfully toward it.",
  "romans-16":
    "Who is Phoebe — and why does Paul's description of her deserve at least as much attention as any other figure he commends in this chapter? Romans 16 opens with Phoebe, a deacon (diakonos) of the church at Cenchreae, described by the Greek prostatis — a word that in every other occurrence in Greek literature describes a leader, patron, and person of authority and standing. What the original audience would have understood is that Phoebe was almost certainly the letter carrier — the one who delivered Romans to Rome and would have read and explained the letter on its arrival. A letter carrier in the ancient world was not a passive postal worker; they were the authorized representative of the author, expected to answer questions and defend the letter's arguments. Here's where it gets interesting: Moo argues that prostatis here should be rendered 'helper' or 'patron,' denoting financial support rather than leadership authority. But as Jewett and others note, prostatis in secular Greek usage — and in the LXX, where it appears for governing officials — carries unambiguous leadership connotations. To translate prostatis as merely 'helper' is to flatten the word. Through this lens, Romans 16 does not merely greet Phoebe in passing — it introduces her as the leader through whom the letter enters Rome. The final chapter's network of greetings reveals a Pauline network with remarkable female leadership: Prisca listed before Aquila, Junia named among the apostles, Phoebe as prostatis. Ancient wisdom: the authority visible in the greetings is often the authority that sustained the movement.",

  // Galatians — 4 RAG clusters, 6 commentary chapters (Phase 140)
  "galatians-1":
    "Why does Paul open his angriest letter by arguing for his own independence from Jerusalem — and what does that argument reveal about the crisis in Galatia? Galatians skips the thanksgiving prayer that opens every other Pauline letter. Paul goes directly to astonishment: 'I am astonished that you are so quickly deserting the one who called you.' The emotional register is alarm, not celebration, and it sets the tone for everything that follows. What the original audience would have understood is that Paul's autobiographical chapters are not preamble — they are the argument. His opponents in Galatia were almost certainly claiming that his gospel was a simplified, second-hand version of the authentic Jerusalem teaching. If the real apostles required Gentile converts to be circumcised, who was Paul to say otherwise? Paul's counter is the opening phrase of the letter itself: 'not from human beings, nor through a human being, but through Jesus Christ and God the Father' (Gal 1:1, BSB) — the Greek ouk ap' anthropon oude di' anthropou sets up the entire letter's independence claim before verse 2 arrives. Here's where it gets interesting: the Damascus road commissioning Paul describes in Gal 1:15-16 — 'God was pleased to reveal his Son in me' — deliberately echoes the prophetic call narratives of Jeremiah (Jer 1:5 — 'before you were born I set you apart') and Isaiah (Isa 49:1 — 'from my birth the Lord called me'). Paul is not claiming apostolic rank within a hierarchy; he is claiming prophetic commission that bypasses the hierarchy entirely. The Jerusalem visits he recounts (Gal 1:18-2:10) reinforce the point: fifteen days with Peter, three years after his conversion. Fourteen years later, a private meeting where the pillar apostles 'added nothing' to his message. Through this lens, Galatians 1 is not autobiography in the modern sense — it is legal testimony, establishing that Paul's gospel has a direct divine source that no amount of Jerusalem authority can override. The apostolic autobiography is itself the argument, not the preamble to it. GL-02: the Antioch incident that will follow in chapter 2 is the lived proof of everything chapter 1 claims.",
  "galatians-2":
    "What happens when the leading apostle capitulates to social pressure — and why does a dinner table confrontation in Antioch become the most important event in the history of the gospel? Galatians 2 is where Paul's abstract apostolic claim becomes concrete history. Peter had been eating freely with Gentile believers in Antioch. Then 'certain people came from James' — and Peter withdrew, 'fearing those who belonged to the circumcision group' (Gal 2:12). Paul calls this hypocrisy to Peter's face. Here's where it gets interesting: this is the most concentrated pistis Christou passage in the Pauline corpus. Galatians 2:16 contains the phrase TWICE — dia pisteōs Iēsou Christou and ek pisteōs Christou — and erga nomou THREE times, all in direct antithesis in a single verse. The tautology argument is decisive: if both pistis Christou occurrences mean 'faith in Christ' (the BSB rendering — objective genitive), then the verse says the same thing twice in immediate sequence. Bible Lens reads the subjective genitive throughout: 'the faithfulness of Christ' — his covenant act of obedience unto death — is the ground of justification. The redundancy dissolves: justification comes through Christ's faithfulness, which Paul and the Galatians received by their own believing in Christ. This BSB divergence must be held clearly: the BSB renders 'faith in Jesus Christ' and 'faith in Christ' (objective genitive both times). The scholarly debate is ongoing; Richard Hays (The Faith of Jesus Christ, Eerdmans, 2002) and N.T. Wright (Galatians, Eerdmans, 2021) anchor the subjective reading; Thomas Schreiner and Douglas Moo defend the objective genitive. What the original audience would have understood is that the 'works of the law' at stake in the Antioch incident were not abstract moral effort — they were food laws and table-fellowship boundaries, the specific practices that maintained the ethnic divide between Jew and Gentile. To refuse table fellowship was to declare Gentile believers second-class covenant members. Paul's confrontation of Peter is not a power struggle between apostles; it is a defense of the gospel's social logic: if justification is through the Messiah's faithfulness received by faith, then no ethnic boundary marker can redefine who belongs at the table. Gal 2:20 adds the first-person depth: 'I live by the faithfulness of the Son of God, who loved me and gave himself for me' (GL-03) — the same subjective genitive reading applied to Paul's own life, the principle of Gal 2:16 now personal.",
  "galatians-3":
    "Why does Paul go behind the Law all the way to Abraham — and what does a midrashic argument about a single Hebrew word reveal about who the covenant people actually are? Galatians 3 is the intellectual engine of the entire letter, and it opens with a rebuke: 'Who has bewitched you?' Paul is astonished that the Galatians have turned away from the gospel he preached, and his corrective is not to argue against the Law on the Law's own terms. He goes behind it — 430 years behind it, to the covenant YHWH cut with Abraham before circumcision and Torah existed. Here's where it gets interesting: Galatians 3 is the foundational text for what scholars now call the New Perspective on Paul. E.P. Sanders established in Paul and Palestinian Judaism (Fortress, 1977) that Second Temple Judaism was not a religion of merit-earning but of covenantal nomism — you enter the covenant by divine grace, and Torah-keeping is the response to grace, not its precondition. James D.G. Dunn built on Sanders's foundation in his 1982 Manson Memorial Lecture — naming 'the New Perspective on Paul' and defining it using Galatians 2-3 as his primary text. The Judaizers in Galatia were not arguing 'earn your salvation through moral effort'; they were arguing 'maintain your covenant standing by the ethnic practices that mark you as part of Israel's covenant community.' Paul's counter-argument: the Abrahamic promise predated those practices and cannot be annulled by them. The seed argument of Gal 3:16 is where Paul makes his most compressed exegetical move: 'Scripture does not say seeds, meaning many people, but seed, meaning one person, who is Christ.' What the original audience would have understood is that this is a midrashic argument, not a grammatical one — Paul knew that zera (seed) is a collective Hebrew noun. He is making a typological claim: the Messiah is the singular heir in whom the Abrahamic inheritance coalesces, and all who belong to the Messiah are co-heirs. Through this lens, the pedagogue correction of Gal 3:24-25 follows from the seed argument: if the Messiah is the singular heir who has arrived, then the custodial slave-guardian arrangement is over. The paidagogos was not a teacher in the modern sense — BDAG and Norman Young's 1987 Novum Testamentum article demonstrate from Greco-Roman papyri that the paidagogos was a household slave whose authority was entirely restrictive, ending at the child's legal adulthood. Paul is not saying Israel graduated from the Law's lessons; he is saying the custody arrangement that held the minor heir has been superseded by the heir's arrival. The pistis Christou of Gal 3:22 (BSB: 'believe in Jesus Christ'; Bible Lens: 'faithfulness of Jesus Christ' — GL-04) is the mechanism by which Gentiles enter the Abrahamic family: not through Torah-boundary observance but through the Messiah's own faithful covenant act, received by their trust in him.",
  "galatians-4":
    "What were the elemental things that both Jewish and Gentile believers were enslaved to — and why does the answer to that question change how you read the whole letter? Galatians 4 opens with a Roman legal metaphor: an heir who is technically a minor 'is no different from a slave, even though he owns everything.' The child under guardians and managers has legal authority suspended — not absent, but held in trust until the time the father appointed. At the right moment, the legal status changes to full sonship. Paul applies this to the covenant story: before the Messiah's arrival, both Jews (under Torah) and Gentiles (under their own religious regimes) were held in the custody of the minor-heir phase. Then sits the contested Greek word: stoicheia tou kosmou (Gal 4:3, 4:9). Here's where it gets interesting: stoicheia is the most contested term in Galatians, and Bible Lens will not pretend otherwise. Three serious scholarly readings are on the table. Reading (a): elementary principles or rudiments of religion — the Law and Gentile religious practices as parallel entry-level religious structures (Dunn, BNTC, 1993; Wright, Eerdmans, 2021). Reading (b): physical elements of the world — earth, air, fire, water — the Stoic usage found in Philo and Plato's Timaeus. Reading (c): elemental spirits or angelic powers — personal cosmic beings associated with the elements (Clinton Arnold, The Colossian Syncretism, Eerdmans, 1996; de Boer, Westminster John Knox, 2011). Bible Lens reads (a) as most contextually coherent — the parallelism of Gal 4:3 and 4:9 equates the Law's custodial function with Gentile pre-Christian religious rudiments. But readings (b) and (c) have serious scholarly support, and through this lens, whatever the stoicheia are — principles, elements, or powers — Paul's point is identical: the Messiah's arrival ends the custodial regime. The huiothesia (adoption) argument of Gal 4:5-7 grounds the liberation in the Abrahamic promise and the legal guardian-to-heir transition (GL-06 maintains the distinction from RM-03: Galatians huiothesia is grounded in the legal-status transition of the Abrahamic heir; Romans huiothesia is grounded in the Spirit as the down-payment of future bodily redemption — related but distinct arguments). What the original audience would have understood: Roman legal adoption (adoptio) was a formal procedure with public weight — the adopted heir received the full name, full inheritance, and full standing of the adopting father's household. Nothing symbolic about it. The Hagar/Sarah allegory of Gal 4:21-31 is Paul's most audacious exegetical move: he explicitly labels his interpretation allegoroumena — 'being spoken allegorically' — making this the only place in the NT where Paul names his OT reading as allegory. Hagar maps onto Sinai, slavery, and the present Jerusalem; Sarah maps onto the Abrahamic promise, freedom, and the Jerusalem above. Paul places the Galatians on the Sarah side of the ledger — and tells them to drive out the enslaved child, because she cannot share the inheritance of the free son (GL-08).",
  "galatians-5":
    "Look at Paul's 'works of the flesh' list in Galatians 5 — and notice what is not there. If sarx means the physical body in a Platonic or Gnostic sense, the list should be dominated by bodily appetites. It is not. Jealousy, strife, factions, dissensions, selfish ambition — more than half the list describes the social pathology of a community still operating under the old-age rules: the competitive, boundary-enforcing, us-versus-them logic of a world where ethnic identity and legal status determine who counts as in and who counts as out. This is the most important single observation for reading Galatians 5. The sarx/pneuma antithesis is eschatological, not cosmological — not matter versus spirit in a Platonic frame but the old age versus the new age inaugurated by the Messiah's faithfulness (GL-09). Ancient wisdom, modern clarity: the contrast between flesh and Spirit is not a diet plan for the soul; it is a manifesto for how covenant communities should organize their common life. What the original audience would have understood: the works of flesh Paul diagnoses are precisely what the Judaizer pressure was generating in Galatia. The demand for circumcision was not simply a theological disagreement — it was creating factions, dissensions, and a two-tier table fellowship. The old-age social logic (ethnic boundary markers as covenant criteria) was fracturing the new-age community. Here's where it gets interesting: the 'fruit of the Spirit' (Gal 5:22-23 — love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control) is not a private inner-experience checklist. Richard Hays (The Moral Vision of the New Testament, HarperSanFrancisco, 1996) argues that Paul's ethics are communal and eschatological: the Spirit-fruit is the social/relational harvest of Spirit-governed community, visible in its social dynamics. A community bearing this fruit is the new-age alternative to the Judaizer program — not a different set of boundary markers, but a different social order. The thesis of the entire letter is Gal 5:1: 'For freedom Christ has set us free; stand firm therefore, and do not submit again to a yoke of slavery.' This is not the beginning of a new section — it is the conclusion of the entire Gal 1-4 argument, landing after the adoption, the Abrahamic promise, and the Hagar/Sarah allegory. The minor heir has come of age. The custodial regime has ended. The conclusion is: you are free. Now stay free.",
  "galatians-6":
    "What does kaine ktisis — new creation — mean at the end of a letter about circumcision and Gentile inclusion, and why does Paul's benediction hinge on a single ambiguous Greek conjunction? Galatians 6 closes with Paul's handwritten autograph: 'See what large letters I use as I write to you with my own hand' (Gal 6:11). Ancient letters were typically dictated to an amanuensis; the large-letter autograph signature was Paul's personal authentication — the ancient equivalent of a notarized signature. The emotional register changes from argument to summary, but the theological stakes are not lower. Gal 6:14-15 is the letter's eschatological conclusion: the cross has ended the old age ('the world has been crucified to me, and I to the world'), and what remains is the new creation — kaine ktisis. Through this lens, new creation in Galatians draws on the Isaiah 65-66 eschatological frame (IS-XX): YHWH's promised renewal of all things, the age in which ethnic divisions and Torah boundary markers are no longer the criteria of covenant membership. Neither circumcision nor uncircumcision matters — only the kaine ktisis. Here's where it gets interesting: Gal 6:16 contains the letter's most contested phrase: 'Peace and mercy to all who walk by this rule, and to the Israel of God.' The kai — the Greek conjunction — is grammatically ambiguous. The additive reading: 'and also the Israel of God' — two groups, all believers and specifically Jewish Christians within the believing community. The epexegetical reading: 'even the Israel of God' — one group, all believers redefined as the covenant Israel. Bible Lens leans toward the additive reading (GL-10): it avoids the anachronistic supersessionism that the epexegetical reading risks, and it fits the letter's overall argument, which is about Gentile inclusion in the Abrahamic covenant family rather than the erasure of ethnic Jewish covenant identity. N.T. Wright (Galatians, Eerdmans, 2021) argues similarly — 'the Israel of God' as ethnic Jewish Christians, consistent with Romans 9-11's careful covenant-inclusion logic. But the epexegetical reading has respectable Pauline parallels, and Thomas Schreiner (ZECNT, 2010) argues it fits Paul's overall argument that covenant membership is now defined by the Messiah, not ethnic identity. Both readings must be held. The ambiguity may be intentional — Paul may be deliberately leaving the covenant categories open at the letter's close, consistent with the entire letter's refusal to erase Israel from the covenant story while insisting that the Messiah's faithfulness, not ethnic boundary markers, defines the covenant people.",

  // Hebrews — 6 RAG clusters, 13 commentary chapters (Phase 144)
  "hebrews-1":
    "What does charaktēr — the exact imprint a die stamps onto a coin — reveal about how the author of Hebrews understood the Son's relationship to God, and why does the seven-quotation OT catena of Hebrews 1:5-14 begin with Psalm 2:7 rather than any of the other royal psalms? The anonymous homily opens with the highest Wisdom Christology in the NT — apaugasma (radiance) and charaktēr (imprint) drawn from Wisdom of Solomon 7:25-26 — and immediately pivots to an argument-by-catena, marshaling seven OT texts to prove the Son holds a position the angels do not. What the original audience would have understood is that this is synkrisis — the Greco-Roman rhetorical technique of comparison — applied to the two categories of heavenly being their Jewish tradition recognized: angels and the messianic Son.",
  "hebrews-2":
    "Why does the author of Hebrews argue that the Son had to share in flesh and blood 'so that through death he might destroy the one who has the power of death' — and what does Psalm 8's 'a little lower than the angels' mean when applied to the incarnation rather than to humanity in general? Hebrews 2:5-9 quotes Psalm 8 and reads its 'for a little while lower than the angels' christologically: the Son's temporary lowering was the necessary precondition for his exaltation. The solidarity argument — 'he is not ashamed to call them brothers and sisters' (2:11) — establishes the priestly identification that the entire letter will develop. Through this lens, the descent-then-ascent pattern of Hebrews 2 is the christological engine driving the letter's argument: the Son who was crowned above angels first went below them.",
  "hebrews-3":
    "How does the therapōn/hyios distinction — Moses as faithful servant versus the Son as faithful heir — reshape how we read the warning passages of Hebrews 3, and what does Psalm 95's 'today' mean when a first-century Jewish audience hears it? The synkrisis of Hebrews 3 is not Moses versus Jesus as rivals but as servant and son within the same household. The Greek therapōn (not doulos — slave) preserves Moses's dignity: a trusted attendant, not a menial. But the son outranks the servant as heir outranks steward. What the original audience would have understood is that Psalm 95's 'today, if you hear his voice, do not harden your hearts' was a liturgical text — sung regularly in Second Temple worship — and the author weaponizes its present-tense urgency against the audience's own complacency.",
  "hebrews-4":
    "What is the katapausis — the rest — that Joshua's conquest did not complete, and why does the author of Hebrews coin a new word, sabbatismos, to describe what remains for the people of God? Hebrews 4:8-9 makes an argument from failure: if Joshua (the Greek Iēsous — the same name as Jesus) had given them rest, God would not have spoken later through David of 'another day.' The rest the wilderness generation forfeited was not simply Canaan. It was the eschatological sabbatismos — a Sabbath-rest that transcends any geographic settlement. Through this lens, Hebrews 4 reads the entire wilderness narrative as a warning about covenantal unfaithfulness — apistia — understood not as intellectual doubt but as the refusal to trust YHWH's promise when the evidence was right in front of them.",
  "hebrews-5":
    "What does the paronomasia pathōn/emathen — 'he suffered, he learned' — reveal about the developmental Christology of Hebrews, and why is a Son who 'learned obedience through what he suffered' more theologically significant than one who simply possessed it? Hebrews 5:8-9 contains the most striking developmental claim about Jesus in the NT: teleiōsis — being made complete or perfected — through suffering. The Greek wordplay pathōn/emathen (suffered/learned) was a well-known Aeschylean proverb. What the original audience would have understood is that the author is claiming real moral development, not merely theatrical appearance — the Son genuinely learned and was genuinely completed through the experience of suffering.",
  "hebrews-6":
    "Why does Hebrews 6:4-6 — 'it is impossible to restore again to repentance those who have once been enlightened' — terrify readers, and what does the agricultural metaphor of thorns and thistles (6:7-8) reveal about how the original audience would have heard this warning? The warning passage of Hebrews 6 is the most pastorally difficult text in the letter. The five participial clauses — enlightened, tasted, shared, tasted again, fallen away — describe a real experience of covenant participation, not a hypothetical case. Through this lens, the impossibility is not about God's unwillingness to forgive but about the rhetorical impossibility of starting over from scratch: you cannot re-lay a foundation that is already laid. The agricultural metaphor (6:7-8) shifts the frame from theology to observed reality: land that receives rain and produces thorns is heading for burning. The audience knows which crop they are producing.",
  "hebrews-7":
    "How does the textual silence of Genesis 14 — no father, no mother, no genealogy for Melchizedek — become the foundation for an entirely different kind of priesthood, and what does the Qumran scroll 11QMelchizedek reveal about how Second Temple Judaism was already reading this figure? Hebrews 7 builds its argument on what Genesis 14 does NOT say. Melchizedek appears without genealogy, without birth or death record — and the author reads this literary silence as theologically significant: apator, amētor, agenealogētos — without father, without mother, without genealogy. This is a typological reading, not an ontological claim: Melchizedek is not an eternal being but a literary type whose textual presentation prefigures an eternal priesthood. The Qumran scroll 11QMelchizedek shows that Second Temple Judaism was already investing Melchizedek with eschatological significance — the Dead Sea Scrolls community read him as a heavenly deliverer figure.",
  "hebrews-8":
    "Why does the author quote the entire Jeremiah 31:31-34 new covenant oracle — the longest OT quotation in the NT — and what does the Greek memphetai reveal about who is actually at fault: the covenant or the people? Hebrews 8:8 is the supersessionism pivot: 'finding fault with THEM' (autois is the dative object of memphetai). God finds fault with the people, not with the covenant itself. The Mosaic covenant was not intrinsically defective; Israel failed to keep it. This distinction is the guardrail against anti-Jewish readings of Hebrews: the author writes to a community under pressure to revert to temple worship, urging 'you already have something better — do not go back.' This is pastoral encouragement to a specific community in crisis, not a universal theological verdict on Judaism.",
  "hebrews-9":
    "What did the Yom Kippur ritual look like from inside the Holy of Holies — and why does the author of Hebrews argue that the earthly sanctuary was always a typos, a copy, of the heavenly original that Exodus 25:40 commanded Moses to replicate? Hebrews 9 maps the Day of Atonement ritual onto a shadow/reality framework: the high priest enters the earthly Holy of Holies once a year with animal blood; the Son enters the heavenly sanctuary ephapax — once for all — with his own. The typos/antitypos architecture means the earthly tabernacle was never the real thing; it was always pointing to the heavenly original. Through this lens, the 'better covenant' language is not a verdict on Judaism but a description of copy versus original — shadow versus reality.",
  "hebrews-10":
    "What does ephapax — once for all — mean when set against the annual repetition of the Day of Atonement, and why does Hebrews 10:26-31 contain the most severe warning passage in the entire NT? The argument of Hebrews 10:1-18 is about repetition versus finality: the Levitical sacrifices repeated annually because they could not permanently remove sin-consciousness; the Son's offering was ephapax — a single, unrepeatable act. The warning of 10:26-31 — 'if we deliberately keep on sinning after receiving the knowledge of the truth, no sacrifice for sins is left' — is addressed to the same community facing the same pressure: do not go back to the temple system, because the once-for-all offering has already been made. Through this lens, the warning is pastoral, not abstract: the audience is considering returning to a system the author says has been fulfilled.",
  "hebrews-11":
    "What does hypostasis mean in Hebrews 11:1 — and why does the same Greek word carry two different senses in the same letter (1:3 versus 11:1)? Hebrews 11:1 defines pistis as hypostasis (confident assurance, the ground one stands on) and elenchos (conviction, evidence of things not visible). This is not 'blind faith' — it is the opposite: faith as the substantive basis for acting on unseen realities. The hall of fame that follows — Abel through the Maccabean martyrs — illustrates this definition through narrative: each figure acted on the basis of a promise they could not yet see fulfilled. The Aqedah (Genesis 22) receives special treatment: Abraham 'reasoned that God could even raise the dead' (11:19) — a typological resurrection reading that connects the near-sacrifice of Isaac to the Son's death and resurrection.",
  "hebrews-12":
    "What is the saleuo — the shaking — of Hebrews 12:26-27 that removes the shakeable things and leaves the unshakeable kingdom, and why does the Haggai 2:6 allusion point to 70 CE rather than a future cosmic dissolution? The partial-preterist reading: the shakeable things are the old covenant institutions — temple, priesthood, sacrificial system — removed when the Romans destroyed Jerusalem in 70 CE. The unshakeable kingdom is the heavenly Zion the audience already belongs to (12:22-24). The Sinai/Zion contrast of 12:18-24 is the letter's rhetorical climax: you have NOT come to the terrifying mountain of Exodus 19 — you HAVE come to the city of the living God, the heavenly Jerusalem, the assembly of the firstborn. Through this lens, the shaking is pastoral comfort, not eschatological threat: the old institutions are passing away, but what you have received cannot be shaken.",
  "hebrews-13":
    "Why does the author close with 'we have here no lasting city, but we seek the city that is to come' — and how does the paideia (discipline) framework of Hebrews 12-13 reframe suffering as son-formation rather than punishment? The closing exhortations of Hebrews 13 are not random pastoral advice. They flow from the letter's argument: 'let us go to him outside the camp, bearing the reproach he bore' (13:13) invokes the Yom Kippur imagery of chapter 9 — the sin offering was burned outside the camp (Lev 16:27). The community is called to identify with the sacrifice, not the sanctuary. Through this lens, the entire closing chapter is the practical application of the letter's theological argument: live as citizens of the unshakeable kingdom, even while the shakeable institutions crumble around you.",

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

// Total: 42 + 33 + 61 + 27 + 21 = 184 chapters (all COMMENTARY_DESCRIPTIONS keys covered)
export const THEMATIC_SECTIONS: ThematicSection[] = [
  {
    id: "eschatology",
    title: "Eschatology",
    description: "End-times prophecy through the lens of partial preterism and premillennialism.",
    chapterKeys: [
      "matthew-24", "matthew-25",
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
      "john-1",
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
      "isaiah-54", "isaiah-55",
      "john-3", "john-13", "john-17",
      "matthew-5", "matthew-6", "matthew-7", "matthew-13",
      "romans-1", "romans-3", "romans-5", "romans-6", "romans-9", "romans-10", "romans-11", "romans-13",
      "galatians-1", "galatians-2", "galatians-3", "galatians-5", "galatians-6",
      "hebrews-8", "hebrews-9", "hebrews-10", "hebrews-12", "hebrews-13",
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
      "isaiah-40", "isaiah-42", "isaiah-43", "isaiah-44", "isaiah-45", "isaiah-49", "isaiah-50",
      "john-1", "john-5", "john-8", "john-10", "john-12",
      "matthew-1", "matthew-2", "matthew-28",
      "romans-8", "romans-15", "romans-16",
      "galatians-3", "galatians-4",
      "hebrews-1", "hebrews-2", "hebrews-5", "hebrews-7",
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
    id: "matthew-gospel-arc",
    title: "Narrative Arc through Matthew's Gospel",
    throughLine:
      "Follow Matthew's five-discourse structure from the genealogy through the Great Commission — each cluster reveals how a first-century Jewish author framed Jesus as a new Moses figure.",
    steps: [
      { bookId: "matthew", chapter: 1, annotation: "The genealogy as theology: Davidic credential encoded in a 3×14 structure, formula quotation pattern opening — Matthew's Gospel as typological new genesis." },
      { bookId: "matthew", chapter: 2, annotation: "Formula quotations and typological-pesher reading: how Matthew reads OT texts as having a deeper referent beyond their original historical context." },
      { bookId: "matthew", chapter: 5, annotation: "The Sermon on the Mount opens Matthew's first major discourse: Torah intensification, not replacement — antitheses structured as a Second Temple rabbi's commentary on the Decalogue." },
      { bookId: "matthew", chapter: 13, annotation: "The parable discourse: mashal genre, kingdom mystery, and the insider/outsider structure that shapes how Matthew frames Jesus's teaching method." },
      { bookId: "matthew", chapter: 24, annotation: "The Olivet Discourse through a partial-preterist lens: 'this generation' as a temporal marker and the Daniel 7 Son of Man background." },
      { bookId: "matthew", chapter: 28, annotation: "The Great Commission as shaliach commissioning: received authority, universal mission, and the Emmanuel inclusio closing the Gospel where it opened." },
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
  {
    id: "servant-songs-arc",
    title: "Servant Songs Arc",
    throughLine:
      "Four poems embedded in Isaiah 40-55 trace a single arc: a servant commissioned to bring mishpat to the nations through gentleness, not force (Song 1, Isaiah 42); named 'Israel' yet sent to Israel, expanding the covenant to become a light to the nations (Song 2, Isaiah 49); taught morning by morning, suffering endured but not passive — 'who will contend with me?' (Song 3, Isaiah 50); and finally exalted after disfigurement, the most contested passage in the Hebrew Bible where corporate Israel and typological fulfillment layer on top of each other (Song 4, Isaiah 52-53). What the original audience would have understood is that these four poems were not isolated oracles but a developing portrait — the method, the mission, the cost, and the vindication.",
    steps: [
      { bookId: "isaiah", chapter: 42, annotation: "First Song: mishpat to the nations — gentle method, bruised reed, dimly burning wick." },
      { bookId: "isaiah", chapter: 49, annotation: "Second Song: the Servant named Israel, yet sent to Israel — the identity tension the text refuses to resolve." },
      { bookId: "isaiah", chapter: 50, annotation: "Third Song: the limmud tongue — morning by morning the Servant is taught what to say to the weary." },
      { bookId: "isaiah", chapter: 52, annotation: "Fourth Song begins here: the Servant exalted — the passage actually starts at 52:13, not chapter 53." },
      { bookId: "isaiah", chapter: 53, annotation: "The most contested chapter in the Hebrew Bible: corporate Israel first, then typological fulfillment — both as layers, not competitors." },
    ],
  },
  {
    id: "john-signs-arc",
    title: "Signs Arc",
    throughLine:
      "Seven signs run through John 1-11, each called a semeion — a revelatory act, not merely a miracle. Here's where it gets interesting: John's signs vocabulary differs deliberately from the Synoptic dynameis ('mighty works'). Each semeion is not a demonstration of raw power but a disclosure of the Father's authority delegated to the sent one — a window into the commission. The literary crescendo is no accident: water-to-wine (glory revealed, disciples believe), then official's son (faith without seeing), then Bethesda (Sabbath controversy, the agency defense begins), then feeding and sea walking together (manna typology, the Bread of Life discourse provoked), then the blind man at Siloam (the light of the world enacted in the pool 'called Sent'), then Lazarus (the seventh sign, the climax that precipitates the cross). Through this lens, the signs are not scattered miracles held together by a common narrative — they are a progressive revelation of the Father's authorization. Each sign makes visible what the Prologue announced: the logos agent through whom all things were made is now operating in history, and the signs are the evidence.",
    steps: [
      { bookId: "john", chapter: 1, annotation: "The logos overture — theological frame for all seven signs." },
      { bookId: "john", chapter: 2, annotation: "First sign: Cana — glory revealed, disciples believe." },
      { bookId: "john", chapter: 4, annotation: "Second sign: official's son — faith without seeing." },
      { bookId: "john", chapter: 5, annotation: "Third sign: Bethesda — Sabbath controversy, agency defense begins." },
      { bookId: "john", chapter: 6, annotation: "Fourth and fifth signs: feeding and sea walking — manna typology." },
      { bookId: "john", chapter: 9, annotation: "Sixth sign: blind man — 'I am the light of the world' enacted." },
      { bookId: "john", chapter: 11, annotation: "Seventh sign: Lazarus — climactic revelation, 'I am the resurrection.'" },
    ],
  },
  {
    id: "john-i-am-declarations-arc",
    title: "I Am Declarations Arc",
    throughLine:
      "Seven ego eimi declarations run through the Fourth Gospel, each completing the pattern: 'I am the bread of life,' 'I am the light of the world,' 'I am the good shepherd,' 'I am the resurrection and the life,' 'I am the way, the truth, and the life,' 'I am the true vine.' And then the absolute 'I am' of 8:58: 'Before Abraham was, I am.' Here's where it gets interesting: each declaration fits the shaliach agency model — the sent one declares what the Father authorized, not an independent ontological claim. Richard Bauckham connects 8:58 to the ani hu trial-speech formula of Isaiah 43, arguing for a divine-identity echo. NT-03 engages this argument directly: the Isaiah 43 courtroom context is a polemic against Babylonian deity claims, not a formula establishing ontological identity. What the original audience would have understood is that the 'I am' sayings are the Fourth Gospel's sustained answer to the question 'who sent you and what authority do you carry?' — the sent one declares the Father's authorization in each domain. Through this lens, the seven declarations trace the scope of the commission: bread (life itself), light (revelation), door (access), shepherd (governance), resurrection (ultimate authority), way-truth-life (direction), vine (fruitfulness). The commission is total.",
    steps: [
      { bookId: "john", chapter: 6, annotation: "I am the bread of life — manna from the Father, not Moses." },
      { bookId: "john", chapter: 8, annotation: "I am the light of the world — Tabernacles context, 8:58 absolute ego eimi." },
      { bookId: "john", chapter: 10, annotation: "I am the good shepherd / I am the door — Psalm 82 agency argument." },
      { bookId: "john", chapter: 11, annotation: "I am the resurrection and the life — before the seventh sign." },
      { bookId: "john", chapter: 14, annotation: "I am the way, the truth, and the life — Farewell Discourse." },
      { bookId: "john", chapter: 15, annotation: "I am the true vine — the Father as vinedresser, branches as commission." },
    ],
  },
  {
    id: "john-farewell-discourse-arc",
    title: "Farewell Discourse Arc",
    throughLine:
      "Chapters 13-17 form the most sustained theological unit in the Fourth Gospel: the Farewell Discourse, from foot washing through the High Priestly Prayer. The literary architecture is deliberate: an enacted parable (foot washing) opens the Book of Glory, followed by the new commandment after Judas's departure, then four Paraclete passages weave through chapters 14-16, then the vine metaphor, then the prayer of chapter 17. Here's where it gets interesting: the four Paraclete passages (14:16-17, 14:26, 15:26, 16:7-15) all carry the same delegated-authority pattern — 'he will not speak on his own' (16:13). The Paraclete is sent by the Father or by the Son from the Father; he speaks what he hears; his testimony is directed toward the Son's identity. What the original audience would have understood is that this is the commission structure extended: the Father authorized the Son; the Son authorizes the Paraclete; the Paraclete authorizes the community. Through this lens, the Farewell Discourse is the commission briefing for the post-resurrection community — the transfer of authority from the Son's visible presence to the Paraclete's ongoing presence.",
    steps: [
      { bookId: "john", chapter: 13, annotation: "Foot washing and new commandment — the enacted parable opens the Book of Glory." },
      { bookId: "john", chapter: 14, annotation: "First and second Paraclete passages — 'the Father is greater than I' (14:28)." },
      { bookId: "john", chapter: 15, annotation: "Vine and branches — third Paraclete passage, the 'Spirit of truth.'" },
      { bookId: "john", chapter: 16, annotation: "Fourth Paraclete passage — 'he will not speak on his own' (16:13)." },
      { bookId: "john", chapter: 17, annotation: "High Priestly Prayer — 'the only true God' (17:3), ideational pre-existence (17:5)." },
    ],
  },
  {
    id: "john-unitarian-lens-arc",
    title: "Unitarian Lens Arc",
    throughLine:
      "This arc is not a proof-text tour — that framing would violate the voice discipline of NT-07. It is a reading of John's agency Christology as a coherent whole, from Prologue to Resurrection. The Father-Son distinction runs through every chapter: the Son can do nothing by himself (5:19), the Father is greater than I (14:28), the only true God and Jesus Christ whom you sent (17:3). Here's where it gets interesting: these are not isolated proof-texts for a minority position — they are the structural load-bearing claims of the Fourth Gospel's Christology. What the original audience would have understood is that the Gospel's stated purpose (20:30-31) is 'that you may believe Jesus is the Messiah, the Son of God' — not 'so that you may believe Jesus is YHWH.' Son of God is the category; commissioned agent is the relationship. John 17:3 is the theological center of this arc: eternal life defined as relational knowing of the only true God and the one he sent. The highest Christological moments of the Gospel — logos as theos (1:1c), ego eimi (8:58), I and the Father are one (10:30), Thomas's confession (20:28) — all point, through this lens, to authorized agency rather than ontological identity.",
    steps: [
      { bookId: "john", chapter: 1, annotation: "Logos as personified Wisdom — qualitative theos at 1:1c, not numerical identity." },
      { bookId: "john", chapter: 5, annotation: "Agency defense: 'the Son can do nothing by himself' (5:19) — the Father-Son commission." },
      { bookId: "john", chapter: 8, annotation: "Ego eimi in trial-speech context — Bauckham's divine-identity argument engaged via NT-03." },
      { bookId: "john", chapter: 10, annotation: "'I and the Father are one' (10:30) — functional unity, Psalm 82 gods argument." },
      { bookId: "john", chapter: 14, annotation: "'The Father is greater than I' (14:28) — the subordination built into the commission." },
      { bookId: "john", chapter: 17, annotation: "'The only true God' (17:3) — the theological center of the agency reading." },
      { bookId: "john", chapter: 20, annotation: "Thomas's confession (20:28) in light of 20:17 and 20:30-31 purpose statement." },
    ],
  },
  {
    id: "pauline-gospel-arc",
    title: "Pauline Gospel Arc",
    throughLine:
      "Paul's letter to the Romans is not a systematic theology textbook — it is a missionary's case brief, written to a church he has never visited, arguing that the God of Israel has always intended to include Gentiles through the faithfulness of the Anointed One. Galatians compresses the same argument into a shorter, more polemical letter — the confrontational, first-person version of what Romans would later articulate more systematically. If Romans is Paul laying out his gospel for an audience he has not met, Galatians is Paul defending the same gospel under crisis conditions in churches he planted. The arc moves from universal human condition (Rom 1-3) through covenant death-and-resurrection (Rom 5-6), into the Spirit-empowered life of adopted sons and daughters (Rom 8), through the most contested election passage in the Bible (Rom 9-11), lands on the practical ethics of a community living under Rome's shadow (Rom 13-16), and then reads Galatians as the 'angry version' — the apostolic autobiography, the Antioch confrontation, the Abrahamic seed argument, and the new creation benediction that compress the entire Pauline gospel into a crisis letter. Through this lens, every cluster answers the same question: how does Paul ground Gentile inclusion in the story of Israel's God — without erasing Israel from the story?",
    steps: [
      { bookId: "romans", chapter: 1, annotation: "Rom 1-3: The universal condition — all humanity under sin, and the faithfulness of the Anointed One (pistis Christou) as God's answer." },
      { bookId: "romans", chapter: 5, annotation: "Rom 5-6: Adam typology and baptism — covenant death-and-resurrection as the entrance into the new humanity." },
      { bookId: "romans", chapter: 8, annotation: "Rom 8: The Spirit-empowered life — huiothesia (adoption), pneuma genitives, and the firstborn among many brothers." },
      { bookId: "romans", chapter: 9, annotation: "Rom 9-11: Corporate election, the olive tree, and Israel's covenant future — the most contested cluster in Paul." },
      { bookId: "romans", chapter: 13, annotation: "Rom 13-16: Living under empire — Jewett's quinquennium Neronis context, Phoebe's leadership, and the Gentile mission charter." },
      { bookId: "galatians", chapter: 1, annotation: "Gal 1-2: Apostolic autobiography as argument — Paul's independence from Jerusalem and the Antioch incident as lived proof that ethnic boundary markers cannot define covenant membership." },
      { bookId: "galatians", chapter: 3, annotation: "Gal 3: The Abrahamic seed argument and the pedagogue correction — the Law as slave-guardian custody, not educational preparation, and the midrashic reading of 'seed' singular as Christ." },
      { bookId: "galatians", chapter: 4, annotation: "Gal 4: Stoicheia, huiothesia, and the Hagar/Sarah allegory — from slavery to elemental things to adoption as full heirs of the Abrahamic promise." },
      { bookId: "galatians", chapter: 5, annotation: "Gal 5-6: Freedom, Spirit vs. flesh, and new creation — the eschatological contrast between the old age and the new, closing with the contested 'Israel of God.'" },
    ],
  },
  {
    id: "hebrews-arc",
    title: "Hebrews Arc",
    throughLine:
      "An anonymous homily addressed to a Jewish-Christian community under pressure to revert to temple worship before 70 CE. The argument arc runs from the Son's supremacy over angels (Heb 1-2) through the Moses typology (Heb 3-4) and Melchizedek priesthood (Heb 5-7) to the new covenant and the once-for-all sacrifice (Heb 8-10), then through the faith hall of fame (Heb 11) to the unshakeable kingdom (Heb 12-13). The letter's signature word is kreitton — 'better' — used not as a ranking of religions but as pastoral encouragement to a community in crisis: you already have something better, do not go back. Through this lens, Hebrews is a sermon about holding fast, not a polemic about superseding.",
    steps: [
      { bookId: "hebrews", chapter: 1, annotation: "Heb 1-2: The anonymous homily opens with a Wisdom Christology prologue — charaktēr and apaugasma from Wisdom of Solomon 7:25-26 — then the OT catena of seven quotations arguing the Son holds a position superior to angels via Ps 2, Ps 45, Ps 102, and Ps 110." },
      { bookId: "hebrews", chapter: 3, annotation: "Heb 3-4: Moses honored as faithful therapōn (servant), the Son as faithful heir — and Psalm 95's 'today' still calls the audience to enter the katapausis (rest) that Joshua's conquest did not complete." },
      { bookId: "hebrews", chapter: 5, annotation: "Heb 5-7: A priest without genealogy — Melchizedek's appearance in Genesis 14 without father, mother, or genealogy is the textual silence that authorizes an entirely different kind of priesthood, confirmed by Psalm 110:4's oath." },
      { bookId: "hebrews", chapter: 8, annotation: "Heb 8-10: The new covenant — the full Jeremiah 31 quotation, Yom Kippur typology, and ephapax (once for all) sacrifice. The memphetai of 8:8 finds fault with the people, not the covenant — pastoral encouragement, not anti-Jewish polemic." },
      { bookId: "hebrews", chapter: 11, annotation: "Heb 11: The faith hall of fame from Abel through the Maccabean martyrs — pistis defined as hypostasis (confident assurance) and elenchos (conviction of things unseen), not blind belief." },
      { bookId: "hebrews", chapter: 12, annotation: "Heb 12-13: The saleuo (shaking) of Haggai 2:6 removes the shakeable old covenant institutions in 70 CE, leaving the unshakeable kingdom — the heavenly Zion the audience already belongs to." },
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

  // --- AEO enrichment (optional) ---
  // Present on essays that have been through the episode→essay pipeline.
  // Backward-compatible: older essays omit these and render exactly as before.
  datePublished?: string; // ISO 8601 — Article.datePublished + freshness signal
  dateModified?: string;  // ISO 8601 — Article.dateModified
  // The doctrinal "not this" boundary: names, visibly and in schema, where the
  // historical reading parts from popular teaching. The boundary is part of the
  // claim — it travels with any chunk an AI engine lifts.
  boundary?: string;
  // Visible FAQ that also backs FAQPage schema. Must mirror the rendered Q&A
  // (schema-without-visible-content reads as cloaking).
  faq?: { question: string; answer: string }[];
  // Source episode for the VideoObject cross-link + "watch the episode" card.
  video?: {
    youtubeId: string;
    name: string;
    description: string;
    uploadDate: string;    // ISO 8601
    thumbnailUrl?: string;
  };
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
    chapterKeys: ["daniel-7", "daniel-2", "matthew-24", "revelation-1", "revelation-5", "psalms-2", "psalms-110", "john-5", "john-12", "matthew-1"],
    prose: `The question that unlocks Daniel 7 is deceptively simple: which direction does the son of man travel?

Read the verse carefully. In Daniel 7:13, the one like a son of man comes "with the clouds of heaven" and approaches the Ancient of Days — moving toward the throne, not away from it. He is being escorted upward into the divine courtroom to receive dominion, glory, and kingdom. The direction of travel is an ascent, not a descent to earth.

Here's where it gets interesting: this is how Second Temple Judaism universally read the passage. The author of 1 Enoch wrote entire chapters dramatizing this heavenly enthronement scene. The Dead Sea Scrolls community prized the Daniel vision precisely because it described a figure approaching God and receiving cosmic authority. None of these readers pictured a descent to a battle on earth. They pictured a coronation in heaven.

What the original audience would have understood is that Daniel's four beasts emerge from the sea — the ancient symbol of chaos and non-order — and they are progressively stripped of dominion until the court is seated and judgment is given. Into this scene steps the one like a son of man, the human-shaped figure who represents what the beasts are not: ordered, dignified, image-bearing humanity, vindicated before God.

Through this lens, Revelation 5 becomes unmistakable. John weeps because no one can open the sealed scroll. Then the Lamb steps forward — and the imagery collapses back into Daniel 7:13. The unsealing of the scroll in Revelation 5 is the throne room scene of Daniel 7:13, applied to Jesus at his ascension. Matthew 24:30 follows the same logic: "the Son of Man coming on the clouds" is the enthronement language of Daniel, not a description of a physical landing on earth.

This is a minority reading in popular Christianity but the majority reading among scholars working with Second Temple literature — it changes everything downstream: what "coming with clouds" means in Mark 14:62 and what Pentecost announces.

Psalms 2 and 110 are the Psalter's coronation bookends — same enthronement vocabulary, same upward trajectory. Ancient wisdom doesn't always travel in straight lines. Sometimes it ascends.

Matthew 1's genealogy encodes the Davidic throne-number (3×14), placing "son of David" and "son of man" on the same figure the Daniel 7 enthronement scene frames.`,
    datePublished: "2026-03-19",
    dateModified: "2026-06-18",
    boundary: `The title is the first clue, and it's deliberate. Daniel calls the figure "one like a son of man" — a human one — set pointedly against the beasts that stand for the empires. A human designation forecloses divine origin rather than implying it: God could not be "a son of man." And the coming with the clouds is not the figure claiming YHWH's prerogative for himself — it is the sign of the Father's approval, heaven's public vindication of the Son. He is brought to the Ancient of Days and granted dominion, glory, and kingdom; he does not arrive already holding them.

So Bible Lens parts from the popular reading in two directions. Against the futurist picture, the direction is an ascent to the throne, not a descent to earth. Against the Trinitarian proof-text, the scene shows a human figure divinely approved and enthroned as God's agent — through whom the saints receive the kingdom (7:18, 27) — not a second co-equal God.`,
    faq: [
      {
        question: `Who is "the one like a son of man" in Daniel 7?`,
        answer: `A human figure — deliberately so. Where the empires rise from the sea as beasts (a lion, a bear, a leopard), this one is "like a son of man," a human one, brought before God and given the kingdom. Bible Lens reads him as an exalted, divinely-approved human figure through whom "the saints of the Most High" receive the kingdom (Daniel 7:18, 27) — not a divine being.`,
      },
      {
        question: `Does Daniel 7 prove the son of man is co-equal with God?`,
        answer: `Bible Lens reads it the opposite way. The figure is granted dominion, glory, and kingdom by the Ancient of Days — he receives them, he doesn't arrive already holding them — which marks him as God's exalted agent, not the one God. The title "son of man" itself forecloses divine origin: God could not be a son of man. Faithful readers weigh the further Christology differently, but the scene shows conferral, not co-equality.`,
      },
      {
        question: `Isn't "coming with the clouds" a divine prerogative — doesn't that make him God?`,
        answer: `Cloud-imagery does accompany God's presence, and Second Temple Judaism entertained a "two powers in heaven." But in Daniel the clouds are the medium of the Father's approval — heaven publicly vindicating the figure — not evidence that he shares God's nature. The text has already named him a human one, set against the bestial empires; the clouds endorse him, they don't deify him.`,
      },
      {
        question: `Is "the Son of Man coming on the clouds" in Matthew 24:30 a future descent to earth?`,
        answer: `No — it's enthronement language lifted straight from Daniel 7, applied to Jesus' vindication. The cloud-coming is coronation imagery: the figure brought to the throne and given authority, not a description of a physical landing. Read this way, Mark 14:62 and Matthew 24:30 announce exaltation, not a return trip downward.`,
      },
    ],
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
    datePublished: "2026-03-19",
    dateModified: "2026-06-18",
    boundary: `Revelation hands its first readers a riddle — "let the one who has understanding calculate the number of the beast" — and a riddle is only a riddle if its audience can solve it. They could: in Hebrew gematria, Neron Qesar (Nero Caesar) totals 666 exactly, and the 616 manuscript variant matches the Latin spelling of the same name. The beast is imperial Rome; the mark is the social and economic pressure to signal loyalty to the imperial cult. The number had a first-century answer because it was written for first-century eyes.

This is why the long parade of later candidates — popes, dictators, more than one US president — never lands: it treats 666 as a cipher only the distant future could crack, which empties the riddle of the point Revelation gave it. Bible Lens doesn't deny that persecuting, idolatrous power recurs with similar traits across history — but the number names Nero's Rome, not a figure still to come. This parts decisively from the futurist reading that defers the mark and the beast to our own day.`,
    faq: [
      {
        question: `Could 666 refer to a modern figure — a president, the pope, a coming world leader?`,
        answer: `Almost certainly not, and Revelation tells you why: it asks its readers to calculate the number (13:18) — a puzzle meant to be solved by the people holding the letter. In Hebrew gematria, Nero Caesar totals 666; the 616 variant matches the Latin spelling. A code only the distant future could crack would have been useless to its first audience. The long line of modern candidates — popes, dictators, more than one US president — exists because the futurist method ignores that the riddle already had a first-century answer.`,
      },
      {
        question: `What does 666 actually mean?`,
        answer: `It is gematria — the ancient practice where letters double as numbers. "Neron Qesar," Nero Caesar written in Hebrew letters, totals 666 exactly; when scribes copied a variant reading 616, that matches the Latin spelling, which drops a letter and shifts the total by 50. Two numbering systems, the same man.`,
      },
      {
        question: `Is the mark of the beast a microchip, barcode, or cashless system?`,
        answer: `No — those are modern images read back into the text. For the first readers, the "mark" was the social and economic pressure to signal loyalty to Rome: participation in the imperial cult was woven into trade and civic life, so to buy and sell freely was, in effect, to bear Caesar's mark.`,
      },
      {
        question: `Who is the beast?`,
        answer: `Imperial Rome — the power demanding the worship owed to God alone. The sea-beast of Revelation 13 gathers the imagery of Daniel 7's empires (lion, bear, leopard) into one, and its land-beast maps onto the imperial-cult priesthood of Asia Minor that enforced emperor-worship in cities like Ephesus, Smyrna, and Pergamum.`,
      },
    ],
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
    chapterKeys: ["genesis-1", "genesis-2", "genesis-3", "genesis-6", "genesis-11", "ezekiel-1", "exodus-25", "exodus-26", "exodus-27", "psalms-8", "psalms-82", "job-38", "job-39", "job-40", "job-41", "proverbs-8", "proverbs-31", "ecclesiastes-3", "john-1"],
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
    datePublished: "2026-03-19",
    dateModified: "2026-06-18",
    boundary: `It's interesting that Genesis 1 mirrors the shape of a temple dedication: six days of ordering, then — on the seventh — the Deity takes up residence and rests, enthroned. Some read that correspondence as the key, and call the chapter a cosmic-temple inauguration: an account of order and dwelling, of who rules and where. Bible Lens finds the parallel striking and leaves the reader to decide how much weight it carries.

When God says "let us make man in our image" (1:26), Bible Lens reads the "us" as the divine council — God announcing his purpose to the heavenly host, the sons of God — not the persons of a Trinity, and not a "plural of majesty," a construction Biblical Hebrew doesn't really use this way. The act itself is God's alone: the very next verse shifts to the singular, "God created." Humanity is made as God's image-bearers and representatives, set in the world to reflect his rule.`,
    faq: [
      {
        question: `"Let us make man in our image" — does that point to the Trinity?`,
        answer: `Bible Lens reads it as the divine council, not the Trinity. God announces his purpose to the heavenly host — the sons of God — and then acts alone: the very next verse goes singular, "God created." The "plural of majesty" alternative doesn't hold up either, since Biblical Hebrew doesn't really use that construction this way. It reads as a deliberative address to the council, not a hint of plural persons within God.`,
      },
      {
        question: `What does it mean to call Genesis 1 a "cosmic temple"?`,
        answer: `It's the observation that the chapter mirrors the shape of a temple dedication — six days of ordering the space, then on the seventh the Deity takes up residence and rests, enthroned. Read that way, Genesis 1 is about order, rule, and dwelling: who is in charge, and where he lives. Bible Lens finds the parallel striking and leaves you to weigh how much it carries.`,
      },
      {
        question: `What is the firmament (raqia)?`,
        answer: `The raqia is the solid dome of ancient Near Eastern cosmology — the vault holding back the "waters above." Genesis pictures the world the way its first audience already saw it: a dome overhead, waters above and below. The point isn't a lesson in physics; it's a declaration of who built the structure and set its boundaries.`,
      },
      {
        question: `Why does light appear on day 1 but the sun not until day 4?`,
        answer: `This is the puzzle that gives the game away: "let there be light" on day one, but the sun, moon, and stars only on day four. On a temple-dedication reading it isn't a contradiction — the days assign domains and their rulers (light and time first, then the lights that govern them), the way a dedication assigns roles before installing the officials. The original audience wasn't reading an astronomy sequence; they were watching a world being set in order.`,
      },
    ],
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
    chapterKeys: ["matthew-24", "daniel-9", "daniel-7", "revelation-6", "zechariah-14", "jeremiah-7", "matthew-25", "hebrews-12"],
    prose: `Jesus began the Olivet Discourse in response to a specific question from specific people. The disciples pointed to the temple stones. Jesus said not one stone would be left on another. They asked, in effect: when? What will be the sign?

The partial preterist reading takes that question at face value. The disciples were not asking about a distant apocalypse two thousand years away. They were asking about the temple they could see from where they were sitting on the Mount of Olives. And Jesus answered them.

Here's where it gets interesting: Matthew 24:34 is one of the most discussed verses in all of eschatology. "This generation will not pass away until all these things take place." The Greek genea consistently means a biological generation — roughly forty years — in Matthew's Gospel. Forty years after the Olivet Discourse puts us squarely at AD 70, when the Roman general Titus destroyed Jerusalem and the temple exactly as Jesus described, with the horror of "those days" and the flight from Judea.

What the original audience would have understood is that Daniel's framework structures Jesus's response. Daniel 9's seventy weeks prophesied a coming desolation — "an abomination that causes desolation" — and Jesus invoked that language directly. The abomination Daniel foresaw in the context of Antiochus IV had a second iteration: the Roman armies surrounding and then defiling Jerusalem. "When you see Jerusalem surrounded by armies, know that its desolation has come near" (Luke 21:20).

Through this lens, the cosmic language of Matthew 24:29-30 — sun darkened, stars falling, son of man coming on clouds — is not literal astronomy. It is prophetic convention for the fall of earthly powers: Isaiah 13 uses it for Babylon, Ezekiel for Egypt. Jesus uses the same stock vocabulary for Rome's judgment on Jerusalem.

Zechariah 14 provides the Day of the LORD narrative the Olivet Discourse echoes — Jerusalem besieged, YHWH intervening on the same Mount of Olives where Jesus is speaking.

Revelation 6's four horsemen follow the same covenant curse sequence: conquest, war, famine, death — Leviticus 26 enacted in history.

Where Bible Lens parts from full preterism: Revelation 19-20 describes a future physical return and a literal millennium still ahead.

Matthew 25 is the sequel discourse — ten virgins, talents, sheep-and-goats — developing faithful vigilance between announcement and consummation. Partial-preterist and majority readings differ on the eschatological frame; the ethical center stands across both.`,
    datePublished: "2026-03-19",
    dateModified: "2026-06-18",
    boundary: `The disciples asked Jesus about a specific building — the temple they could see from the Mount of Olives, which he'd just said would be leveled. Bible Lens takes that question at face value: the Olivet Discourse is first of all Jesus answering when the temple would fall. "This generation will not pass away until all these things take place" (24:34) means what it says — genea is a biological generation, about forty years — and forty years later, in AD 70, Rome did exactly what he described. The cosmic language (sun darkened, stars falling, the Son of Man coming on the clouds) is stock prophetic convention for the fall of a power — Isaiah used it for Babylon, Ezekiel for Egypt — not a literal sky-show.

So Bible Lens parts from the popular reading in two directions. Against dispensational futurism, which defers the whole discourse to a still-future tribulation, it holds that most of Matthew 24 was fulfilled in AD 70. Against full preterism, which says everything was fulfilled then, it holds that a future physical return and a literal millennium (Revelation 19-20) are still ahead. Partial, not full; fulfilled, but not finished.`,
    faq: [
      {
        question: `Was Matthew 24 fulfilled in AD 70?`,
        answer: `Largely, yes. Jesus answered a question about the temple the disciples were looking at, and within a generation — about forty years — Rome leveled it: the siege, the flight from Judea, the horror he described. "This generation will not pass away" (24:34) puts the weight of the discourse in the first century, not a distant future.`,
      },
      {
        question: `Does this mean there's no future second coming?`,
        answer: `No — and this is where Bible Lens parts from full preterism. It reads a future physical return and a literal millennium (Revelation 19-20) as still ahead, with Matthew 24 itself centered on AD 70. That said, the line isn't drawn with total confidence: the events around AD 70 were genuinely strange — Josephus records eerie portents over Jerusalem — and thoughtful full preterists build a real case from them. Bible Lens leans to "the return is still future" while treating the question as honestly contested.`,
      },
      {
        question: `"The Son of Man coming on the clouds" (24:30) — is that the second coming?`,
        answer: `Bible Lens reads it as the AD 70 vindication — the same Daniel 7 enthronement language, where coming "on the clouds" signals a throne-room vindication rather than a descent to earth. On that reading, "the coming" in Matthew 24 isn't the future return. There are decent arguments the other way, and Bible Lens doesn't treat the case as closed — but the enthronement reading fits the discourse's own AD 70 frame best.`,
      },
      {
        question: `Is the "sun darkened, stars falling" language literal?`,
        answer: `No — it's stock prophetic convention for the collapse of a power. Isaiah used the same sun-and-stars imagery for Babylon's fall, Ezekiel for Egypt's; the first audience knew it as the standard vocabulary of judgment on a nation. Here it marks the end of the temple order, not the end of the sky.`,
      },
    ],
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
    chapterKeys: ["isaiah-52", "isaiah-53", "isaiah-42", "isaiah-49", "isaiah-50", "isaiah-40", "isaiah-43", "isaiah-44", "isaiah-45", "isaiah-54", "isaiah-55", "isaiah-7", "isaiah-9", "isaiah-11", "isaiah-1", "isaiah-2", "isaiah-6", "psalms-2", "psalms-22", "psalms-45", "psalms-110", "jeremiah-23", "job-3", "job-19", "ecclesiastes-9", "john-1", "john-12", "matthew-5", "romans-3", "romans-9", "romans-11", "hebrews-1", "hebrews-2", "hebrews-5", "hebrews-7", "hebrews-11"],
    prose: `The most contested chapter in the Hebrew Bible was not always contested in the same way. The question of who Isaiah 53 describes — Israel or Jesus — is a modern framing of an ancient text that was originally designed to hold multiple readings at once.

Here's where it gets interesting: the historically prior reading, dominant among Jewish interpreters before Christianity recontextualized the passage, understood the servant as corporate Israel. Rashi argued systematically that the servant who bears the iniquities of the nations is Israel itself — exiled, suffering, destined for vindication. Ibn Ezra followed the same trajectory. This was not a minority opinion; it was the mainstream.

What the original audience would have understood is that Isaiah uses "servant" in multiple registers throughout chapters 40-55. Sometimes the servant is Israel collectively (Isaiah 41:8-9). Sometimes the servant is a faithful remnant within Israel (Isaiah 49:3-6). The oscillation between corporate and individual is built into the text's structure — and that oscillation is the key.

Through this lens, Isaiah 52:13 is where the passage actually begins, not chapter 53. The servant is "exalted and lifted up" — the same Hebrew verbs used for YHWH's own exaltation. The shocking reversal is the point: from disfigurement to exaltation, from being despised to being acknowledged by kings.

The typological reading — that Jesus fulfilled the servant's role — does not cancel the corporate reading. It layers on top of it. What Israel was called to be (a light to the nations, a redemptive presence among the peoples), Jesus embodied in concentrated, singular form. Both as layers, not competitors.

Isaiah 7, 9, and 11 work the same way: each addresses an original crisis first, then carries typological weight recognized in light of Jesus.

The Psalter's royal messianic cluster — Psalms 2, 22, 45, 110 — forms the second OT pillar alongside the servant songs.

Songs 1 through 3 (Isaiah 42, 49, 50) trace the arc before 52-53: the servant commissioned through gentleness, named Israel yet sent to Israel, taught morning by morning the limmud tongue.

Ecclesiastes 9 extends the tension: where the servant songs transform suffering into vocation, Qoheleth simply observes that death does not distinguish. Together the three books hold the honest space of canonical Wisdom Literature.

Matthew 5's antitheses operationalize Isaiah 42:3 — the bruised-reed servant ethic applied as Torah intensification.`,
    datePublished: "2026-03-19",
    dateModified: "2026-03-19",
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
    datePublished: "2026-03-19",
    dateModified: "2026-03-19",
  },
  {
    slug: "genesis-2-conditional-immortality",
    title: "Genesis 2 and \"You Will Surely Die\": Mortality, Not Damnation",
    description:
      "Did God threaten hell in Eden? The Hebrew mot tamut — 'dying you shall die' — read as a mortality sentence, not damnation: the conditional-immortality case.",
    keywords: [
      "conditional immortality",
      "mot tamut meaning",
      "you will surely die Genesis 2:17",
      "does the Bible teach an immortal soul",
      "Genesis 2:17 death not damnation",
    ],
    chapterKeys: ["genesis-2", "genesis-3", "genesis-1"],
    prose: `Genesis 2:17 carries the most famous warning in the Bible — and for most of two thousand years it has been read as a threat the original audience would not have recognized.

Start with the Hebrew. The phrase is mot tamut: the verb "to die" stacked on itself, an infinitive absolute paired with a finite verb. It is the strongest way Biblical Hebrew has of saying this will certainly happen. Older translations render it "thou shalt surely die"; the most literal reading is "dying you shall die." It is a guarantee, not a metaphor — and, crucially, not a description of where the dead go.

Here's where it gets interesting: the people who first heard Genesis read aloud were ancient Near Eastern people, and they did not carry a concept of an immortal soul that floats free of the body. That picture arrives later, largely through Greek philosophy a thousand years downstream. To the original audience, "you will surely die" meant the nephesh — the whole breath-animated living self of Genesis 2:7 — would stop. Become dust again. Time-bound, in the most concrete sense the word has.

So when God names the consequence, there is no hell in the frame, because there is no doctrine of hell or immortal souls in the frame yet. There is a man, a garden, a tree, and a clock that has been hidden until now. Eat, and the clock starts.

What the original audience would have understood is that the death named here is not a place but a category change. Adam was formed from dust and given the breath of life, and as long as he had access to the tree of life his body could continue. Read the next chapter carefully: after the eating, God acts "lest he reach out and take from the tree of life, and live forever," and sets cherubim to guard the way. The death is the closing of the source. The breath stays; the image-bearing stays; the body becomes what bodies are when cut off from life — temporary.

This is what resolves the obvious objection. Adam eats, and lives another nine hundred and thirty years (Genesis 5:5). Doesn't that mean the warning failed? Mot tamut never claimed instant death — it claimed the certainty of death. The clock starts in Genesis 3, runs through Genesis 5, and catches up with Adam at nine hundred and thirty. The warning told the truth slowly.

Through this lens, what changes is almost everything downstream. If Genesis 2 is about mortality rather than damnation, the savior's work is no longer rescue from God's wrath against a disembodied soul — it is the restoration of access to the source. Paul names the same physical category with terrifying economy: "in Adam all die — in Christ all shall be made alive" (1 Corinthians 15:22). Not damned and pardoned. Die and alive. Adam closes the way to the tree; the last Adam opens it back.

Ancient wisdom, modern clarity. The warning was always true. The death was always real. It simply was not the death we were taught to fear.`,
    datePublished: "2026-06-17",
    dateModified: "2026-06-17",
    boundary: `Bible Lens reads Genesis 2:17 as conditional immortality, and states plainly that this is a minority position in modern Christianity. It is not the inherited reading — in which Adam's soul dies spiritually and faces conscious eternal torment — and it does not pretend that reading away: that view has careful defenders and a long history. But it imports an immortal-soul framework the Hebrew text does not supply. Bible Lens also does not claim the question is closed. The aim is to put the grammar and the ancient context on the table and name, openly, where the historical reading parts from the popular one. That boundary is part of the claim, not a footnote to it. Bible Lens also distinguishes the prospect of everlasting life — which Adam and the angels held and could forfeit — from immortality, the conferred deathlessness God grants only after proven loyalty. That two-tier reading separates this position from both the innate-immortal-soul view and a flat annihilationism.`,
    faq: [
      {
        question: "Does Genesis 2:17 teach that human beings have an immortal soul?",
        answer:
          "On the historical reading, no. The original ancient Near Eastern audience had no concept of an immortal soul separable from the body; that idea enters later through Greek philosophy. \"You will surely die\" meant the whole living self (nephesh) would end. Bible Lens holds the conditional-immortality reading — that ongoing life was tied to access to the tree of life rather than being intrinsic to humanity — and notes openly that this is a minority view in modern Christianity.",
      },
      {
        question: "Did Adam start out immortal?",
        answer:
          "No. Adam — like the angels — began with the prospect of everlasting life, sustained by access to the tree of life and contingent on loyalty. That is not immortality. Immortality is deathlessness that cannot be lost, and Scripture presents it as something God confers after testing, not something any creature owns by nature. Jesus, having been tested and proven faithful, has been granted it (Romans 6:9 — death no longer has dominion over him); the faithful are promised the same at the resurrection (1 Corinthians 15:53-54). Adam never had it to lose.",
      },
      {
        question: "If Adam \"surely died,\" why did he live another 930 years?",
        answer:
          "The Hebrew mot tamut (\"dying you shall die,\" an infinitive absolute paired with a finite verb) asserts the certainty of death, not its immediacy. The death is the loss of access to the tree of life — the source — after which the body begins its slow return to dust. The clock starts in Genesis 3 and reaches Adam in Genesis 5:5. The warning came true slowly.",
      },
      {
        question: "What does mot tamut mean?",
        answer:
          "It is the verb \"to die\" stacked on itself — an infinitive absolute paired with a finite verb — the strongest intensifier Biblical Hebrew has. Literally \"dying you shall die\"; traditionally \"thou shalt surely die.\" It guarantees the outcome without specifying when it arrives.",
      },
      {
        question: "Is conditional immortality the mainstream Christian view?",
        answer:
          "No, and Bible Lens says so directly. The dominant Western reading remains the inherited immortal-soul framework with conscious eternal torment. Conditional immortality — that life is sustained by God rather than intrinsic, so \"death\" means ending rather than eternal conscious separation — is a minority position with careful defenders. Bible Lens argues it from the Hebrew grammar and ancient context rather than asserting it as settled.",
      },
    ],
    video: {
      youtubeId: "kvX3MTVps9E",
      name: "\"You Shall Die\" — But Did He? | Bible Lens",
      description:
        "The Hebrew mot tamut — 'dying you shall die' — read as a mortality sentence, not a threat of hell: the conditional-immortality case from Genesis 2:17 through 1 Corinthians 15.",
      uploadDate: "2026-06-07",
      thumbnailUrl: "https://i.ytimg.com/vi/kvX3MTVps9E/maxresdefault.jpg",
    },
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
  "genesis-12": ["genesis-15", "genesis-22", "matthew-28"],
  "genesis-22": ["genesis-12", "isaiah-53", "hebrews-11"],
  "genesis-28": ["genesis-12", "ezekiel-1"],

  // Genesis — Divine council / cosmos cluster
  "genesis-1": ["genesis-2", "ezekiel-1", "john-1"],
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

  // Matthew — 5 RAG clusters, 9 commentary chapters (Phase 132)
  "matthew-1": ["matthew-2", "isaiah-7", "genesis-22"],
  "matthew-2": ["matthew-1", "isaiah-7", "isaiah-9"],
  "matthew-5": ["matthew-6", "exodus-20", "isaiah-42"],
  "matthew-6": ["matthew-5", "matthew-7", "isaiah-55"],
  "matthew-7": ["matthew-5", "matthew-6", "proverbs-8"],
  "matthew-13": ["matthew-24", "daniel-2", "isaiah-6"],
  "matthew-24": ["daniel-9", "revelation-6", "jeremiah-7"],
  "matthew-25": ["matthew-24", "daniel-7", "ezekiel-37"],
  "matthew-28": ["matthew-1", "genesis-12", "isaiah-49"],

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
  "revelation-19": ["revelation-20", "ezekiel-39", "john-20"],
  "revelation-20": ["revelation-19", "ezekiel-38", "zechariah-14"],
  "revelation-21": ["revelation-22", "isaiah-65", "zechariah-8"],
  "revelation-22": ["revelation-21", "isaiah-66", "daniel-12"],

  // Isaiah — Messianic cluster
  "isaiah-7": ["isaiah-9", "isaiah-11", "matthew-1"],
  "isaiah-9": ["isaiah-7", "zechariah-9", "psalms-2"],
  "isaiah-11": ["isaiah-9", "isaiah-65", "jeremiah-23"],
  "isaiah-52": ["isaiah-53", "isaiah-50", "romans-15"],
  "isaiah-53": ["isaiah-52", "psalms-22", "romans-9"],
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
  "genesis-15": ["genesis-12", "genesis-22", "romans-5"],
  "genesis-18": ["genesis-12", "isaiah-6", "daniel-10"],
  "isaiah-1": ["isaiah-2", "ezekiel-2", "matthew-24"],
  "isaiah-2": ["isaiah-1", "isaiah-11", "ezekiel-38"],
  "isaiah-6": ["isaiah-1", "ezekiel-1", "exodus-33"],

  // Exodus — Liberation Arc cluster
  "exodus-3": ["genesis-15", "isaiah-6", "exodus-12"],
  "exodus-12": ["exodus-3", "exodus-14", "genesis-22"],
  "exodus-14": ["exodus-12", "exodus-19", "revelation-19"],
  "exodus-19": ["exodus-20", "exodus-14", "genesis-15"],
  "exodus-20": ["exodus-19", "exodus-32", "matthew-5"],
  "exodus-25": ["exodus-26", "exodus-27", "hebrews-9"],
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
  "psalms-2": ["psalms-110", "daniel-7", "hebrews-1"],
  "psalms-8": ["psalms-82", "genesis-1", "genesis-2"],
  "psalms-22": ["psalms-89", "isaiah-53", "romans-8"],
  "psalms-23": ["psalms-22", "psalms-89", "exodus-33"],
  "psalms-45": ["psalms-2", "psalms-110", "isaiah-9"],
  "psalms-51": ["psalms-139", "psalms-22", "ezekiel-37"],
  "psalms-82": ["genesis-6", "ezekiel-28", "john-10"],
  "psalms-89": ["psalms-2", "psalms-22", "genesis-15"],
  "psalms-110": ["psalms-2", "psalms-45", "hebrews-7"],
  "psalms-139": ["psalms-51", "psalms-8", "genesis-1"],

  // Jeremiah — 8 commentary clusters, 9 chapters
  "jeremiah-1": ["exodus-3", "isaiah-6", "ezekiel-1"],
  "jeremiah-7": ["isaiah-1", "matthew-24", "exodus-20"],
  "jeremiah-18": ["jeremiah-19", "exodus-32", "genesis-18"],
  "jeremiah-19": ["jeremiah-18", "isaiah-1", "exodus-14"],
  "jeremiah-23": ["zechariah-3", "zechariah-6", "isaiah-11"],
  "jeremiah-29": ["daniel-1", "jeremiah-31", "daniel-9"],
  "jeremiah-31": ["hebrews-8", "ezekiel-37", "romans-9"],
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
  "proverbs-8": ["proverbs-1", "proverbs-31", "john-1"],
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

  // Deutero-Isaiah — 5 RAG clusters, 9 commentary chapters
  "isaiah-40": ["isaiah-42", "exodus-14", "isaiah-6"],
  "isaiah-42": ["isaiah-49", "isaiah-40", "matthew-5"],
  "isaiah-43": ["isaiah-42", "isaiah-44", "john-8"],
  "isaiah-44": ["isaiah-45", "isaiah-43", "jeremiah-7"],
  "isaiah-45": ["isaiah-44", "isaiah-40", "daniel-1"],
  "isaiah-49": ["isaiah-42", "isaiah-50", "jeremiah-1"],
  "isaiah-50": ["isaiah-49", "isaiah-42", "jeremiah-1"],
  "isaiah-54": ["isaiah-55", "isaiah-49", "jeremiah-31"],
  "isaiah-55": ["isaiah-54", "isaiah-40", "exodus-19"],

  // John — 11 RAG clusters, 21 commentary chapters
  "john-1": ["genesis-1", "proverbs-8", "john-2"],
  "john-2": ["john-3", "john-4", "john-1"],
  "john-3": ["john-2", "john-4", "john-17"],
  "john-4": ["john-2", "john-3", "john-5"],
  "john-5": ["john-6", "john-10", "psalms-82"],
  "john-6": ["john-5", "john-11", "exodus-14"],
  "john-7": ["john-8", "john-9", "isaiah-43"],
  "john-8": ["john-7", "isaiah-43", "john-18"],
  "john-9": ["john-10", "john-5", "psalms-82"],
  "john-10": ["john-9", "psalms-82", "john-5"],
  "john-11": ["john-12", "john-6", "john-20"],
  "john-12": ["john-11", "isaiah-6", "john-1"],
  "john-13": ["john-14", "john-17", "john-1"],
  "john-14": ["john-15", "john-16", "john-13"],
  "john-15": ["john-14", "john-16", "john-17"],
  "john-16": ["john-14", "john-15", "john-17"],
  "john-17": ["john-13", "john-16", "john-20"],
  "john-18": ["john-19", "john-8", "isaiah-53"],
  "john-19": ["john-18", "john-20", "isaiah-52"],
  "john-20": ["john-21", "john-17", "psalms-22"],
  "john-21": ["john-20", "john-1", "john-13"],

  // Romans — 5 RAG clusters, 11 commentary chapters (Phase 136)
  "romans-1": ["genesis-12", "isaiah-52", "matthew-1"],
  "romans-3": ["isaiah-53", "genesis-15", "psalms-22"],
  "romans-5": ["genesis-12", "genesis-3", "isaiah-52"],
  "romans-6": ["exodus-14", "genesis-3", "jeremiah-31"],
  "romans-8": ["isaiah-40", "psalms-51", "genesis-1"],
  "romans-9": ["isaiah-53", "jeremiah-31", "genesis-15"],
  "romans-10": ["isaiah-53", "isaiah-40", "psalms-22"],
  "romans-11": ["isaiah-65", "jeremiah-31", "ezekiel-37"],
  "romans-13": ["isaiah-52", "matthew-24", "jeremiah-29"],
  "romans-15": ["isaiah-52", "isaiah-40", "genesis-12"],
  "romans-16": ["psalms-22", "jeremiah-31", "matthew-28"],

  // Galatians — 4 RAG clusters, 6 commentary chapters (Phase 140)
  "galatians-1": ["galatians-2", "romans-1", "jeremiah-1"],
  "galatians-2": ["galatians-1", "galatians-3", "romans-3"],
  "galatians-3": ["galatians-4", "genesis-15", "romans-5"],
  "galatians-4": ["galatians-3", "galatians-5", "isaiah-65"],
  "galatians-5": ["galatians-6", "galatians-4", "romans-8"],
  "galatians-6": ["galatians-5", "isaiah-65", "romans-11"],

  // Hebrews — 6 RAG clusters, 13 commentary chapters (Phase 144)
  "hebrews-1": ["hebrews-2", "psalms-2", "psalms-110"],
  "hebrews-2": ["hebrews-1", "hebrews-3", "psalms-22"],
  "hebrews-3": ["hebrews-4", "hebrews-2", "exodus-16"],
  "hebrews-4": ["hebrews-3", "hebrews-5", "genesis-2"],
  "hebrews-5": ["hebrews-6", "hebrews-7", "psalms-110"],
  "hebrews-6": ["hebrews-5", "hebrews-7", "genesis-22"],
  "hebrews-7": ["hebrews-5", "hebrews-8", "genesis-14"],
  "hebrews-8": ["hebrews-9", "hebrews-10", "jeremiah-31"],
  "hebrews-9": ["hebrews-8", "hebrews-10", "exodus-25"],
  "hebrews-10": ["hebrews-8", "hebrews-9", "jeremiah-31"],
  "hebrews-11": ["hebrews-12", "genesis-22", "genesis-12"],
  "hebrews-12": ["hebrews-13", "hebrews-11", "psalms-2"],
  "hebrews-13": ["hebrews-12", "hebrews-8", "psalms-110"],
};
