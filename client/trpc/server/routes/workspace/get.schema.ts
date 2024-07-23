import * as z from "zod";

export const ZGetWorkspaceSchema = z.object({
  url_key: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must be lowercase and contain no spaces",
    })
    .toLowerCase(),
  user_id: z
    .string({
      invalid_type_error: "User ID must be a string",
      required_error: "User ID is required",
    })
    .uuid({ message: "User ID must be a valid UUID" }),
});
export type TGetWorkspaceSchema = z.infer<typeof ZGetWorkspaceSchema>;
