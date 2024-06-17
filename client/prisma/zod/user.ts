import * as z from "zod"
import { Completeuser_team, Relateduser_teamModel, Completeuser_workspace, Relateduser_workspaceModel, Completeworkspace, RelatedworkspaceModel, Completecompany_user, Relatedcompany_userModel } from "./index"

export const userModel = z.object({
  id: z.string(),
  image_uri: z.string().nullish(),
  email: z.string(),
  first_name: z.string().nullish(),
  last_name: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  external_id: z.string().nullish(),
})

export interface Completeuser extends z.infer<typeof userModel> {
  user_team: Completeuser_team[]
  user_workspace: Completeuser_workspace[]
  workspaces: Completeworkspace[]
  company_user: Completecompany_user[]
}

/**
 * RelateduserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelateduserModel: z.ZodSchema<Completeuser> = z.lazy(() => userModel.extend({
  user_team: Relateduser_teamModel.array(),
  user_workspace: Relateduser_workspaceModel.array(),
  workspaces: RelatedworkspaceModel.array(),
  company_user: Relatedcompany_userModel.array(),
}))
