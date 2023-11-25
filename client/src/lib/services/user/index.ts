import "server-only";

import { Database } from "@/types/supabase.types";
import type { user } from "@prisma/client";
import { PostgrestError } from "@supabase/supabase-js";
import {
  unstable_noStore as noStore,
  unstable_cache as cache,
  revalidateTag,
} from "next/cache";
import createSupabaseServerClient from "@/lib/supabase/server";

export const getUserSession = async () => {
  const supabase = await createSupabaseServerClient();
  return supabase.auth.getSession();
};

export const getUser = cache(
  async (user_id: string) => {
    const supabase = await createSupabaseServerClient();
    const { data: user, error } = await supabase
      .from("user")
      .select()
      .eq("id", user_id)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
  ["user"],
  {
    tags: ["user"],
    revalidate: 60,
  }
);
