import * as z from "zod";

export const ZStepSchema = z.object({
  id: z.string().uuid(),
  name: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[a-zA-Z0-9 ]+$/),
  description: z.string().min(3).max(1000).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  parent_step_id: z.string().uuid().optional(),
  created_by_id: z.string().uuid().optional(),
  order: z.number().optional(),
  plan_id: z.string().uuid(),
  plan: z.object({}),
  created_by: z.object({}),
  parent_step: z.object({}),
  sub_steps: z.array(z.object({})),
});

export type TStepSchema = z.infer<typeof ZStepSchema>;
