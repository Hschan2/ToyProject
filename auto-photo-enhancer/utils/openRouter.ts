import axios from "axios";
import { OpenRouterResponse } from "@/types/api";

export const generatePrompt = (brand: string, tone: string) => `
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

export const callOpenRouterAPI = async (brand: string, tone: string) => {
  const prompt = generatePrompt(brand, tone);
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
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "X-Title": "PhotoEditor",
      },
    }
  );

  const jsonString = response.data.choices[0].message.content.trim();
  const jsonMatch = jsonString.match(/\{[\s\S]*?\}/);

  if (!jsonMatch) {
    console.error("응답에서 JSON을 찾을 수 없습니다:", jsonString);
    throw new Error("JSON 응답이 없습니다");
  }

  try {
    return JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.error("JSON 파싱 오류:", e, "\n원본 응답:", jsonMatch[0]);
    throw e;
  }
};
