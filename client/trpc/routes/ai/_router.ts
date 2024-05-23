import "server-only";

import { protectedProcedure, router } from "@/trpc/trpc";
import { z } from "zod";
import { streamText, generateText, tool } from "ai";
import { createMistral, mistral } from "@ai-sdk/mistral";

import MistralClient from "@mistralai/mistralai";
import fs from "fs";
import { weatherTool } from "./tool";

const promptText = fs.readFileSync("trpc/routes/ai/prompt.txt", "utf-8");

// const mistral = createMistral();
const ZMessagesSchema = z
  .object({
    role: z.enum(["user", "assistant"]),
    content: z.string(),
  })
  .array();

const ZPromptSchema = z.object({
  prompt: z.string(),
});

export type TPromptSchema = z.infer<typeof ZPromptSchema>;

export const ai = router({
  chat: protectedProcedure
    .input(ZPromptSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await generateText({
        model: mistral("mistral-large-latest"),
        maxTokens: 512,
        tools: {
          weather: weatherTool,
          cityAttractions: tool({
            parameters: z.object({ city: z.string() }),
          }),
        },
        prompt:
          "What is the weather in San Francisco and what attractions should I visit?",
      });

      // typed tool calls:
      for (const toolCall of result.toolCalls) {
        switch (toolCall.toolName) {
          case "cityAttractions": {
            toolCall.args.city; // string
            break;
          }

          case "weather": {
            toolCall.args.location; // string
            break;
          }
        }
      }

      // typed tool results for tools with execute method:
      for (const toolResult of result.toolResults) {
        switch (toolResult.toolName) {
          // NOT AVAILABLE (NO EXECUTE METHOD)
          // case 'cityAttractions': {
          //   toolResult.args.city; // string
          //   toolResult.result;
          //   break;
          // }

          case "weather": {
            toolResult.args.location; // string
            toolResult.result.location; // string
            toolResult.result.temperature; // number
            break;
          }
        }
      }
      console.log(JSON.stringify(result, null, 2));
    }),
});
//   const { text, toolResults } = await generateText({
//     model: mistral.chat("mistral-small-latest"),
//     tools: {
//       getWorkOrderDetail: tool({
//         description: "Get the detail of a work order by id",
//         parameters: z.object({
//           id: z
//             .string()
//             .describe("the id of the work order to get detail for"),
//         }),

//         execute: async ({ id }) => {
//           console.log("id", id);
//           const { data } = await ctx.db
//             .from("work_order")
//             .select("*, work_step_status(*, work_step(*)), asset(*)")
//             .eq("id", id)
//             .order("step_order", {
//               referencedTable: "work_step_status",
//             })
//             .single()
//             .throwOnError();

//           if (!data) {
//             ("sorry, i couldn't find any data for that id. Please try again.");
//           }

//           const { text } = await generateText({
//             model: mistral.chat("mistral-small-latest"),

//             system: promptText,
//             prompt: JSON.stringify(data),
//             maxTokens: 1000,
//           });

//           return text;

//           //   return data
//           //     ? data
//           //     : "sorry, i couldn't find any data for that id. Please try again.";
//         },
//       }),
//     },
//     prompt: input.prompt,
//     maxTokens: 1000,
//   });
//   return {
//     result: text || toolResults[0].result,
//   };
