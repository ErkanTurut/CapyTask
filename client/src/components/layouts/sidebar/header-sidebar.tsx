"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { SidebarNavItem } from "@/types";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { getTeam } from "@/lib/services/team";

export interface HeaderSidebarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarNavItem;
}

export function HeaderSidebar({
  items,
  className,
  ...props
}: HeaderSidebarProps) {
  const pathname = usePathname();

  return (
    <span className={cn("flex w-full gap-1 flex-col", className)} {...props}>
      {items.header.map((headerItem, headerIndex) => {
        const Icon = headerItem.icon ? Icons[headerItem.icon] : null;
        return headerItem.href ? (
          <Link
            aria-label={headerItem.title}
            key={headerIndex}
            href={headerItem.href}
            target={headerItem.external ? "_blank" : ""}
            rel={headerItem.external ? "noreferrer" : ""}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              pathname === headerItem.href ? "bg-muted font-bold" : "",
              "justify-start",
              headerItem.disabled && "pointer-events-none opacity-60"
            )}
          >
            {Icon && <Icon className="mr-2 w-4 h-4" aria-hidden="true" />}
            {headerItem.title}
          </Link>
        ) : (
          <h2 className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground">
            {headerItem.title}
          </h2>
        );
      })}
    </span>
  );
}
