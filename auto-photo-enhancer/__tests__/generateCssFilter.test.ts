import { generateCssFilter } from "@/utils/generateCssFilter";

describe("generateCssFilter", () => {
  it("기본값 사용 시 'brightness(1)' 포함", () => {
    const result = generateCssFilter({});
    expect(result).toContain("brightness(1)");
  });

  it("입력값을 필터로 변환", () => {
    const result = generateCssFilter({ brightness: 1.2, grayscale: 0.3 });
    expect(result).toContain("brightness(1.2)");
    expect(result).toContain("grayscale(0.3)");
  });
});
