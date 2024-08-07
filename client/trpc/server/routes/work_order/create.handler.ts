import "server-only";

import { Database, SupabaseClient } from "@/lib/supabase/server";
import { assetModel, work_orderModel, work_stepModel } from "@/prisma/zod";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  TCreateWorkOrderSchema,
  TCreateWorkOrderWithItemsSchema,
  ZCreateWorkOrderSchema,
} from "./create.schema";

export async function createWorkOrderHandler({
  input,
  db,
}: {
  input: TCreateWorkOrderWithItemsSchema;
  db: SupabaseClient;
}) {
  const { data: work_plan, error: work_plan_error } = await db
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

  const { data: work_order, error: work_order_error } = await db
    .from("work_order")
    .insert({
      company_id: input.company_id,
      name: input.name,
      description: input.description,
      source: input.source,
      team_id: input.team_id,
      location_id: input.location_id,
      sheduled_start: input.sheduled_start?.toUTCString(),
      sheduled_end: input.sheduled_end?.toUTCString(),
      type: input.type,
      priority: input.priority,
      status: input.status,
      workspace_id: input.workspace_id,
      work_plan_id: work_plan.id,
    })
    .select("*")
    .single();

  if (work_order_error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: work_order_error.message,
    });
  }

  if (input.work_step) {
    const steps = input.work_step.map((step) => {
      return {
        work_plan_id: work_plan.id,
        name: step.name,
        description: step.description,
        parent_step_id: step.parent_step_id,
        work_order_id: work_order.id,
      };
    });

    const { data: work_step, error } = await db
      .from("work_step")
      .upsert(steps)
      .select("*");

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }

    //upsert work order assets for each asset
    if (input.asset && input.asset.length > 0) {
      const assets = input.asset.map((asset) => {
        return {
          asset_id: asset.asset_id,
          work_order_id: work_order.id,
        };
      });
      await db.from("work_order_asset").upsert(assets).select("*");
    }

    console.log("here");

    // upsert work step status for each work step
    const stepStatus = work_step.map((step) => {
      return {
        work_step_id: step.id,
        work_order_id: work_order.id,
      };
    });
    const { data: work_step_item } = await db
      .from("work_step_item")
      .upsert(stepStatus)
      .select("*");

    return {
      work_order,
      work_plan,
      work_step,
      work_step_item,
    };
  }
}
