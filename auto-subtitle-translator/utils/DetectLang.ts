export function detectLang(text: string): "ko" | "en" | "ja" | "zh" {
  if (/[가-힣]/.test(text)) return "ko";
  if (/[ぁ-ゔァ-ヴー々〆〤]/.test(text)) return "ja";
  if (/[\u4e00-\u9fff]/.test(text)) return "zh";
  return "en";
}
