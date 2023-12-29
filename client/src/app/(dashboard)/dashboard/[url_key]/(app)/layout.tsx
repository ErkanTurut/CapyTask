import { cookies } from "next/headers";

import { getTeamsByUrlKey } from "@/lib/services/team";
import App from "./_components/app";

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
        navCollapsedSize={3}
        teams={data ? data.team : null}
      >
        {children}
      </App>
    </div>
  );
}
