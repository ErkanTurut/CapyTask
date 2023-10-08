import type { Metadata } from "next";
import AccountForm from "@/components/forms/settingsForms/accountSettings";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { user } from "@prisma/client";
import { Suspense } from "react";

import { PostgrestError } from "@supabase/supabase-js";

export default async function PreferrencesPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return (
    <Suspense fallback={<h1>loading</h1>}>
      <AccountForm user_id={user.id} />
    </Suspense>
  );
}
