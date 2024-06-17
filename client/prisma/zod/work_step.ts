import * as z from "zod"
import { Completework_step_template, Relatedwork_step_templateModel, Completework_plan, Relatedwork_planModel, Completework_step_status, Relatedwork_step_statusModel } from "./index"

export const work_stepModel = z.object({
  id: z.string(),
  public_id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
  parent_step_id: z.string().nullish(),
  created_by_id: z.string().nullish(),
  step_order: z.number().int().nullish(),
  work_plan_id: z.string(),
  work_step_template_id: z.string().nullish(),
})

export interface Completework_step extends z.infer<typeof work_stepModel> {
  work_step_template?: Completework_step_template | null
  parent_step?: Completework_step | null
  sub_steps: Completework_step[]
  work_plan: Completework_plan
  work_step_status: Completework_step_status[]
}

/**
 * Relatedwork_stepModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedwork_stepModel: z.ZodSchema<Completework_step> = z.lazy(() => work_stepModel.extend({
  work_step_template: Relatedwork_step_templateModel.nullish(),
  parent_step: Relatedwork_stepModel.nullish(),
  sub_steps: Relatedwork_stepModel.array(),
  work_plan: Relatedwork_planModel,
  work_step_status: Relatedwork_step_statusModel.array(),
}))
