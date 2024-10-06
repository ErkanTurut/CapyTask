import * as z from "zod";
import { StatusSchema } from "./enum.schema";

export const ZUpdateWorkOrderSchema = z
  .object({
    id: z.string(),
    status: StatusSchema,
    note: z.string().min(1).max(1000).optional(),
  })
  .strict();

export type TUpdateWorkOrderSchema = z.infer<typeof ZUpdateWorkOrderSchema>;
