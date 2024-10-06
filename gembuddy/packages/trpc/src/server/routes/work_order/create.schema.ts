import {
  Status,
  Priority,
  WorkOrderType,
  WorkOrderSource,
  LocationType,
} from "@prisma/client";

import * as z from "zod";
import { ZCreateWorkStepSchema } from "../work_step/create.schema";

export const ZCreateWorkOrderAssetSchema = z.object({
  asset_id: z.string(),
});

const AssetQuerySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  workspace_id: z.string(),
  location_id: z.string().nullish(),
  location: z
    .object({
      name: z.string(),
      description: z.string().nullish(),
      location_type: z.nativeEnum(LocationType),
      location_level: z.number().int(),
      parent_location_id: z.string().nullish(),
      workspace_id: z.string(),
      address_id: z.string(),
      company_id: z.string().nullish(),
    })
    .nullish(),
});

export const ZCreateWorkOrderSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  team_id: z.string(),
  location_id: z.string().optional(),
  company_id: z.string(),
  sheduled_start: z.date().optional(),
  sheduled_end: z.date().optional(),
  type: z.nativeEnum(WorkOrderType).optional(),
  source: z.nativeEnum(WorkOrderSource).optional(),
  priority: z.nativeEnum(Priority).optional(),
  status: z.nativeEnum(Status).optional(),
  requested_by_id: z.string().optional(),
  workspace_id: z.string(),
});

export const ZCreateWorkOrderWithItemsSchema = ZCreateWorkOrderSchema.extend({
  asset: z.array(
    AssetQuerySchema.extend({
      work_step: z
        .array(
          z.object({
            name: z.string(),
            description: z.string().optional(),
            parent_step_id: z.string().optional(),
            step_order: z.number().optional(),
            work_step_template_id: z.string().optional(),
          }),
        )
        .optional(),
    }),
  ),
});

export type TCreateWorkOrderWithItemsSchema = z.infer<
  typeof ZCreateWorkOrderWithItemsSchema
>;
export type TCreateWorkOrderSchema = z.infer<typeof ZCreateWorkOrderSchema>;
