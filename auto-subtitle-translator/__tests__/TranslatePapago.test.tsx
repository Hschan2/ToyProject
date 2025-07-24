import { SubtitleItem } from "@/types/subtitle";
import { translateLineForTest } from "@/utils/translatePapagoSingleLine";

describe("Papago 번역 테스트", () => {
  // 임의 자막 3개 (SRT 기준)
  const subtitles: SubtitleItem[] = [
    {
      index: 1,
      start: "00:00:04,486",
      end: "00:00:07,486",
      text: "(富樫)おじいちゃ～ん！",
    },
    {
      index: 2,
      start: "00:00:08,490",
      end: "00:00:11,490",
      text: "おじいちゃ～ん！",
    },
    {
      index: 3,
      start: "00:00:14,496",
      end: "00:00:18,496",
      text: "阿部のおじいちゃ～ん！",
    },
  ];

  // sourceLang은 "ja" (일본어), targetLang은 "ko" (한국어)로 테스트 예시
  const sourceLang = "ja";
  const targetLang = "ko";

  it("파파고 번역이 정상 동작해야 한다", async () => {
    for (const item of subtitles) {
      const translated = await translateLineForTest(
        item.text,
        sourceLang,
        targetLang
      );
      console.log(`원문: ${item.text} => 번역: ${translated}`);

      // 간단히 번역 결과가 빈 문자열이 아니고 원문과 같지 않아야 테스트 통과로 판단
      expect(translated).toBeDefined();
      expect(translated.length).toBeGreaterThan(0);
      expect(translated).not.toBe(item.text);
    }
  }, 30000); // timeout 30초 (네트워크 요청 여유)
});
