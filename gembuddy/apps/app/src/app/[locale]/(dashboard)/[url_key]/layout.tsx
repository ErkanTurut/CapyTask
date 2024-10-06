import { cookies } from "next/headers";

import Header from "@/components/layouts/dashboard/header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "@/components/dashboard/sidebar/sidebar";
import { trpc } from "@gembuddy/trpc/server";
import { notFound, redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: {
    url_key: string;
  };
}

export default async function Layout({
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

  const { data, error } = await trpc.db.workspace.getByUrlKey({
    url_key: params.url_key,
  });

  if (!data) {
    throw notFound();
  }

  return (
    <div className="grid h-dvh bg-muted/40 p-1 transition-[width] duration-1000 md:grid-cols-[13rem,1fr]">
      <Sidebar params={params} />
      <main className="flex w-full flex-col overflow-x-hidden rounded-md border bg-background">
        <Header />
        <div className="flex-1 overflow-hidden">{children}</div>
      </main>
    </div>
  );
}
