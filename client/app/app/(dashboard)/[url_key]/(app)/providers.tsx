import ResizableGroup from "./_components/resizableGroup";

import { SidebarProvider } from "@/lib/store";
import { cookies } from "next/headers";
import { AI } from "./_components/ai/actions";

export function Providers({ children }: { children: React.ReactNode }) {
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultCollapsed = collapsed
    ? (JSON.parse(collapsed.value) as boolean)
    : undefined;

  return (
    <AI>
      <SidebarProvider isCollapsed={defaultCollapsed || false}>
        <ResizableGroup>{children}</ResizableGroup>
      </SidebarProvider>
    </AI>
  );
}
