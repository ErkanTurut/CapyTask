import * as z from "zod"
import { Completeworkspace, RelatedworkspaceModel, Completeasset_team, Relatedasset_teamModel, Completework_order_asset, Relatedwork_order_assetModel } from "./index"

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
  asset_team: Completeasset_team[]
  work_order_asset: Completework_order_asset[]
}

/**
 * RelatedassetModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedassetModel: z.ZodSchema<Completeasset> = z.lazy(() => assetModel.extend({
  workspace: RelatedworkspaceModel,
  asset_team: Relatedasset_teamModel.array(),
  work_order_asset: Relatedwork_order_assetModel.array(),
}))
