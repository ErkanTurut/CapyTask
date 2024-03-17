import { Database } from "@/types/supabase.types";
import * as z from "zod";
export const ZDeleteStepSchema = z.object({
  id: z
    .string({
      invalid_type_error: "ID must be a string",
      required_error: "ID is required",
    })
    .uuid({ message: "ID must be a valid UUID" }),
});
export type TDeleteStepSchema = z.infer<typeof ZDeleteStepSchema>;
