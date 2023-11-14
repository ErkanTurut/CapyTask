import type { Metadata } from "next";
import AccountForm from "@/components/forms/settings-forms/account-settings";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { user } from "@prisma/client";
import { Suspense } from "react";
import { redirect } from "next/navigation";

import { getTeam } from "@/lib/services/team";
export default async function TeamsPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  return <h1>Teams</h1>;
}
