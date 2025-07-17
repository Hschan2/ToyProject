import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { q, source, target } = body;

  try {
    const res = await fetch("https://papago.naver.com/apis/n2mt/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent": "Mozilla/5.0",
        Accept: "*/*",
      },
      body: `source=${source}&target=${target}&text=${encodeURIComponent(q)}`,
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: "Papago 응답 실패", detail: errorText },
        { status: res.status }
      );
    }

    const json = await res.json();
    return NextResponse.json({ translatedText: json.translatedText });
  } catch (error) {
    return NextResponse.json(
      { error: "Papago 요청 실패", detail: String(error) },
      { status: 500 }
    );
  }
}
