import { AuthResponse } from "@supabase/supabase-js";
import { z } from "zod";

import { ActionState } from "@/lib/safe-action";

import { ZSignIn } from "./schema";

export type TSignIn = z.infer<typeof ZSignIn>;
export type ReturnType = ActionState<TSignIn, Pick<AuthResponse, "data">>;
