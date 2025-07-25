import { translateLineForTest } from "@/utils/translatePapagoSingleLine";
import axios from "axios";

// axios를 mock으로 처리
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Papago 번역 테스트", () => {
  it("일본어를 한국어로 번역한다", async () => {
    // mock된 응답 정의
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        translatedText: "할아버지~!",
      },
    });

    const sourceText = "(富樫)おじいちゃ～ん！";
    const result = await translateLineForTest(sourceText, "ja", "ko");

    expect(result).toBe("할아버지~!");
  });

  it("API 오류 시 '번역 실패' 반환", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("네트워크 오류"));

    const result = await translateLineForTest("テスト", "ja", "ko");

    expect(result).toBe("번역 실패");
  });
});
