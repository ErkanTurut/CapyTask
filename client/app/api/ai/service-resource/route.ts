import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { z } from "zod";
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();
  console.log(context);
  const serviceResourceSchema = z.object({
    recommendations: z.array(
      z.object({
        first_name: z.string(),
        last_name: z.string(),
        id: z.string(),
        is_active: z.boolean(),
        availableSlots: z.array(
          z.object({
            start: z.string(),
            end: z.string(),
          }),
        ),
      }),
    ),
  });
  const result = await streamObject({
    model: openai("gpt-4o-mini-2024-07-18"),
    schema: serviceResourceSchema,
    prompt:
      `extract maximum 3 service resource recommandations from the following data based on availability, then regenrate 1 hour available slots that service resource can do :` +
      context,
  });

  return result.toTextStreamResponse();
}
