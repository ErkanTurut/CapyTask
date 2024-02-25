import * as z from "zod";
export const ZUpdateStep = z.object({
  id: z
    .string({
      invalid_type_error: "Plan ID must be a string",
      required_error: "Plan ID is required",
    })
    .uuid({ message: "Plan ID must be a valid UUID" }),
  name: z
    .string({
      invalid_type_error: "Name must be a string",
      required_error: "Name is required",
    })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(100, { message: "Name must be less than 100 characters long" })
    .regex(/^[a-zA-Z0-9 ]+$/, {
      message: "Name must contain only letters, numbers and spaces",
    })
    .optional(),
  description: z
    .string()
    .max(500, {
      message: "Description must be less than 500 characters long",
    })
    .optional(),
  order: z.number().positive().nullish(),
});
