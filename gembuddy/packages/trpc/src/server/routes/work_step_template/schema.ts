import * as z from "zod";

export const ZGetWorkStepTemplateByIdSchema = z.object({
  id: z.string(),
});

export const ZGetWorkStepTemplatesByWorkPlanTemplateSchema = z.object({
  work_plan_template_id: z.string(),
});

export const ZCreateWorkStepTemplateSchema = z.object({
  name: z.string().min(3).max(100),
  work_plan_template_id: z.string(),
  description: z.string().optional(),
  parent_id: z.string().nullish(),
  order: z.number().nullish(),
});

export const ZUpdateWorkStepTemplateSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(100).optional(),
  description: z.string().optional(),
});

export const ZDeleteWorkStepTemplateSchema = z.object({
  work_step_template_id: z.string().array(),
});

export const ZUpsertWorkStepTemplateSchema = z.object({
  work_step_template: z
    .object({
      id: z.string(),
      public_id: z.string(),
      name: z.string().min(3).max(100),
      description: z.string().nullable(),
      step_order: z.number().nullable(),
      work_plan_template_id: z.string(),
      parent_step_id: z.string().nullable(),
      created_at: z.string(),
      updated_at: z.string(),
      created_by_id: z.string().nullable(),
    })
    .array(),
});

export type TGetWorkStepTemplateByIdSchema = z.infer<
  typeof ZGetWorkStepTemplateByIdSchema
>;
export type TCreateWorkStepTemplateSchema = z.infer<
  typeof ZCreateWorkStepTemplateSchema
>;
export type TUpdateWorkStepTemplateSchema = z.infer<
  typeof ZUpdateWorkStepTemplateSchema
>;
export type TDeleteWorkStepTemplateSchema = z.infer<
  typeof ZDeleteWorkStepTemplateSchema
>;
export type TUpsertWorkStepTemplateSchema = z.infer<
  typeof ZUpsertWorkStepTemplateSchema
>;

export type TGetWorkStepTemplatesByWorkPlanTemplateSchema = z.infer<
  typeof ZGetWorkStepTemplatesByWorkPlanTemplateSchema
>;
