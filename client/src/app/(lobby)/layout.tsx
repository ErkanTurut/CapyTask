import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@prisma/client";

import NavBar from "@/components/layouts/navbar";
import { cookies } from "next/headers";
// import { useUser } from "@/components/providers/supabaseUserProvider";

interface LobbyLayoutProps {
  children: React.ReactNode;
}

export default async function LobbyLayout({ children }: LobbyLayoutProps) {
  const supabase = createServerComponentClient({ cookies });
  const { data: user, error } = await supabase.from("User").select().single();

  return (
    <div className="relative flex min-h-screen flex-col">
      <NavBar user={user} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
