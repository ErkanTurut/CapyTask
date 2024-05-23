import * as z from "zod"
import { Status } from "@prisma/client"
import { Completework_order, Relatedwork_orderModel, Completework_step, Relatedwork_stepModel } from "./index"

export const work_step_statusModel = z.object({
  id: z.string(),
  public_id: z.string(),
  status: z.nativeEnum(Status),
  created_at: z.date(),
  updated_at: z.date(),
  work_order_id: z.string(),
  work_step_id: z.string(),
  step_order: z.number().int().nullish(),
})

export interface Completework_step_status extends z.infer<typeof work_step_statusModel> {
  work_order: Completework_order
  work_step: Completework_step
}

/**
 * Relatedwork_step_statusModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedwork_step_statusModel: z.ZodSchema<Completework_step_status> = z.lazy(() => work_step_statusModel.extend({
  work_order: Relatedwork_orderModel,
  work_step: Relatedwork_stepModel,
}))
