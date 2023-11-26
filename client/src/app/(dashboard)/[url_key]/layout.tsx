import { SidebarNav } from "@/components/layouts/app-sidebar";
import { Shell } from "@/components/shells/shell";
import { getUserSession } from "@/lib/services/user";
import { getWorkspace, getWorkspaces } from "@/lib/services/workspace";
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
  const {
    data: { session },
  } = await getUserSession();

  if (!session) {
    redirect("/signin");
  }

  const { data, error } = await getWorkspace(params.url_key);
  if (!data || error || !data.length) {
    redirect("/create");
  }
  // console.log("===>", data);
  // if (data?.length) {
  //   redirect(`/${params.url_key}/team`);
  // } else {
  //   redirect("/create");
  // }
  // redirect(`/${params.url_key}/team`);

  return (
    <div className="relative mx-auto flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full flex-1 gap-2 lg:gap-1">
        <SidebarNav
          props={{ user_id: session.user.id, url_key: params.url_key }}
        />
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
