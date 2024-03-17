import * as z from "zod";
import { TPlanSchema, ZPlanSchema } from "../plan/plan.schema";

export const ZCreateWorkOrderSchema = z.object({
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
  team_id: z
    .string({
      invalid_type_error: "Team ID must be a string",
      required_error: "Team ID is required",
    })
    .uuid({ message: "Team ID must be a valid UUID" }),
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
  plan_id: z
    .string({
      invalid_type_error: "Plan ID must be a string",
      required_error: "Plan ID is required",
    })
    .uuid({ message: "Plan ID must be a valid UUID" }),
  // work_plan: ZPlanSchema,
});

export type TCreateWorkOrderSchema = z.infer<typeof ZCreateWorkOrderSchema>;
