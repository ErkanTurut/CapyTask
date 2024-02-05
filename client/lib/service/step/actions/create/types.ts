import { z } from "zod";
import { ActionState } from "@/lib/safe-action";
import { ZCreateStep } from "./schema";
import { Database } from "@/types/supabase.types";

export type TCreateStep = z.infer<typeof ZCreateStep>;
export type ReturnType = ActionState<
  TCreateStep,
  Database["public"]["Tables"]["step"]["Row"][] | null
>;
