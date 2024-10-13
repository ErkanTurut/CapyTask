import "server-only";

import type { Client, Database } from "../../../types";

export async function getCompany({
  db,
  input,
}: {
  db: Client;
  input: {
    id: string;
  };
}) {
  const { data } = await db
    .from("company")
    .select()
    .eq("id", input.id)
    .single()
    .throwOnError();

  return { data };
}

export async function getCompanyByWorkspace({
  db,
  input,
}: {
  db: Client;
  input: {
    url_key: string;
    range: {
      from: number;
      to: number;
    };
  };
}) {
  const { data, count } = await db
    .from("company")
    .select("*, workspace(url_key)")
    .eq("workspace.url_key", input.url_key)
    .range(input.range.from, input.range.to)
    .throwOnError();

  return { data, count };
}

export async function searchCompany({
  db,
  input,
}: {
  db: Client;
  input: {
    search: string;
  };
}) {
  const { data } = await db
    .from("company")
    .select()
    .textSearch("name", input.search.replace(/ /g, "%"), {
      type: "websearch",
    })
    .throwOnError();
  return { data };
}
