import * as z from "zod"
import { Completework_plan_template, Relatedwork_plan_templateModel, Completework_step, Relatedwork_stepModel } from "./index"

export const work_step_templateModel = z.object({
  id: z.string(),
  public_id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
  parent_step_id: z.string().nullish(),
  created_by_id: z.string().nullish(),
  step_order: z.number().int().nullish(),
  work_plan_template_id: z.string(),
})

export interface Completework_step_template extends z.infer<typeof work_step_templateModel> {
  parent_step?: Completework_step_template | null
  sub_steps: Completework_step_template[]
  work_plan_template: Completework_plan_template
  work_step: Completework_step[]
}

/**
 * Relatedwork_step_templateModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedwork_step_templateModel: z.ZodSchema<Completework_step_template> = z.lazy(() => work_step_templateModel.extend({
  parent_step: Relatedwork_step_templateModel.nullish(),
  sub_steps: Relatedwork_step_templateModel.array(),
  work_plan_template: Relatedwork_plan_templateModel,
  work_step: Relatedwork_stepModel.array(),
}))
