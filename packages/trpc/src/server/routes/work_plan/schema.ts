import z from "zod";

export const ZGetWorkPlanTemplatesByWorkspaceSchema = z.object({
  range: z.object({
    from: z.number(),
    to: z.number(),
  }),
  workspace_id: z.string(),
});

export type TGetWorkPlanTemplatesByWorkspaceSchema = z.infer<
  typeof ZGetWorkPlanTemplatesByWorkspaceSchema
>;
