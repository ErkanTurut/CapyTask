import { z } from "zod";

import { ActionState } from "@/lib/safe-action";

import { ZUpsertStep } from "./schema";
import { Database } from "@/types/supabase.types";

export type TUpsertStep = z.infer<typeof ZUpsertStep>;
export type ReturnType = ActionState<
  TUpsertStep,
  Database["public"]["Tables"]["step"]["Row"][]
>;
