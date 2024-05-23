import * as z from "zod"
import { Completeasset_team, Relatedasset_teamModel, Completeworkspace, RelatedworkspaceModel, Completeuser_team, Relateduser_teamModel, Completework_order, Relatedwork_orderModel, Completework_plan, Relatedwork_planModel, Completework_plan_template, Relatedwork_plan_templateModel } from "./index"

export const teamModel = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  image_uri: z.string().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
  workspace_id: z.string(),
  identity: z.string(),
  public_id: z.string(),
})

export interface Completeteam extends z.infer<typeof teamModel> {
  asset_team: Completeasset_team[]
  workspace: Completeworkspace
  users: Completeuser_team[]
  work_order: Completework_order[]
  work_plan: Completework_plan[]
  work_plan_template: Completework_plan_template[]
}

/**
 * RelatedteamModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedteamModel: z.ZodSchema<Completeteam> = z.lazy(() => teamModel.extend({
  asset_team: Relatedasset_teamModel.array(),
  workspace: RelatedworkspaceModel,
  users: Relateduser_teamModel.array(),
  work_order: Relatedwork_orderModel.array(),
  work_plan: Relatedwork_planModel.array(),
  work_plan_template: Relatedwork_plan_templateModel.array(),
}))
