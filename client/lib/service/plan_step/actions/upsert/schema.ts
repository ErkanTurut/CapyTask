import * as z from "zod";
export const ZUpsertPlanStep = z
  .object({
    id: z
      .string({
        invalid_type_error: "ID must be a string",
        required_error: "ID is required",
      })
      .uuid({ message: "ID must be a valid UUID" }),
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
    order: z.number().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .array();

// id: z.string(),
// name: z
//   .string({
//     invalid_type_error: "Name must be a string",
//     required_error: "Name is required",
//   })
//   .min(3, { message: "Name must be at least 3 characters long" })
//   .max(100, { message: "Name must be less than 100 characters long" })
//   .regex(/^[a-zA-Z0-9 ]+$/, {
//     message: "Name must contain only letters, numbers and spaces",
//   }),
// description: z
//   .string()
//   .max(500, {
//     message: "Description must be less than 500 characters long",
//   })
//   .nullable(),
// order: z.number().nullable(),
// plan_id: z.string(),
// parent_step_id: z.string().nullable(),
// created_at: z.string(),
// updated_at: z.string(),
// created_by_id: z.string().nullable(),
