import * as z from "zod"
import { LocationType } from "@prisma/client"
import { Completeworkspace, RelatedworkspaceModel, Completeaddress, RelatedaddressModel } from "./index"

export const locationModel = z.object({
  id: z.string(),
  public_id: z.string(),
  location_type: z.nativeEnum(LocationType),
  location_level: z.number().int(),
  name: z.string(),
  description: z.string().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
  parent_location_id: z.string().nullish(),
  workspace_id: z.string(),
  address_id: z.string(),
})

export interface Completelocation extends z.infer<typeof locationModel> {
  parent_location?: Completelocation | null
  sub_locations: Completelocation[]
  workspace: Completeworkspace
  address: Completeaddress
}

/**
 * RelatedlocationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedlocationModel: z.ZodSchema<Completelocation> = z.lazy(() => locationModel.extend({
  parent_location: RelatedlocationModel.nullish(),
  sub_locations: RelatedlocationModel.array(),
  workspace: RelatedworkspaceModel,
  address: RelatedaddressModel,
}))
