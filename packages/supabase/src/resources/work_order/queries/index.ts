import "server-only";
import type { Client } from "../../../types";

export async function getWorkOrdersByTeam({
  db,
  input,
}: {
  db: Client;
  input: {
    team_identity: string;
    range: {
      from: number;
      to: number;
    };
  };
}) {
  const { data, count } = await db
    .from("work_order")
    .select("*, team!inner(*)", { count: "estimated" })
    .eq("team.identity", input.team_identity)
    .range(input.range.from, input.range.to)
    .throwOnError();

  return { data, count };
}

export async function getWorkOrderById({
  db,
  input,
}: {
  db: Client;
  input: {
    id: string;
  };
}) {
  const { data } = await db
    .from("work_order")
    .select("*, company(*)")
    .eq("id", input.id)
    .single()
    .throwOnError();

  return { data };
}

export async function searchWorkOrder({
  db,
  input,
}: {
  db: Client;
  input: {
    search: string;
    range: {
      from: number;
      to: number;
    };
    team_identity: string;
  };
}) {
  const { data, count } = await db
    .from("work_order")
    .select("*, team!inner(*)", { count: "estimated" })
    .textSearch("name", input.search.replace(/ /g, "%"))
    .eq("team.identity", input.team_identity)
    .range(input.range.from, input.range.to)
    .throwOnError();

  return { data, count };
}
