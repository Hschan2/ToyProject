export const runtime = "nodejs";

import { writeFile, mkdir, unlink, readFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { spawn } from "child_process";
import os from "os";
import { NextResponse } from "next/server";

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ffmpegPath = require("ffmpeg-static") as string;

export async function POST(req: Request) {
  const tmpDir = path.join(os.tmpdir());

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "파일없음" }, { status: 400 });
    }

    await mkdir(tmpDir, { recursive: true });

    const id = uuidv4();
    const inputPath = path.join(tmpDir, `${id}.webm`);
    const outputPath = path.join(tmpDir, `${id}.mp4`);

    const arrayBuffer = await file.arrayBuffer();
    await writeFile(inputPath, Buffer.from(arrayBuffer));
    await new Promise<void>((resolve, reject) => {
      const ffmpeg = spawn(ffmpegPath, [
        "-i",
        inputPath,
        "-c:v",
        "libx264",
        "-c:a",
        "aac",
        outputPath,
      ]);

      ffmpeg.stderr.on("data", (data) =>
        console.error("FFmpeg stderr: ", data.toString())
      );
      ffmpeg.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`FFmpeg 종료 코드: ${code}`));
      });
    });

    const outputBuffer = await readFile(outputPath);

    await unlink(inputPath).catch(() => {});
    await unlink(outputPath).catch(() => {});

    return new Response(outputBuffer, {
      status: 200,
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": "attachment; filename=converted.mp4",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Conversion 실패" }, { status: 500 });
  }
}
