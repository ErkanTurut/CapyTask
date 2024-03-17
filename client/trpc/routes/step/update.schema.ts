import { Database } from "@/types/supabase.types";
import * as z from "zod";
export const ZUpdateStepSchema = z.object({
  id: z
    .string({
      invalid_type_error: "Step ID must be a string",
      required_error: "Step ID is required",
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
  order: z.number().nonnegative().nullish(),
  plan_id: z.string(),
  parent_step_id: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  created_by_id: z.string().nullable(),
});
export type TUpdateStepSchema = z.infer<typeof ZUpdateStepSchema>;
