import { z } from "zod";

import { ActionState } from "@/lib/safe-action";

import { ZCreateWorkspace } from "./schema";
import { Database } from "@/types/supabase.types";

export type TCreateWorkspace = z.infer<typeof ZCreateWorkspace>;
export type ReturnType = ActionState<
  TCreateWorkspace,
  Database["public"]["Tables"]["workspace"]["Row"]
>;
