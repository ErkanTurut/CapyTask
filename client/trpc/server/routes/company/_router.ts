import { protectedProcedure, router } from "../../trpc";

import { companyModel, workspaceModel } from "@/prisma/zod";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const company = router({
  get: {
    byWorkspace: protectedProcedure
      .input(
        workspaceModel.pick({ url_key: true }).merge(
          z.object({
            range: z.object({
              start: z.number().int().nonnegative(),
              end: z.number().int().positive(),
            }),
          }),
        ),
      )
      .query(async ({ ctx, input }) => {
        const { data, count, error } = await ctx.db
          .from("company")
          .select("*, workspace!inner(*)", { count: "estimated" })
          .eq("workspace.url_key", input.url_key)
          .range(input.range.start, input.range.end)
          .order("updated_at", { ascending: false })
          .throwOnError();

        if (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            cause: error,
          });
        }

        return { data, count };
      }),
  },
});
