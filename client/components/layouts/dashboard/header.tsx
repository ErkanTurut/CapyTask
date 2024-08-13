"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useWindowScroll } from "@/lib/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface headerProps {}

export default function Header({}: headerProps) {
  const [{ y }] = useWindowScroll();
  const _isScroll = useMemo(() => y && y > 4, [y]);
  return (
    <div
      className={cn(
        "sticky top-0 z-50 flex w-full border-b border-transparent p-2 shadow-none transition-all duration-200 hover:border-border",
        _isScroll && "border-border bg-background shadow",
      )}
    >
      <Breadcrumb className="flex h-7 items-center rounded-md border p-2 hover:bg-muted/40">
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
    </div>
  );
}
