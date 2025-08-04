import { render, screen, fireEvent } from "@testing-library/react";
import Uploader from "@/components/Uploader";

describe("Uploader", () => {
  it("파일 선택 시 onFileSelect 호출", () => {
    const mockFn = jest.fn();
    render(<Uploader onFileSelect={mockFn} />);

    const input = screen.getByLabelText("사진/동영상 첨부") as HTMLInputElement;

    const file = new File(["dummy"], "test.png", { type: "image/png" });

    fireEvent.change(input, {
      target: { files: [file] },
    });

    expect(mockFn).toHaveBeenCalledWith(file);
  });
});
