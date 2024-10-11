import "server-only";

import { protectedProcedure, router } from "../../trpc";

import {
  createCompany,
  getCompany,
  searchCompany,
  updateCompany,
} from "@gembuddy/supabase/resources/company";
import {
  ZCompanyUpdateSchema,
  ZGetCompanyByIdSchema,
  ZSearchCompanySchema,
} from "./schema";

export const company = router({
  get: {
    // byWorkspace: protectedProcedure
    //   .input(
    //     z.object({
    //       url_key: z.string(),
    //       range: z.object({
    //         start: z.number().int().nonnegative(),
    //         end: z.number().int().positive(),
    //       }),
    //     })
    //   )
    //   .query(async ({ ctx, input }) => {
    //     const { data, count, error } = await ctx.db
    //       .from("company")
    //       .select("*, workspace!inner(*)", { count: "estimated" })
    //       .eq("workspace.url_key", input.url_key)
    //       .range(input.range.start, input.range.end)
    //       .order("updated_at", { ascending: false })
    //       .throwOnError();

    //     if (error) {
    //       throw new TRPCError({
    //         code: "INTERNAL_SERVER_ERROR",
    //         cause: error,
    //       });
    //     }

    //     return { data, count };
    //   }),
    byId: protectedProcedure
      .input(ZGetCompanyByIdSchema)
      .query(async ({ ctx, input }) => {
        return await getCompany({
          db: ctx.db,
          input,
        });
      }),
    textSearch: protectedProcedure
      .input(ZSearchCompanySchema)
      .query(async ({ ctx, input }) => {
        return await searchCompany({
          db: ctx.db,
          input,
        });
      }),
  },
  create: protectedProcedure
    .input(ZCompanyUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await createCompany({
        db: ctx.db,
        input,
      });
    }),

  update: protectedProcedure
    .input(ZCompanyUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await updateCompany({
        db: ctx.db,
        input,
        id: input.company_id,
      });
    }),
});
