import { z } from "zod";

export const ZAccountUpdate = z.object({
  first_name: z
    .string({
      invalid_type_error: "First name must be a string",
      required_error: "First name is required",
    })
    .optional(),
  last_name: z
    .string({
      invalid_type_error: "Last name must be a string",
      required_error: "Last name is required",
    })
    .optional(),
  email: z
    .string({
      invalid_type_error: "Email must be a string",
      required_error: "Email is required",
    })
    .email({ message: "Please enter a valid email address" }),
});
