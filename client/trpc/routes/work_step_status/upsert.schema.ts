import * as z from "zod";
export const ZUpsertWorkStepStatusSchema = z
  .object({
    work_order_id: z.string(),
    work_step_id: z.string(),
    step_order: z.number().nullish(),
  })
  .array();
export type TUpsertWorkStepStatusSchema = z.infer<
  typeof ZUpsertWorkStepStatusSchema
>;
