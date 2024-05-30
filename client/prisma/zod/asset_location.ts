import * as z from "zod"
import { Completeasset, RelatedassetModel, Completelocation, RelatedlocationModel } from "./index"

export const asset_locationModel = z.object({
  asset_id: z.string(),
  location_id: z.string(),
})

export interface Completeasset_location extends z.infer<typeof asset_locationModel> {
  asset: Completeasset
  location: Completelocation
}

/**
 * Relatedasset_locationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedasset_locationModel: z.ZodSchema<Completeasset_location> = z.lazy(() => asset_locationModel.extend({
  asset: RelatedassetModel,
  location: RelatedlocationModel,
}))
