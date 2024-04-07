import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TGetInspectionSchema } from "./get.schema";
import { TRPCError } from "@trpc/server";

type opts = {
  input: TGetInspectionSchema;
  db: SupabaseClient;
};

export async function getInspectionsByIdentityHandler({
  db,
  input,
}: {
  input: {
    team_identity: TGetInspectionSchema["team_identity"];
    range: TGetInspectionSchema["range"];
  };
  db: SupabaseClient;
}) {
  const { data, count, error } = await db
    .from("inspection")
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

export async function searchInspectionHandler({
  input,
  db,
}: {
  input: {
    q: TGetInspectionSchema["q"];
    team_identity: TGetInspectionSchema["team_identity"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("inspection_template")
    .select("*, team!inner(*)")
    .eq("team.identity", input.team_identity)
    .textSearch("name", input.q, {
      type: "websearch",
    })
    .throwOnError();
}

export async function getInspectionHandler({
  input,
  db,
}: {
  input: {
    id: TGetInspectionSchema["id"];
  };
  db: SupabaseClient;
}) {
  return await db.from("inspection").select("*").eq("id", input.id).single();
}

export async function getInspectionStepsHandler({
  input,
  db,
}: {
  input: {
    id: TGetInspectionSchema["id"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("inspection")
    .select(
      "*, step(*, step_template_snapshot(id,name, description, step_order))",
    )
    .eq("id", input.id)
    .single();
}
