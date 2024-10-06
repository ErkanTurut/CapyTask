import { publicProcedure, router } from "../../../trpc";
import { ZSignInSchema } from "./signin.schema";
import { signinHandler } from "./signin.handler";

export const authMutationRouter = router({
  signin: publicProcedure
    .input(ZSignInSchema)
    .mutation(async ({ ctx, input }) => {
      return signinHandler({ input, db: ctx.db });
    }),
});
