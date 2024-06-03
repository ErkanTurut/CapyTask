import { protectedProcedure, router } from "@/trpc/trpc";
import {
  getWorkOrderDetailHandler,
  getWorkOrderHandler,
  getWorkOrderStatusHandler,
  getWorkOrderStepsHandler,
  getWorkOrdersByIdentityHandler,
  searchWorkOrderHandler,
} from "./get.handler";
import { ZGetWorkOrderSchema } from "./get.schema";
import { ZCreateWorkOrderSchema } from "./create.schema";
import { ZDeleteWorkOrderSchema } from "./delete.schema";
import { deleteWorkOrderHandler } from "./delete.handler";
import { updateWorkOrderStatusHandler } from "./update.handler";
import { ZUpdateWorkOrderSchema } from "./update.schema";
import {
  work_orderModel,
  Relatedwork_orderModel,
  work_plan_templateModel,
  work_planModel,
  work_stepModel,
  work_step_statusModel,
} from "@/prisma/zod";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Database } from "@/types/supabase.types";
export const work_order = router({
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
    status: protectedProcedure
      .input(ZGetWorkOrderSchema.pick({ id: true }))
      .query(async ({ ctx, input }) => {
        const { data } = await getWorkOrderStatusHandler({
          input,
          db: ctx.db,
        });
        return data;
      }),
    detail: protectedProcedure
      .input(ZGetWorkOrderSchema.pick({ id: true }))
      .query(async ({ ctx, input }) => {
        return await getWorkOrderDetailHandler({
          input,
          db: ctx.db,
        });
      }),
  },
  // create: protectedProcedure
  //   .input(ZCreateWorkOrderSchema)
  //   .mutation(async ({ ctx, input }) => {
  //     // return await createWorkOrderHandler({
  //     //   input,
  //     //   db: ctx.db,
  //     // });
  //   }),
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
  create: {
    withTemplate: protectedProcedure
      .input(
        z.object({
          name: z.string(),
          description: z.string(),
          work_plan_template_id: z.string(),
          team_id: z.string(),
          company_id: z.string(),
          location_id: z.string(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        let work_plan = null as
          | Database["public"]["Tables"]["work_plan"]["Row"]
          | null;

        const { data: work_order, error } = await ctx.db
          .from("work_order")
          .insert({
            name: input.name,
            team_id: input.team_id,
            description: input.description,
            company_id: input.company_id,
            location_id: input.location_id,
          })
          .select("*")
          .single();

        if (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        }

        const { data: work_plan_template } = await ctx.db
          .from("work_plan_template")
          .select("*")
          .eq("id", input.work_plan_template_id)
          .single();

        if (!work_plan_template) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Work plan template not found",
          });
        }

        const { data } = await ctx.db
          .from("work_plan")
          .select("*")
          .eq("work_plan_template_id", input.work_plan_template_id)
          .eq("created_at", work_plan_template.updated_at)
          .single();

        work_plan = data;

        if (!work_plan) {
          const { data, error } = await ctx.db
            .from("work_plan")
            .insert({
              name: work_plan_template.name,
              team_id: input.team_id,
              work_plan_template_id: work_plan_template.id,
              description: work_plan_template.description,
              created_at: work_plan_template.updated_at,
              updated_at: work_plan_template.updated_at,
            })
            .select("*")
            .single();
          if (error) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: error.message,
            });
          }
          work_plan = data;
        }

        const { data: work_step_template } = await ctx.db
          .from("work_step_template")
          .select("*")
          .eq("work_plan_template_id", work_plan_template.id);

        if (work_step_template) {
          const steps = work_step_template.map((step) => {
            return {
              ...step,
              work_plan_id: work_plan.id,
            };
          });
          const { data: work_step, error } = await ctx.db
            .from("work_step")
            .upsert(steps)
            .select("*");

          if (error) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: error.message,
            });
          }

          const stepStatus = work_step.map((step) => {
            return {
              work_step_id: step.id,
              work_order_id: work_order.id,
            };
          });
          const { data: work_step_status } = await ctx.db
            .from("work_step_status")
            .upsert(stepStatus)
            .select("*");
        }
      }),
    withSteps: protectedProcedure
      .input(
        z.object({
          name: z.string(),
          description: z.string(),
          work_step: z.array(work_stepModel),
          team_id: z.string(),
          company_id: z.string(),
          location_id: z.string(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { data: work_order, error } = await ctx.db
          .from("work_order")
          .insert({
            name: input.name,
            team_id: input.team_id,
            description: input.description,
            company_id: input.company_id,
            location_id: input.location_id,
          })
          .select("*")
          .single();

        if (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        }

        const { data: work_plan, error: work_plan_error } = await ctx.db
          .from("work_plan")
          .insert({
            name: input.name,
            description: input.description,
            team_id: input.team_id,
          })
          .select("*")
          .single();

        if (work_plan_error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: work_plan_error.message,
          });
        }

        if (input.work_step) {
          const steps = input.work_step.map((step) => {
            return {
              ...step,
              work_plan_id: work_plan.id,
            };
          });
          const { data: work_step, error } = await ctx.db
            .from("work_step")
            .upsert(steps)
            .select("*");

          if (error) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: error.message,
            });
          }

          // upsert work step status for each work step
          const stepStatus = work_step.map((step) => {
            return {
              work_step_id: step.id,
              work_order_id: work_order.id,
            };
          });
          const { data: work_step_status } = await ctx.db
            .from("work_step_status")
            .upsert(stepStatus)
            .select("*");
        }
      }),
  },

  // t: protectedProcedure
  //   .input(
  //     z.object({
  //       name: z.string(),
  //       description: z.string(),
  //       work_plan_template_id: z.string().optional(),
  //       team_id: z.string(),
  //       work_step: z.array(work_stepModel).optional(),
  //       company_id: z.string(),
  //       location_id: z.string().optional(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     let work_plan = null as
  //       | Database["public"]["Tables"]["work_plan"]["Row"]
  //       | null;

  //     const { data: work_order, error } = await ctx.db
  //       .from("work_order")
  //       .insert({
  //         name: input.name,
  //         team_id: input.team_id,
  //         description: input.description,
  //         company_id: input.company_id,
  //         location_id: input.location_id,
  //       })
  //       .select("*")
  //       .single();

  //     if (error) {
  //       throw new TRPCError({
  //         code: "INTERNAL_SERVER_ERROR",
  //         message: error.message,
  //       });
  //     }

  //     if (input.work_plan_template_id) {
  //       const { data: work_plan_template } = await ctx.db
  //         .from("work_plan_template")
  //         .select("*")
  //         .eq("id", input.work_plan_template_id)
  //         .single();

  //       if (!work_plan_template) {
  //         throw new TRPCError({
  //           code: "INTERNAL_SERVER_ERROR",
  //           message: "Work plan template not found",
  //         });
  //       }

  //       const { data } = await ctx.db
  //         .from("work_plan")
  //         .select("*")
  //         .eq("work_plan_template_id", input.work_plan_template_id)
  //         .eq("created_at", work_plan_template.updated_at)
  //         .single();

  //       work_plan = data;

  //       if (!work_plan) {
  //         const { data, error } = await ctx.db
  //           .from("work_plan")
  //           .insert({
  //             name: work_plan_template.name,
  //             team_id: input.team_id,
  //             work_plan_template_id: work_plan_template.id,
  //             description: work_plan_template.description,
  //             created_at: work_plan_template.updated_at,
  //             updated_at: work_plan_template.updated_at,
  //           })
  //           .select("*")
  //           .single();
  //         if (error) {
  //           throw new TRPCError({
  //             code: "INTERNAL_SERVER_ERROR",
  //             message: error.message,
  //           });
  //         }
  //         work_plan = data;
  //       }

  //       if (!work_plan) {
  //         throw new TRPCError({
  //           code: "INTERNAL_SERVER_ERROR",
  //           message: "Work plan not found",
  //         });
  //       }

  //       const { data: work_step_template } = await ctx.db
  //         .from("work_step_template")
  //         .select("*")
  //         .eq("work_plan_template_id", work_plan_template.id);

  //       if (work_step_template) {
  //         const steps = work_step_template.map((step) => {
  //           return {
  //             ...step,
  //             work_plan_id: work_plan!.id,
  //           };
  //         });
  //         const { data: work_step, error } = await ctx.db
  //           .from("work_step")
  //           .upsert(steps)
  //           .select("*");

  //         if (error) {
  //           throw new TRPCError({
  //             code: "INTERNAL_SERVER_ERROR",
  //             message: error.message,
  //           });
  //         }

  //         const stepStatus = work_step.map((step) => {
  //           return {
  //             work_step_id: step.id,
  //             work_order_id: work_order.id,
  //           };
  //         });
  //         const { data: work_step_status } = await ctx.db
  //           .from("work_step_status")
  //           .upsert(stepStatus)
  //           .select("*");
  //       }
  //     } else {
  //       const { data: work_plan, error } = await ctx.db
  //         .from("work_plan")
  //         .insert({
  //           name: input.name,
  //           description: input.description,
  //           team_id: input.team_id,
  //         })
  //         .select("*")
  //         .single();

  //       if (error) {
  //         throw new TRPCError({
  //           code: "INTERNAL_SERVER_ERROR",
  //           message: error.message,
  //         });
  //       }

  //       if (input.work_step) {
  //         const steps = input.work_step.map((step) => {
  //           return {
  //             ...step,
  //             work_plan_id: work_plan.id,
  //           };
  //         });
  //         const { data: work_step, error } = await ctx.db
  //           .from("work_step")
  //           .upsert(steps)
  //           .select("*");

  //         if (error) {
  //           throw new TRPCError({
  //             code: "INTERNAL_SERVER_ERROR",
  //             message: error.message,
  //           });
  //         }

  //         // upsert work step status for each work step
  //         const stepStatus = work_step.map((step) => {
  //           return {
  //             work_step_id: step.id,
  //             work_order_id: work_order.id,
  //           };
  //         });
  //         const { data: work_step_status } = await ctx.db
  //           .from("work_step_status")
  //           .upsert(stepStatus)
  //           .select("*");
  //       }
  //     }
  //     return { work_order, work_plan };
  //   }),
});

// DECLARE
//     work_plan_id TEXT;
//     work_plan_created_at TIMESTAMP WITH TIME ZONE;
// BEGIN
//     -- Fetch creation timestamp from the work plan template
//     SELECT updated_at INTO work_plan_created_at
//     FROM work_plan_template
//     WHERE id = work_plan_template_id_param;

//     -- Check if a snapshot already exists for the given work plan template
//     SELECT id INTO work_plan_id
//     FROM work_plan
//     WHERE work_plan.work_plan_template_id = work_plan_template_id_param
//     AND work_plan.created_at = work_plan_created_at;

//     -- If snapshot doesn't exist, create a new one
//     IF work_plan_id IS NULL THEN
//         INSERT INTO work_plan (id, work_plan_template_id,team_id, name, description, created_at, updated_at)
//         SELECT nanoid(10), work_plan_template_id_param, team_id, name, description, work_plan_created_at, work_plan_created_at
//         FROM work_plan_template
//         WHERE id = work_plan_template_id_param
//         RETURNING id INTO work_plan_id;

//         -- Call create_step_template_snapshot function
//         PERFORM create_work_step(work_plan_template_id_param, work_plan_id);

//     END IF;

//     RETURN work_plan_id;

// END;

// BEGIN
//     -- Copy step_template records linked to the inspection_template
//     INSERT INTO work_step (id, name, description, created_at, updated_at, parent_step_id, created_by_id, step_order, work_plan_id)
//     SELECT nanoid(17),
//            name,
//            description,
//            created_at,
//            updated_at,
//            parent_step_id,
//            created_by_id,
//            step_order,
//            work_plan_id
//     FROM work_step_template
//     WHERE work_step_template.work_plan_template_id = work_plan_template_id_param;
// END;
