import * as z from "zod"
import { Completework_order, Relatedwork_orderModel, Completeteam, RelatedteamModel, Completework_plan_template, Relatedwork_plan_templateModel, Completework_step, Relatedwork_stepModel } from "./index"

export const work_planModel = z.object({
  id: z.string(),
  public_id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
  work_plan_template_id: z.string().nullish(),
  team_id: z.string(),
})

export interface Completework_plan extends z.infer<typeof work_planModel> {
  work_order: Completework_order[]
  team: Completeteam
  work_plan_template?: Completework_plan_template | null
  work_step: Completework_step[]
}

/**
 * Relatedwork_planModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedwork_planModel: z.ZodSchema<Completework_plan> = z.lazy(() => work_planModel.extend({
  work_order: Relatedwork_orderModel.array(),
  team: RelatedteamModel,
  work_plan_template: Relatedwork_plan_templateModel.nullish(),
  work_step: Relatedwork_stepModel.array(),
}))
