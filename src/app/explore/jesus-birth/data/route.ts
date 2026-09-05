import { studyExport } from "@/lib/explorer/data";

export const dynamic = "force-static";
export function GET() {
  return Response.json(studyExport(), {
    headers: {
      "Content-Disposition":
        'attachment; filename="bible-lens-jesus-birth-study.json"',
      "X-Robots-Tag": "noindex",
    },
  });
}
