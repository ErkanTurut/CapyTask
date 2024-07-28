import * as z from "zod";
export const ZDeleteWorkOrderSchema = z.object({
  id: z
    .string({
      invalid_type_error: "ID must be a string",
      required_error: "ID is required",
    })
    .array(),
});
export type TDeleteWorkOrderSchema = z.infer<typeof ZDeleteWorkOrderSchema>;
