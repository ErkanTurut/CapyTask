import * as z from "zod";

export const ZInspectionSchema = z.object({
  id: z
    .string({
      invalid_type_error: "inspection ID must be a string",
      required_error: "inspection ID is required",
    })
    .uuid({ message: "inspection ID must be a valid UUID" }),
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
  team_id: z
    .string({
      invalid_type_error: "Team ID must be a string",
      required_error: "Team ID is required",
    })
    .uuid({ message: "Team ID must be a valid UUID" }),
});

export type TInspectionSchema = z.infer<typeof ZInspectionSchema>;
