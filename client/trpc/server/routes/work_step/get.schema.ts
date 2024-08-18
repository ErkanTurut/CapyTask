import { Status } from "@prisma/client";
import * as z from "zod";

export const ZWorkStepQuerySchema = z.object({
  id: z.string(),
  public_id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  parent_step_id: z.string().nullish(),
  created_by_id: z.string().nullish(),
  step_order: z.number().nullish(),
  work_plan_id: z.string(),
  work_step_template_id: z.string().nullish(),
  status: z.nativeEnum(Status),
  asset_id: z.string().nullish(),
  work_order_id: z.string(),
});
