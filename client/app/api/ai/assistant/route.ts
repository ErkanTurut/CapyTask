import { unstable_after as after, NextResponse } from "next/server";

export async function POST(req: Request) {
  return NextResponse.json({
    result: "Hello World",
  });
}
// import { generateText } from "ai";

// import { createClient, Database } from "@/lib/supabase/server";
// import { sleep } from "@/lib/utils";
// import {
//   createWorkOrderHandler,
//   createWorkOrderStepsHandler,
//   createWorkPlanHandler
// } from "@/trpc/server/routes/work_order/create.handler";
// import {
//   TCreateWorkOrderWithStepsSchema,
//   ZCreateWorkOrderWithStepsSchema,
// } from "@/trpc/server/routes/work_order/create.schema";
// import { openai } from "@ai-sdk/openai";
// import type { Session } from "@supabase/supabase-js";
// import { cookies } from "next/headers";
// import { unstable_after as after, NextResponse } from "next/server";
// import { z } from "zod";

// export const maxDuration = 15;

// enum ChatRole {
//   SYSTEM = "system",
//   USER = "user",
//   ASSISTANT = "assistant",
//   TOOL = "tool",
// }

// interface ChatImage {
//   image: string | VideoFrame; // Assuming VideoFrame is defined elsewhere
//   inference_width?: number | null; // Optional, can be null
//   inference_height?: number | null; // Optional, can be null
//   _cache?: Record<string, any>; // A dictionary to store any processed image data
// }

// interface ChatMessage {
//   role: ChatRole;
//   text: string;
//   images?: ChatImage[]; // Optional array of ChatImage
// }

// interface ChatContext {
//   messages: ChatMessage[];
// }

// const ChatMessage = z.object({
//   role: z.nativeEnum(ChatRole),
//   text: z.string({ description: "The text of the message" }),
//   images: z
//     .array(
//       z.object({
//         image: z.string(),
//         inference_width: z.number().nullable(),
//         inference_height: z.number().nullable(),
//         _cache: z.record(z.any()).nullable(),
//       }),
//     )
//     .nullish(),
// });

// const ChatContext = z.object({
//   messages: z.array(ChatMessage),
// });

// export type TChatMessage = z.infer<typeof ChatMessage>;
// export type TChatContext = z.infer<typeof ChatContext>;

// export async function POST(req: Request) {
//   // First define
//   const startTime = process.hrtime();

//   const db = createClient(cookies());
//   // const {
//   //   data: { session },
//   // } = await db.auth.getSession();
//   const livekit_session = JSON.parse(
//     cookies().get("livekit_session")?.value || "{}",
//   ) as {
//     session: Session;
//     company: Database["public"]["Tables"]["company"]["Row"];
//   };
//   await db.auth.setSession(livekit_session.session);
//   const chatContext = ChatContext.parse(await req.json());

//   console.log(livekit_session.company);
//   console.log(chatContext.messages);

//   const { text, responseMessages, toolCalls } = await generateText({
//     model: openai("gpt-4o"),
//     maxToolRoundtrips: 10,
//     temperature: 1,
//     system: `\
//       You are a voice assistant created by Gembuddy, you are inside a field service application.
//       You help customers with their assets, providing support for troubleshooting, maintenance, and work order information.
//       Communicate as if you are having a natural, spoken conversation.
//       Use clear and conversational language without any special formatting , headings or asterisk.
//       Prioritize ease of understanding and smooth interaction.
//       For example: If a user asks about the status of a work order, respond with: 'Your work order is in progress and should be completed by tomorrow afternoon.'
//       If a user requests maintenance, respond with: 'Sure, I can help with that. Can you please provide the asset number and describe the issue?'
//       If a user has an issue with an asset, respond with: 'Let's start by identifying the problem. Can you tell me what issue you are experiencing with the asset?'
//       If the user doesn't provide enough information, ask for clarification.
//       If the user doesn't have the asset number, ask for the location of the asset.
//       If there is more than one location, ask for the specific location.
//       If a user needs troubleshooting assistance, respond with: 'Let's start by identifying the problem. Can you tell me what issue you are experiencing with the asset?',
//     `,
//     // @ts-ignore

//     messages: [
//       {
//         role: "system",
//         content: `\
//       You are a voice assistant created by Gembuddy, you are inside a field service application.
//       You help customers with their assets, providing support for troubleshooting, maintenance, and work order information.
//       Communicate as if you are having a natural, spoken conversation.
//       Use clear and conversational language without any special formatting , headings or asterisk.
//       Prioritize ease of understanding and smooth interaction.
//       For example: If a user asks about the status of a work order, respond with: 'Your work order is in progress and should be completed by tomorrow afternoon.'
//       If a user requests maintenance, respond with: 'Sure, I can help with that. Can you please provide the asset number and describe the issue?'
//       If a user has an issue with an asset, respond with: 'Let's start by identifying the problem. Can you tell me what issue you are experiencing with the asset?'
//       If the user doesn't provide enough information, ask for clarification.
//       If the user doesn't have the asset number, ask for the location of the asset.
//       If there is more than one location, ask for the specific location.
//       If a user needs troubleshooting assistance, respond with: 'Let's start by identifying the problem. Can you tell me what issue you are experiencing with the asset?',
//       Do not use public_id when you do a query, use the id field instead.
//     `,
//       },
//       // @ts-ignore
//       ...chatContext.messages.map((message) => {
//         return {
//           role: message.role,
//           content: [JSON.parse(message.text)],
//         };
//       }),
//     ],

//     tools: {
//       work_order_detail: {
//         description: "Get work order details",
//         parameters: z.object({
//           workOrderName: z.string().describe("The Name of the work order"),
//         }),
//         execute: async ({ workOrderName }) => {
//           if (!livekit_session.session) {
//             return "You are not logged in";
//           }
//           const { data: work_order } = await db
//             .from("work_order")
//             .select("*, work_step_item(*, work_step(*)), asset(*)")
//             .textSearch("name", workOrderName, {
//               type: "websearch",
//             })
//             .order("step_order", {
//               referencedTable: "work_step_item",
//             });

//           return work_order;
//         },
//       },
//       get_user_company: {
//         description: "Get user company",
//         parameters: z.object({}),
//         execute: async () => {
//           // if (!livekit_session.session) {
//           //   return "You are not logged in";
//           // }
//           // const { data: company } = await db
//           //   .from("company")
//           //   .select("*, company_user(user_id)")
//           //   .eq("company_user.user_id", livekit_session.session.user.id);
//           await sleep(100);
//           return livekit_session.company;
//         },
//       },
//       get_company_locations: {
//         description: "Get user location",
//         parameters: z.object({
//           company_id: z.string().describe("The ID of the company"),
//         }),
//         execute: async (input: { company_id: string }) => {
//           const { data: location } = await db
//             .from("location")
//             .select("*, location(*, location(*))")
//             .is("parent_location_id", null)
//             .eq("company_id", input.company_id);
//           return location;
//         },
//       },
//       get_location_assets: {
//         description: "Get location assets",
//         parameters: z.object({
//           location_id: z.string().describe("The ID of the locations").array(),
//         }),
//         execute: async (input: { location_id: string[] }) => {
//           const { data: asset } = await db
//             .from("asset")
//             .select("*")
//             .in("location_id", input.location_id);

//           return asset;
//         },
//       },
//       create_work_order: {
//         description:
//           "create work order with steps, ask for confirmation before doing it",
//         parameters: ZCreateWorkOrderWithStepsSchema.omit({
//           team_id: true,
//           company_id: true,
//         }),
//         execute: async (input: TCreateWorkOrderWithStepsSchema) => {
//           const { data: work_order, error: work_order_error } =
//             await createWorkOrderHandler({
//               db,
//               input: {
//                 company_id: livekit_session.company.id,
//                 description: input.description,
//                 location_id: input.location_id,
//                 name: input.name,
//                 source: input.source,
//                 team_id: "4pGki9KGYX",
//                 type: input.type,
//                 requested_by_id: livekit_session.session.user.id,
//               },
//             });

//           if (!work_order || work_order_error) {
//             return "Failed to create work order";
//           }

//           after(async () => {
//             const { data: work_plan, error: work_plan_error } =
//               await createWorkPlanHandler({
//                 db,
//                 input: {
//                   name: input.name,
//                   description: input.description,
//                   team_id: "4pGki9KGYX",
//                 },
//               });
//             if (!work_plan || work_plan_error) {
//               return "Failed to create work plan";
//             }

//             await db
//               .from("work_order")
//               .update({ work_plan_id: work_plan.id })
//               .eq("id", work_order.id);

//             await createWorkOrderStepsHandler({
//               db,
//               input: {
//                 work_order: {
//                   id: work_order.id,
//                   work_plan_id: work_plan.id,
//                 },
//                 asset: input.asset,
//                 work_step: input.work_step,
//               },
//             });
//           });

//           return { work_order };
//         },
//       },
//     },
//   });
//   responseMessages.forEach(async (message) => {
//     if (message.role === "assistant") {
//       if (Array.isArray(message.content)) {
//         message.content.forEach((content) => {
//           chatContext.messages.push(
//             ChatMessage.parse({
//               role: ChatRole.ASSISTANT,
//               text: JSON.stringify(content),
//             }),
//           );
//         });
//       } else {
//         chatContext.messages.push(
//           ChatMessage.parse({
//             role: ChatRole.ASSISTANT,
//             text:
//               typeof message.content === "string"
//                 ? message.content
//                 : JSON.stringify(message.content),
//           }),
//         );
//       }
//     } else if (message.role === "tool") {
//       if (Array.isArray(message.content)) {
//         message.content.forEach((content) => {
//           chatContext.messages.push(
//             ChatMessage.parse({
//               role: ChatRole.TOOL,
//               text: JSON.stringify(content),
//             }),
//           );
//         });
//       } else {
//         chatContext.messages.push(
//           ChatMessage.parse({
//             role: ChatRole.TOOL,
//             text:
//               typeof message.content === "string"
//                 ? message.content
//                 : JSON.stringify(message.content),
//           }),
//         );
//       }
//     }
//   });

//   // To start it:
//   const elapsed = process.hrtime(startTime);

//   // To end it:
//   const responseTimeInMs = elapsed[0] * 1000 + elapsed[1] / 1000000;
//   console.log("Response Time:", responseTimeInMs, "ms");

//   return NextResponse.json(
//     {
//       result: {
//         chatContext: ChatContext.parse({
//           messages: [...chatContext.messages],
//         }),
//         ...ChatContext.parse({
//           messages: [
//             ChatMessage.parse({
//               role: ChatRole.ASSISTANT,
//               text,
//               images: [],
//             }),
//           ],
//         }),
//       },
//     },
//     { status: 200 },
//   );
// }
