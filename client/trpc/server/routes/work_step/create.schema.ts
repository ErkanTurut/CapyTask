import { z } from "zod";

export const ZCreateWorkStepSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  parent_step_id: z.string().optional(),
  step_order: z.number().optional(),
  work_plan_id: z.string(),
  work_step_template_id: z.string().optional(),
  asset_id: z.string().array().optional(),
});

export type TCreateWorkStepSchema = z.infer<typeof ZCreateWorkStepSchema>;
