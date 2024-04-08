import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./context";
import { ZodError } from "zod";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = publicProcedure.use((opts) => {
  const { session } = opts.ctx;
  if (!session?.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return opts.next({ ctx: { session } });
});
