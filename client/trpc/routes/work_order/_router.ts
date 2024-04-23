import { protectedProcedure, router } from "@/trpc/trpc";
import {
  getWorkOrderHandler,
  getWorkOrderStepsHandler,
  getWorkOrdersByIdentityHandler,
  searchWorkOrderHandler,
} from "./get.handler";
import { ZGetWorkOrderSchema } from "./get.schema";
import { ZCreateWorkOrderSchema } from "./create.schema";
import { createWorkOrderHandler } from "./create.handler";
import { ZDeleteWorkOrderSchema } from "./delete.schema";
import { deleteWorkOrderHandler } from "./delete.handler";
import { updateWorkOrderStatusHandler } from "./update.handler";
import { ZUpdateWorkOrderSchema } from "./update.schema";

export const work_order = router({
  test: protectedProcedure.query(async ({ ctx }) => {
    return { data: "Hello" };
  }),
  get: {
    byId: protectedProcedure
      .input(ZGetWorkOrderSchema.pick({ id: true }))
      .query(async ({ ctx, input }) => {
        return await getWorkOrderHandler({
          input,
          db: ctx.db,
        });
      }),
    byTeamIdentity: protectedProcedure
      .input(ZGetWorkOrderSchema.pick({ team_identity: true, range: true }))
      .query(async ({ ctx, input }) => {
        return await getWorkOrdersByIdentityHandler({
          input,
          db: ctx.db,
        });
      }),

    withSteps: protectedProcedure
      .input(ZGetWorkOrderSchema.pick({ id: true }))
      .query(async ({ ctx, input }) => {
        return await getWorkOrderStepsHandler({
          input,
          db: ctx.db,
        });
      }),
  },
  create: protectedProcedure
    .input(ZCreateWorkOrderSchema)
    .mutation(async ({ ctx, input }) => {
      return await createWorkOrderHandler({
        input,
        db: ctx.db,
      });
    }),
  search: protectedProcedure
    .input(ZGetWorkOrderSchema.pick({ q: true, team_identity: true }))
    .query(async ({ ctx, input }) => {
      return await searchWorkOrderHandler({
        input,
        db: ctx.db,
      });
    }),
  delete: protectedProcedure
    .input(ZDeleteWorkOrderSchema)
    .mutation(async ({ ctx, input }) => {
      return await deleteWorkOrderHandler({
        input,
        db: ctx.db,
      });
    }),

  update: {
    status: protectedProcedure
      .input(ZUpdateWorkOrderSchema.pick({ id: true, status: true }))
      .mutation(async ({ ctx, input }) => {
        updateWorkOrderStatusHandler({
          input,
          db: ctx.db,
        });
      }),
  },
});
