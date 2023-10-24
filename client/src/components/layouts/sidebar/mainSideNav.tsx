"use client";

import * as React from "react";
import Link from "next/link";
import type { SidebarNavItem } from "@/types";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";

export interface MainSideNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: SidebarNavItem[];
}

export function MainSideNav({ items, className, ...props }: MainSideNavProps) {
  const pathname = usePathname();

  if (!items?.length) return null;
  return (
    <nav className={cn("flex w-full flex-col", className)} {...props}>
      {items.map((item, index) => {
        return item.items.length > 0 ? (
          <span key={index} className={cn("flex w-full flex-col gap-1")}>
            <h2 className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground">
              {item.title}
            </h2>
            {item.items.map((subitem, subIndex) => {
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
                      ? "bg-muted hover:bg-muted underline"
                      : "hover:bg-muted",
                    "justify-start",
                    subitem.disabled && "pointer-events-none opacity-60"
                  )}
                >
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
        ) : (
          <h2
            key={`${index}-title`}
            className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground"
          >
            {item.title}
          </h2>
        );
      })}
    </nav>
  );
}
