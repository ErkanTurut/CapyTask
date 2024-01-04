import { z } from "zod";

import { ActionState } from "@/lib/safe-action";

import { ZCreateWorkspace } from "./schema";
import { Database } from "@/types/supabase.types";

export type TCreateWorkspace = z.infer<typeof ZCreateWorkspace>;
export type ReturnType = ActionState<
  TCreateWorkspace,
  { success: boolean; url_key: string }
>;
