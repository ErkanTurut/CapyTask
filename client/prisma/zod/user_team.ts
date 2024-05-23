import * as z from "zod"
import { Completerole, RelatedroleModel, Completeteam, RelatedteamModel, Completeuser, RelateduserModel } from "./index"

export const user_teamModel = z.object({
  user_id: z.string(),
  team_id: z.string(),
  role_id: z.string().nullish(),
})

export interface Completeuser_team extends z.infer<typeof user_teamModel> {
  role?: Completerole | null
  team: Completeteam
  user: Completeuser
}

/**
 * Relateduser_teamModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relateduser_teamModel: z.ZodSchema<Completeuser_team> = z.lazy(() => user_teamModel.extend({
  role: RelatedroleModel.nullish(),
  team: RelatedteamModel,
  user: RelateduserModel,
}))
