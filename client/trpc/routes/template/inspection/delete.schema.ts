import * as z from "zod";

export const ZDeleteInspectionSchema = z.object({
  id: z.string({
    invalid_type_error: "inspection ID must be a string",
    required_error: "inspection ID is required",
  }),
});

export type TDeleteInspectionSchema = z.infer<typeof ZDeleteInspectionSchema>;
