import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TGetInspcetionSchema } from "./get.schema";

type opts = {
  input: TGetInspcetionSchema;
  db: SupabaseClient;
};

export async function getInspectionsByIdentityHandler({
  db,
  input,
}: {
  input: {
    team_identity: TGetInspcetionSchema["team_identity"];
    range: TGetInspcetionSchema["range"];
  };
  db: SupabaseClient;
}) {
  return await db
    .from("inspection")
    .select("*, team!inner(*)", { count: "estimated" })
    .eq("team.identity", input.team_identity)
    .range(input.range.start, input.range.end)
    .order("updated_at", { ascending: false })
    .throwOnError();
}
