import * as z from "zod";

export const ZDeleteWorkPlanTemplateSchema = z.object({
  id: z.string({
    invalid_type_error: "ID must be a string",
    required_error: "ID is required",
  }),
});

export type TDeleteWorkPlanTemplateSchema = z.infer<
  typeof ZDeleteWorkPlanTemplateSchema
>;
