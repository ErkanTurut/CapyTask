import { redirect } from "next/navigation";
import { getSession } from "@/lib/service/auth/fetch";
import { WorkspaceProvider, UserProvider, TeamProvider } from "@/lib/store";
import { getUser } from "@/lib/service/user/fetch";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { url_key: string };
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
    error,
  } = await getSession(supabase);
  if (!session?.user || error) {
    redirect("/login");
  }

  return <>{children}</>;
}
