import "server-only";

import { unstable_cache as cache } from "next/cache";
import { SupabaseClient } from "@/lib/supabase/server";
import { sleep } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { TGetUserSchema } from "./getUser.schema";
import { cookies } from "next/headers";

type opts = {
  input: TGetUserSchema;
  db: SupabaseClient;
};

export const getUserHandler = async ({ input, db }: opts) => {
  return await db
    .from("user")
    .select("*")
    .eq("id", input.id)
    .single()
    .throwOnError();
};
