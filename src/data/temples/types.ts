export type TempleId = "solomon" | "herod" | "ezekiel";
export type TempleLens = "object" | "sources" | "connections";
export type Source = { title: string; href: string; note: string };
export type Connection = Source & {
  kind:
    "Textual connection" | "Ancient interpretation" | "Archaeological context";
};
export type TemplePart = {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  material: string;
  description: string;
  measurement?: string;
  interior?: boolean;
  note: string;
  sources: Source[];
  connections: Connection[];
};
export type TempleView = {
  part: string | null;
  separation: number;
  isolated: boolean;
  cutaway: boolean;
  lens: TempleLens;
};
export type TempleMoment = {
  title: string;
  text: string;
  view: TempleView;
};
export type TempleStudy = {
  id: TempleId;
  name: string;
  eyebrow: string;
  title: string;
  emphasis: string;
  introduction: string;
  status: string;
  unit: string;
  overview: string;
  reconstruction: string[];
  parts: TemplePart[];
  tour: TempleMoment[];
  starts: { part: string; title: string }[];
};
