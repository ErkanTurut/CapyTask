import { z } from "zod";

export const ZGetUserSchema = z.object({
  id: z
    .string({
      invalid_type_error: "Workspace ID must be a string",
      required_error: "Workspace ID is required",
    })
    .uuid({ message: "Workspace ID must be a valid UUID" }),
});

export type TGetUserSchema = z.infer<typeof ZGetUserSchema>;
