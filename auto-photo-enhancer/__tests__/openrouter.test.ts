import { callOpenRouterAPI } from "@/utils/api";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ brightness: 1.2 }),
  })
) as jest.Mock;

describe("callOpenRouterAPI", () => {
  it("정상 API 호출 시 JSON 반환", async () => {
    const result = await callOpenRouterAPI("Canon", "Bright");
    expect(result.brightness).toBe(1.2);
  });

  it("실패 시 오류 throw", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "잘못된 요청" }),
    });

    await expect(callOpenRouterAPI("Canon", "Dark")).rejects.toThrow(
      "잘못된 요청"
    );
  });
});
