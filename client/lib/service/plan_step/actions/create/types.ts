import { z } from "zod";
import { ActionState } from "@/lib/safe-action";
import { ZInsertPlanStep } from "./schema";
import { Database } from "@/types/supabase.types";

export type TInsertPlanStep = z.infer<typeof ZInsertPlanStep>;
export type ReturnType = ActionState<
  TInsertPlanStep,
  Database["public"]["Tables"]["plan_step"]["Row"]
>;
