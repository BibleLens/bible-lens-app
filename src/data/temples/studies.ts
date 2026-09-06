import type {
  Connection,
  Source,
  TempleId,
  TempleMoment,
  TempleStudy,
} from "./types";
export const scripture = (
  book: string,
  chapter: number,
  title: string,
  note: string,
): Source => ({ title, href: `/bible/${book}/${chapter}`, note });
const kings = (chapter: number, verses: string, note: string) =>
  scripture("1kings", chapter, `1 Kings ${chapter}:${verses}`, note);
const chronicles = (chapter: number, verses: string, note: string) =>
  scripture("2chronicles", chapter, `2 Chronicles ${chapter}:${verses}`, note);
const ezek = (chapter: number, verses: string, note: string) =>
  scripture("ezekiel", chapter, `Ezekiel ${chapter}:${verses}`, note);
const middot = (ref: string, note: string): Source => ({
  title: `Mishnah Middot ${ref}`,
  href: `https://www.sefaria.org/Mishnah_Middot.${ref.replace(":", ".")}?lang=en`,
  note,
});
const war = (section: string, note: string): Source => ({
  title: `Josephus, Jewish War 5.5.${section}`,
  href: "https://penelope.uchicago.edu/josephus/war-5.html#Ch.5",
  note,
});
const thread = (
  source: Source,
  kind: Connection["kind"] = "Textual connection",
): Connection => ({ ...source, kind });
const eden = thread(
  scripture(
    "genesis",
    3,
    "The guarded garden · Genesis 3:24",
    "Cherubim appear at Eden’s boundary too. Comparing the imagery is a thematic reading; it doesn't establish a hidden architectural blueprint.",
  ),
);
const moment = (
  title: string,
  text: string,
  part: string | null = null,
  cutaway = false,
  isolated = false,
  lens: "object" | "sources" | "connections" = "object",
  separation = 0,
): TempleMoment => ({
  title,
  text,
  view: { part, cutaway, isolated, lens, separation },
});

export const SOLOMON: TempleStudy = {
  id: "solomon",
  name: "Solomon’s Temple",
  eyebrow: "The First Temple · A textual reconstruction",
  title: "A house with",
  emphasis: "a garden within.",
  introduction:
    "Stone outside. Gold, palms and winged figures within. Open the sanctuary and follow its imagery back to the text.",
  status: "Text-based reconstruction",
  unit: "Cubits · no fixed modern conversion",
  overview:
    "The building account in Kings takes us from dressed stone into a richly worked interior. Start at the bronze pillars, lift the cedar roof, then follow the palms and cherubim toward the innermost room.",
  reconstruction: [
    "The sanctuary uses the 60 × 20 × 30-cubit description in 1 Kings 6, treating the plan lengths as clear room dimensions for this reconstruction. The rear room is 20 × 20 × 20 cubits. Wall thicknesses, roof construction and courtyard footprint are design choices; they aren't surviving survey measurements.",
    "The porch is shown 20 cubits high, following the textual reading used by the Berean Standard Bible in 2 Chronicles 3:4. The Masoretic Hebrew gives 120. The pillars follow the 18-cubit shafts plus 5-cubit capitals of 1 Kings 7. Chronicles preserves different wording about their height.",
    "The furnishing groups follow Chronicles’ ten lampstands and ten tables. Kings names ten lampstands and a table. The Sea follows the stated diameter and height; the rounded circumference and differing capacity figures aren't treated as a fabrication specification. Animal figures and decoration are stylised.",
    "The complete palace complex, full city setting, service routes and every side chamber aren't reconstructed here. Archaeology at other Iron Age temples supplies comparisons, not direct measurements of this sanctuary. Models in this collection fit their own viewports and aren't shown at the same scale.",
  ],
  parts: [
    {
      id: "court",
      name: "The inner court",
      subtitle: "A boundary around the house",
      color: "#c5b694",
      material: "Dressed stone · cedar",
      description:
        "The account gives the court’s wall a distinctive rhythm: three courses of dressed stone and one of cedar. Its overall length and width aren't supplied. The enclosure here helps us see how the sanctuary, water vessels and altar relate.",
      note: "The 140 × 110-cubit display court, entrance and paving pattern are illustrative. The low wall keeps the objects visible.",
      sources: [
        kings(6, "36", "Three courses of dressed stone and a course of cedar."),
      ],
      connections: [
        thread(
          chronicles(
            4,
            "9",
            "Chronicles distinguishes the priests’ court and the large court.",
          ),
        ),
      ],
    },
    {
      id: "roof",
      name: "The cedar roof",
      subtitle: "Open the interior",
      color: "#937050",
      material: "Cedar beams · timber decking",
      description:
        "Cedar beams and planks complete the roof. Open the interior to see what the exterior conceals, or separate the assemblies to inspect the roof on its own.",
      note: "Beam spacing, roofing finish and parapets are reconstructed. The lifting motion is an inspection aid, not an ancient construction sequence.",
      sources: [
        kings(6, "9–10", "The building is roofed with cedar beams and planks."),
      ],
      connections: [
        thread(
          kings(
            5,
            "6–10",
            "Timber procurement connects the building project with Lebanon and Hiram’s workers.",
          ),
        ),
      ],
    },
    {
      id: "sanctuary",
      name: "The sanctuary rooms",
      subtitle: "An interior filled with imagery",
      color: "#cfa754",
      material: "Stone · cedar · gold",
      measurement: "Main hall 40 × 20 · inner room 20 × 20 cubits",
      interior: true,
      description:
        "The long hall leads to a smaller, cubical room. Cedar paneling, gold, palms, flowers and cherubim transform the interior. Notice how the same imagery continues across walls and doors.",
      note: "Core rooms preserve the selected textual proportions. Three stepped side-room storeys are shown as continuous galleries. Their partitions, windows and decorative patterns are simplified.",
      sources: [
        kings(
          6,
          "15–35",
          "Room dimensions, gold overlay and carved decoration.",
        ),
        {
          title: "Tel Moẓa excavation · Tel Aviv University",
          href: "https://english.tau.ac.il/news/new_temple",
          note: "An excavated Iron Age temple offers regional context. It isn't Solomon’s Temple and cannot verify this model’s exact design.",
        },
      ],
      connections: [eden],
    },
    {
      id: "porch",
      name: "The entrance porch",
      subtitle: "The threshold of the house",
      color: "#d7c5a1",
      material: "Stone · gold",
      measurement: "20 wide × 10 deep cubits",
      description:
        "A porch spans the sanctuary’s width. Its opening frames the movement from court to house. The sources are more secure about its footprint than its height.",
      note: "Height is 20 cubits in this model. The Hebrew reading of 2 Chronicles 3:4 is 120; the BSB follows witnesses with 20. The entrance shape and stair arrangement are reconstructed.",
      sources: [
        kings(6, "3", "The porch spans twenty cubits and projects ten."),
        chronicles(3, "4", "The portico in Chronicles’ building account."),
        {
          title: "Porch-height textual note · BSB",
          href: "https://biblehub.com/bsb/2_chronicles/3.htm",
          note: "Footnote 4f identifies the twenty-cubit reading and the Hebrew 120-cubit reading.",
        },
      ],
      connections: [
        thread(
          scripture(
            "psalms",
            84,
            "At the threshold · Psalm 84",
            "The psalm gives courts and thresholds an emotional life. Read its language of longing alongside the architecture.",
          ),
        ),
      ],
    },
    {
      id: "pillars",
      name: "Jachin & Boaz",
      subtitle: "Two named bronze pillars",
      color: "#ac784a",
      material: "Bronze · lily capitals · pomegranates",
      measurement: "Shafts 18 high · capitals 5 high cubits",
      description:
        "Two bronze pillars stand at the porch, named Jachin and Boaz. Their capitals carry lilies, network and rows of pomegranates. These are some of the account’s most recognisable architectural details.",
      note: "Shaft diameter derives from a twelve-cubit circumference. Capitals, network and fruit are stylised; the model doesn't resolve every overlapping height description in Kings and Chronicles.",
      sources: [
        kings(
          7,
          "15–22",
          "Dimensions, decorative work and the naming of the pillars.",
        ),
      ],
      connections: [
        thread(
          chronicles(
            3,
            "15–17",
            "Compare Chronicles’ pillar description with Kings, including its different wording about the height.",
          ),
        ),
      ],
    },
    {
      id: "sea",
      name: "The bronze Sea",
      subtitle: "Water on twelve oxen",
      color: "#6f9a91",
      material: "Bronze · water",
      measurement: "Bowl 10 across × 5 high cubits",
      description:
        "A great bronze bowl rests on twelve oxen facing the four directions. Chronicles distinguishes the priests’ washing here from the rinsing of offerings in the smaller basins.",
      note: "The bowl uses the stated diameter and height. Oxen add a reconstructed support height. The cast profile, water level and figures are artistic choices; rounded circumference and capacity figures are retained in the source notes.",
      sources: [
        kings(
          7,
          "23–26, 39",
          "Bowl dimensions, oxen and southeast placement; capacity is two thousand baths.",
        ),
        chronicles(
          4,
          "5–6",
          "The Sea is for priestly washing; this account gives three thousand baths.",
        ),
      ],
      connections: [
        thread(
          scripture(
            "exodus",
            30,
            "From basin to Sea · Exodus 30:17–21",
            "The earlier dwelling also provides water before priestly service. Compare the role of its basin with this much larger installation.",
          ),
        ),
      ],
    },
    {
      id: "basins",
      name: "The ten basins",
      subtitle: "Bronze vessels on wheels",
      color: "#ae8257",
      material: "Bronze",
      measurement: "Stands 4 × 4 × 3 cubits",
      description:
        "Five wheeled stands sit on each side of the house. Their basin supports are described in unusual detail, including panels, wheels and animal decoration.",
      note: "Stand and basin dimensions follow Kings. Wheelwork and decoration are reduced, and spacing beside the house is illustrative.",
      sources: [
        kings(
          7,
          "27–39",
          "Ten wheeled stands and basins, arranged five on each side.",
        ),
      ],
      connections: [
        thread(
          chronicles(
            4,
            "6",
            "Chronicles explains the basins’ use for rinsing the parts of the burnt offering.",
          ),
        ),
      ],
    },
    {
      id: "altar",
      name: "The bronze altar",
      subtitle: "Service in the court",
      color: "#986644",
      material: "Bronze",
      measurement: "20 × 20 × 10 cubits",
      description:
        "Chronicles places a large bronze altar in the sanctuary’s furnishing account. Its size makes the court feel different from the travelling dwelling. Compare its dimensions with the altar described in Exodus.",
      note: "The outer block preserves Chronicles’ proportions. Horns, ledges and surface treatment are illustrative. No specific access stair or ramp is claimed.",
      sources: [chronicles(4, "1", "The altar’s length, width and height.")],
      connections: [
        thread(
          scripture(
            "exodus",
            27,
            "A portable predecessor · Exodus 27:1–8",
            "The dwelling’s altar is five cubits square and three high, with carrying poles. The difference in scale is part of the story.",
          ),
        ),
      ],
    },
    {
      id: "furnishings",
      name: "Light, bread & incense",
      subtitle: "The work of the Holy Place",
      color: "#d8b969",
      material: "Gold",
      interior: true,
      description:
        "Lampstands, tables and the incense altar fill the main hall. Chronicles describes ten lampstands and ten tables, five on each side. Kings names ten lampstands and speaks of a table for the bread.",
      note: "The display follows Chronicles’ count. Furnishing shapes, heights and exact room positions are reconstructed; a branched lamp form recalls the earlier dwelling without claiming an excavated design.",
      sources: [
        chronicles(
          4,
          "7–8, 19–22",
          "Ten lampstands, ten tables and gold furnishings.",
        ),
        kings(7, "48–50", "Compare the furnishing list in Kings."),
      ],
      connections: [
        thread(
          scripture(
            "exodus",
            25,
            "Familiar objects, a larger house · Exodus 25",
            "Read the earlier descriptions of the table and lampstand. Compare continuities in function without assuming every later object looked identical.",
          ),
        ),
      ],
    },
    {
      id: "veil",
      name: "The veil & inner doors",
      subtitle: "A boundary inside the house",
      color: "#6c5b8a",
      material: "Coloured linen · olive wood · gold",
      interior: true,
      description:
        "Kings describes carved doors at the inner room; Chronicles also names a woven veil with cherubim. Both bring the garden-like imagery to the boundary of the Most Holy Place.",
      note: "The veil and doors are shown together as a visual synthesis of the accounts. Their exact relationship, cloth pattern and opening width are reconstructed.",
      sources: [
        chronicles(3, "14", "A coloured linen veil with cherubim."),
        kings(6, "31–32", "Carved olive-wood doors at the inner sanctuary."),
      ],
      connections: [eden],
    },
    {
      id: "cherubim",
      name: "The great cherubim",
      subtitle: "Wings across the room",
      color: "#d6b469",
      material: "Olive wood · gold",
      measurement: "Each 10 high · combined wingspan 20 cubits",
      interior: true,
      description:
        "Two great winged figures stand inside the inner room. Their outer wings touch the walls; their inner wings meet. The text gives their scale, but leaves their full appearance undescribed.",
      note: "The paired sculptures preserve height and combined span. Faces, bodies and feathers are intentionally stylised. These larger figures are distinct from the cherubim associated with the ark’s cover.",
      sources: [
        kings(6, "23–28", "Height, wingspan, material and arrangement."),
        chronicles(
          3,
          "10–13",
          "The figures stand on their feet and face the main room.",
        ),
      ],
      connections: [
        thread(
          kings(
            8,
            "6–9",
            "At the dedication, the priests bring the ark beneath the cherubim’s wings.",
          ),
        ),
      ],
    },
    {
      id: "ark",
      name: "The ark",
      subtitle: "A carried object comes to rest",
      color: "#e0c582",
      material: "Wood · gold",
      measurement: "Chest 2½ × 1½ × 1½ cubits",
      interior: true,
      description:
        "The dedication account brings the ark into the innermost room beneath the great cherubim. At the heart of the new house stands an object already central to Israel’s earlier story.",
      note: "Chest proportions follow Exodus 25. Exact placement, cover figures and pole arrangement are reconstructed.",
      sources: [
        kings(8, "6–9", "The ark is brought into the inner sanctuary."),
        scripture(
          "exodus",
          25,
          "Exodus 25:10–22",
          "The earlier description supplies the chest’s proportions.",
        ),
      ],
      connections: [
        thread({
          title: "Return to the travelling dwelling",
          href: "/explore/tabernacle?part=ark&isolate=1&lens=passage",
          note: "Compare the ark in the earlier Tabernacle study. The surrounding circular geometry there follows Hoy’s separately identified minority proposal.",
        }),
      ],
    },
  ],
  starts: [
    { part: "pillars", title: "Begin at the pillars" },
    { part: "sanctuary", title: "Discover the garden imagery" },
    { part: "cherubim", title: "Beneath the great wings" },
  ],
  tour: [
    moment(
      "A house after the journey",
      "Begin with the building described in Kings. A lasting house gives familiar sanctuary objects a new setting.",
    ),
    moment(
      "Two pillars, two names",
      "Jachin and Boaz mark the porch. Look closer at the lilies and pomegranates.",
      "pillars",
      false,
      true,
    ),
    moment(
      "Open the house",
      "Lift away the roof. The long hall leads into a smaller room, and the walls carry palms, flowers and cherubim.",
      "sanctuary",
      true,
    ),
    moment(
      "A garden in gold",
      "Compare these carved walls with the guarded garden in Genesis. The connection is an invitation to read the imagery together.",
      "sanctuary",
      true,
      true,
      "connections",
    ),
    moment(
      "Beneath the wings",
      "The great cherubim span the inner room. The dedication account places the ark beneath their wings.",
      "cherubim",
      true,
      true,
      "sources",
    ),
    moment(
      "Return to the whole",
      "The architecture holds together a story of dwelling, service and access. Choose an object and follow its sources.",
    ),
  ],
};

export const HEROD: TempleStudy = {
  id: "herod",
  name: "Herod’s Temple",
  eyebrow: "The late Second Temple · Courts and encounters",
  title: "One sanctuary.",
  emphasis: "Many thresholds.",
  introduction:
    "A monumental house within a sequence of courts. Explore the spaces behind the Gospel encounters.",
  status: "Historical reconstruction",
  unit: "Cubits · inner courts after Middot",
  overview:
    "Start outside the inner enclosure and work toward the sanctuary. The changing boundaries help us ask who could enter, where people gathered, and what a Gospel writer actually locates within the Temple.",
  reconstruction: [
    "This is a selective reconstruction of the late Second Temple’s sanctuary and inner courts. It isn't a full topographic model of the Herodian Temple Mount, Antonia fortress or Jerusalem. The surrounding portico setting has an illustrative footprint.",
    "The principal plan dimensions follow Mishnah Middot: the inner court is 187 × 135 cubits and the Women’s Court 135 × 135. The sanctuary body is 70 cubits wide, with a 100-cubit-wide porch front and an overall height of 100. These later rabbinic descriptions are source witnesses, not a surviving architectural survey.",
    "Josephus is used alongside Middot, with disagreements retained. For example, Josephus gives a 50-cubit altar whereas Middot gives 32; this model follows Middot. Josephus’s account and Middot also differ on the building’s rear width and interior heights.",
    "Court surfaces, side rooms, columns, stair risers, decoration and exact gate profiles are reconstructed. The Nicanor threshold isn't labelled as the securely identified Beautiful Gate. Gospel links identify textual settings without claiming the model fixes the exact spot of each event. The inner room contains no ark, following Josephus and Yoma.",
  ],
  parts: [
    {
      id: "porticos",
      name: "The outer porticos",
      subtitle: "A place to gather",
      color: "#d2c9b9",
      material: "Pale stone · cedar roofing",
      description:
        "Colonnades surround the sanctuary precinct in Josephus’s description. These public-facing spaces help explain how a Temple could be a setting for gathering, teaching and debate as well as priestly service.",
      note: "Only an illustrative band of outer porticos is modelled. The entire Herodian platform, Royal Stoa and Antonia aren't reproduced, and the model doesn't locate Solomon’s Colonnade precisely.",
      sources: [war("2", "Josephus describes colonnades around the courts.")],
      connections: [
        thread(
          scripture(
            "john",
            10,
            "Walking in the colonnade · John 10:22–23",
            "John places Jesus in Solomon’s Colonnade during winter. Read this named setting without treating the model’s generic portico as the exact location.",
          ),
        ),
      ],
    },
    {
      id: "soreg",
      name: "The stone barrier",
      subtitle: "A boundary with a warning",
      color: "#b9afa0",
      material: "Stone",
      description:
        "A low barrier marked restricted access around the inner precinct. Josephus describes warning notices. A surviving fragment shows that this boundary was expressed in writing as well as stone.",
      note: "The low balustrade and blank sign tablets are illustrative. The preserved Greek warning isn't reproduced as invented decorative lettering.",
      sources: [
        war("2", "A stone partition and notices restrict entry."),
        {
          title: "Temple warning fragment · Israel Museum",
          href: "https://artsandculture.google.com/asset/no-foreigner-shall-enter-greek-inscription-forbidding-entry-to-the-temple-unknown/KAG6mO4plErdgw?hl=en",
          note: "The museum’s object record supplies material evidence for an entry warning.",
        },
      ],
      connections: [
        thread(
          scripture(
            "acts",
            21,
            "An accusation at the Temple · Acts 21:27–29",
            "The accusation against Paul presupposes restrictions on access. Acts explains what his accusers had assumed about Trophimus.",
          ),
        ),
      ],
    },
    {
      id: "women",
      name: "The Women’s Court",
      subtitle: "Gathering before the inner court",
      color: "#c7b183",
      material: "Stone paving · surrounding chambers",
      measurement: "135 × 135 cubits",
      description:
        "Middot describes a square court, four corner chambers and steps leading west toward the Court of Israel. The name doesn't mean that women were its only occupants.",
      note: "The footprint and forty-cubit corner chambers follow Middot. The balcony, paving and chamber walls are schematic. No precise location for the offering chests is claimed.",
      sources: [
        middot(
          "2:5",
          "Square court, corner chambers, balcony and fifteen semicircular steps.",
        ),
      ],
      connections: [
        thread(
          scripture(
            "mark",
            12,
            "A widow and the treasury · Mark 12:41–44",
            "Mark places Jesus opposite the treasury. This is a useful court-related reading; the passage itself doesn't supply coordinates for the offering chests.",
          ),
        ),
      ],
    },
    {
      id: "steps",
      name: "Steps & inner gateway",
      subtitle: "Ascending toward the sanctuary",
      color: "#c9b37c",
      material: "Stone · bronze",
      description:
        "Fifteen semicircular steps lead from the Women’s Court toward the inner court in Middot. Its account connects them with the Songs of Ascents and the Levites’ singing.",
      note: "Fifteen risers are retained; their rise and radius are reconstructed. This represents the eastern inner threshold traditionally associated with Nicanor, not a resolved identification of Acts’ Beautiful Gate.",
      sources: [
        middot(
          "2:5",
          "Fifteen curved steps and their connection with the songs of ascents.",
        ),
        middot("1:4", "The east gate is called Nicanor’s gate."),
      ],
      connections: [
        thread(
          scripture(
            "psalms",
            122,
            "A song of ascent · Psalm 122",
            "Read the language of going up to Jerusalem alongside Middot’s later account of the steps.",
          ),
        ),
      ],
    },
    {
      id: "court",
      name: "The inner court",
      subtitle: "Spaces for Israel and the priests",
      color: "#d2c5ad",
      material: "Stone",
      measurement: "187 × 135 cubits",
      description:
        "Middot measures the inner court through a sequence of spaces: areas for Israelites and priests, the altar, the gap before the porch, the sanctuary building and the space behind it.",
      note: "The east-west allocations follow Middot 5:1. North-south placement of service installations is simplified; the model doesn't reconstruct every gate or slaughter station.",
      sources: [
        middot(
          "5:1",
          "Eleven + eleven + thirty-two + twenty-two + one hundred + eleven cubits.",
        ),
      ],
      connections: [
        thread(
          scripture(
            "luke",
            1,
            "People outside, a priest within · Luke 1:8–10",
            "Luke distinguishes Zechariah’s service inside from the people praying outside. That spatial contrast is the useful point here.",
          ),
        ),
      ],
    },
    {
      id: "altar",
      name: "The altar & ramp",
      subtitle: "An approach from the south",
      color: "#b7a995",
      material: "Stone · limewash",
      measurement: "Base 32 × 32 cubits · Middot",
      description:
        "A stepped altar stands before the sanctuary. Its southern ramp makes the approach visible. Ancient descriptions disagree about its size, so the source choice matters.",
      note: "The footprint follows Middot 3:1, with a southern ramp following 3:3. Josephus gives fifty cubits square and fifteen high. The tier heights and detailing here are a simplified Middot-based reconstruction.",
      sources: [
        middot("3:1", "Thirty-two-cubit base and receding ledges."),
        middot("3:3", "A ramp south of the altar."),
        war("6", "A different set of altar measurements."),
      ],
      connections: [
        thread(
          scripture(
            "matthew",
            5,
            "Before bringing the gift · Matthew 5:23–24",
            "Jesus uses the act of bringing a gift to the altar in a teaching about reconciliation. The teaching assumes a meaningful place and practice.",
          ),
        ),
      ],
    },
    {
      id: "roof",
      name: "The upper house",
      subtitle: "Lift the monumental shell",
      color: "#d7cfbc",
      material: "Pale stone · gold trim",
      description:
        "A high upper storey and roof complete the monumental sanctuary. Open the interior to reveal the much smaller rooms inside the broad facade.",
      note: "The overall hundred-cubit height follows Middot. Upper rooms, roof detailing and decorative spikes are schematic; the opening motion exposes a sectional study.",
      sources: [
        middot(
          "4:6",
          "A hundred-cubit height, upper chamber, parapet and spikes.",
        ),
      ],
      connections: [
        thread(
          scripture(
            "mark",
            13,
            "Look at these buildings · Mark 13:1–2",
            "The disciples’ response to the buildings introduces Jesus’ prediction of their destruction. Read the exchange alongside the scale of the facade.",
          ),
        ),
      ],
    },
    {
      id: "sanctuary",
      name: "The sanctuary & facade",
      subtitle: "A broad front, a narrower house",
      color: "#d1b05f",
      material: "Pale stone · gold",
      measurement: "Front 100 wide · body 70 wide cubits",
      interior: true,
      description:
        "The broad facade is wider than the body behind it. A gold entrance and pale stone make a striking exterior, while the principal inner rooms continue the forty-cubit hall and twenty-cubit inner-room pattern.",
      note: "The footprint follows Middot 4:7. Interior height is forty cubits after Middot 4:6; Josephus describes it differently. Room divisions, doorway shapes and gold decoration are reconstructed.",
      sources: [
        middot("4:6", "The vertical arrangement of the building."),
        middot("4:7", "The east-west and north-south allocations."),
        war(
          "4–6",
          "A first-century description of the facade, rooms and materials.",
        ),
      ],
      connections: [
        thread(
          scripture(
            "john",
            2,
            "Which temple? · John 2:19–22",
            "John turns a saying about destroying and raising a temple into an interpretation about Jesus’ body. Follow the narrator’s explanation.",
          ),
        ),
      ],
    },
    {
      id: "furnishings",
      name: "Lamp, table & incense",
      subtitle: "Three furnishings in the hall",
      color: "#dbba70",
      material: "Gold",
      interior: true,
      description:
        "Josephus names the lampstand, bread table and incense altar in the outer room. Their arrangement offers a way into Luke’s account of Zechariah serving at the incense altar.",
      note: "The three objects are represented in conventional relative positions. Their dimensions and detailed forms are illustrative, and the model doesn't depict a particular historical priest’s route.",
      sources: [war("5", "The three furnishings of the first room.")],
      connections: [
        thread(
          scripture(
            "luke",
            1,
            "Zechariah’s service · Luke 1:8–23",
            "Luke names the incense altar and the people praying outside. Read how the narrative moves between the two spaces.",
          ),
        ),
      ],
    },
    {
      id: "veil",
      name: "The inner curtain",
      subtitle: "The final threshold",
      color: "#6c5a8b",
      material: "Woven textile",
      interior: true,
      description:
        "A curtain separates the inner room in Josephus’s description. The Gospels make a torn Temple curtain part of the crucifixion narrative. They don't settle every architectural question about which curtain is meant.",
      note: "A single inner curtain is shown for clarity. Traditions differ about the number and arrangement of curtains. The outer embroidered curtain described by Josephus isn't silently identified with this one.",
      sources: [war("5", "The innermost room is separated by a curtain.")],
      connections: [
        thread(
          scripture(
            "mark",
            15,
            "The torn curtain · Mark 15:37–39",
            "Read the tearing alongside Jesus’ death. Its narrative significance can be explored without claiming a precise identification of the curtain.",
          ),
        ),
      ],
    },
    {
      id: "inner",
      name: "The innermost room",
      subtitle: "The missing ark matters",
      color: "#d8c797",
      material: "Gold-toned interior · stone",
      measurement: "20 × 20 cubits",
      interior: true,
      description:
        "The inner room is represented without an ark. Josephus describes the room as empty; Yoma remembers a foundation stone on which the high priest placed incense after the ark was gone.",
      note: "The low stone marks Yoma’s tradition. Its outline and position are illustrative. Don't read its shape as a surveyed identification with a particular exposed rock today.",
      sources: [
        war("5", "Josephus says the innermost room contained nothing."),
        {
          title: "Mishnah Yoma 5:2",
          href: "https://www.sefaria.org/Mishnah_Yoma.5.2?lang=en",
          note: "A foundation stone in the room after the ark was removed.",
        },
      ],
      connections: [
        thread({
          title: "Compare Solomon’s inner room",
          href: "/explore/temples/solomon?part=ark&cutaway=1&isolate=1",
          note: "The earlier dedication account places the ark beneath the great cherubim. Seeing these rooms separately prevents the two periods being blended.",
        }),
      ],
    },
  ],
  starts: [
    { part: "women", title: "Begin in the courts" },
    { part: "furnishings", title: "Follow Zechariah’s story" },
    { part: "inner", title: "Notice what’s absent" },
  ],
  tour: [
    moment(
      "A house within courts",
      "The sanctuary stands within a series of boundaries. Begin with the whole arrangement.",
    ),
    moment(
      "A written boundary",
      "The stone barrier and its warnings made access visible. Follow the surviving inscription as well as Josephus’s account.",
      "soreg",
      false,
      false,
      "sources",
    ),
    moment(
      "Gathering, giving, ascending",
      "The Women’s Court and its curved steps bring us into the social life around the sanctuary.",
      "women",
      false,
      true,
      "connections",
    ),
    moment(
      "Inside with Zechariah",
      "Open the sanctuary. Luke’s story places a priest at the incense altar and a praying people outside.",
      "furnishings",
      true,
      true,
      "connections",
    ),
    moment(
      "An inner room without the ark",
      "Josephus describes an empty inner room; Yoma remembers a foundation stone. This is a different moment from Solomon’s dedication.",
      "inner",
      true,
      true,
      "sources",
    ),
    moment(
      "Let the setting sharpen the reading",
      "Return to the courts, then follow a Gospel passage. The model gives spatial context while the text tells us what happened.",
    ),
  ],
};

export const EZEKIEL: TempleStudy = {
  id: "ezekiel",
  name: "Ezekiel’s Temple vision",
  eyebrow: "Ezekiel 40–48 · A measured vision",
  title: "From measured courts",
  emphasis: "to living water.",
  introduction:
    "Walk through the prophet’s ordered sanctuary, then follow the water beyond its walls.",
  status: "Vision illustrated from the text",
  unit: "Long cubits · a cubit and a handbreadth",
  overview:
    "Ezekiel is shown gates, courts, rooms and boundaries. Then the movement changes: glory returns, and water flows outward. Follow that journey without treating the illustration as proof of a particular fulfilment scheme.",
  reconstruction: [
    "This model illustrates Ezekiel’s vision. It isn't an excavated building or an assertion that this design has been built. Interpretations include a restoration ideal, a future sanctuary and symbolic readings; this spatial study doesn't settle those debates.",
    "The unit is the long cubit specified in Ezekiel 40:5. The 500-cubit precinct follows the Septuagint-based reading used by the BSB in 42:16–20. The Masoretic text gives five hundred reeds, six times that linear extent. The choice is stated here rather than concealed in the drawing.",
    "The gates use fifty-by-twenty-five-cubit footprints, the inner court one hundred square, and the main rooms forty-by-twenty and twenty square. Upper elevations and roof profiles remain reconstructed where the text doesn't give a complete specification. The porch follows the BSB’s twelve-cubit depth; its footnote records the Hebrew eleven.",
    "The river begins on the sanctuary’s south side and flows east, south of the altar. Its course beyond the wall is compressed to fit the view: the four thousand-cubit stages aren't plotted at their full geographical distance. Trees and widening water visualise the passage; no hydrological simulation or modern map alignment is claimed.",
  ],
  parts: [
    {
      id: "enclosure",
      name: "The measured enclosure",
      subtitle: "A boundary made explicit",
      color: "#c7c8b6",
      material: "Stone",
      measurement: "500 × 500 long cubits · selected reading",
      description:
        "The vision ends its architectural survey by measuring the outer boundary. Its purpose is stated as separating the holy from the common. A textual variant changes the overall scale substantially.",
      note: "This footprint follows the five-hundred-cubit reading in the BSB/LXX tradition. The Hebrew gives reeds. The wall’s one-reed thickness and height follow 40:5; the model isn't evidence that one reading must be correct.",
      sources: [
        ezek(
          40,
          "5",
          "The measuring rod is six long cubits; the wall is a rod high and thick.",
        ),
        ezek(
          42,
          "15–20",
          "The outer measurement and its reeds/cubits variant.",
        ),
        {
          title: "Cubits or reeds? · BSB textual note",
          href: "https://biblehub.com/bsb/ezekiel/42.htm",
          note: "Footnote 16e records the Hebrew reeds and the Septuagint-based cubits reading used for this model.",
        },
      ],
      connections: [
        thread(
          ezek(
            43,
            "10–12",
            "The prophet is told to show the house’s design and teach its ordinances. Measurement serves a larger purpose in the vision.",
          ),
        ),
      ],
    },
    {
      id: "gates",
      name: "The six gateways",
      subtitle: "A repeated architectural rhythm",
      color: "#b7b9a7",
      material: "Stone · carved palms",
      measurement: "Each 50 × 25 long cubits",
      description:
        "East, north and south gateways lead into the outer court, with matching gateways toward the inner court. Guard chambers, thresholds and porticoes give the journey a repeated rhythm.",
      note: "All six gate footprints follow the selected measurements. Three chambers per side are represented. Heights and upper outlines are simplified; the difficult sixty-cubit gatepost statement in 40:14 isn't treated as a verified overall gate height.",
      sources: [
        ezek(
          40,
          "6–37",
          "The outer and inner gateways; seven and eight steps respectively.",
        ),
      ],
      connections: [
        thread(
          ezek(
            43,
            "1–5",
            "The glory returns through the east-facing gate. The guided study represents that movement through the text, without adding a figure of God.",
          ),
        ),
      ],
    },
    {
      id: "court",
      name: "The inner court",
      subtitle: "A square before the house",
      color: "#bdc1ad",
      material: "Stone paving",
      measurement: "100 × 100 long cubits",
      description:
        "The inner court is measured as a square, with the altar before the temple. Its geometry makes the ordered arrangement of the vision easy to see from above.",
      note: "The clear court footprint follows 40:47. Paving, wall connections and surrounding open-space allocations are reconstructed.",
      sources: [ezek(40, "47", "A court one hundred cubits long and wide.")],
      connections: [
        thread(
          ezek(
            43,
            "5–7",
            "The prophet is brought into the inner court as the glory fills the house.",
          ),
        ),
      ],
    },
    {
      id: "chambers",
      name: "Rooms for service",
      subtitle: "Eating, storing, changing",
      color: "#aaaf9b",
      material: "Stone · timber",
      description:
        "The chambers have named purposes. Priests eat holy offerings and leave their service garments before going out to the people. The vision makes boundaries part of everyday movement.",
      note: "North and south chamber blocks preserve the selected hundred-by-fifty-cubit plan. Their galleries, height and room partitions are schematic. A western service building and outer-court rooms provide context without a complete room-by-room reconstruction.",
      sources: [
        ezek(42, "1–14", "The chambers’ layout and purposes."),
        ezek(41, "12", "A separate building west of the sanctuary."),
      ],
      connections: [
        thread(
          ezek(
            44,
            "19",
            "Changing garments before returning to the outer court repeats the boundary described in chapter 42.",
          ),
        ),
      ],
    },
    {
      id: "roof",
      name: "The sanctuary roof",
      subtitle: "Open the measured house",
      color: "#b7b29c",
      material: "Timber · illustrative roof finish",
      description:
        "Open the house to follow the measured rooms inside. The vision describes many interior features, but doesn't give a complete roof specification.",
      note: "The flat roof, beam arrangement and sanctuary elevations are illustrative. They aren't imported as dimensions from Solomon’s or Herod’s building.",
      sources: [
        ezek(41, "15–26", "Interior surfaces, windows, doors and canopies."),
      ],
      connections: [
        thread(
          ezek(
            40,
            "4",
            "The guide asks Ezekiel to look, listen and attend closely to what he is shown.",
          ),
        ),
      ],
    },
    {
      id: "sanctuary",
      name: "The sanctuary rooms",
      subtitle: "Familiar proportions in a vision",
      color: "#c8bc99",
      material: "Stone · wood paneling",
      measurement: "Hall 40 × 20 · inner room 20 × 20 long cubits",
      interior: true,
      description:
        "The main hall and inner room echo the plan proportions encountered in Kings. Ezekiel’s description also measures substantial walls and side rooms around them.",
      note: "Clear room sizes, six-cubit sanctuary walls and the raised base follow Ezekiel 41. Heights, the upper silhouette and some junctions between room groups are reconstructed. No ark or lampstand is inserted where this passage doesn't describe one.",
      sources: [
        ezek(
          41,
          "1–11",
          "Room widths, lengths, wall thickness and side chambers.",
        ),
      ],
      connections: [
        thread(
          kings(
            6,
            "16–20",
            "Compare the forty-cubit main hall and twenty-cubit inner room with the account of Solomon’s house.",
          ),
        ),
      ],
    },
    {
      id: "altar",
      name: "The altar",
      subtitle: "A square hearth with four horns",
      color: "#a59479",
      material: "Illustrative stone finish",
      measurement: "Hearth 12 × 12 · ledge 14 × 14 long cubits",
      description:
        "After the glory’s return, the vision gives detailed altar measurements. The square hearth, ledges, horns and east-facing steps make it visibly different from the other altars in this collection.",
      note: "Hearth and ledge footprints follow 43:16–17. The lower-tier profile follows the chosen reading of the preceding measurements; surface finish and stair geometry are illustrative.",
      sources: [
        ezek(43, "13–17", "The altar’s measurements and east-facing steps."),
      ],
      connections: [
        thread(
          ezek(
            43,
            "18–27",
            "The following instructions concern the altar’s consecration. Read them in their place within Ezekiel’s vision.",
          ),
        ),
      ],
    },
    {
      id: "table",
      name: "The wooden table",
      subtitle: "An altar called a table",
      color: "#917650",
      material: "Wood",
      measurement: "2 × 2 × 3 long cubits",
      interior: true,
      description:
        "Ezekiel first describes an altar of wood. The guide then calls it the table before the LORD. Both descriptions belong to the same short passage.",
      note: "The block preserves the BSB’s two-cubit-square plan and three-cubit height. Legs, corners and exact placement are reconstructed.",
      sources: [
        ezek(
          41,
          "22",
          "The wooden altar and the guide’s description of it as a table.",
        ),
      ],
      connections: [
        thread(
          scripture(
            "malachi",
            1,
            "The language of a table · Malachi 1:7, 12",
            "Malachi also uses table language in a discussion of offerings. Compare the vocabulary without assuming an identical object.",
          ),
        ),
      ],
    },
    {
      id: "carvings",
      name: "Palms & cherubim",
      subtitle: "The walls carry living imagery",
      color: "#b59356",
      material: "Carved wood",
      interior: true,
      description:
        "Alternating palms and cherubim run around the interior. Ezekiel specifies two faces for these cherubim, one human and one lion, turning toward neighbouring palms.",
      note: "The reliefs use abstract paired-face and wing motifs. Their arrangement follows the text; the drawing isn't a claim to recover an exact ancient carving.",
      sources: [
        ezek(
          41,
          "18–20, 25",
          "Alternating palms and two-faced cherubim on walls and doors.",
        ),
      ],
      connections: [eden],
    },
    {
      id: "river",
      name: "The river of life",
      subtitle: "The story flows outward",
      color: "#5dafa8",
      material: "Water · living trees",
      description:
        "Water flows from the house toward the east. It grows from a trickle to an uncrossable river, bringing life to the waters and fruit-bearing trees along its banks. The measured sanctuary opens into a vision of renewed land.",
      note: "The route stays south of the altar. Beyond the wall, distance is compressed: the four thousand-cubit measuring stages are narrated, not drawn to the temple’s scale. Trees, water depth and the channel profile are illustrative.",
      sources: [
        ezek(
          47,
          "1–12",
          "Direction, increasing depth, living waters and trees along the banks.",
        ),
      ],
      connections: [
        thread(
          scripture(
            "revelation",
            22,
            "Water, trees and healing · Revelation 22:1–2",
            "Revelation also brings together flowing water, the tree of life and healing leaves. Read the shared imagery alongside the different settings of the two visions.",
          ),
        ),
      ],
    },
  ],
  starts: [
    { part: "gates", title: "Follow the measuring guide" },
    { part: "carvings", title: "Read the carved walls" },
    { part: "river", title: "Follow the water outward" },
  ],
  tour: [
    moment(
      "A vision begins with attention",
      "A guide asks Ezekiel to look, listen and report what he sees. Begin with the ordered courts.",
    ),
    moment(
      "Measure the thresholds",
      "Gate after gate repeats the pattern. Their chambers and steps make the journey through the vision visible.",
      "gates",
      false,
      false,
      "sources",
    ),
    moment(
      "The glory returns",
      "Ezekiel 43 reverses the earlier departure: the glory enters through the east gate and fills the house.",
      "court",
      false,
      false,
      "connections",
    ),
    moment(
      "Living imagery within",
      "Open the sanctuary and look at its palms and cherubim. Familiar imagery takes a distinctive form in this vision.",
      "carvings",
      true,
      true,
      "sources",
    ),
    moment(
      "The water flows out",
      "South of the altar, water runs east. Four measuring stages carry the story from ankle-deep water to a river that cannot be crossed.",
      "river",
      true,
      true,
    ),
    moment(
      "From the house to the land",
      "The trees bear fruit and their leaves bring healing. Follow the connection with Revelation’s river and tree of life.",
      "river",
      false,
      false,
      "connections",
    ),
  ],
};

export const TEMPLE_STUDIES: Record<TempleId, TempleStudy> = {
  solomon: SOLOMON,
  herod: HEROD,
  ezekiel: EZEKIEL,
};
export const TEMPLE_IDS: TempleId[] = ["solomon", "herod", "ezekiel"];
export function isTempleId(value: string): value is TempleId {
  return TEMPLE_IDS.includes(value as TempleId);
}
