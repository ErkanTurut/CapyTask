import * as z from "zod"
import { Completeasset, RelatedassetModel, Completeteam, RelatedteamModel } from "./index"

export const asset_teamModel = z.object({
  asset_id: z.string(),
  team_id: z.string(),
})

export interface Completeasset_team extends z.infer<typeof asset_teamModel> {
  asset: Completeasset
  team: Completeteam
}

/**
 * Relatedasset_teamModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedasset_teamModel: z.ZodSchema<Completeasset_team> = z.lazy(() => asset_teamModel.extend({
  asset: RelatedassetModel,
  team: RelatedteamModel,
}))
