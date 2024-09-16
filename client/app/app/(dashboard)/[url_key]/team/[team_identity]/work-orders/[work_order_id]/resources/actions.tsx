"use server";

import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";

export async function generate(input: string) {
  "use server";

  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4o"),
      system:
        "you help managers by suggesting the service resources that are best suited to this work order.",
      prompt: input,

      schema: z.object({
        notifications: z.array(
          z.object({
            id: z.string().describe("id of the service resource"),
            order: z
              .number()
              .describe("the order of preference of the service resource"),
            tags: z
              .array(z.string())
              .describe(
                "small tags of the service resource that explain why it is a good fit",
              ),

            earliest_available_time: z
              .array(
                z.object({
                  from: z.string().describe("start time of the time slot"),
                  to: z.string().describe("end time of the time slot"),
                }),
              )
              .describe("available time slots of the service resource"),
          }),
        ),
      }),
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { object: stream.value };
}
