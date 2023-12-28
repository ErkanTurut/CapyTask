import { cookies } from "next/headers";

import App from "./_components/app";
import { getTeamsByUrlKey } from "@/lib/services/team";
import { Sidebar } from "./_components/sidebar";
import ResizableGroup from "./_components/resizable-group";
import Resizable from "./_components/resizable-main";
import SidebarResizable from "./_components/resizable-panel-sidebar";
import { getWorkspace } from "@/lib/services/workspace";

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
  const { data } = await getTeamsByUrlKey(params.url_key);

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  return (
    <div className="min-h-screen">
      {modal}
      <App
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={4}
        teams={data ? data.team : null}
      >
        {children}
      </App>
    </div>
  );
}
