import { z } from "zod";

import { ActionState } from "@/lib/safe-action";

import { ZCreateTeam } from "./schema";

export type TCreateTeam = z.infer<typeof ZCreateTeam>;
export type ReturnType = ActionState<
  TCreateTeam,
  { success: boolean; url_key: string }
>;
