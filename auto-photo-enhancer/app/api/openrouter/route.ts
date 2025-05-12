import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { OpenRouterResponse } from "@/types/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { brand, tone } = body;

    const prompt = `
      당신은 이미지 색감 보정 전문가입니다. pillter_, 5gilsu, picn2k의 사진 스타일을 참고하여, ${brand} 카메라의 ${tone}한 분위기의 사진을 만들고 싶습니다.
      CSS filter로 사용할 수 있도록 아래와 같은 JSON 형식으로 필터 조정값만 반환해주세요. 설명은 포함하지 마세요.

      예시.
      {
        brightness?: number;
        contrast?: number;
        saturation?: number;
        saturate?: number;
        grayscale?: number;
        sepia?: number;
        invert?: number;
        "hue-rotate"?: number;
        opacity?: number;
        blur?: number;
      }
    `;

    const response = await axios.post<OpenRouterResponse>(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          { role: "system", content: "이미지 필터 조정값 추천 AI입니다." },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "X-Title": "PhotoEditor",
        },
      }
    );

    const content = response.data.choices[0].message.content.trim();
    const jsonMatch = content.match(/\{[\s\S]*?\}/);

    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Invalid response format" },
        { status: 400 }
      );
    }

    return NextResponse.json(JSON.parse(jsonMatch[0]));
  } catch (err) {
    console.error("OpenRouter 호출 오류:", err);
    return NextResponse.json({ error: "API 호출 실패" }, { status: 500 });
  }
}
