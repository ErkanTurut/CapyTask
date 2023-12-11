import { z } from "zod";

import { ActionState } from "@/lib/safe-action";

import { ZSignout } from "./schema";

export type TSignout = z.infer<typeof ZSignout>;
export type ReturnType = ActionState<TSignout, { success: boolean }>;
