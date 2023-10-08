import * as z from "zod";

export const accountSettingsSchema = z.object({
  first_name: z.string(),

  last_name: z.string(),

  email: z.string().email({ message: "Please enter a valid email address" }),
});

export const firstNameSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" }),
});

export const lastNameSchema = z.object({
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" }),
});

export const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});
