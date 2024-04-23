import * as z from "zod";
import { StatusSchema } from "./enum.schema";

export const ZUpdateWorkOrderSchema = z
  .object({
    id: z.string({
      invalid_type_error: "ID must be a string",
      required_error: "ID is required",
    }),
    status: StatusSchema,
  })
  .strict();

export type TUpdateWorkOrderSchema = z.infer<typeof ZUpdateWorkOrderSchema>;
