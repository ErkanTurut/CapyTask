import { router } from "@/trpc/trpc";

import { authRouter } from "./auth";
import { workspaceRouter } from "./workspace";
import { userRouter } from "./user";

export const appRouter = router({
  auth: authRouter,
  workspace: workspaceRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
