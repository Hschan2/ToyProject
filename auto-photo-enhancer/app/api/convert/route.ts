import { writeFile, mkdir, unlink, readFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import ffmpegPath from "ffmpeg-static";
import { spawn } from "child_process";
import os from "os";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const id = uuidv4();
  const tmpDir = path.join(os.tmpdir());
  const inputPath = path.join(tmpDir, `${id}.webm`);
  const outputPath = path.join(tmpDir, `${id}.mp4`);

  try {
    await mkdir(tmpDir, { recursive: true });
    const arrayBuffer = await file.arrayBuffer();
    await writeFile(inputPath, Buffer.from(arrayBuffer));

    await new Promise<void>((resolve, reject) => {
      const ffmpeg = spawn(ffmpegPath!, [
        "-i",
        inputPath,
        "-c:v",
        "libx264",
        "-preset",
        "fast",
        "-crf",
        "23",
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        "-movflags",
        "+faststart",
        outputPath,
      ]);

      ffmpeg.stderr.on("data", (data) => console.error(data.toString()));
      ffmpeg.on("error", reject);
      ffmpeg.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`FFmpeg exited with code ${code}`));
      });
    });

    const mp4Buffer = await readFile(outputPath);

    return new Response(mp4Buffer, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": "attachment; filename=converted.mp4",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to convert video", { status: 500 });
  } finally {
    try {
      await unlink(inputPath);
      await unlink(outputPath);
    } catch (err) {
      console.warn("Cleanup failed", err);
    }
  }
}
