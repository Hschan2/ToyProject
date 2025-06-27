export function applyCacheToSubtitles<T extends { text: string }>(
  parsed: T[],
  cache: Record<number, string>
): T[] {
  return parsed.map((s, i) => ({
    ...s,
    text: cache[i] || "[번역 실패]",
  }));
}
