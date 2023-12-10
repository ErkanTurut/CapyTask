import { z } from "zod";
import { workspace } from "@prisma/client";

import { ActionState } from "@/lib/safe-action";

import { ZCreateWorkspace } from "./schema";

export type TCreateWorkspace = z.infer<typeof ZCreateWorkspace>;
export type ReturnType = ActionState<TCreateWorkspace, workspace>;
