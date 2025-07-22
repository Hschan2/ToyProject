import { NextRequest, NextResponse } from "next/server";

async function translateWithPapago(
  text: string,
  source: string,
  target: string
): Promise<string> {
  try {
    const response = await fetch(
      "https://papago.naver.com/apis/n2mt/translate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: new URLSearchParams({
          text,
          source,
          target,
        }),
      }
    );

    if (!response.ok) {
      console.warn(`🟠 Papago 응답 상태 ${response.status} → fallback`);
      throw new Error("Papago 응답 실패");
    }

    const json = await response.json();
    return json.translatedText;
  } catch (error) {
    console.error("⚠️ Papago 번역 실패:", error);
    throw error;
  }
}

async function translateWithLingva(
  text: string,
  source: string,
  target: string
): Promise<string> {
  try {
    const response = await fetch(
      `https://lingva.ml/api/v1/${source}/${target}/${encodeURIComponent(text)}`
    );
    if (!response.ok) {
      throw new Error("Lingva 응답 실패");
    }
    const json = await response.json();
    return json.translation;
  } catch (error) {
    console.error("❌ Lingva 번역 실패:", error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { q, source, target } = body;

    const fromLang = source === "auto" ? "jp" : source;

    let translatedText = "";

    try {
      translatedText = await translateWithPapago(q, fromLang, target);
    } catch {
      translatedText = await translateWithLingva(q, fromLang, target);
    }

    return NextResponse.json({ translatedText });
  } catch (error) {
    return NextResponse.json(
      { error: "Papago 요청 실패", detail: String(error) },
      { status: 500 }
    );
  }
}
