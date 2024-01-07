import * as z from "zod";

export const ZCreateTeam = z.object({
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
  workspace_id: z
    .string({
      invalid_type_error: "Workspace ID must be a string",
      required_error: "Workspace ID is required",
    })
    .uuid({ message: "Workspace ID must be a valid UUID" }),
  indentity: z
    .string({
      invalid_type_error: "Indentity must be a string",
      required_error: "Indentity is required",
    })
    .min(3, { message: "Indentity must be at least 3 characters long" })
    .max(5, { message: "Indentity must be less than 5 characters long" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Indentity must contain only letters and numbers",
    }),
});
