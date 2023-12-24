"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { SidebarNavItem } from "@/types";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";

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
  const params = useParams();
  const router = useRouter();

  if (!items.header) return null;
  return (
    <span className={cn("flex w-full flex-col gap-1 ", className)} {...props}>
      {items.header.map((headerItem, headerIndex) => {
        const Icon = headerItem.icon ? Icons[headerItem.icon] : null;

        return (
          <span key={headerIndex} className={cn("flex w-full gap-1 flex-col")}>
            {headerItem.label && (
              <h2
                onClick={() => router.back()}
                className={cn(
                  "flex w-full items-center py-1 text-lg font-semibold text-muted-foreground cursor-pointer hover:text-primary"
                )}
              >
                {Icon && (
                  <Icon
                    className="mr-2 w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                  />
                )}
                {headerItem.label}
              </h2>
            )}
            {headerItem.items.length > 0
              ? headerItem.items.map((subitem, subIndex) => {
                  const Icon = subitem.icon ? Icons[subitem.icon] : null;
                  return (
                    <Link
                      aria-label={subitem.title}
                      key={subIndex}
                      href={
                        subitem.href
                          ? `dashboard/${params?.url_key}${subitem.href}`
                          : ""
                      }
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
