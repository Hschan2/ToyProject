import { spawn } from "child_process";
import { randomUUID } from "crypto";
import { readFile, unlink, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

const TMP_DIR = "/tmp";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file || file.type !== "video/webm") {
    return NextResponse.json(
      { error: "Invalid or missing file" },
      { status: 400 }
    );
  }

  const id = randomUUID();
  const inputPath = join(TMP_DIR, `${id}.webm`);
  const outputPath = join(TMP_DIR, `${id}.mp4`);

  const arrayBuffer = await file.arrayBuffer();
  await writeFile(inputPath, Buffer.from(arrayBuffer));

  try {
    await new Promise((resolve, reject) => {
      const ffmpeg = spawn("ffmpeg", [
        "-y",
        "-i",
        inputPath,
        "-c:v",
        "libx264",
        "-c:a",
        "aac",
        outputPath,
      ]);

      ffmpeg.stderr.on("data", (data) =>
        console.log("ffmpeg:", data.toString())
      );
      ffmpeg.on("close", (code) => {
        if (code === 0) resolve(true);
        else reject(new Error(`FFmpeg exited with code ${code}`));
      });
    });

    const outputBuffer = await readFile(outputPath);

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": "attachment; filename=converted.mp4",
      },
    });
  } finally {
    await unlink(inputPath).catch(() => {});
    await unlink(outputPath).catch(() => {});
  }
}
