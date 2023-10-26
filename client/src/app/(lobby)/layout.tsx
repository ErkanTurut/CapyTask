import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import NavBar from "@/components/layouts/navbar";
import { cookies } from "next/headers";

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
