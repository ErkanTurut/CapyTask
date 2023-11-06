import { SidebarNav } from "@/components/layouts/app-sidebar";
import { Shell } from "@/components/shells/shell";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
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

  return (
    <div className=" relative mx-auto flex min-h-screen w-full flex-col items-center justify-center p-4">
      <div className="flex w-full flex-1 gap-6 lg:gap-8">
        <Shell
          variant="sidebar"
          className="hidden max-h-[calc(100vh)] w-[230px] shrink-0 lg:sticky lg:top-28 lg:block"
          as={"aside"}
        >
          <SidebarNav user_id={user.id} />
        </Shell>

        <main className="z-10 flex w-full flex-1 flex-col items-start justify-center">
          <Shell
            variant="sidebar"
            className="relative flex-1  overflow-x-hidden"
          >
            {children}
          </Shell>
        </main>
      </div>
      {/* <SiteFooter /> */}
    </div>
  );
}
