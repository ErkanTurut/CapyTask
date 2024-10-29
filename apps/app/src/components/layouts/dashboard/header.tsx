import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@gembuddy/ui/breadcrumb";
import { Button } from "@gembuddy/ui/button";
import { Separator } from "@gembuddy/ui/separator";
import { SidebarTrigger } from "@gembuddy/ui/sidebar";

interface headerProps {
  children?: React.ReactNode;
}

export default async function Header({ children }: headerProps) {
  return (
    <header className="flex h-11 shrink-0 items-center gap-2 w-full border-b sticky top-0 z-50">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {children}
        <div className="ml-auto flex items-center gap-2">
          <Button size={"sm"} variant={"ghost"} className="shadow-none">
            <Icons.chatBubble className="mr-2 h-4 text-muted-foreground" />
            Feedback
          </Button>
          <Button size={"icon"} variant={"ghost"} className="h-7 w-7">
            <Icons.bell className="h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
