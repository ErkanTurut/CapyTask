"use client";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { type VariantProps } from "class-variance-authority";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/lib/store";
import { usePathname } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavItem[];
  size?: VariantProps<typeof buttonVariants>["size"];
  rootPath: string;
  isCollapsed?: boolean;
  isChild?: boolean;
  level?: number;
}

export function Nav({ items, size, className, rootPath, level = 0 }: NavProps) {
  const isCollapsed = useSidebar()((state) => state.isCollapsed);
  const pathname = usePathname();
  const decomposedPath = pathname.split("/");

  return (
    <nav
      data-collapsed={isCollapsed}
      className={cn("group flex w-full flex-col gap-1", className)}
    >
      {items.map((item, index) => {
        const Icon = item.icon ? Icons[item.icon] : null;
        const href = item.href ? `${rootPath}${item.href}` : rootPath;
        if (isCollapsed) {
          return (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  className={cn(
                    buttonVariants({
                      variant: item.variant || "ghost",
                      size: "icon",
                    }),
                    "h-8 w-8",
                  )}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0" />}
                  <span className="sr-only">{item.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {item.title}
                {item.label && (
                  <span className="ml-auto text-muted-foreground">
                    {item.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          );
        } else if (item.items && item.items.length > 0) {
          return (
            <Accordion
              key={index}
              type="single"
              collapsible
              defaultValue={decomposedPath.includes(item.id) ? item.id : "all"}
            >
              <AccordionItem value={item.id}>
                <AccordionTrigger
                  className={cn(
                    buttonVariants({
                      variant: item.variant || "ghost",
                      size: size || "sm",
                    }),
                    "justify-between",
                  )}
                >
                  <span className="flex w-full justify-start ">
                    {item.image_url && (
                      <Avatar className="mr-2 h-5 w-5 rounded-md">
                        <AvatarImage
                          src={item.image_url}
                          alt={item.title ?? ""}
                        />
                      </Avatar>
                    )}
                    {Icon && (
                      <Icon
                        className="mr-2 h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    {item.title}

                    {item.label && (
                      <span
                        className={cn(
                          "ml-auto",
                          item.variant === "default" &&
                            "text-background dark:text-white",
                        )}
                      >
                        {item.label}
                      </span>
                    )}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="py-1">
                  <span className="flex w-full gap-1 pl-2 ">
                    {level < 2 && (
                      <Separator orientation="vertical" className="h-auto " />
                    )}
                    <Nav
                      items={item.items}
                      size={size}
                      rootPath={href}
                      isChild={true}
                      level={level + 1}
                    />
                  </span>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        } else {
          return (
            <Link
              key={index}
              href={href}
              className={cn(
                buttonVariants({
                  variant:
                    pathname === href ? "secondary" : item.variant || "ghost",
                  size: size || "sm",
                }),
                "justify-start ",
              )}
            >
              {Icon && (
                <Icon className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              <span className="overflow-x-auto overflow-ellipsis whitespace-nowrap	">
                {item.title}
              </span>

              {item.label && (
                <span className={cn("ml-auto")}>{item.label}</span>
              )}
            </Link>
          );
        }
      })}
    </nav>
  );
}
