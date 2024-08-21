import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TGetWorkOrderSchema } from "./get.schema";
import { TRPCError } from "@trpc/server";
import { unstable_cache } from "next/cache";

type opts = {
  input: TGetWorkOrderSchema;
  db: SupabaseClient;
};

export async function getWorkOrdersByIdentityHandler({
  db,
  input,
}: {
  input: {
    team_identity: TGetWorkOrderSchema["team_identity"];
    range: TGetWorkOrderSchema["range"];
  };
  db: SupabaseClient;
}) {
  const { data, count, error } = await db
    .from("work_order")
    .select("*, team!inner(*)", { count: "estimated" })
    .eq("team.identity", input.team_identity)
    .range(input.range.start, input.range.end)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      cause: error,
    });
  }

  return { data, count };
}

export async function searchWorkOrderHandler({
  input,
  db,
}: {
  input: {
    q: TGetWorkOrderSchema["q"];
    team_identity: TGetWorkOrderSchema["team_identity"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("work_plan_template")
    .select("*, team!inner(*)")
    .eq("team.identity", input.team_identity)
    .textSearch("name", input.q, {
      type: "websearch",
    })
    .throwOnError();
}

export async function getWorkOrderHandler({
  input,
  db,
}: {
  input: {
    id: TGetWorkOrderSchema["id"];
  };
  db: SupabaseClient;
}) {
  return await db.from("work_order").select("*").eq("id", input.id).single();
}

export async function getWorkOrderStepsHandler({
  input,
  db,
}: {
  input: {
    id: TGetWorkOrderSchema["id"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("work_order")
    .select("*, work_step(*)")
    .eq("id", input.id)
    .order("step_order", {
      referencedTable: "work_step",
    })
    .single()
    .throwOnError();
}

export async function getWorkOrderStatusHandler({
  input,
  db,
}: {
  input: {
    id: TGetWorkOrderSchema["id"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("work_order")
    .select("status")
    .eq("id", input.id)
    .single()
    .throwOnError();
}

export async function getWorkOrderDetailHandler({
  input,
  db,
}: {
  input: {
    id: TGetWorkOrderSchema["id"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("work_order")
    .select("*, company(*)")
    .eq("id", input.id)
    .single()
    .throwOnError();
}
