import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { q, source, target } = body;

  const encodedText = encodeURIComponent(q);
  const src = source === "auto" ? "auto" : source;
  const url = `https://lingva.ml/api/v1/${src}/${target}/${encodedText}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "번역 요청 실패", detail: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ translatedText: data.translation });
  } catch (error) {
    return NextResponse.json(
      { error: "서버 오류", detail: String(error) },
      { status: 500 }
    );
  }
}
