import * as z from "zod";

export const ZCreateWorkStepTemplateSchema = z.object({
  name: z.string().min(3).max(100),
  work_plan_template_id: z.string(),
  description: z.string().optional(),
  parent_id: z.string().nullish(),
  order: z.number().nullish(),
});

export type TCreateWorkStepTemplateSchema = z.infer<
  typeof ZCreateWorkStepTemplateSchema
>;
