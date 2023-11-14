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
        const Icon = mainItem.icon ? Icons[mainItem.icon] : null;
        return mainItem.items.length > 0 ? (
          <span key={mainIndex} className={cn("flex w-full gap-1 flex-col")}>
            <h2 className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground">
              {Icon && <Icon className="mr-2 w-4 h-4" aria-hidden="true" />}
              {mainItem.title}
            </h2>
            {mainItem.items.map((subitem, subIndex) => {
              const Icon = subitem.icon ? Icons[subitem.icon] : null;
              return subitem.href ? (
                <Link
                  aria-label={subitem.title}
                  key={subIndex}
                  href={subitem.href}
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
                  {Icon && <Icon className="mr-2 w-4 h-4" aria-hidden="true" />}
                  {subitem.title}
                </Link>
              ) : (
                <h2 className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground">
                  {subitem.title}
                </h2>
              );
            })}
          </span>
        ) : mainItem.href ? (
          <Link
            aria-label={mainItem.title}
            key={mainIndex}
            href={mainItem.href}
            target={mainItem.external ? "_blank" : ""}
            rel={mainItem.external ? "noreferrer" : ""}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              pathname === mainItem.href
                ? "bg-muted hover:bg-muted underline"
                : "hover:bg-muted",
              "justify-start",
              mainItem.disabled && "pointer-events-none opacity-60"
            )}
          >
            {Icon && <Icon className="mr-2 w-4 h-4" aria-hidden="true" />}
            {mainItem.title}
          </Link>
        ) : (
          <h2 className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground">
            {mainItem.title}
          </h2>
        );
      })}
    </span>
  );
}
