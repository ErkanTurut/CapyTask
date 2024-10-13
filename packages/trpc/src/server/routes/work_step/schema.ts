import z from "zod";

export const ZCreateWorkStepSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  work_plan_id: z.string(),
  step_order: z.number().int().nonnegative(),
  parent_step_id: z.string().nullable().optional(),
});

export type TCreateWorkStepSchema = z.infer<typeof ZCreateWorkStepSchema>;

export const ZUpdateWorkStepSchema = z.object({
  work_step_id: z.string(),
  name: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  step_order: z.number().int().nonnegative().optional(),
  parent_step_id: z.string().nullable().optional(),
});

export type TUpdateWorkStepSchema = z.infer<typeof ZUpdateWorkStepSchema>;

export const ZGetWorkStepsByWorkPlanSchema = z.object({
  work_plan_id: z.string(),
});

export type TGetWorkStepsByWorkPlanSchema = z.infer<
  typeof ZGetWorkStepsByWorkPlanSchema
>;

export const ZGetWorkStepByIdSchema = z.object({
  id: z.string(),
});

export type TGetWorkStepByIdSchema = z.infer<typeof ZGetWorkStepByIdSchema>;
