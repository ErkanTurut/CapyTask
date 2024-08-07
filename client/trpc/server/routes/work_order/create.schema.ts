import {
  Status,
  Priority,
  WorkOrderType,
  WorkOrderSource,
} from "@prisma/client";

import * as z from "zod";
import { ZCreateWorkStepSchema } from "../work_step/create.schema";

export const ZCreateWorkOrderAssetSchema = z.object({
  asset_id: z.string(),
});

export const ZCreateWorkOrderSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  team_id: z.string(),
  location_id: z.string().optional(),
  company_id: z.string(),
  sheduled_start: z.date().optional(),
  sheduled_end: z.date().optional(),
  type: z.nativeEnum(WorkOrderType),
  source: z.nativeEnum(WorkOrderSource),
  priority: z.nativeEnum(Priority),
  status: z.nativeEnum(Status),
  requested_by_id: z.string().optional(),
  workspace_id: z.string(),
});

export const ZCreateWorkOrderWithItemsSchema = ZCreateWorkOrderSchema.extend({
  work_step: z.array(ZCreateWorkStepSchema),
  asset: z.array(ZCreateWorkOrderAssetSchema),
});

export type TCreateWorkOrderWithItemsSchema = z.infer<
  typeof ZCreateWorkOrderWithItemsSchema
>;
export type TCreateWorkOrderSchema = z.infer<typeof ZCreateWorkOrderSchema>;
