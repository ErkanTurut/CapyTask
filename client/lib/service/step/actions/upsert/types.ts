import { z } from "zod";

import { ActionState } from "@/lib/safe-action";

import { ZUpsertStep } from "./schema";
import { Database } from "@/types/supabase.types";

export type TZUpsertStep = z.infer<typeof ZUpsertStep>;
export type ReturnType = ActionState<
  TZUpsertStep,
  Database["public"]["Tables"]["step"]["Row"][]
>;
