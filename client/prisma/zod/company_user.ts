import * as z from "zod"
import { Completecompany, RelatedcompanyModel, Completeuser, RelateduserModel } from "./index"

export const company_userModel = z.object({
  company_id: z.string(),
  user_id: z.string(),
})

export interface Completecompany_user extends z.infer<typeof company_userModel> {
  company: Completecompany
  user: Completeuser
}

/**
 * Relatedcompany_userModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedcompany_userModel: z.ZodSchema<Completecompany_user> = z.lazy(() => company_userModel.extend({
  company: RelatedcompanyModel,
  user: RelateduserModel,
}))
