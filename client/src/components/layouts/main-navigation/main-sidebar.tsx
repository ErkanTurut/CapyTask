"use client";

import * as React from "react";
import Link from "next/link";
import type { SidebarNavItem } from "@/types";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

import { cn } from "@/utils";

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
    <nav
      className={cn("flex w-full flex-col gap-1 justify-between", className)}
      {...props}
    >
      {items.map((item, index) => {
        return (
          <span key={index} className="flex flex-col">
            <span
              key={`${index}-main`}
              className={cn("flex w-full gap-1 flex-col")}
            >
              {item.main.map((mainItem, mainIndex) => {
                const Icon = mainItem.icon ? Icons[mainItem.icon] : null;
                return mainItem.href ? (
                  <Link
                    aria-label={mainItem.title}
                    key={mainIndex}
                    href={mainItem.href}
                    target={mainItem.external ? "_blank" : ""}
                    rel={mainItem.external ? "noreferrer" : ""}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      pathname === mainItem.href ? "bg-muted font-bold" : "",
                      "justify-start",
                      mainItem.disabled && "pointer-events-none opacity-60"
                    )}
                  >
                    {Icon && (
                      <Icon className="mr-2 w-4 h-4" aria-hidden="true" />
                    )}
                    {mainItem.title}
                  </Link>
                ) : (
                  <h2 className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground">
                    {mainItem.title}
                  </h2>
                );
              })}
            </span>

            <span
              key={`${index}-sidebar`}
              className={cn("flex w-full gap-1 flex-col")}
            >
              {item.sidebar.map((sidebarItem, sidebarIndex) => {
                const Icon = sidebarItem.icon ? Icons[sidebarItem.icon] : null;
                return sidebarItem.items.length > 0 ? (
                  <span
                    key={sidebarIndex}
                    className={cn("flex w-full gap-1 flex-col")}
                  >
                    <h2 className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground">
                      {Icon && (
                        <Icon className="mr-2 w-4 h-4" aria-hidden="true" />
                      )}
                      {sidebarItem.title}
                    </h2>
                    {sidebarItem.items.map((subitem, subIndex) => {
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
                          {Icon && (
                            <Icon className="mr-2 w-4 h-4" aria-hidden="true" />
                          )}
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
                ) : sidebarItem.href ? (
                  <Link
                    aria-label={sidebarItem.title}
                    key={sidebarIndex}
                    href={sidebarItem.href}
                    target={sidebarItem.external ? "_blank" : ""}
                    rel={sidebarItem.external ? "noreferrer" : ""}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      pathname === sidebarItem.href
                        ? "bg-muted hover:bg-muted underline"
                        : "hover:bg-muted",
                      "justify-start",
                      sidebarItem.disabled && "pointer-events-none opacity-60"
                    )}
                  >
                    {Icon && (
                      <Icon className="mr-2 w-4 h-4" aria-hidden="true" />
                    )}
                    {sidebarItem.title}
                  </Link>
                ) : (
                  <h2 className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground">
                    {sidebarItem.title}
                  </h2>
                );
              })}
            </span>

            {item.footer && (
              <span
                key={`${index}-footer`}
                className={cn("flex w-full gap-1 flex-col")}
              >
                {item.footer.map((footerItem, footerIndex) => {
                  const Icon = footerItem.icon ? Icons[footerItem.icon] : null;
                  return footerItem.items.length > 0 ? (
                    <span
                      key={footerIndex}
                      className={cn("flex w-full gap-1 flex-col")}
                    >
                      <h2 className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground">
                        {Icon && (
                          <Icon className="mr-2 w-4 h-4" aria-hidden="true" />
                        )}
                        {footerItem.title}
                      </h2>
                      {footerItem.items.map((subitem, subIndex) => {
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
                              subitem.disabled &&
                                "pointer-events-none opacity-60"
                            )}
                          >
                            {Icon && (
                              <Icon
                                className="mr-2 w-4 h-4"
                                aria-hidden="true"
                              />
                            )}
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
                  ) : footerItem.href ? (
                    <Link
                      aria-label={footerItem.title}
                      key={footerIndex}
                      href={footerItem.href}
                      target={footerItem.external ? "_blank" : ""}
                      rel={footerItem.external ? "noreferrer" : ""}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        pathname === footerItem.href
                          ? "bg-muted hover:bg-muted underline"
                          : "hover:bg-muted",
                        "justify-start",
                        footerItem.disabled && "pointer-events-none opacity-60"
                      )}
                    >
                      {Icon && (
                        <Icon className="mr-2 w-4 h-4" aria-hidden="true" />
                      )}
                      {footerItem.title}
                    </Link>
                  ) : (
                    <h2 className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground">
                      {footerItem.title}
                    </h2>
                  );
                })}
              </span>
            )}
          </span>
        );

        // item.sidebar.map((sidebarItem, sidebarIndex) => {
        //   const Icon = sidebarItem.icon ? Icons[sidebarItem.icon] : null;
        //   return sidebarItem.href ? (
        //     <Link
        //       aria-label={sidebarItem.title}
        //       key={sidebarIndex}
        //       href={sidebarItem.href}
        //       target={sidebarItem.external ? "_blank" : ""}
        //       rel={sidebarItem.external ? "noreferrer" : ""}
        //       className={cn(
        //         buttonVariants({ variant: "ghost", size: "sm" }),
        //         pathname === sidebarItem.href
        //           ? "bg-muted hover:bg-muted font-bold "
        //           : "hover:bg-muted",
        //         "justify-start",
        //         sidebarItem.disabled && "pointer-events-none opacity-60"
        //       )}
        //     >
        //       {Icon && <Icon className="mr-2 w-4 h-4" aria-hidden="true" />}
        //       {sidebarItem.title}
        //     </Link>
        //   ) : (
        //     <h2 className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground">
        //       {sidebarItem.title}
        //     </h2>
        //   );
        // })
      })}
    </nav>
  );
}

/*
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



*/
