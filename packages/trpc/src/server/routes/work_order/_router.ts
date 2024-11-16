import "server-only";

import { openai } from "@ai-sdk/openai";
import { createWorkOrderHistory } from "@gembuddy/supabase/resources";
import { createNote } from "@gembuddy/supabase/resources/note";
import {
  createWorkOrder,
  deleteWorkOrders,
  getWorkOrderById,
  getWorkOrdersByTeam,
  searchWorkOrder,
  updateWorkOrder,
} from "@gembuddy/supabase/resources/work_order";
import { embed } from "ai";
import { protectedProcedure, router } from "../../trpc";
import {
  ZCreateWorkOrderSchema,
  ZDeleteWorkOrderManySchema,
  ZGetWorkOrderByIdSchema,
  ZGetWorkOrderByTeamSchema,
  ZSearchWorkOrderSchema,
  ZUpdateWorkOrderSchema,
  ZUpdateWorkOrderWithNoteSchema,
} from "./schema";
export const work_order = router({
  get: {
    byId: protectedProcedure
      .input(ZGetWorkOrderByIdSchema)
      .query(async ({ ctx, input }) => {
        return await getWorkOrderById({
          db: ctx.db,
          input,
        });
      }),
    byTeam: protectedProcedure
      .input(ZGetWorkOrderByTeamSchema)
      .query(async ({ ctx, input }) => {
        return await getWorkOrdersByTeam({
          input,
          db: ctx.db,
        });
      }),
    textSearch: protectedProcedure
      .input(ZSearchWorkOrderSchema)
      .query(async ({ ctx, input }) => {
        return await searchWorkOrder({
          input,
          db: ctx.db,
        });
      }),
  },

  delete: {
    many: protectedProcedure
      .input(ZDeleteWorkOrderManySchema)
      .mutation(async ({ ctx, input }) => {
        return await deleteWorkOrders({
          input,
          db: ctx.db,
        });
      }),
  },
  update: {
    withNote: protectedProcedure
      .input(ZUpdateWorkOrderWithNoteSchema)
      .mutation(async ({ ctx, input }) => {
        const { data } = await updateWorkOrder({
          db: ctx.db,
          input: ZUpdateWorkOrderSchema.parse(input),
          id: input.work_order_id,
        });

        if (input.content) {
          const { embedding } = await embed({
            model: openai.embedding("text-embedding-3-small"),
            value: input.text,
          });
          await createNote({
            db: ctx.db,
            input: {
              // @ts-ignore
              embedding: embedding,
              content: JSON.parse(input.content),
              created_by_id: ctx.session.user.id,
              work_order_id: input.work_order_id,
            },
          });
        }
        return data;
      }),
  },

  create: protectedProcedure
    .input(ZCreateWorkOrderSchema)
    .mutation(async ({ ctx, input }) => {
      return await createWorkOrder({
        db: ctx.db,
        input,
      });
    }),
});
