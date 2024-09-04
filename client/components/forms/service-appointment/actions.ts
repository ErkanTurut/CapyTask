"use server";

import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const recommendationReasonEnum = z.enum([
  "SKILL_MATCH",
  "AVAILABILITY",
  "EXPERIENCE",
  "LOCATION",
  "PERFORMANCE",
]);

const aiRecommendationSchema = z.object({
  service_resource_id: z.string(),
  score: z.number().min(0).max(100),
  reasons: z.array(recommendationReasonEnum).max(3),
  insight: z.string(),
});

type AIRecommendation = z.infer<typeof aiRecommendationSchema>;

export async function generate(input: any) {
  "use server";
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4o-mini"),
      system: "You generate three recommendations for a service resource.",
      prompt: JSON.stringify(input.service_resource?.toString()),
      schema: aiRecommendationSchema.array().max(3),
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { object: stream.value };
}
