import { cookies } from "next/headers";

import Header from "@/components/layouts/dashboard/header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "@/components/dashboard/sidebar/sidebar";

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
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultCollapsed = collapsed
    ? (JSON.parse(collapsed.value) as boolean)
    : undefined;
  const defaultLayout = layout
    ? (JSON.parse(layout.value) as number[])
    : undefined;
  // grid-cols-[13rem,1fr]
  return (
    <div className="grid h-dvh grid-cols-[13rem,1fr] bg-muted/40 p-1 transition-all duration-1000">
      <Sidebar className="" params={params} />
      <main className="flex flex-col overflow-x-hidden rounded-md border bg-background">
        <Header />
        <ScrollArea className="flex-1">{children}</ScrollArea>
      </main>
    </div>
  );
}
