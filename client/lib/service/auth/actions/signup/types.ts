import { AuthResponse } from "@supabase/supabase-js";
import { z } from "zod";
import { ActionState } from "@/lib/safe-action";
import { ZSignUp } from "./schema";

export type TSignUp = z.infer<typeof ZSignUp>;
export type ReturnType = ActionState<TSignUp, Pick<AuthResponse, "data">>;
