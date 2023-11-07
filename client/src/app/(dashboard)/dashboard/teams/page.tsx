import type { Metadata } from "next";
import AccountForm from "@/components/forms/settings-forms/account-settings";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { user } from "@prisma/client";
import { Suspense } from "react";

import { PostgrestError } from "@supabase/supabase-js";

export default async function TeamsPage() {
  return <h1>Projects</h1>;
}
