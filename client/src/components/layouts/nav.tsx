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

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  items: NavItem[];
  size?: VariantProps<typeof buttonVariants>["size"];
  rootPath: string;
}

export function Nav({
  items,
  isCollapsed,
  size,
  className,
  rootPath,
}: NavProps) {
  //const params = useParams();
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 w-full"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:px-2">
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
                      "dark:bg-muted dark:text-muted-foreground"
                  )}
                >
                  {Icon && <Icon className="w-4 h-4" />}
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
          ) : item.items ? (
            <Accordion type="multiple">
              <AccordionItem value={item.title}>
                <AccordionTrigger
                  className={cn(
                    buttonVariants({
                      variant: item.variant || "ghost",
                      size: size || "sm",
                    }),
                    item.variant === "default" &&
                      "dark:bg-muted dark:text-white",
                    "justify-between"
                  )}
                >
                  {item.title}
                  {item.label && (
                    <span
                      className={cn(
                        "ml-auto",
                        item.variant === "default" &&
                          "text-background dark:text-white"
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                </AccordionTrigger>
                <AccordionContent>
                  <span className="flex gap-1 ml-1">
                    <Separator
                      orientation="vertical"
                      className="bg-primary h-auto "
                    />
                    <Nav
                      items={item.items}
                      isCollapsed={isCollapsed}
                      size={size}
                      rootPath={href}
                    />
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
                "justify-start"
              )}
            >
              {Icon && <Icon className="mr-2 w-4 h-4" aria-hidden="true" />}
              {item.title}
              {item.label && (
                <span
                  className={cn(
                    "ml-auto",
                    item.variant === "default" &&
                      "text-background dark:text-white"
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
