import { Database } from "@/types/supabase.types";
import * as z from "zod";
export const ZDeleteWorkStepTemplateSchema = z.object({
  id: z.string({
    invalid_type_error: "ID must be a string",
    required_error: "ID is required",
  }),
});
export type TDeleteWorkStepTemplateSchema = z.infer<
  typeof ZDeleteWorkStepTemplateSchema
>;
