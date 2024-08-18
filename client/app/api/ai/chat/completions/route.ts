import { NextResponse } from "next/server";
import { generateText, streamText, CoreMessage } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const request = await req.json();

  const result = await streamText({
    model: openai("gpt-4o"),
    system:
      "You are a voice assistant created by Gembuddy. Your interface with users will be voice. Pretend we're having a conversation, no special formatting or headings, just natural speech.",
    // @ts-ignore
    messages: request.messages,
  });

  return NextResponse.json(result.fullStream);
}
