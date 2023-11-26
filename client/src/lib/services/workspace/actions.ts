"use server";

import { z } from "zod";
import { createWorkspaceSchema } from "@/lib/validations/workspace";
import createSupabaseServerClient from "@/lib/supabase/server";
import type { PostgrestResponse } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import type { NextResponse } from "next/server";

export async function createWorkspace({
  name,
  urlKey,
}: z.infer<typeof createWorkspaceSchema>) {
  try {
    const validatedData = createWorkspaceSchema.parse({
      name,
      urlKey,
    });

    const supabase = await createSupabaseServerClient();

    return await supabase
      .from("workspace")
      .insert({ name: validatedData.name, url_key: validatedData.urlKey })
      .single();
  } catch (err) {
    throw new Error("An unknown error occurred");
  }
}
