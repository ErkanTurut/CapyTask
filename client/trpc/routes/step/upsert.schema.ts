import * as z from "zod";
export const ZUpsertStepSchema = z
  .object({
    inspection_id: z.string(),
    step_template_snapshot_id: z.string(),
  })
  .array();
export type TUpsertStepSchema = z.infer<typeof ZUpsertStepSchema>;
