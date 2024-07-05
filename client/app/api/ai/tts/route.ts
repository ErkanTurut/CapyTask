import { generateText, streamText, CoreMessage } from "ai";

import { openai } from "@ai-sdk/openai";

import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import type { Session, PostgrestResponse } from "@supabase/supabase-js";
import {
  TCreateWorkOrderWithStepsSchema,
  ZCreateWorkOrderWithStepsSchema,
} from "@/trpc/routes/work_order/create.schema";
import { createWorkOrderWithStepsHandler } from "@/trpc/routes/work_order/create.handler";

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

const ChatMessage = z.object({
  role: z.nativeEnum(ChatRole),
  text: z.string({ description: "The text of the message" }),
  images: z
    .array(
      z.object({
        image: z.string(),
        inference_width: z.number().nullable(),
        inference_height: z.number().nullable(),
        _cache: z.record(z.any()).nullable(),
      }),
    )
    .nullish(),
});

const ChatContext = z.object({
  messages: z.array(ChatMessage),
});

export type TChatMessage = z.infer<typeof ChatMessage>;
export type TChatContext = z.infer<typeof ChatContext>;

export async function POST(req: Request) {
  const db = createClient(cookies());
  // const {
  //   data: { session },
  // } = await db.auth.getSession();
  const session = JSON.parse(cookies().get("user_session")?.value || "{}")
    .session as Session;
  await db.auth.setSession(session);
  const chatContext = ChatContext.parse(await req.json());

  chatContext.messages.forEach((message) => {
    console.log(message, ",");
  });

  const { text, responseMessages } = await generateText({
    model: openai("gpt-4-turbo"),
    maxToolRoundtrips: 10,
    system:
      "You are a voice assistant created by Gembuddy. Your interface with users will be voice. Pretend we're having a conversation, no special formatting or headings, just natural speech.",

    // @ts-ignore
    messages: chatContext.messages.map((message) => {
      return {
        role: message.role,
        content: [JSON.parse(message.text)],
      };
    }),
    tools: {
      work_order_detail: {
        description: "Get work order details",
        parameters: z.object({
          workOrderName: z.string().describe("The Name of the work order"),
        }),
        execute: async ({ workOrderName }) => {
          if (!session) {
            return "You are not logged in";
          }
          const { data: work_order } = await db
            .from("work_order")
            .select("*, work_step_status(*, work_step(*)), asset(*)")
            .textSearch("name", workOrderName, {
              type: "websearch",
            })
            .order("step_order", {
              referencedTable: "work_step_status",
            });

          return work_order;
        },
      },
      get_user_company: {
        description: "Get user company",
        parameters: z.object({}),
        execute: async () => {
          if (!session) {
            return "You are not logged in";
          }
          const { data: company } = await db
            .from("company")
            .select("*, company_user(user_id)")
            .eq("company_user.user_id", session.user.id);

          return company;
        },
      },
      get_company_locations: {
        description: "Get user location",
        parameters: z.object({
          company_id: z.string().describe("The ID of the company"),
        }),
        execute: async (input: { company_id: string }) => {
          const { data: location } = await db
            .from("location")
            .select("*")
            .eq("company_id", input.company_id);

          return location;
        },
      },
      get_location_assets: {
        description: "Get location assets",
        parameters: z.object({
          location_id: z.string().describe("The ID of the location"),
        }),
        execute: async (input: { location_id: string }) => {
          const { data: asset } = await db
            .from("asset")
            .select("*")
            .eq("location_id", input.location_id);
          return asset;
        },
      },
      get_team: {
        description: "Get team for the related user",
        parameters: z.object({}),
        execute: async (input: { team_id: string }) => {
          return "4pGki9KGYX";
        },
      },
      create_work_order: {
        description: "create work order with steps",
        parameters: ZCreateWorkOrderWithStepsSchema,
        execute: async (input: TCreateWorkOrderWithStepsSchema) => {
          return await createWorkOrderWithStepsHandler({
            input,
            db,
          });
        },
      },
    },
  });

  responseMessages.forEach((message) => {
    if (message.role === "assistant") {
      if (Array.isArray(message.content)) {
        message.content.forEach((content) => {
          chatContext.messages.push(
            ChatMessage.parse({
              role: ChatRole.ASSISTANT,
              text: JSON.stringify(content),
            }),
          );
        });
      } else {
        chatContext.messages.push(
          ChatMessage.parse({
            role: ChatRole.ASSISTANT,
            text:
              typeof message.content === "string"
                ? message.content
                : JSON.stringify(message.content),
          }),
        );
      }
    } else if (message.role === "tool") {
      if (Array.isArray(message.content)) {
        message.content.forEach((content) => {
          chatContext.messages.push(
            ChatMessage.parse({
              role: ChatRole.TOOL,
              text: JSON.stringify(content),
            }),
          );
        });
      } else {
        chatContext.messages.push(
          ChatMessage.parse({
            role: ChatRole.TOOL,
            text:
              typeof message.content === "string"
                ? message.content
                : JSON.stringify(message.content),
          }),
        );
      }
    }
  });

  return NextResponse.json(
    {
      result: {
        chatContext: ChatContext.parse({
          messages: [...chatContext.messages],
        }),
        ...ChatContext.parse({
          messages: [
            ChatMessage.parse({
              role: ChatRole.ASSISTANT,
              text,
              images: [],
            }),
          ],
        }),
      },
    },
    { status: 200 },
  );
}
