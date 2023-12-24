"use client";
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/supabase.types";

export default async function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
