import type { Metadata } from "next";
import AccountForm from "@/components/forms/settingsForms/account-settings";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { user } from "@prisma/client";
import { Suspense } from "react";

import { PostgrestError } from "@supabase/supabase-js";
import { Shell } from "@/components/shells/shell";

export default async function PreferrencesPage() {
  return <h1>Preferences</h1>;
}
