import { createClient } from "@/lib/supabase/server";
import { protectedProcedure, router } from "@/trpc/trpc";
import { cookies } from "next/headers";
import { createWorkOrderHandler } from "./create.handler";
import { ZCreateWorkOrderSchema } from "./create.schema";
import { trpc } from "@/trpc/server";

export const work_order = router({
  create: protectedProcedure
    .input(ZCreateWorkOrderSchema)
    .mutation(async ({ ctx, input }) => {
      await createWorkOrderHandler({
        input,
        db: createClient(cookies()),
      });
    }),
});
