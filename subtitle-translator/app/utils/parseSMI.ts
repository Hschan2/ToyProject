export type SmiSubtitle = {
  start: number;
  text: string;
};

export function parseSMI(smiContent: string): SmiSubtitle[] {
  const syncRegex =
    /<SYNC\s+Start=(\d+)>[\s\S]*?(?:<P Class=\w+>)?([\s\S]*?)(?=<SYNC|<\/BODY>)/gi;

  const subtitles: SmiSubtitle[] = [];
  let match;

  while ((match = syncRegex.exec(smiContent)) !== null) {
    const start = parseInt(match[1], 10);
    const text = match[2]
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/gi, " ")
      .trim();
    if (text) {
      subtitles.push({ start, text });
    }
  }

  return subtitles;
}

export function stringifySMI(subtitles: SmiSubtitle[]): string {
  const head = `
  <SAMI>
  <HEAD>
  <TITLE>Translated Subtitles</TITLE>
  </HEAD>
  <BODY>
  `;

  const body = subtitles
    .map(({ start, text }) => `<SYNC Start=${start}>\n<P Class=KRCC>${text}\n`)
    .join("\n");

  const tail = "</BODY>\n</SAMI>";
  return head + body + tail;
}
