import { z } from "zod";
import { ActionState } from "@/lib/safe-action";
import { ZCreatePlan } from "./schema";
import { Database } from "@/types/supabase.types";

export type TCreatePlan = z.infer<typeof ZCreatePlan>;
export type ReturnType = ActionState<
  TCreatePlan,
  Database["public"]["Tables"]["plan"]["Row"][] | null
>;
