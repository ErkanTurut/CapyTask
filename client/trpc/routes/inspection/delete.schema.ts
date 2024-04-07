import * as z from "zod";
export const ZDeleteInspectionSchema = z.object({
  id: z
    .string({
      invalid_type_error: "ID must be a string",
      required_error: "ID is required",
    })
    .array(),
});
export type TDeleteInspectionSchema = z.infer<typeof ZDeleteInspectionSchema>;
