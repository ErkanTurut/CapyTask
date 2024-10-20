import "server-only";

import type { Client, Database } from "../../../types";

export type getAssetsParams = {
  team_identity: string;
  range: { from: number; to: number };
};

export async function getAssetsByTeam({
  db,
  input,
}: {
  db: Client;
  input: getAssetsParams;
}) {
  const { data, count, error } = await db
    .from("asset")
    .select("*, team!inner(*)", { count: "estimated" })
    .eq("team.identity", input.team_identity)
    .range(input.range.from, input.range.to)
    .order("updated_at", { ascending: false })
    .throwOnError();

  return { data, count };
}

export async function getAssetsByWorkOrder({
  db,
  input,
}: {
  input: {
    work_order_id: string;
  };
  db: Client;
}) {
  const { data, count, error } = await db
    .from("asset")
    .select("*, work_order!inner(id)")
    .eq("work_order.id", input.work_order_id)
    .throwOnError();

  return { data, count };
}

export async function getAssetByWorkspace({
  db,
  input,
}: {
  input: {
    url_key: string;
    range: { from: number; to: number };
  };
  db: Client;
}) {
  const { data, count } = await db
    .from("asset")
    .select("*, workspace!inner(url_key),location(*)", { count: "estimated" })
    .eq("workspace.url_key", input.url_key)
    .range(input.range.from, input.range.to)
    .order("updated_at", { ascending: false })
    .throwOnError();

  return { data, count };
}

export const searchAsset = async ({
  input,
  db,
}: {
  input: { search: string };
  db: Client;
}) => {
  const {data}= await db
    .from("asset")
    .select("*, location(*)")
    .textSearch("name", input.search.replace(/ /g, "%"), {
      type: "websearch",
    }).throwOnError();

  return { data};
};
