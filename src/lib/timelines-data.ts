export type ClaimStatus = "documented" | "derived" | "disputed" | "hypothesis";

export interface TimelineSource {
  id: string;
  title: string;
  author?: string;
  note: string;
  url?: string;
}

export interface EvidenceItem {
  title: string;
  status: ClaimStatus;
  summary: string;
  sourceIds: string[];
}

export interface TimelineSection {
  id: string;
  heading: string;
  body: string[];
  status?: ClaimStatus;
  cite?: string;
}

export interface TimelineVisualLane {
  label: string;
  date: string;
  description: string;
  emphasis?: boolean;
}

export interface TimelineVisual {
  eyebrow: string;
  left: TimelineVisualLane;
  right: TimelineVisualLane;
  pivot: string;
  note: string;
}

export interface Timeline {
  slug: string;
  kicker: string;
  title: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  conclusion: string;
  strongestObjection: string;
  visual: TimelineVisual;
  sections: TimelineSection[];
  evidence: EvidenceItem[];
  sources: TimelineSource[];
  posterImage: string;
  posterAlt: string;
  posterWidth: number;
  posterHeight: number;
  posterDownload: string;
  socialImage: string;
  datePublished: string;
  dateModified: string;
}

export interface MasterTimelineEvent {
  date: string;
  label: string;
  status: ClaimStatus;
  href?: string;
}

export interface MasterTimelineEra {
  id: string;
  range: string;
  title: string;
  summary: string;
  events: MasterTimelineEvent[];
}

export const CLAIM_STATUS_COPY: Record<ClaimStatus, { label: string; description: string }> = {
  documented: {
    label: "Documented",
    description: "Directly stated by a primary text, excavation report or securely dated object.",
  },
  derived: {
    label: "Derived",
    description: "Calculated from stated figures or formed by joining documented observations.",
  },
  disputed: {
    label: "Disputed",
    description: "A genuine scholarly disagreement; the evidence permits more than one reading.",
  },
  hypothesis: {
    label: "Hypothesis",
    description: "A proposed identification or reconstruction that goes beyond what the evidence names.",
  },
};

export const MASTER_TIMELINE_ERAS: MasterTimelineEra[] = [
  {
    id: "primeval-world",
    range: "Genesis 1–9",
    title: "The primeval world",
    summary: "Creation, the genealogies of Genesis 5 and the Flood form the first chronological layer.",
    events: [
      { date: "Textual anchor", label: "Creation and Adam", status: "documented" },
      { date: "c. 3000 BC", label: "Flood in the longer Genesis chronology", status: "derived", href: "/timelines/the-flood" },
    ],
  },
  {
    id: "nations",
    range: "Genesis 10–11",
    title: "Nations and Babel",
    summary: "The table of nations and Babel bridge the Flood traditions and the patriarchal world.",
    events: [
      { date: "Manuscript evidence", label: "Different begetting ages in Genesis 11", status: "documented", href: "/timelines/the-flood" },
      { date: "Date uncertain", label: "Babel and the dispersal", status: "hypothesis" },
    ],
  },
  {
    id: "patriarchs",
    range: "Genesis 12–50",
    title: "The patriarchs",
    summary: "These dates use a 1450 BC Exodus and 215 years in Egypt. Genesis 37:2, 41:46 and 45:6 place Joseph's arrival about 22 years before Jacob's; the absolute dates depend on the selected model.",
    events: [
      { date: "c. 1880 BC", label: "Abraham enters Canaan in the 430-year model", status: "derived", href: "/timelines/israel-in-egypt" },
      { date: "c. 1687 BC", label: "Joseph enters Egypt", status: "derived", href: "/timelines/joseph-at-avaris" },
      { date: "c. 1665 BC", label: "Jacob's household enters Egypt", status: "derived", href: "/timelines/israel-in-egypt" },
    ],
  },
  {
    id: "egypt",
    range: "Genesis 46–Exodus 12",
    title: "Israel in Egypt",
    summary: "Textual witnesses disagree about where the 430-year span begins; archaeology supplies context, not names.",
    events: [
      { date: "Middle Bronze Age", label: "A high-ranking Asiatic at Avaris", status: "documented", href: "/timelines/joseph-at-avaris" },
      { date: "215 or 430 years", label: "The length of the Egyptian sojourn", status: "disputed", href: "/timelines/israel-in-egypt" },
    ],
  },
  {
    id: "exodus-conquest",
    range: "Exodus–Joshua",
    title: "Exodus to the conquest",
    summary: "The early-date model is Bible Lens's working framework, while the historical reconstruction remains disputed.",
    events: [
      { date: "c. 1450 BC", label: "Exodus in the early-date model", status: "disputed" },
      { date: "c. 1410 BC", label: "Entry into Canaan", status: "derived" },
    ],
  },
];

export const TIMELINES: Timeline[] = [
  {
    slug: "israel-in-egypt",
    kicker: "TEXTUAL CHRONOLOGY",
    title: "Israel in Egypt: 215 or 430 Years?",
    tagline: "Four ancient witnesses, one difficult verse, and a chronology that deserves more care than a slogan.",
    metaTitle: "Israel in Egypt: 215 or 430 Years? | Bible Lens",
    metaDescription: "Compare the Masoretic, Septuagint and Samaritan readings of Exodus 12:40, alongside Josephus, Paul and the biblical genealogies.",
    intro: [
      "The main Masoretic wording of Exodus 12:40 places Israel's 430-year residence in Egypt. The Greek Septuagint and Samaritan Pentateuch explicitly include Canaan in the same span. Josephus and Paul's argument in Galatians also measure the story from the patriarchal promise rather than simply from Jacob's arrival in Egypt.",
      "That makes a 215-year Egyptian sojourn an ancient and coherent reading, not a modern rescue attempt. It does not, by itself, prove that a scribe deliberately removed words from the Hebrew text: scholars still dispute which form of the verse is earliest.",
    ],
    conclusion: "Bible Lens finds the 215-year Egyptian sojourn persuasive because it integrates the patriarchal dates, Galatians 3:17 and several ancient textual witnesses. The responsible conclusion is that the shorter sojourn has substantial ancient support—not that textual corruption has been proven beyond dispute.",
    strongestObjection: "The Septuagint and Samaritan wording may be an explanatory expansion designed to harmonise Exodus with the patriarchal chronology. The surviving Masoretic wording could therefore preserve the shorter, earlier text even if the longer interpretation is chronologically attractive.",
    visual: {
      eyebrow: "WHERE DOES THE CLOCK BEGIN?",
      left: { label: "Masoretic wording", date: "430 years", description: "The residence of the Israelites in Egypt." },
      right: { label: "Septuagint & Samaritan wording", date: "Canaan + Egypt", description: "The same 430-year span includes the patriarchal residence in Canaan.", emphasis: true },
      pivot: "The wording of Exodus 12:40",
      note: "The textual difference is real. Which wording is earliest remains disputed.",
    },
    sections: [
      {
        id: "patriarchal-math",
        heading: "How the 215-year reading is derived",
        status: "derived",
        body: [
          "Abraham was 75 when he entered Canaan; Isaac was born 25 years later; Jacob was born when Isaac was 60; and Jacob entered Egypt at 130. Added together, 25 + 60 + 130 gives 215 years from Abraham's arrival in Canaan to Jacob's arrival in Egypt.",
          "If the 430 years end at the Exodus and begin with Abraham's residence, the remaining 215 years fall in Egypt.",
        ],
        cite: "Genesis 12:4; 21:5; 25:26; 47:9",
      },
      {
        id: "paul-and-josephus",
        heading: "Paul and Josephus start earlier than Egypt",
        status: "documented",
        body: [
          "Galatians 3:17 describes 430 years between the promise and the law. Josephus likewise says the Israelites left Egypt 430 years after Abraham entered Canaan, while specifying 215 years after Jacob entered Egypt.",
          "Neither witness settles the original wording of Exodus 12:40, but both show that the patriarch-to-Sinai interpretation circulated in antiquity.",
        ],
        cite: "Galatians 3:17; Josephus, Antiquities 2.318",
      },
      {
        id: "genealogy",
        heading: "What the genealogy can—and cannot—show",
        status: "disputed",
        body: [
          "The lifespans of Kohath, Amram and Moses create a tight chronological ceiling if Exodus 6 is a complete father-to-son genealogy. Biblical genealogies can telescope generations, however, so the arithmetic is supporting evidence rather than a standalone proof.",
        ],
        cite: "Exodus 6:16–20; Numbers 26:58–59",
      },
    ],
    evidence: [
      { title: "The major textual witnesses differ", status: "documented", summary: "The Masoretic Text names Egypt; the Septuagint and Samaritan Pentateuch include Canaan in the 430-year residence.", sourceIds: ["exod", "glatt-gilad"] },
      { title: "The patriarchal intervals total 215 years", status: "derived", summary: "The ages stated in Genesis yield 215 years from Abraham's entry into Canaan to Jacob's entry into Egypt.", sourceIds: ["genesis"] },
      { title: "Josephus explicitly gives both intervals", status: "documented", summary: "Antiquities 2.318 states 430 years from Abraham's entry into Canaan and 215 years from Jacob's entry into Egypt.", sourceIds: ["josephus"] },
      { title: "The longer wording is the original text", status: "disputed", summary: "Some see omission in the Masoretic tradition; others see harmonising expansion in the Greek and Samaritan traditions.", sourceIds: ["glatt-gilad"] },
    ],
    sources: [
      { id: "exod", title: "Exodus 12:40–41: Masoretic, Septuagint and Samaritan witnesses", note: "The primary textual variants at issue." },
      { id: "genesis", title: "Genesis 12:4; 21:5; 25:26; 47:9", note: "The ages used to derive the patriarchal interval." },
      { id: "josephus", title: "Jewish Antiquities 2.318", author: "Flavius Josephus", note: "An explicit ancient statement of 430 years from Abraham and 215 from Jacob.", url: "https://www.perseus.tufts.edu/hopper/text?doc=J.+AJ+2.318" },
      { id: "glatt-gilad", title: "How Many Years Were the Israelites in Egypt?", author: "David A. Glatt-Gilad", note: "A concise scholarly discussion of the variant and the possibility of harmonising expansion.", url: "https://www.thetorah.com/article/how-many-years-were-the-israelites-in-egypt" },
    ],
    posterImage: "/timelines/israel-sojourn-evidence.png",
    posterAlt: "Poster comparing the 215-year and 430-year readings of Israel's time in Egypt.",
    posterWidth: 1000,
    posterHeight: 1500,
    posterDownload: "bible-lens-israel-in-egypt-215-or-430.png",
    socialImage: "/timelines/og/israel-in-egypt.png",
    datePublished: "2026-05-28",
    dateModified: "2026-08-25",
  },
  {
    slug: "the-flood",
    kicker: "TEXTUAL CHRONOLOGY",
    title: "Genesis 5 & 11: Competing Chronologies",
    tagline: "The Hebrew, Greek and Samaritan genealogies preserve different numbers—and produce very different ancient timelines.",
    metaTitle: "Genesis 5 & 11: Competing Chronologies | Bible Lens",
    metaDescription: "Explore the documented numerical differences between the Masoretic, Septuagint and Samaritan chronologies of Genesis 5 and 11.",
    intro: [
      "The major textual traditions of Genesis do not all give the same begetting ages in chapters 5 and 11. Those differences accumulate into centuries, so any date calculated for the Flood depends partly on which textual chronology is followed.",
      "Using a longer Septuagint chronology can place the Flood around 3000 BC in one Bible Lens reconstruction. That is a derived model, not a date written in Genesis and not proof of the Flood's extent, mechanism or archaeological signature.",
    ],
    conclusion: "The numerical differences are textual facts; the historical dates built from them are reconstructions. Bible Lens treats the longer chronology as a serious option because it better accommodates several ancient historical horizons, while acknowledging that the original form of the Genesis numbers remains disputed.",
    strongestObjection: "The higher Septuagint begetting ages may be secondary adjustments rather than the earliest text. No surviving manuscript gives us an uncontested route back to the original chronology, and archaeological comparisons cannot decide a textual question on their own.",
    visual: {
      eyebrow: "ONE GENEALOGY, DIFFERENT NUMBERS",
      left: { label: "Masoretic chronology", date: "Shorter span", description: "The Hebrew tradition underlying most modern Old Testaments." },
      right: { label: "Septuagint chronology", date: "+ centuries", description: "Many Greek witnesses add 100 years to several begetting ages.", emphasis: true },
      pivot: "Genesis 5 and 11",
      note: "The variants are documented. Their direction and original form are disputed.",
    },
    sections: [
      {
        id: "what-varies",
        heading: "What actually differs",
        status: "documented",
        body: [
          "Across a series of patriarchs, the Masoretic, Septuagint and Samaritan traditions give different ages for fathering the named son. The totals often preserve the same lifespan while moving years from before the son's birth to after it—or the reverse.",
        ],
        cite: "Genesis 5:3–32; 11:10–26",
      },
      {
        id: "pyramid-check",
        heading: "Why the Step Pyramid is a useful check",
        status: "derived",
        body: [
          "Egypt's Ministry of Tourism and Antiquities dates Djoser's reign to about 2667–2648 BC. A Flood date of 2348 BC would therefore fall centuries after the Step Pyramid was built; a reconstruction around 3000 BC would precede it.",
          "That comparison exposes a chronological tension. It does not establish that either biblical textual tradition is original, nor does the monument by itself test every model of the Flood.",
        ],
      },
      {
        id: "original-numbers",
        heading: "Which numbers are earliest?",
        status: "disputed",
        body: [
          "Some textual critics argue that the shorter Masoretic chronology is more likely to be original; others argue that the Greek tradition preserves older figures in key places. The disagreement belongs in the open, because the evidence is real and the reconstruction is consequential.",
        ],
      },
    ],
    evidence: [
      { title: "The textual traditions contain different ages", status: "documented", summary: "The Masoretic, Septuagint and Samaritan Pentateuch figures diverge at multiple patriarchs in Genesis 5 and 11.", sourceIds: ["genesis", "hendel", "smith"] },
      { title: "A c. 3000 BC Flood date can be calculated", status: "derived", summary: "A longer chronology plus a chosen historical anchor yields an approximate date; Genesis itself supplies no BC date.", sourceIds: ["genesis", "smith"] },
      { title: "Djoser's complex predates 2348 BC", status: "documented", summary: "The official Egyptian chronology dates Djoser's reign to c. 2667–2648 BC.", sourceIds: ["djoser"] },
      { title: "The Septuagint preserves the original chronology", status: "disputed", summary: "Published arguments exist on both sides of the textual history.", sourceIds: ["hendel", "smith"] },
    ],
    sources: [
      { id: "genesis", title: "Genesis 5:3–32 and 11:10–26", note: "The primary genealogical figures compared across textual traditions." },
      { id: "djoser", title: "The Step Pyramid Complex of Djoser", author: "Egyptian Ministry of Tourism and Antiquities", note: "Official monument page dating Djoser's reign to c. 2667–2648 BC.", url: "https://egymonuments.gov.eg/monuments/the-step-pyramid-complex-of-djoser/" },
      { id: "hendel", title: "A Hasmonean Edition of MT Genesis?", author: "Ronald Hendel", note: "A peer-reviewed argument concerning the chronology's textual development.", url: "https://doi.org/10.1628/219222712805363999" },
      { id: "smith", title: "The Case for the Septuagint's Chronology in Genesis 5 and 11", author: "Henry B. Smith Jr.", note: "A published defence of the longer chronology.", url: "https://www.biblearchaeology.org/images/Genesis-5-and-11/Smith-Henry-The-Case-for-the-Septuagints-Chronology-in-Gen-5-and-11-ICC.pdf" },
    ],
    posterImage: "/timelines/genesis-chronology-evidence.png",
    posterAlt: "Poster comparing shorter and longer manuscript chronologies in Genesis 11.",
    posterWidth: 1000,
    posterHeight: 1500,
    posterDownload: "bible-lens-genesis-chronologies.png",
    socialImage: "/timelines/og/genesis-chronologies.png",
    datePublished: "2026-05-28",
    dateModified: "2026-08-25",
  },
  {
    slug: "joseph-at-avaris",
    kicker: "BIBLICAL ARCHAEOLOGY",
    title: "The Asiatic Dignitary at Avaris",
    tagline: "What the excavation actually found—and where a possible connection with Joseph becomes hypothesis rather than archaeology.",
    metaTitle: "The Asiatic Dignitary at Avaris | Bible Lens",
    metaDescription: "A source-led assessment of the high-ranking Asiatic statue and tomb at Tell el-Dab'a, and the disputed proposal that they belonged to Joseph.",
    intro: [
      "At Tell el-Dab'a—ancient Avaris—in Egypt's eastern Nile Delta, excavators found the remains of a large statue representing a high-ranking Asiatic dignitary. Its surviving paint includes yellow skin, reddish-brown hair and a striped garment in red, black and white.",
      "The associated tomb had been plundered, but it was not empty: excavators reported fragments of an adult male and a mature female. No inscription names Joseph. Connecting this foreign official with the Genesis figure is an intriguing minority hypothesis, not the excavation's conclusion.",
    ],
    conclusion: "Avaris supplies a vivid archaeological parallel for an Asiatic who reached exceptional status in Egypt. That makes Joseph a legitimate question to investigate. Without an identifying inscription or a firmer chronological chain, however, Bible Lens presents the identification as a hypothesis—not a discovery.",
    strongestObjection: "High-ranking Levantine people are independently attested in the multicultural eastern Delta. A foreign-looking statue therefore needs no biblical identification, and uncertainties over the statue's original position and the tomb's superstructure weaken an already circumstantial match.",
    visual: {
      eyebrow: "FROM EXCAVATION TO IDENTIFICATION",
      left: { label: "Excavation report", date: "High-ranking Asiatic", description: "Painted statue fragments, a plundered tomb and surviving human bone fragments.", emphasis: true },
      right: { label: "Proposed identification", date: "Joseph?", description: "A possible biblical match, but no inscription supplies a name." },
      pivot: "Evidence first; identification second",
      note: "The archaeology is documented. The identification with Joseph is a hypothesis.",
    },
    sections: [
      {
        id: "documented-find",
        heading: "What the excavation documents",
        status: "documented",
        body: [
          "The reconstructed statue was unusually large and depicted an Asiatic dignitary. Surviving colour included yellow skin, reddish-brown hair and a striped garment. The tomb was heavily plundered; fragments from an adult male and a mature female remained.",
          "The excavation report also cautions that the statue's original location is uncertain. The tomb's superstructure is not securely known; a vaulted chapel is suggested by Middle Kingdom parallels.",
        ],
      },
      {
        id: "joseph-question",
        heading: "Why Joseph enters the conversation",
        status: "hypothesis",
        body: [
          "Genesis describes a Semite elevated to extraordinary office in Egypt, clothed in distinctive garments and settled in the eastern Delta with his family. Those motifs make the Avaris dignitary an arresting pattern match.",
          "Pattern matching can generate a historical hypothesis, but it cannot provide the missing name. The statue may represent another elite Asiatic in a region where many Levantine people lived.",
        ],
        cite: "Genesis 37:3; 41:41–45; 47:6",
      },
      {
        id: "retired-claims",
        heading: "What Bible Lens no longer claims",
        status: "documented",
        body: [
          "The tomb should not be described as an intact empty burial with no bones. Nor can the surviving evidence establish twelve principal tombs, an original twelve-column palace plan or a securely identified non-royal pyramid built for this individual.",
          "Those claims ran ahead of the excavation record and have been retired from this investigation.",
        ],
      },
    ],
    evidence: [
      { title: "The statue depicts a high-ranking Asiatic", status: "documented", summary: "Its size, iconography and surviving paint identify an elite foreign dignitary.", sourceIds: ["schiestl", "oeaw"] },
      { title: "The tomb contained human bone fragments", status: "documented", summary: "Fragments from an adult male and mature female survived despite extensive plundering.", sourceIds: ["schiestl"] },
      { title: "The garment was striped and multicoloured", status: "documented", summary: "Red, black and white stripes survive in the statue's painted clothing; linking them to Genesis 37 is interpretive.", sourceIds: ["schiestl"] },
      { title: "The dignitary was Joseph", status: "hypothesis", summary: "The parallels are circumstantial and no inscription identifies the person.", sourceIds: ["schiestl", "genesis"] },
    ],
    sources: [
      { id: "schiestl", title: "The Statue of an Asiatic Dignitary from Tell el-Dabʿa", author: "Robert Schiestl", note: "The excavation-led publication for the statue, tomb context, paint and surviving bone fragments.", url: "https://epub.ub.uni-muenchen.de/28149/" },
      { id: "oeaw", title: "Tell el-Dabʿa excavations", author: "Austrian Archaeological Institute", note: "Institutional overview of the site and excavation programme.", url: "https://www.oeaw.ac.at/en/oeai/institute/branches/cairo/excavations-projects/tell-el-dab%CA%BFa" },
      { id: "genesis", title: "Genesis 37:3; 41:41–45; 47:6", note: "The biblical features compared with the archaeological context." },
    ],
    posterImage: "/timelines/avaris-evidence-ledger.png",
    posterAlt: "Evidence ledger separating the documented Avaris excavation from the hypothesis that the dignitary was Joseph.",
    posterWidth: 1000,
    posterHeight: 1500,
    posterDownload: "bible-lens-avaris-evidence-ledger.png",
    socialImage: "/timelines/og/avaris-dignitary.png",
    datePublished: "2026-05-28",
    dateModified: "2026-08-25",
  },
];

export function getTimeline(slug: string): Timeline | undefined {
  return TIMELINES.find((timeline) => timeline.slug === slug);
}

export const TIMELINE_SLUGS = TIMELINES.map((timeline) => timeline.slug);
