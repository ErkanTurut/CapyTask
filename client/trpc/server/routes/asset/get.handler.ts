import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TGetAssetSchema, TSearchAssetSchema } from "./get.schema";
import { TRPCError } from "@trpc/server";

type opts = {
  input: TGetAssetSchema;
  db: SupabaseClient;
};

export async function getAssetByTeamHandler({
  db,
  input,
}: {
  input: {
    team_identity: TGetAssetSchema["team_identity"];
    range: TGetAssetSchema["range"];
  };
  db: SupabaseClient;
}) {
  const { data, count, error } = await db
    .from("asset")
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

export async function getAssetByWorkOrderHandler({
  db,
  input,
}: {
  input: {
    work_order_id: TGetAssetSchema["work_order_id"];
  };
  db: SupabaseClient;
}) {
  const { data, count, error } = await db
    .from("asset")
    .select("*, work_order!inner(id)")
    .eq("work_order.id", input.work_order_id);

  if (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      cause: error,
    });
  }

  return { data, count };
}

export async function getAssetByWorkspaceHandler({
  db,
  input,
}: {
  input: {
    url_key: TGetAssetSchema["url_key"];
    range: TGetAssetSchema["range"];
  };
  db: SupabaseClient;
}) {
  const { data, count, error } = await db
    .from("asset")
    .select("*, workspace!inner(url_key),location(*)", { count: "estimated" })
    .eq("workspace.url_key", input.url_key)
    .range(input.range.start, input.range.end)
    .order("updated_at", { ascending: false })
    .throwOnError();

  if (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      cause: error,
    });
  }

  return { data, count };
}

export const searchAssetHandler = async ({
  input,
  db,
}: {
  input: TSearchAssetSchema;
  db: SupabaseClient;
}) => {
  return await db
    .from("asset")
    .select("*, location(*)")
    .textSearch("name", input.query, {
      type: "websearch",
    });
};
