import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { spawn } from 'child_process';

// 수동 생성
const ffmpegPath = path.join(process.cwd(), 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 });
    }

    const tempDir = path.join(process.cwd(), 'temp');
    await fs.mkdir(tempDir, { recursive: true });

    const inputFileName = `input-${Date.now()}.webm`;
    const outputFileName = `output-${Date.now()}.mp4`;
    const inputPath = path.join(tempDir, inputFileName);
    const outputPath = path.join(tempDir, outputFileName);

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(inputPath, fileBuffer);

    // 수동 생성 사용
    const ffmpegProcess = spawn(ffmpegPath, [
      '-i', inputPath,
      '-c:v', 'libx264',
      '-preset', 'ultrafast',
      '-crf', '22',
      '-c:a', 'aac',
      '-b:a', '128k',
      outputPath
    ]);

    await new Promise<void>((resolve, reject) => {
      const stderrChunks: Buffer[] = [];
      ffmpegProcess.stderr.on('data', (data) => {
        stderrChunks.push(data);
      });

      ffmpegProcess.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          const stderr = Buffer.concat(stderrChunks).toString('utf8');
          reject(new Error(`FFmpeg 진행 종료 코드 ${code}: ${stderr}`));
        }
      });

      ffmpegProcess.on('error', (err) => {
        reject(err);
      });
    });

    const convertedFileBuffer = await fs.readFile(outputPath);

    // 임시 파일 삭제
    await fs.unlink(inputPath);
    await fs.unlink(outputPath);

    return new NextResponse(convertedFileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="converted.mp4"`,
      },
    });

  } catch (error: any) {
    console.error('비디오 변환 중 에러:', error);
    return NextResponse.json({ error: '동영상 변환 중 오류가 발생했습니다.', details: error.message }, { status: 500 });
  }
}