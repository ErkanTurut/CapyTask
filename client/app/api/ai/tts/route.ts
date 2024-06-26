import {
  StreamingTextResponse,
  streamText,
  generateText,
  StreamData,
  CoreMessage,
  tool,
} from "ai";
import { openai } from "@ai-sdk/openai";

import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
// Define the TypeScript types as described above
enum ChatRole {
  SYSTEM = "system",
  USER = "user",
  ASSISTANT = "assistant",
  TOOL = "tool",
}

interface ChatImage {
  image: string | VideoFrame; // Assuming VideoFrame is defined elsewhere
  inference_width?: number | null; // Optional, can be null
  inference_height?: number | null; // Optional, can be null
  _cache?: Record<string, any>; // A dictionary to store any processed image data
}

interface ChatMessage {
  role: ChatRole;
  text: string;
  images?: ChatImage[]; // Optional array of ChatImage
}

interface ChatContext {
  messages: ChatMessage[];
}

export async function POST(req: Request) {
  const input = await req.json();

  // return NextResponse.json(
  //   {
  //     text: "Hello, I am a voice assistant created by Gembuddy. How can I help you today?",
  //   },
  //   { status: 200 },
  // );
  // const chatContext = (await req.json()) as string;
  // if (!chatContext || !Array.isArray(chatContext.messages)) {
  //   return NextResponse.json(
  //     { message: "Invalid messages format" },
  //     { status: 400 },
  //   );
  // }

  const { text, toolResults } = await generateText({
    model: openai("gpt-4-turbo"),
    maxAutomaticRoundtrips: 2,
    system:
      "You are a voice assistant created by Gembuddy. Your interface with users will be voice. Pretend we're having a conversation, no special formatting or headings, just natural speech.",
    messages: [
      {
        role: ChatRole.USER,
        content: input,
      },
    ],
    tools: {
      work_order_detail: {
        description: "Get work order details",
        parameters: z.object({
          workOrderName: z.string().describe("The Name of the work order"),
        }),
        execute: async ({ workOrderName }) => {
          const db = createClient(cookies());
          const { data: work_order } = await db
            .from("work_order")
            .select("*, work_step_status(*, work_step(*)), asset(*)")
            .textSearch("name", workOrderName, {
              type: "websearch",
            })
            .order("step_order", {
              referencedTable: "work_step_status",
            })
            .single();

          return work_order;
        },
      },
    },
  });

  // console.log(text);
  // console.log(toolResults);
  return NextResponse.json(
    {
      result: text,
    },
    { status: 200 },
  );
}
