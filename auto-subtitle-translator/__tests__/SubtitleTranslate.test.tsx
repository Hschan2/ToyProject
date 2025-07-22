import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SubtitleUploader from "@/components/SubtitleUploader";
import "@testing-library/jest-dom";
// import fs from "fs";
// import path from "path";
import { SubtitleItem } from "@/types/subtitle";

// 번역 API 요청을 Mock 처리
jest.mock("@/utils/translateSubtitles", () => ({
  translateSubtitles: jest.fn().mockImplementation(async (subtitles) => {
    return subtitles.map((item: SubtitleItem) => ({
      ...item,
      text: `[번역됨] ${item.text}`,
    }));
  }),
}));

// Blob 다운로드를 가로채기 위해 URL.createObjectURL를 모킹
global.URL.createObjectURL = jest.fn(() => "blob:mocked-url");
global.URL.revokeObjectURL = jest.fn();

describe("SubtitleUploader", () => {
  it("SRT 파일 업로드 후 번역된 자막 다운로드 테스트", async () => {
    render(<SubtitleUploader />);

    const fileInput = screen.getByLabelText(/자막 파일/i) as HTMLInputElement;

    // 테스트용 SRT 파일 생성
    const testSRT = `
1
00:00:04,486 --> 00:00:07,486
(富樫)おじいちゃ～ん！

2
00:00:08,490 --> 00:00:11,490
おじいちゃ～ん！
    `.trim();

    const file = new File([testSRT], "test.srt", { type: "text/plain" });

    // 업로드 시뮬레이션
    fireEvent.change(fileInput, {
      target: { files: [file] },
    });

    // 다운로드 트리거가 발생했는지 확인
    await waitFor(() => {
      expect(global.URL.createObjectURL).toHaveBeenCalled();
    });

    // 알맞은 경고 메시지가 없는지 (정상 작동)
    expect(
      screen.queryByText(/파일 처리 또는 번역 중 오류/i)
    ).not.toBeInTheDocument();
  });

  it("언어 선택 드롭다운 변경 시 UI 반영 확인", () => {
    render(<SubtitleUploader />);
    const sourceSelect = screen.getByLabelText(/원본 언어 선택/i);
    const targetSelect = screen.getByLabelText(/번역 언어 선택/i);

    fireEvent.change(sourceSelect, { target: { value: "ja" } });
    fireEvent.change(targetSelect, { target: { value: "ko" } });

    expect(sourceSelect).toHaveValue("ja");
    expect(targetSelect).toHaveValue("ko");
  });

  it("빈 파일 업로드 시 아무 작업도 하지 않음", async () => {
    render(<SubtitleUploader />);
    const fileInput = screen.getByLabelText(/자막 파일/i) as HTMLInputElement;

    const emptyFile = new File([""], "empty.srt", { type: "text/plain" });

    fireEvent.change(fileInput, { target: { files: [emptyFile] } });

    await waitFor(() => {
      // 번역 요청이 발생하지 않아야 함
      expect(global.URL.createObjectURL).not.toHaveBeenCalled();
    });
  });
});
