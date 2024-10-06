import "server-only";

import type { Client, TablesInsert, TablesUpdate } from "../../../types";

export async function createAsset({
  db,
  input,
}: {
  input: TablesInsert<"asset">;
  db: Client;
}) {
  const { data } = await db
    .from("asset")
    .insert(input)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function updateAsset({
  db,
  input,
  id,
}: {
  db: Client;
  input: TablesUpdate<"asset">;
  id: string;
}) {
  const { data } = await db
    .from("asset")
    .update(input)
    .eq("id", id)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function deleteAsset(
  db: Client,
  input: {
    assets: {
      asset_id: string;
    }[];
  }
) {
  const { status } = await db
    .from("asset")
    .delete()
    .in("asset_id", [input.assets.map((asset) => asset.asset_id)])
    .throwOnError();

  return { status };
}
