import { SidebarNav } from "@/components/layouts/app-sidebar";
import { Shell } from "@/components/shells/shell";
import { getCurrentUser } from "@/lib/services/user";
import { getWorkspace } from "@/lib/services/workspace";
import { redirect } from "next/navigation";
import { serverClient } from "@/trpc";

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
  const { data: user } = await getCurrentUser();

  if (!user) {
    redirect("/signin");
  }

  // const { data, error } = await getWorkspace(params.url_key);
  // const workspace = await serverClient.workspace.getWorkspaceById.query({
  //   url_key: params.url_key,
  // });

  // if (!data || error || !data.length) {
  //   redirect("/create");
  // }
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
        <SidebarNav props={{ url_key: params.url_key }} />
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
