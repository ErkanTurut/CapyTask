import * as z from "zod";

export const ZUpdateTeam = z.object({
  id: z.string(),
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
  description: z
    .string()
    .max(500, {
      message: "Description must be less than 500 characters long",
    })
    .optional(),
  image_uri: z
    .string()
    .url({ message: "Image URL must be a valid URL" })
    .optional(),
  url_key: z
    .string()
    .max(5, { message: "Slug must be less than 5 characters long" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must be lowercase and contain no spaces",
    })
    .toLowerCase(),
});
