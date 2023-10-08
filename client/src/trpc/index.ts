import { accountSettingsSchema } from "@/lib/validations/settings";
import { publicProcedure, router, privateProcedure } from "./trpc";
import z from "zod";

export const appRouter = router({
  // test: publicProcedure.query(() => {
  //   return "hello world";
  // }),
  // updateUser: privateProcedure
  //   .input(accountSettingsSchema)
  //   .mutation(async ({ ctx, input }) => {
  //     return console.log(input, ctx);
  //   }),
});

export type AppRouter = typeof appRouter;
