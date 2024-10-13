import "server-only";
import type {
  Client,
  Database,
  TablesInsert,
  TablesUpdate,
} from "../../../types";
import { logger } from "@gembuddy/logger";

export async function getUserById({
  db,
  input,
}: {
  db: Client;
  input: {
    id: string;
  };
}) {
  const { data } = await db
    .from("user")
    .select("*")
    .eq("id", input.id)
    .single()
    .throwOnError();

  return { data };
}

export async function getCurrentUser({ db }: { db: Client }) {
  try {
    const result = await db.auth.getUser();
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
