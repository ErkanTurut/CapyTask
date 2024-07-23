import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TGetLocationSchema } from "./get.schema";
import { TRPCError } from "@trpc/server";

type opts = {
  input: TGetLocationSchema;
  db: SupabaseClient;
};

export async function getLocationByWorkspaceHandler({
  db,
  input,
}: {
  input: {
    url_key: TGetLocationSchema["url_key"];
    range: TGetLocationSchema["range"];
  };
  db: SupabaseClient;
}) {
  const { data, count, error } = await db
    .from("location")
    .select("*, location(*), workspace!inner(*)", { count: "estimated" })
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
