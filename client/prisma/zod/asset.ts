import * as z from "zod"
import { Completeworkspace, RelatedworkspaceModel, Completework_order_asset, Relatedwork_order_assetModel, Completeasset_location, Relatedasset_locationModel } from "./index"

export const assetModel = z.object({
  id: z.string(),
  public_id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
  workspace_id: z.string(),
})

export interface Completeasset extends z.infer<typeof assetModel> {
  workspace: Completeworkspace
  work_order_asset: Completework_order_asset[]
  asset_location: Completeasset_location[]
}

/**
 * RelatedassetModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedassetModel: z.ZodSchema<Completeasset> = z.lazy(() => assetModel.extend({
  workspace: RelatedworkspaceModel,
  work_order_asset: Relatedwork_order_assetModel.array(),
  asset_location: Relatedasset_locationModel.array(),
}))
