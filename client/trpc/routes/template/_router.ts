import { router } from "@/trpc/trpc";
import { inspection } from "./inspection/_router";
import { step } from "./step/_router";

export const template = router({
  inspection,
  step,
});
