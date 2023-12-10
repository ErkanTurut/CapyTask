import { z } from "zod";
import { user } from "@prisma/client";

import { ActionState } from "@/lib/safe-action";

import { ZAccountUpdate } from "./schema";

export type TAccountUpdate = z.infer<typeof ZAccountUpdate>;
export type ReturnType = ActionState<TAccountUpdate, user>;
