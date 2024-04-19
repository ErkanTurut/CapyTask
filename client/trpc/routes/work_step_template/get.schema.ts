import * as z from "zod";

export const ZGetWorkStepTemplateSchema = z.object({
  id: z.string({
    invalid_type_error: "Step ID must be a string",
    required_error: "Step ID is required",
  }),
  work_plan_template_id: z.string({
    invalid_type_error: "inspection ID must be a string",
    required_error: "inspection ID is required",
  }),
  team_identity: z
    .string({
      invalid_type_error: "Indentity must be a string",
      required_error: "Indentity is required",
    })
    .min(3, { message: "Indentity must be at least 3 characters long" })
    .max(5, { message: "Slug must be less than 5 characters long" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must be lowercase and contain no spaces",
    }),
  range: z.object({
    start: z.number().int().positive(),
    end: z.number().int().positive(),
  }),
  q: z.string(),
});

export type TGetWorkStepTemplateSchema = z.infer<
  typeof ZGetWorkStepTemplateSchema
>;
