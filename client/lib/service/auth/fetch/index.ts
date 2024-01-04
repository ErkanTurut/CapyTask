import "server-only";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const getSession = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return supabase.auth.getSession();
};
