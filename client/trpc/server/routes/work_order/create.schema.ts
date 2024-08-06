import {
  work_plan_templateModel,
  work_orderModel,
  work_stepModel,
  assetModel,
} from "@/prisma/zod";
import {
  Status,
  Priority,
  WorkOrderType,
  WorkOrderSource,
} from "@prisma/client";

import * as z from "zod";
import { ZCreateWorkStepSchema } from "../work_step/create.schema";

export const ZCreateWorkOrderWithTemplateSchema = work_orderModel
  .pick({
    name: true,
    description: true,
    team_id: true,
    company_id: true,
    location_id: true,
    source: true,
    type: true,
  })
  .merge(
    z.object({
      work_plan_template: work_plan_templateModel.pick({
        id: true,
      }),
    }),
  )
  .strict();

export type TCreateWorkOrderWithTemplateSchema = z.infer<
  typeof ZCreateWorkOrderWithTemplateSchema
>;

export const ZCreateWorkOrderWithStepsSchema = work_orderModel
  .pick({
    name: true,
    description: true,
    team_id: true,
    company_id: true,
    location_id: true,
    requested_by_id: true,
    source: true,
    type: true,
    status: true,
  })
  .merge(
    z.object({
      work_step: z.array(
        work_stepModel.pick({
          name: true,
          description: true,
          parent_step_id: true,
          step_order: true,
        }),
      ),
    }),
  )
  .merge(
    z.object({
      asset: z
        .array(
          assetModel.pick({
            id: true,
          }),
        )
        .nullable(),
    }),
  );

export type TCreateWorkOrderWithStepsSchema = z.infer<
  typeof ZCreateWorkOrderWithStepsSchema
>;

export const ZCreateWorkOrderAssetSchema = z.object({
  asset_id: z.string(),
});

export const ZCreateWorkOrderSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    team_id: z.string(),
    location_id: z.string().optional(),
    company_id: z.string(),
    sheduled_end: z.date().optional(),
    sheduled_start: z.date().optional(),
    type: z.nativeEnum(WorkOrderType),
    source: z.nativeEnum(WorkOrderSource),
    priority: z.nativeEnum(Priority),
    status: z.nativeEnum(Status),
    requested_by_id: z.string().optional(),
  })
  .merge(
    z.object({
      work_step: z.optional(z.array(ZCreateWorkStepSchema)),
      asset: z.optional(z.array(ZCreateWorkOrderAssetSchema)),
    }),
  );

export type TCreateWorkOrderSchema = z.infer<typeof ZCreateWorkOrderSchema>;
