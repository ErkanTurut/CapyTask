"use client";

import * as React from "react";
import Link from "next/link";
import type { SidebarNavItem } from "@/types";
import { usePathname } from "next/navigation";

import { cn } from "@/utils";

import { buttonVariants } from "@/components/ui/button";

import { Icons } from "@/components/icons";

export interface MainSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarNavItem;
}

export function MainSidebar({ items, className, ...props }: MainSidebarProps) {
  const pathname = usePathname();

  return (
    <span className={cn("flex w-full flex-col gap-1 ", className)} {...props}>
      {items.main.map((mainItem, mainIndex) => {
        return (
          <span key={mainIndex} className={cn("flex w-full gap-1 flex-col")}>
            {mainItem.label && (
              <h2 className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground">
                {mainItem.label}
              </h2>
            )}
            {mainItem.items.length > 0
              ? mainItem.items.map((subitem, subIndex) => {
                  const Icon = subitem.icon ? Icons[subitem.icon] : null;
                  return (
                    <Link
                      aria-label={subitem.title}
                      key={subIndex}
                      href={subitem.href ? subitem.href : ""}
                      target={subitem.external ? "_blank" : ""}
                      rel={subitem.external ? "noreferrer" : ""}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        pathname === subitem.href
                          ? "bg-muted hover:bg-muted font-bold "
                          : "hover:bg-muted",
                        "justify-start",
                        subitem.disabled && "pointer-events-none opacity-60"
                      )}
                    >
                      {Icon && (
                        <Icon className="mr-2 w-4 h-4" aria-hidden="true" />
                      )}
                      {subitem.title}
                    </Link>
                  );
                })
              : null}
          </span>
        );
      })}
    </span>
  );
}
