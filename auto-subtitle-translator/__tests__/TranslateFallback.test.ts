import { describe, expect, it } from "@jest/globals";
import { translateSubtitlesForTest } from "../utils/translateForTest";
import { SubtitleItem } from "@/types/subtitle";
import * as translateModule from "../utils/translateSubtitles";

describe("Papago 실패 시 Lingva fallback 테스트", () => {
  it("Papago 실패 후 Lingva fallback이 동작하는지 확인", async () => {
    const sourceLang = "ko";
    const targetLang = "en";

    const subtitles: SubtitleItem[] = [
      {
        index: 1,
        start: "00:00:01,000",
        end: "00:00:03,000",
        text: "안녕하세요. 만나서 반갑습니다.",
      },
    ];

    const result = await translateSubtitlesForTest(
      subtitles,
      targetLang,
      sourceLang
    );

    expect(result).toHaveLength(1);
    expect(result[0].text.toLowerCase()).toContain("hello");
  });
});

describe("Papago 실패 시 Lingva fallback", () => {
  beforeAll(() => {
    jest.spyOn(translateModule, "translateViaPapago").mockImplementation(() => {
      throw new Error("Papago intentionally failed");
    });
  });

  it("should fallback to Lingva when Papago fails", async () => {
    const testSubtitles: SubtitleItem[] = [
      {
        index: 1,
        start: "00:00:01,000",
        end: "00:00:02,000",
        text: "Hello world",
      },
    ];

    const result = await translateModule.translateSubtitles(
      testSubtitles,
      "ko",
      "en"
    );

    expect(result[0].text).toContain("안녕"); // Lingva 번역 결과 일부를 기준으로 검사
  });
});
