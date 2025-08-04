import "@testing-library/jest-dom";

class MockFileReader {
  result: string | null = null;
  onload: ((this: FileReader, ev: ProgressEvent<FileReader>) => void) | null =
    null;

  readAsDataURL(_file: Blob): void {
    this.result = "data:image/png;base64,dummy"; // ✅ result 속성 설정

    if (this.onload) {
      this.onload.call(
        this as unknown as FileReader,
        {
          target: { result: this.result },
        } as ProgressEvent<FileReader>
      );
    }
  }
}

Object.defineProperty(global, "FileReader", {
  writable: true,
  value: MockFileReader,
});
