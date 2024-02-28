import * as z from "zod";

export const ZInsertPlanStep = z.object({
  plan_id: z
    .string({
      invalid_type_error: "Plan ID must be a string",
      required_error: "Plan ID is required",
    })
    .uuid({ message: "Plan ID must be a valid UUID" }),
  step_id: z
    .string({
      invalid_type_error: "Step ID must be a string",
      required_error: "Step ID is required",
    })
    .uuid({ message: "Step ID must be a valid UUID" }),
  order: z
    .number({
      invalid_type_error: "Order must be a number",
      required_error: "Order is required",
    })
    .int({ message: "Order must be an integer" })
    .positive({
      message: "Order must be a positive number",
    })
    .nullable(),
});
