import * as z from "zod";

export const accountSettingsSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  imageUri: z.string().url({ message: "Please enter a valid image URL" }),
});
