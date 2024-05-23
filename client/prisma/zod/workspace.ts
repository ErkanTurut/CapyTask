import * as z from "zod"
import { Completeasset, RelatedassetModel, Completeteam, RelatedteamModel, Completeuser_workspace, Relateduser_workspaceModel, Completeuser, RelateduserModel, Completelocation, RelatedlocationModel } from "./index"

export const workspaceModel = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
  url_key: z.string(),
  created_by: z.string(),
  image_uri: z.string().nullish(),
  public_id: z.string(),
})

export interface Completeworkspace extends z.infer<typeof workspaceModel> {
  asset: Completeasset[]
  team: Completeteam[]
  user_workspace: Completeuser_workspace[]
  user: Completeuser
  location: Completelocation[]
}

/**
 * RelatedworkspaceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedworkspaceModel: z.ZodSchema<Completeworkspace> = z.lazy(() => workspaceModel.extend({
  asset: RelatedassetModel.array(),
  team: RelatedteamModel.array(),
  user_workspace: Relateduser_workspaceModel.array(),
  user: RelateduserModel,
  location: RelatedlocationModel.array(),
}))
