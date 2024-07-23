import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./context";
import { ZodError } from "zod";

const tRPCContext = initTRPC.context<Context>().create({
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

export const router = tRPCContext.router;
export const publicProcedure = tRPCContext.procedure;
export const createCallerFactory = tRPCContext.createCallerFactory;

export const protectedProcedure = publicProcedure.use((opts) => {
  const { user } = opts.ctx;
  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return opts.next({ ctx: { user } });
});
