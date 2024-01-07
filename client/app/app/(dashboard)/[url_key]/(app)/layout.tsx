import { cookies } from "next/headers";

import { getTeamsByUrlKey } from "@/lib/service/team/fetch";
import App from "./_components/app";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ResizablePanel } from "@/components/ui/resizable";
import { Shell } from "@/components/shells";
import Resizable from "./_components/rezisable";
import ResizableGroup from "./_components/resizableGroup";
import { Sidebar } from "./_components/sidebar";
import UserAccountNav from "@/components/user/user-account-nav";
import { getSession } from "@/lib/service/auth/fetch";
import { getUser } from "@/lib/service/user/fetch";
import { Suspense } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: {
    url_key: string;
  };
}

export default async function DashboardLayout({
  children,
  params,
  modal,
}: DashboardLayoutProps) {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  const { data: teams } = await getTeamsByUrlKey(params.url_key);

  const {
    data: { session },
    error,
  } = await getSession();
  const { data: user } = await getUser(session!.user.id);
  return (
    <div className="min-h-screen">
      {modal}
      <TooltipProvider delayDuration={0}>
        <ResizableGroup>
          <Sidebar
            defaultLayout={defaultLayout}
            defaultCollapsed={defaultCollapsed}
            teams={teams?.team || []}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <UserAccountNav className="w-full" user={user!} />
            </Suspense>
          </Sidebar>
          <Resizable defaultLayout={defaultLayout}>{children}</Resizable>
        </ResizableGroup>
      </TooltipProvider>
    </div>
  );
}
