import { SubtitleItem } from "@/types/subtitle";

export class SubtitleFormatter {
  static toSRT(subtitles: SubtitleItem[]): string {
    return subtitles
      .map(
        (item) => `${item.index}\n${item.start} --> ${item.end}\n${item.text}\n`
      )
      .join("\n");
  }

  static toSMI(subtitles: SubtitleItem[]): string {
    const formatMs = (time: string) => {
      const [h, m, sMs] = time.split(":");
      const [s, ms] = sMs.split(",");
      return (
        parseInt(h) * 3600000 +
        parseInt(m) * 60000 +
        parseInt(s) * 1000 +
        parseInt(ms)
      );
    };

    const smiContent = `<SAMI>\n<HEAD>\n<TITLE>Translated</TITLE>\n</HEAD>\n<BODY>\n`;

    const body = subtitles
      .map((item) => {
        const start = formatMs(item.start);
        const safeText = item.text.replace(/\n/g, "<br>");
        return `<SYNC Start=${start}>\n<P Class=KRCC>${safeText}</P>`;
      })
      .join("\n");

    return smiContent + body + "\n</BODY>\n</SAMI>";
  }
}
