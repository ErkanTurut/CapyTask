import { publicProcedure, router } from "./trpc";

import { authRouter } from "./routers/auth-router";
import { userRouter } from "./routers/user";
import { workspaceRouter } from "./routers/workspace";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  workspace: workspaceRouter,
});

export type AppRouter = typeof appRouter;
