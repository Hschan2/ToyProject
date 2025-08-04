import { renderHook, act, waitFor } from "@testing-library/react";
import { useUploader } from "@/hooks/useUploader";

describe("useUploader", () => {
  it("이미지 업로드 시 imageSrc 설정", async () => {
    const { result } = renderHook(() => useUploader());

    const file = new File(["dummy"], "test.png", { type: "image/png" });

    await act(async () => {
      result.current.handleUpload(file);
    });

    await waitFor(() => {
      expect(result.current.imageSrc).toBe("data:image/png;base64,dummy");
    });

    expect(result.current.videoSrc).toBe(null);
  });
});
