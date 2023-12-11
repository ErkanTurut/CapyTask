import { z } from "zod";

import { ActionState } from "@/lib/safe-action";

import { ZAccountUpdate } from "./schema";
import { Database } from "@/types/supabase.types";

export type TAccountUpdate = z.infer<typeof ZAccountUpdate>;
export type ReturnType = ActionState<
  TAccountUpdate,
  Database["public"]["Tables"]["user"]["Row"]
>;
