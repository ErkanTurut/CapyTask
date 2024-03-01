import { z } from "zod";

import { ActionState } from "@/lib/safe-action";

import { ZUpsertPlanStep } from "./schema";
import { Database } from "@/types/supabase.types";

export type TUpsertPlanStep = z.infer<typeof ZUpsertPlanStep>;
export type ReturnType = ActionState<
  TUpsertPlanStep,
  Database["public"]["Tables"]["plan_step"]["Row"][]
>;
