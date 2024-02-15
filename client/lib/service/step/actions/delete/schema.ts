import * as z from "zod";

export const ZDeleteStep = z.object({
  id: z
    .string({
      invalid_type_error: "Parent ID must be a string",
      required_error: "Parent ID is required",
    })
    .uuid({ message: "Parent ID must be a valid UUID" }),
});
