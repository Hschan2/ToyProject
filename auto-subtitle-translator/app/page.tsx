import SubtitleUploader from "@/components/SubtitleUploader";

export default function Home() {
  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">자막 자동 번역기</h1>
      <SubtitleUploader />
    </main>
  );
}
