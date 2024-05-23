import * as z from "zod"
import { Completeasset, RelatedassetModel, Completework_order, Relatedwork_orderModel } from "./index"

export const work_order_assetModel = z.object({
  work_order_id: z.string(),
  asset_id: z.string(),
})

export interface Completework_order_asset extends z.infer<typeof work_order_assetModel> {
  asset: Completeasset
  work_order: Completework_order
}

/**
 * Relatedwork_order_assetModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedwork_order_assetModel: z.ZodSchema<Completework_order_asset> = z.lazy(() => work_order_assetModel.extend({
  asset: RelatedassetModel,
  work_order: Relatedwork_orderModel,
}))
