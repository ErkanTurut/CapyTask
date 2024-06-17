import * as z from "zod"
import { Completeworkspace, RelatedworkspaceModel, Completelocation, RelatedlocationModel, Completecompany_user, Relatedcompany_userModel, Completework_order, Relatedwork_orderModel } from "./index"

export const companyModel = z.object({
  id: z.string(),
  public_id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
  workspace_id: z.string(),
})

export interface Completecompany extends z.infer<typeof companyModel> {
  workspace: Completeworkspace
  location: Completelocation[]
  company_user: Completecompany_user[]
  work_order: Completework_order[]
}

/**
 * RelatedcompanyModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedcompanyModel: z.ZodSchema<Completecompany> = z.lazy(() => companyModel.extend({
  workspace: RelatedworkspaceModel,
  location: RelatedlocationModel.array(),
  company_user: Relatedcompany_userModel.array(),
  work_order: Relatedwork_orderModel.array(),
}))
