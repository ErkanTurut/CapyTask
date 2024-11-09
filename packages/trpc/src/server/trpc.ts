import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { TRPCError, initTRPC } from "@trpc/server";

// @ts-ignore
import superjson from "superjson";
import { ZodError } from "zod";
import type { Context } from "./context";
import type { AppRouter } from "./routes/_app";

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
  const { session } = opts.ctx;
  if (!session || !session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return opts.next({ ctx: { session } });
});

export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;
export type AsyncRouterOutput = Promise<inferRouterOutputs<AppRouter>>;
