import { NextRequest, NextResponse } from "next/server";
import { ChatPayloadSchema } from "@/lib/ai/schema";

// Optional OpenAI client (installed via `npm i openai`)
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = ChatPayloadSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const provider = process.env.LLM_PROVIDER || "openai";

    if (provider === "openai") {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        return NextResponse.json(
          { error: "Missing OPENAI_API_KEY" },
          { status: 500 }
        );
      }
      const client = new OpenAI({ apiKey });
      const completion = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.2,
        messages: parsed.data.messages,
      });
      const content = completion.choices?.[0]?.message?.content ?? "";
      return NextResponse.json({ role: "assistant", content });
    }

    // Fallback: no provider configured → echo
    const fallback = parsed.data.messages.at(-1)?.content ?? "Hello!";
    return NextResponse.json({ role: "assistant", content: `You said: ${fallback}` });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
