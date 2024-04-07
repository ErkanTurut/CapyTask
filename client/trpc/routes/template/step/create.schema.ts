import * as z from "zod";

export const ZCreateStepSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
      required_error: "Name is required",
    })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(100, { message: "Name must be less than 100 characters long" })
    .regex(/^[a-zA-Z0-9 ]+$/, {
      message: "Name must contain only letters, numbers and spaces",
    }),
  inspection_template_id: z.string({
    invalid_type_error: "Inspection template ID must be a string",
    required_error: "Inspection template  is required",
  }),
  description: z
    .string({
      invalid_type_error: "Description must be a string",
      required_error: "Description is required",
    })
    .min(3, { message: "Description must be at least 3 characters long" })
    .max(1000, {
      message: "Description must be less than 1000 characters long",
    })
    .optional(),
  parent_id: z
    .string({
      invalid_type_error: "Parent ID must be a string",
      required_error: "Parent ID is required",
    })
    .optional(),
  order: z
    .number({
      invalid_type_error: "Order must be a number",
      required_error: "Order is required",
    })
    .optional(),
});

export type TCreateStepSchema = z.infer<typeof ZCreateStepSchema>;
