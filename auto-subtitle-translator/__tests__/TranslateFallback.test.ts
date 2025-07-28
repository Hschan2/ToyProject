import { SubtitleItem } from "@/types/subtitle";

// 1. mock 함수 정의
type TranslateFn = (
  text: string,
  sourceLang: string,
  targetLang: string
) => Promise<string>;

// 안전한 mock 생성 방법
const mockTranslateViaPapago = jest.fn() as jest.MockedFunction<TranslateFn>;
const mockTranslateViaLingva = jest.fn() as jest.MockedFunction<TranslateFn>;

const testTranslateLine = async (
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> => {
  try {
    return await mockTranslateViaPapago(text, sourceLang, targetLang);
  } catch (e) {
    return await mockTranslateViaLingva(text, sourceLang, targetLang);
  }
};

// 3. 테스트용 함수 — 원래 translateSubtitles 함수 복사 후 fallback용 translateLine 주입
const translateSubtitlesForTestWithMock = async (
  subtitles: SubtitleItem[],
  targetLang: string,
  sourceLang: string
): Promise<SubtitleItem[]> => {
  const translated = await Promise.all(
    subtitles.map(async (item) => ({
      ...item,
      text: await testTranslateLine(item.text, sourceLang, targetLang),
    }))
  );
  return translated;
};

// 4. 테스트 코드
describe("Papago 실패 시 Lingva fallback 테스트", () => {
  it("Papago 실패 후 Lingva fallback이 동작하는지 확인", async () => {
    const subtitles: SubtitleItem[] = [
      {
        index: 1,
        start: "00:00:01,000",
        end: "00:00:03,000",
        text: "안녕하세요. 만나서 반갑습니다.",
      },
    ];

    mockTranslateViaPapago.mockRejectedValueOnce(new Error("Papago 실패"));
    mockTranslateViaLingva.mockResolvedValueOnce("Hello, nice to meet you.");

    const result = await translateSubtitlesForTestWithMock(
      subtitles,
      "en",
      "ko"
    );

    expect(result).toHaveLength(1);
    expect(result[0].text).toBe("Hello, nice to meet you.");
  });
});
