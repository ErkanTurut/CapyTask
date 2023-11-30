import * as z from "zod";

export const accountSettingsSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export type TaccountSettingsSchema = z.infer<typeof accountSettingsSchema>;
