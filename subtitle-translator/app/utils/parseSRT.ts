export type Subtitle = {
  index: number;
  start: string;
  end: string;
  text: string;
};

export function parseSRT(srt: string): Subtitle[] {
  return srt
    .trim()
    .split("\n\n")
    .map((block) => {
      const [index, time, ...textLines] = block.split("\n");
      const [start, end] = time.split(" --> ");
      return {
        index: parseInt(index),
        start,
        end,
        text: textLines.join(" "),
      };
    });
}

export function stringifySRT(Subtitles: Subtitle[]): string {
  return Subtitles.map(
    ({ index, start, end, text }) => `${index}\n${start} --> ${end}\n${text}`
  ).join("\n\n");
}
