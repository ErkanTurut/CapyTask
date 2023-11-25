import { SidebarNav } from "@/components/layouts/app-sidebar";
import { Shell } from "@/components/shells/shell";
import { getUserSession } from "@/lib/services/user";
import { getWorkspace } from "@/lib/services/workspace";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: {
    url_key: string;
  };
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { data } = await getUserSession();

  if (!data.session) {
    redirect("/signin");
  }

  const { workspace } = await getWorkspace(params.url_key);
  if (!workspace) {
    redirect("/create");
  }

  return (
    <div className="relative mx-auto flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full flex-1 gap-2 lg:gap-1">
        <SidebarNav user_id={data.session.user.id} />
        <main className="z-10 flex w-full flex-1 flex-col items-start justify-center">
          <Shell
            variant="sidebar"
            className="relative flex-1 flex-col overflow-x-hidden  lg:ml-0 backdrop-blur-[1px]"
          >
            {children}
          </Shell>
        </main>
      </div>

      {/* <SiteFooter /> */}
    </div>
  );
}
