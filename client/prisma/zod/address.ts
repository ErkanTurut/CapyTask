import * as z from "zod"
import { Completelocation, RelatedlocationModel } from "./index"

export const addressModel = z.object({
  id: z.string(),
  public_id: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postal_code: z.string(),
  createdDate: z.date(),
})

export interface Completeaddress extends z.infer<typeof addressModel> {
  location: Completelocation[]
}

/**
 * RelatedaddressModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedaddressModel: z.ZodSchema<Completeaddress> = z.lazy(() => addressModel.extend({
  location: RelatedlocationModel.array(),
}))
