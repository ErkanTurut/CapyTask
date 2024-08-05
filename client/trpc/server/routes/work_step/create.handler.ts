import { z } from "zod";

export const ZCreateWorkStepSchema = z.object({
  name: z.string(),
  description: z.string(),
  parent_step_id: z.string().nullish(),
  step_order: z.number().nullish(),
});

export type TCreateWorkStepSchema = z.infer<typeof ZCreateWorkStepSchema>;
