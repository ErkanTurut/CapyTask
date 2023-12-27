"use client";
import { NavItem } from "@/types";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { useParams, usePathname } from "next/navigation";
import { cva, type VariantProps } from "class-variance-authority";

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  items: NavItem[];
  size?: VariantProps<typeof buttonVariants>["size"];
}

export function Nav({ items, isCollapsed, size, className }: NavProps) {
  const params = useParams();
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:px-2">
        {items.map((item, index) => {
          const Icon = item.icon ? Icons[item.icon] : Icons["chevronRight"];
          return isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={
                    item.href
                      ? `/dashboard/${params?.url_key}${item.href}`
                      : "/"
                  }
                  className={cn(
                    buttonVariants({ variant: item.variant, size: "icon" }),
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
          ) : item.href ? (
            <Link
              key={index}
              href={
                item.href ? `/dashboard/${params?.url_key}${item.href}` : "#"
              }
              className={cn(
                buttonVariants({ variant: item.variant, size: size || "sm" }),
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
          ) : (
            <h3>
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
            </h3>
          );
        })}
      </nav>
    </div>
  );
}
