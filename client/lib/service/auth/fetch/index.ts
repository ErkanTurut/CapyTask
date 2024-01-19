import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { cache } from "react";

export const getSession = cache(async (supabase: SupabaseClient) => {
  return supabase.auth.getSession();
});
