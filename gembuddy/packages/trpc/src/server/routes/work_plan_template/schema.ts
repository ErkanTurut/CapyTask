import z from "zod";

export const ZGetWorkPlanTemplateByIdSchema = z.object({
  id: z.string(),
});

export type TGetWorkPlanTemplateByIdSchema = z.infer<
  typeof ZGetWorkPlanTemplateByIdSchema
>;

export const ZGetWorkPlanTemplateByWorkspaceSchema = z.object({
  workspace_id: z.string(),
  range: z.object({
    from: z.number(),
    to: z.number(),
  }),
});

export type TGetWorkPlanTemplateByWorkspaceSchema = z.infer<
  typeof ZGetWorkPlanTemplateByWorkspaceSchema
>;

export const ZCreateWorkPlanTemplateSchema = z.object({
  name: z.string(),
  workspace_id: z.string(),
  description: z.string().nullable(),
});

export type TCreateWorkPlanTemplateSchema = z.infer<
  typeof ZCreateWorkPlanTemplateSchema
>;

export const ZUpdateWorkPlanTemplateSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().nullable().optional(),
  })
  .merge(
    z.object({
      work_plan_template_id: z.string(),
    })
  );

export type TUpdateWorkPlanTemplateSchema = z.infer<
  typeof ZUpdateWorkPlanTemplateSchema
>;
