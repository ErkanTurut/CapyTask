import * as z from "zod";

export const ZGetWorkPlanTemplateSchema = z.object({
  id: z.string({
    invalid_type_error: "Work Plan Template ID must be a string",
    required_error: "Work Plan Template  ID is required",
  }),
  public_id: z
    .string({
      invalid_type_error: "Work Plan Template  ID must be a string",
      required_error: "Work Plan Template  ID is required",
    })
    .uuid({ message: "Work Plan Template  ID must be a valid UUID" }),
  url_key: z.string(),

  range: z.object({
    start: z.number().int().nonnegative(),
    end: z.number().int().positive(),
  }),
  q: z.string(),
});

export type TGetWorkPlanTemplateSchema = z.infer<
  typeof ZGetWorkPlanTemplateSchema
>;
