import { z } from "zod";

import { ActionState } from "@/lib/safe-action";

import { ZUpdateTeam } from "./schema";
import { Database } from "@/types/supabase.types";

export type TUpdateTeam = z.infer<typeof ZUpdateTeam>;
export type ReturnType = ActionState<
  TUpdateTeam,
  Database["public"]["Tables"]["team"]["Row"]
>;
