import * as z from "zod"
import { Completerole, RelatedroleModel, Completeuser, RelateduserModel, Completeworkspace, RelatedworkspaceModel } from "./index"

export const user_workspaceModel = z.object({
  user_id: z.string(),
  workspace_id: z.string(),
  role_id: z.string().nullish(),
})

export interface Completeuser_workspace extends z.infer<typeof user_workspaceModel> {
  role?: Completerole | null
  user: Completeuser
  workspace: Completeworkspace
}

/**
 * Relateduser_workspaceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relateduser_workspaceModel: z.ZodSchema<Completeuser_workspace> = z.lazy(() => user_workspaceModel.extend({
  role: RelatedroleModel.nullish(),
  user: RelateduserModel,
  workspace: RelatedworkspaceModel,
}))
