import * as z from "zod";
import {
  Completework_plan,
  Relatedwork_planModel,
  Completeteam,
  RelatedteamModel,
  Completework_step_template,
  Relatedwork_step_templateModel,
} from "./index";

export const work_plan_templateModel = z.object({
  id: z.string(),
  public_id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  created_at: z.string(),
  updated_at: z.string(),
  team_id: z.string(),
});

export interface Completework_plan_template
  extends z.infer<typeof work_plan_templateModel> {
  work_plan: Completework_plan[];
  team: Completeteam;
  work_step_template: Completework_step_template[];
}

/**
 * Relatedwork_plan_templateModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedwork_plan_templateModel: z.ZodSchema<Completework_plan_template> =
  z.lazy(() =>
    work_plan_templateModel.extend({
      work_plan: Relatedwork_planModel.array(),
      team: RelatedteamModel,
      work_step_template: Relatedwork_step_templateModel.array(),
    }),
  );
