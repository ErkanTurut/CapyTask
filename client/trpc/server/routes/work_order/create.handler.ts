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
import { nanoid } from "nanoid";

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

  if (input.asset && input.asset.length > 0) {
    const assets = input.asset.map((asset) => {
      return {
        asset_id: asset.id,
        work_order_id: work_order.id,
      };
    });
    await db.from("work_order_asset").upsert(assets);

    const assetSteps = input.asset.flatMap((asset) => {
      if (asset.work_step) {
        return asset.work_step.map((step) => {
          return {
            name: step.name,
            description: step.description,
            step_order: step.step_order,
            parent_step_id: step.parent_step_id,
            work_order_id: work_order.id,
            work_plan_id: work_plan.id,
            work_step_template_id: step.work_step_template_id,
            asset_id: asset.id,
          };
        });
      }
      return [];
    });

    const { data: work_step, error: work_step_error } = await db
      .from("work_step")
      .upsert(assetSteps)
      .select("*");
  }

  return {
    work_order,
    work_plan,
  };
}
