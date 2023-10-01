import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { TRPCError, initTRPC } from "@trpc/server";
import { cookies } from "next/headers";
import type { user } from "@prisma/client";

const t = initTRPC.create();

const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const supabase = createServerComponentClient({ cookies });
  const { data: session } = await supabase.auth.getSession();
  const { data: user, error }: { data: user | null; error: any } =
    await supabase.from("user").select().single();
  if (!session || !user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      userId: user.id,
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
