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

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavItem[];
  size?: VariantProps<typeof buttonVariants>["size"];
  rootPath: string;
  isCollapsed?: boolean;
}

export function Nav({ items, size, className, rootPath }: NavProps) {
  const isCollapsed = useSidebar()((state) => state.isCollapsed);

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex w-full flex-col gap-4"
    >
      <nav className={cn("grid w-full gap-1", className)}>
        {items.map((item, index) => {
          const Icon = item.icon ? Icons[item.icon] : null;
          const href = item.href ? `${rootPath}${item.href}` : "#";
          return isCollapsed ? (
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
                    item.variant === "default" &&
                      "dark:bg-muted dark:text-muted-foreground",
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
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
          ) : item.items && item.items.length > 0 ? (
            <Accordion key={index} type="multiple">
              <AccordionItem value={item.title}>
                <AccordionTrigger
                  className={cn(
                    buttonVariants({
                      variant: item.variant || "ghost",
                      size: size || "sm",
                    }),
                    item.variant === "default" &&
                      "dark:bg-muted dark:text-white",
                    "justify-between",
                  )}
                >
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
                </AccordionTrigger>
                <AccordionContent>
                  <span className="ml-1 flex gap-1">
                    <Separator
                      orientation="vertical"
                      className="h-auto bg-primary "
                    />
                    <Nav items={item.items} size={size} rootPath={href} />
                  </span>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <Link
              key={index}
              href={href}
              className={cn(
                buttonVariants({
                  variant: item.variant || "ghost",
                  size: size || "sm",
                }),
                item.variant === "default" && "dark:bg-muted dark:text-white",
                "justify-start",
              )}
            >
              {Icon && <Icon className="mr-2 h-4 w-4" aria-hidden="true" />}
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
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
