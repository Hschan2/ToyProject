import { useEffect, useState } from "react";

export default function TranslateProgressAutoDownload({
  session,
  filename,
  language,
}: {
  session: string;
  filename: string;
  language: string;
}) {
  const [progress, setProgress] = useState({ translatedCount: 0, total: 0 });
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(
        `/resources/progress?session=${session}&filename=${filename}`
      );
      const data = await res.json();
      setProgress(data);

      if (
        data.total > 0 &&
        data.translatedCount === data.total &&
        !downloaded
      ) {
        const formData = new FormData();
        formData.append("session", session);
        formData.append("language", language);
        formData.append("file", new File([""], filename));

        const res = await fetch("/resources/translate", {
          method: "POST",
          body: formData,
        });

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `translated_${filename}`;
        a.click();
        URL.revokeObjectURL(url);
        setDownloaded(true);
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [session, filename, language, downloaded]);

  const percent =
    progress.total > 0
      ? Math.round((progress.translatedCount / progress.total) * 100)
      : 0;

  return (
    <div style={{ marginTop: "1rem" }}>
      <div>
        번역 진행률: {progress.translatedCount} / {progress.total}줄 ({percent}
        %)
      </div>
      <progress value={percent} max={100} style={{ width: "100%" }} />
      {downloaded && <p>🎉 번역 완료! 자동 다운로드 되었습니다.</p>}
    </div>
  );
}
