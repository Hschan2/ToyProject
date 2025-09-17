import { NextRequest, NextResponse } from "next/server";
import { generateOpenRouterPrompt } from "@/utils/prompts";
import { OpenRouterResponse, OpenRouterRequestBody } from "@/types/api";

export async function POST(req: NextRequest) {
  try {
    const body: OpenRouterRequestBody = await req.json();
    const { brand, tone } = body;

    if (!brand || !tone) {
      return NextResponse.json(
        { error: "'brand' and 'tone' are required" },
        { status: 400 }
      );
    }

    const prompt = generateOpenRouterPrompt(brand, tone);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "X-Title": "Auto Photo Enhancer", // Or a project-specific title
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          { role: "system", content: "You are an AI that recommends image filter adjustment values." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API Error:", errorText);
      return NextResponse.json(
        { error: `API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data: OpenRouterResponse = await response.json();
    const content = data.choices[0].message.content.trim();
    const jsonMatch = content.match(/\{[\s\S]*?\}/);

    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Invalid response format from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json(JSON.parse(jsonMatch[0]));
  } catch (err: unknown) {
    console.error("Error in OpenRouter route:", err);
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    return NextResponse.json({ error: "Internal Server Error", details: errorMessage }, { status: 500 });
  }
}
