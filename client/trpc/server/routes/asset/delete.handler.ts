import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TAssetDeleteSchema } from "./delete.schema";

type opts = {
  input: TAssetDeleteSchema;
  db: SupabaseClient;
};

export const deleteAssetHandler = async ({ input, db }: opts) => {
  await db
    .from("asset")
    .delete()
    .in("asset_id", [input.asset_id])
    .throwOnError();
};
