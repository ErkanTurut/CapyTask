import { z } from "zod";
import { ActionState } from "@/lib/safe-action";
import { ZDeleteStep } from "./schema";

export type TDeleteStep = z.infer<typeof ZDeleteStep>;
export type ReturnType = ActionState<TDeleteStep, { success: boolean }>;
