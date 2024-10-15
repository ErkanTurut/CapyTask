"use server";

import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";
import { createClient } from "@gembuddy/supabase/server";

const recommendationReasonEnum = z.enum([
  "SKILL_MATCH",
  "AVAILABILITY",
  "EXPERIENCE",
  "LOCATION",
  "PERFORMANCE",
]);

const aiRecommendationSchema = z.object({
  service_resource_id: z.string().describe("The id of the service resource"),
  score: z.number().describe("The score of the recommendation from 0 to 100"),
  reasons: z
    .array(recommendationReasonEnum)
    .describe(
      "The reasons why the recommendation was made. Max 3 reasons. The reasons should be a list of strings.",
    ),
  insight: z.string().describe("The insight of the recommendation"),
});

type AIRecommendation = z.infer<typeof aiRecommendationSchema>;

export async function generate(input: string) {
  "use server";
  const db = createClient();
  const { data, error } = await db
    .from("service_resource")
    .select("*, assigned_resource(*, service_appointment(*))")
    .gt("assigned_resource.service_appointment.start_date", "2024-06-01")
    .lt("assigned_resource.service_appointment.end_date", "2024-06-30");
  console.log(data);
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4o-2024-08-06", {
        structuredOutputs: true,
      }),
      system:
        "From a list of service resources, recommend the most suitable one for the given service appointment. ",
      prompt: `${data
        ?.map((service_resource) => JSON.stringify(service_resource))
        .join(", ")}`,
      schema: z.object({
        recommendations: aiRecommendationSchema.array(),
      }),
      temperature: 0.2,
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { object: stream.value };
}
