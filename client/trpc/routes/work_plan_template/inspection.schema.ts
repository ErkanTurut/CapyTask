import * as z from "zod";

export const ZWorkPlanTemplateSchema = z.object({
  id: z.string({
    invalid_type_error: "Work plan template ID must be a string",
    required_error: "inspection ID is required",
  }),
  name: z.string({
    invalid_type_error: "Name must be a string",
    required_error: "Name is required",
  }),
  description: z
    .string({
      invalid_type_error: "Description must be a string",
      required_error: "Description is required",
    })
    .optional(),
  created_at: z.string({
    invalid_type_error: "Created at must be a string",
    required_error: "Created at is required",
  }),
  updated_at: z.string({
    invalid_type_error: "Updated at must be a string",
    required_error: "Updated at is required",
  }),
  team_id: z.string({
    invalid_type_error: "Team ID must be a string",
    required_error: "Team ID is required",
  }),
});

export type TWorkPlanTemplateSchema = z.infer<typeof ZWorkPlanTemplateSchema>;
