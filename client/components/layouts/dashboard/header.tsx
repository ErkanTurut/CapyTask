"use client";
import { Icons } from "@/components/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface headerProps {}

export default function Header({}: headerProps) {
  return (
    <div
      className={cn(
        "group/btn sticky top-0 flex h-[49.5px] w-full items-center justify-between border-b border-border p-2 shadow-none backdrop-blur-sm transition-all duration-200",
      )}
    >
      <Breadcrumb className="flex h-7 items-center rounded-md border bg-background p-2 hover:bg-muted/40">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-2">
        <Button size={"sm"} variant={"outline"} className="shadow-none">
          <Icons.chatBubble className="mr-2 h-4 text-muted-foreground" />
          Feedback
        </Button>
        <Button size={"icon"} variant={"ghost"} className="h-7 w-7">
          <Icons.bell className="h-4" />
        </Button>
      </div>
    </div>
  );
}
