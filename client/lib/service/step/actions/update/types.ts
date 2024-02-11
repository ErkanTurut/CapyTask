import { z } from "zod";

import { ActionState } from "@/lib/safe-action";

import { ZUpdateStep } from "./schema";
import { Database } from "@/types/supabase.types";

export type TUpdateStep = z.infer<typeof ZUpdateStep>;
export type ReturnType = ActionState<
  TUpdateStep,
  Database["public"]["Tables"]["step"]["Row"]
>;
