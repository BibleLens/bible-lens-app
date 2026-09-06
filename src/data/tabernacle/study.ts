export type PartId =
  | "covering"
  | "linen"
  | "frame"
  | "veil"
  | "ark"
  | "lampstand"
  | "table"
  | "incense"
  | "basin"
  | "altar"
  | "court";
export type Lens = "object" | "passage" | "connections";
export type Connection = {
  title: string;
  reference: string;
  text: string;
  href: string;
  kind: "Textual connection" | "Ancient interpretation";
};
export type Part = {
  id: PartId;
  name: string;
  subtitle: string;
  material: string;
  color: string;
  description: string;
  reference: string;
  excerpt: string;
  passage: string;
  modelNote: string;
  connections: Connection[];
};
const ex = (chapter: number) => `/bible/exodus/${chapter}`;
const josephus = "https://penelope.uchicago.edu/josephus/ant-3.html";
export const PARTS: Part[] = [
  {
    id: "covering",
    name: "The outer covering",
    subtitle: "Shelter over the dwelling",
    material: "Skins · leather",
    color: "#b56544",
    description:
      "The outer coverings shelter the tent. Here a warm, segmented canopy gives way to a pale centre, following the broad visual idea in Andrew Hoy’s reconstruction.",
    reference: "Exodus 26:14",
    excerpt: "Also make a covering for the tent out of ram skins dyed red",
    passage: ex(26),
    modelNote:
      "The canopy profile, seams and pale centre are illustrative. Hoy proposes differentiated roof regions; Exodus 26:14 gives no roof dimensions.",
    connections: [
      {
        title: "A dwelling on the move",
        reference: "Exodus 40:36–38",
        text: "The closing scene of Exodus connects Israel’s journeys with the cloud over the dwelling. Read how the narrative brings the completed structure into the life of the camp.",
        href: ex(40),
        kind: "Textual connection",
      },
    ],
  },
  {
    id: "linen",
    name: "The inner linen",
    subtitle: "Colour within the tent",
    material: "Linen · blue · purple · scarlet",
    color: "#547ba7",
    description:
      "Fine linen and coloured yarn form the inner fabric. Exodus describes cherubim worked into it. The ten-sided arrangement here draws on an intermediate diagram in Hoy’s book preview.",
    reference: "Exodus 26:1–6",
    excerpt: "and cherubim skillfully worked into them",
    passage: ex(26),
    modelNote:
      "The decagonal display is schematic. Its height, opening and decorative bands are presentation choices, not a verified final assembly of Hoy’s curtains.",
    connections: [
      {
        title: "Guardians at the entrance",
        reference: "Genesis 3:24",
        text: "Cherubim also appear at the guarded entrance to Eden. The shared imagery invites a comparison of sacred space and access; Exodus doesn’t explicitly explain its textile design by referring to Eden.",
        href: "/bible/genesis/3",
        kind: "Textual connection",
      },
    ],
  },
  {
    id: "frame",
    name: "The supporting frame",
    subtitle: "A structure beneath the fabric",
    material: "Acacia · gold · silver",
    color: "#caa668",
    description:
      "Exodus names wooden frames, bars, rings and bases. Hoy reads their arrangement as a ribbed dome supported by ten pillars. This study makes that proposed relationship visible.",
    reference: "Exodus 26:15–30",
    excerpt:
      "You are to construct upright frames of acacia wood for the tabernacle.",
    passage: ex(26),
    modelNote:
      "The ten ribs and supports are a visual approximation of Hoy’s proposal. Joint design, member segmentation and the crown ring still need detailed source drawings.",
    connections: [
      {
        title: "According to the pattern",
        reference: "Exodus 26:30 · Hebrews 8:5",
        text: "Exodus refers to the pattern shown on the mountain. Hebrews returns to that instruction when discussing the earthly sanctuary and heavenly things. These passages don’t themselves specify a dome.",
        href: "/bible/hebrews/8",
        kind: "Textual connection",
      },
    ],
  },
  {
    id: "veil",
    name: "The veil",
    subtitle: "A boundary within the dwelling",
    material: "Linen · coloured yarn · gold",
    color: "#6d609c",
    description:
      "The veil divides the Holy Place from the Most Holy Place. Its woven cherubim make this boundary a particularly rich place to begin exploring the sanctuary’s imagery.",
    reference: "Exodus 26:31–33",
    excerpt: "the veil will separate the Holy Place from the Most Holy Place.",
    passage: ex(26),
    modelNote:
      "Four supporting posts follow the passage. The width, placement within this circular study and stylised wing motifs are illustrative.",
    connections: [
      {
        title: "Back to the garden",
        reference: "Genesis 3:24",
        text: "Cherubim guard the way to the tree of life in Eden. Compare that guarded access with the cherubim on the sanctuary veil. This is a thematic reading of the two passages.",
        href: "/bible/genesis/3",
        kind: "Textual connection",
      },
      {
        title: "Through the second curtain",
        reference: "Hebrews 9:1–12",
        text: "Hebrews walks its readers through the furnishings and the second curtain, then develops an argument about access, priesthood and Christ. Follow the author’s movement through the space.",
        href: "/bible/hebrews/9",
        kind: "Textual connection",
      },
    ],
  },
  {
    id: "ark",
    name: "The ark",
    subtitle: "Behind the veil",
    material: "Acacia · gold",
    color: "#d3b36b",
    description:
      "A wooden chest overlaid with gold, a cover with cherubim, and carrying poles. Exodus places the testimony inside and describes this as the place from which God would speak to Moses.",
    reference: "Exodus 25:10–22",
    excerpt: "And place inside the ark the Testimony, which I will give you.",
    passage: ex(25),
    modelNote:
      "The chest uses the passage’s 2.5 : 1.5 : 1.5 proportions. The cherubim are deliberately stylised, and the furnishing’s scale within the larger schematic is illustrative.",
    connections: [
      {
        title: "A place of meeting",
        reference: "Exodus 25:22",
        text: "The instructions turn from construction to encounter: the space above the cover, between the cherubim, is associated with speaking to Moses.",
        href: ex(25),
        kind: "Textual connection",
      },
    ],
  },
  {
    id: "lampstand",
    name: "The lampstand",
    subtitle: "Light in the Holy Place",
    material: "Gold · oil",
    color: "#d8b873",
    description:
      "A central stem and six branches carry seven lamps. The description includes almond-shaped cups, buds and blossoms. Its organic decoration sits within an otherwise carefully ordered interior.",
    reference: "Exodus 25:31–40",
    excerpt: "Make seven lamps and set them up on the lampstand",
    passage: ex(25),
    modelNote:
      "Seven lamps and branching structure follow the text. Curves, cups and proportions are an artistic reconstruction; the passage gives no overall height.",
    connections: [
      {
        title: "Seven lamps, a cosmic reading",
        reference: "Josephus · Antiquities 3.7.7",
        text: "Josephus associates the seven lamps with the planets known in his setting. This is an ancient interpretation of the sanctuary, not an explanation stated in Exodus.",
        href: josephus,
        kind: "Ancient interpretation",
      },
    ],
  },
  {
    id: "table",
    name: "The table & bread",
    subtitle: "Set before God",
    material: "Acacia · gold · bread",
    color: "#d2b785",
    description:
      "A gold-covered table holds the bread of the Presence. Exodus describes its construction and utensils; Leviticus gives the arrangement of twelve loaves.",
    reference: "Exodus 25:23–30",
    excerpt:
      "place the Bread of the Presence on the table before Me at all times.",
    passage: ex(25),
    modelNote:
      "The table follows the text’s 2 : 1 : 1.5 proportions. The twelve loaves are represented as two stacks; their precise shape is illustrative.",
    connections: [
      {
        title: "Twelve loaves",
        reference: "Leviticus 24:5–9",
        text: "The instructions specify twelve loaves in two arrangements of six, renewed each Sabbath. Read the passage alongside the table.",
        href: "/bible/leviticus/24",
        kind: "Textual connection",
      },
      {
        title: "The months of the year",
        reference: "Josephus · Antiquities 3.7.7",
        text: "Josephus connects the twelve loaves with the months. His cosmic interpretation belongs to a rectilinear sanctuary description and doesn’t establish Hoy’s circular geometry.",
        href: josephus,
        kind: "Ancient interpretation",
      },
    ],
  },
  {
    id: "incense",
    name: "The incense altar",
    subtitle: "Before the veil",
    material: "Acacia · gold · incense",
    color: "#b99a61",
    description:
      "A small, gold-covered altar stands before the veil. Exodus connects its incense with the morning and evening tending of the lamps.",
    reference: "Exodus 30:1–10",
    excerpt: "Place the altar in front of the veil",
    passage: ex(30),
    modelNote:
      "The square altar follows the text’s 1 : 1 : 2 proportions. Its position in this circular interior remains illustrative.",
    connections: [
      {
        title: "Incense and prayer",
        reference: "Psalm 141:2",
        text: "The psalmist compares prayer with incense. This is a poetic use of the image, which can be read alongside the altar’s described function.",
        href: "/bible/psalms/141",
        kind: "Textual connection",
      },
    ],
  },
  {
    id: "basin",
    name: "The bronze basin",
    subtitle: "Water before service",
    material: "Bronze · water",
    color: "#77999c",
    description:
      "A bronze basin stands between the tent and the altar. Priests wash their hands and feet before entering the tent or approaching the altar to serve.",
    reference: "Exodus 30:17–21",
    excerpt: "Aaron and his sons are to wash their hands and feet",
    passage: ex(30),
    modelNote:
      "The basin and stand have no dimensions in this passage. Their shape and size here are illustrative.",
    connections: [
      {
        title: "From mirrors to a basin",
        reference: "Exodus 38:8",
        text: "The construction account identifies the bronze mirrors of women serving at the entrance as the material used for the basin and its stand.",
        href: ex(38),
        kind: "Textual connection",
      },
    ],
  },
  {
    id: "altar",
    name: "The bronze altar",
    subtitle: "In the courtyard",
    material: "Acacia · bronze",
    color: "#ac7955",
    description:
      "A square altar with horns, a grating and carrying poles. Its materials and portability place it within the same travelling sanctuary as the tent and its furnishings.",
    reference: "Exodus 27:1–8",
    excerpt: "The altar must be square",
    passage: ex(27),
    modelNote:
      "The altar preserves the passage’s 5 : 5 : 3 proportions. The grating and horns are simplified, and its location in this courtyard is illustrative.",
    connections: [
      {
        title: "Built to be carried",
        reference: "Exodus 27:6–7",
        text: "The altar’s poles pass through rings on its sides. The instructions make provision for moving even this substantial furnishing.",
        href: ex(27),
        kind: "Textual connection",
      },
    ],
  },
  {
    id: "court",
    name: "The surrounding court",
    subtitle: "An enclosure around the dwelling",
    material: "Linen · posts · metal fittings",
    color: "#b9b4a3",
    description:
      "Exodus describes the court’s hangings, posts and entrance. A circular enclosure here expresses Hoy’s minority reconstruction, whose allocation of curtains differs from the conventional reading.",
    reference: "Exodus 27:9–19",
    excerpt: "You are also to make a courtyard for the tabernacle.",
    passage: ex(27),
    modelNote:
      "The circular footprint, visible post spacing and relative scale are schematic. Hoy’s proposed 100-cubit courtyard diameter must not be transferred to the dome.",
    connections: [
      {
        title: "Around the tent of meeting",
        reference: "Numbers 2:1–2",
        text: "The camp is arranged in relation to the tent of meeting. Read the camp instructions as another way the sanctuary shapes the community’s space.",
        href: "/bible/numbers/2",
        kind: "Textual connection",
      },
    ],
  },
];
export const PART_BY_ID = Object.fromEntries(
  PARTS.map((part) => [part.id, part]),
) as Record<PartId, Part>;
export const TOUR = [
  {
    title: "A dwelling among them",
    text: "Begin with the whole. A circular schematic inspired by Andrew Hoy’s proposal.",
    separation: 0,
    part: null,
    isolated: false,
    lens: "object",
  },
  {
    title: "Lift the covering",
    text: "Separate the layers and discover the structure beneath them.",
    separation: 65,
    part: "covering",
    isolated: false,
    lens: "object",
  },
  {
    title: "Pause at the veil",
    text: "Bring one boundary forward. Its materials and purpose are described in Exodus.",
    separation: 85,
    part: "veil",
    isolated: true,
    lens: "passage",
  },
  {
    title: "Follow the imagery",
    text: "The cherubim invite a connection with Eden and a closer reading of access to sacred space.",
    separation: 85,
    part: "veil",
    isolated: true,
    lens: "connections",
  },
  {
    title: "See the whole again",
    text: "Return each part to its place. Keep exploring whatever caught your attention.",
    separation: 0,
    part: null,
    isolated: false,
    lens: "object",
  },
] as const;
