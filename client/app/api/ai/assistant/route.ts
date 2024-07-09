import { generateText, streamText, CoreMessage } from "ai";

import { openai, createOpenAI } from "@ai-sdk/openai";

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
import { sleep } from "@/lib/utils";

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
  // First define
  const startTime = process.hrtime();

  const db = createClient(cookies());
  // const {
  //   data: { session },
  // } = await db.auth.getSession();
  const session = JSON.parse(cookies().get("user_session")?.value || "{}")
    .session as Session;
  await db.auth.setSession(session);
  const chatContext = ChatContext.parse(await req.json());

  console.log(chatContext.messages);

  const { text, responseMessages, toolCalls } = await generateText({
    model: openai("gpt-4o"),
    maxToolRoundtrips: 5,

    system: `\
      You are a voice assistant created by Gembuddy, you are inside a field service application. 
      You help customers with their assets, providing support for troubleshooting, maintenance, and work order information. 
      Communicate as if you are having a natural, spoken conversation. 
      Use clear and conversational language without any special formatting , headings or asterisk. 
      Prioritize ease of understanding and smooth interaction. 
      For example: If a user asks about the status of a work order, respond with: 'Your work order is in progress and should be completed by tomorrow afternoon.' 
      If a user requests maintenance, respond with: 'Sure, I can help with that. Can you please provide the asset number and describe the issue?' 
      If a user has an issue with an asset, respond with: 'Let's start by identifying the problem. Can you tell me what issue you are experiencing with the asset?'
      If a user needs troubleshooting assistance, respond with: 'Let's start by identifying the problem. Can you tell me what issue you are experiencing with the asset?',
    `,

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
            .select("*, location(*, location(*))")
            .is("parent_location_id", null)
            .eq("company_id", input.company_id);
          return location;
        },
      },
      get_location_assets: {
        description: "Get location assets",
        parameters: z.object({
          location_id: z.string().describe("The ID of the locations").array(),
        }),
        execute: async (input: { location_id: string[] }) => {
          const { data: asset } = await db
            .from("asset")
            .select("*")
            .in("location_id", input.location_id);

          return asset;
        },
      },
      get_team: {
        description: "Get team for the related user",
        parameters: z.object({}),
        execute: async (input: { team_id: string }) => {
          await sleep(1000);
          return "4pGki9KGYX";
        },
      },
      create_work_order: {
        description:
          "create work order with steps, ask for confirmation before doing it",
        parameters: ZCreateWorkOrderWithStepsSchema,
        execute: async (input: TCreateWorkOrderWithStepsSchema) => {
          return await createWorkOrderWithStepsHandler({
            input: {
              ...input,
              requested_by_id: session.user.id,
            },
            db,
          });
        },
      },
    },
  });
  responseMessages.forEach(async (message) => {
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

  // To start it:
  const elapsed = process.hrtime(startTime);

  // To end it:
  const responseTimeInMs = elapsed[0] * 1000 + elapsed[1] / 1000000;
  console.log("Response Time:", responseTimeInMs, "ms");

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
