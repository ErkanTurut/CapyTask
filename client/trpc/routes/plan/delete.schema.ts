import * as z from "zod";

export const ZDeletePlanSchema = z.object({
  id: z
    .string({
      invalid_type_error: "Plan ID must be a string",
      required_error: "Plan ID is required",
    })
    .uuid({ message: "Plan ID must be a valid UUID" }),
});

export type TDeletePlanSchema = z.infer<typeof ZDeletePlanSchema>;
