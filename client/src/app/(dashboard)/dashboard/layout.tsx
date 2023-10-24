import { SidebarNav } from "@/components/layouts/sidebarNav";
import { prefetchUser } from "@/hooks/useUser";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const dehydratedState = async (user_id: string) => {
    return await prefetchUser(user_id);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* <AppNav user={user} /> */}
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 ">
        <HydrationBoundary state={dehydratedState(user.id)}>
          <aside className="fixed p-2 px-4 z-30 -ml-2 hidden h-full w-full shrink-0  overflow-y-auto border-r md:sticky md:block bottom-0">
            <SidebarNav user={user} />
          </aside>
          <main className="flex container w-full flex-col overflow-hidden">
            {children}
          </main>
        </HydrationBoundary>
      </div>
      {/* <SiteFooter /> */}
    </div>
  );
}
