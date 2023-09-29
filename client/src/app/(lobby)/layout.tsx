import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { user } from "@prisma/client";

import NavBar from "@/components/layouts/siteNav";
import { cookies } from "next/headers";
import { PostgrestError } from "@supabase/supabase-js";
// import { useUser } from "@/components/providers/supabaseUserProvider";

interface LobbyLayoutProps {
  children: React.ReactNode;
}

export default async function LobbyLayout({ children }: LobbyLayoutProps) {
  const supabase = createServerComponentClient({ cookies });

  const { data: user, error }: { data: user | null; error: any } =
    await supabase.from("user").select().single();

  console.log(user);
  return (
    <div className="relative flex min-h-screen flex-col">
      <NavBar user={user} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
