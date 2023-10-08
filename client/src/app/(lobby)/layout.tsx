import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { user } from "@prisma/client";

import NavBar from "@/components/layouts/siteNav";
import { cookies } from "next/headers";

import { getUser } from "@/hooks/useUser";
import { Suspense } from "react";
import { PostgrestError } from "@supabase/supabase-js";

interface LobbyLayoutProps {
  children: React.ReactNode;
}

export default async function LobbyLayout({ children }: LobbyLayoutProps) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="relative flex min-h-screen flex-col">
      <NavBar user={user} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
