import { SubtitleItem } from "@/types/subtitle";

export class SubtitleParser {
  static parseSRT(content: string): SubtitleItem[] {
    const blocks = content.split(/\r?\n\r?\n/);
    return blocks
      .map((block, idx) => {
        const lines = block.trim().split("\n");
        if (lines.length >= 3) {
          const [indexLine, timeLine, ...textLines] = lines;
          const [start, end] = timeLine.split(" --> ");
          return {
            index: parseInt(indexLine, 10),
            start: start.trim(),
            end: end.trim(),
            text: textLines.join(" "),
          };
        }
        return null;
      })
      .filter((item): item is SubtitleItem => item !== null);
  }

  static parseSMI(content: string): SubtitleItem[] {
    const syncRegex = /<SYNC Start=(\d+)>[\s\S]*?<P Class=\w*>(.*?)<\/P>/gi;
    const matches = [...content.matchAll(syncRegex)];

    const result: SubtitleItem[] = [];
    for (let i = 0; i < matches.length; i++) {
      const startMs = parseInt(matches[i][1], 10);
      const text = matches[i][2]
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/&nbsp;/g, " ")
        .trim();

      const endMs =
        i + 1 < matches.length
          ? parseInt(matches[i + 1][1], 10)
          : startMs + 2000;

      const formatTime = (ms: number) => {
        const date = new Date(ms);
        return date.toISOString().slice(11, 23).replace(".", ",");
      };

      result.push({
        index: i + 1,
        start: formatTime(startMs),
        end: formatTime(endMs),
        text,
      });
    }
    return result;
  }

  static isSMI(content: string): boolean {
    return /<SYNC Start=\d+>/i.test(content);
  }
}
