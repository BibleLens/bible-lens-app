/** Lightweight markdown renderer — handles headings, bold, italic, lists, tables, HRs. */
export function renderMarkdown(text: string): string {
  return text
    .split("\n")
    .map((line) => {
      // Headings
      if (/^### (.+)$/.test(line)) return `<strong style="font-size:1.05em">${line.slice(4)}</strong>`;
      if (/^## (.+)$/.test(line)) return `<strong style="font-size:1.1em">${line.slice(3)}</strong>`;
      if (/^# (.+)$/.test(line)) return `<strong style="font-size:1.15em">${line.slice(2)}</strong>`;
      // Horizontal rule
      if (/^---+$/.test(line.trim())) return '<hr style="border:none;border-top:1px solid var(--color-border);margin:0.5em 0" />';
      // Table separator row — hide it
      if (/^\|[-|\s:]+\|$/.test(line.trim())) return "";
      // Table rows → simple two-column layout
      if (/^\|(.+)\|$/.test(line.trim())) {
        const cells = line.trim().slice(1, -1).split("|").map((c) => c.trim());
        return `<div style="display:flex;gap:1.5em;padding:0.15em 0"><span style="flex:1">${cells[0]}</span>${cells.length > 1 ? `<span style="flex:1">${cells.slice(1).join(" | ")}</span>` : ""}</div>`;
      }
      // Bullet list items
      if (/^[-*] (.+)$/.test(line)) return `<div style="padding-left:1.2em;text-indent:-0.8em">• ${line.slice(2)}</div>`;
      return line;
    })
    .join("<br />")
    // Inline: bold then italic (order matters)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");
}
