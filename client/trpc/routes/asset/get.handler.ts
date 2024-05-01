import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TGetWorkOrderSchema } from "./get.schema";
import { TRPCError } from "@trpc/server";

type opts = {
  input: TGetWorkOrderSchema;
  db: SupabaseClient;
};

export async function getWorkOrdersByTeamHandler({
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
