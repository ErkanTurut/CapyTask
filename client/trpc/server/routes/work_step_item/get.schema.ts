import * as z from "zod";

export const ZGetWorkStepStatusSchema = z
  .object({
    id: z.string(),
    work_order_id: z.string(),
  })
  .strict();

export type TGetWorkStepStatusSchema = z.infer<typeof ZGetWorkStepStatusSchema>;
