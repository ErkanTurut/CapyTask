import * as z from "zod"
import { Status, Priority, inspectionType } from "@prisma/client"
import { Completelocation, RelatedlocationModel, Completeteam, RelatedteamModel, Completework_plan, Relatedwork_planModel, Completecompany, RelatedcompanyModel, Completework_order_asset, Relatedwork_order_assetModel, Completework_step_status, Relatedwork_step_statusModel } from "./index"

export const work_orderModel = z.object({
  id: z.string(),
  public_id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  status: z.nativeEnum(Status),
  location_id: z.string().nullish(),
  priority: z.nativeEnum(Priority),
  type: z.nativeEnum(inspectionType),
  created_at: z.date(),
  updated_at: z.date(),
  sheduled_start: z.date().nullish(),
  sheduled_end: z.date().nullish(),
  team_id: z.string(),
  work_plan_id: z.string().nullish(),
  company_id: z.string(),
})

export interface Completework_order extends z.infer<typeof work_orderModel> {
  location?: Completelocation | null
  team: Completeteam
  work_plan?: Completework_plan | null
  company: Completecompany
  work_order_asset: Completework_order_asset[]
  work_step_status: Completework_step_status[]
}

/**
 * Relatedwork_orderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedwork_orderModel: z.ZodSchema<Completework_order> = z.lazy(() => work_orderModel.extend({
  location: RelatedlocationModel.nullish(),
  team: RelatedteamModel,
  work_plan: Relatedwork_planModel.nullish(),
  company: RelatedcompanyModel,
  work_order_asset: Relatedwork_order_assetModel.array(),
  work_step_status: Relatedwork_step_statusModel.array(),
}))
