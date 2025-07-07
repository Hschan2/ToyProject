import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    let errorMessage = "서버 오류: 번역에 실패했습니다.";

    if (error instanceof Error) {
      console.error("⚠️ 서버 프록시 에러:", error.message);
      errorMessage = error.message;
    } else {
      console.error("⚠️ 서버 프록시 에러:", error);
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
