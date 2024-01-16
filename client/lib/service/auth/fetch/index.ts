import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";

export const getSession = async (supabase: SupabaseClient) => {
  return supabase.auth.getSession();
};
