"use client";
import { Icons } from "@/components/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@gembuddy/ui/breadcrumb";
import { Button } from "@gembuddy/ui/button";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@gembuddy/ui/sidebar";
import { Separator } from "@gembuddy/ui/separator";

interface headerProps {}

export default function Header({}: headerProps) {
  return (
    // <div
    //   className={cn(
    //     "sticky top-0 flex h-[49.5px] w-full items-center justify-between border-b border-border p-2 shadow-none backdrop-blur-sm transition-all duration-200",
    //   )}
    // >
    //   <SidebarTrigger />
    //   <Breadcrumb className="flex h-7 items-center rounded-md border bg-background p-2 hover:bg-muted/40">
    //     <BreadcrumbList>
    //       <BreadcrumbItem>
    //         <BreadcrumbLink href="/">Home</BreadcrumbLink>
    //       </BreadcrumbItem>
    //       <BreadcrumbSeparator />
    //       <BreadcrumbItem>
    //         <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    //       </BreadcrumbItem>
    //       <BreadcrumbSeparator />
    //       <BreadcrumbItem>
    //         <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    //       </BreadcrumbItem>
    //     </BreadcrumbList>
    //   </Breadcrumb>
    //   <div className="flex items-center gap-2">
    //     <Button size={"sm"} variant={"ghost"} className="shadow-none">
    //       <Icons.chatBubble className="mr-2 h-4 text-muted-foreground" />
    //       Feedback
    //     </Button>
    //     <Button size={"icon"} variant={"ghost"} className="h-7 w-7">
    //       <Icons.bell className="h-4" />
    //     </Button>
    //   </div>
    // </div>

    <header className="flex h-11 shrink-0 items-center gap-2 w-full border-b sticky top-0 z-50">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
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
