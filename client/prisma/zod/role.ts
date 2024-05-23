import * as z from "zod"
import { Role, Permission } from "@prisma/client"
import { Completeuser_team, Relateduser_teamModel, Completeuser_workspace, Relateduser_workspaceModel } from "./index"

export const roleModel = z.object({
  id: z.string(),
  name: z.nativeEnum(Role),
  description: z.string(),
  permissions: z.nativeEnum(Permission).array(),
})

export interface Completerole extends z.infer<typeof roleModel> {
  user_team: Completeuser_team[]
  user_workspace: Completeuser_workspace[]
}

/**
 * RelatedroleModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedroleModel: z.ZodSchema<Completerole> = z.lazy(() => roleModel.extend({
  user_team: Relateduser_teamModel.array(),
  user_workspace: Relateduser_workspaceModel.array(),
}))
