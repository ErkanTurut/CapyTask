import * as z from "zod";
import { StatusSchema } from "./enum.schema";
export const ZUpdateWorkStepStatusSchema = z.object({
  id: z.string({
    invalid_type_error: "WorkStepTemplate ID must be a string",
    required_error: "WorkStepTemplate ID is required",
  }),
  status: StatusSchema,
});
export type TUpdateWorkStepStatusSchema = z.infer<
  typeof ZUpdateWorkStepStatusSchema
>;
