"use client";

import * as React from "react";
import Link from "next/link";
import type { SidebarNavItem } from "@/types";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";

import { Icons } from "@/components/icons";

export interface MainSideNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: SidebarNavItem[];
}

export function MainSideNav({ items, className, ...props }: MainSideNavProps) {
  const pathname = usePathname();

  if (!items?.length) return null;
  return (
    <nav className={cn("flex w-full flex-col gap-1", className)} {...props}>
      {items.map((item, index) => {
        const Icon = item.icon ? Icons[item.icon] : null;
        return item.items.length > 0 ? (
          <span key={index} className={cn("flex w-full gap-1 flex-col")}>
            <h2 className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground">
              {Icon && <Icon className="mr-2 w-4 h-4" aria-hidden="true" />}
              {item.title}
            </h2>
            {item.items.map((subitem, subIndex) => {
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
            <Separator />
          </span>
        ) : item.href ? (
          <Link
            aria-label={item.title}
            key={index}
            href={item.href}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              pathname === item.href
                ? "bg-muted hover:bg-muted underline"
                : "hover:bg-muted",
              "justify-start",
              item.disabled && "pointer-events-none opacity-60"
            )}
          >
            {Icon && <Icon className="mr-2 w-4 h-4" aria-hidden="true" />}
            {item.title}
          </Link>
        ) : (
          <h2 className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground">
            {item.title}
          </h2>
        );
      })}
    </nav>
  );
}
