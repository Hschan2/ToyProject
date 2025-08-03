import { renderHook, act, waitFor } from "@testing-library/react";
import { useUploader } from "@/hooks/useUploader";

describe("useUploader", () => {
  it("이미지 업로드 시 imageSrc 설정", async () => {
    const file = new File(["dummy"], "image.png", { type: "image/png" });
    const { result } = renderHook(() => useUploader());

    jest
      .spyOn(FileReader.prototype, "readAsDataURL")
      .mockImplementation(function (this: FileReader) {
        const mockResult = "data:image/png;base64,dummy";
        if (this.onload) {
          const event = {
            target: { result: mockResult },
          } as ProgressEvent<FileReader>;
          this.onload(event);
        }
      });

    await act(async () => {
      result.current.handleUpload(file);
    });

    await waitFor(() => {
      expect(result.current.imageSrc).toBe("data:image/png;base64,dummy");
    });

    expect(result.current.videoSrc).toBe(null);
  });
});
