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
}
