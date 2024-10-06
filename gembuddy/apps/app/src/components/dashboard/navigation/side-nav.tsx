"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Icons, IconType } from "@/components/icons";

import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { cva } from "class-variance-authority";
import Link from "next/link";
import type { LinkProps } from "next/link";
import {
  usePathname,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import { Label } from "@/components/ui/label";

export const navItemVariants = cva(
  "text-muted-foreground group flex w-full  items-center rounded-sm  px-3 py-1  h-7 text-xs font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ",
  {
    variants: {
      variant: {
        default: "hover:bg-muted/50 hover:text-accent-foreground",
        active: "bg-muted shadow-inner text-foreground font-medium",
        disabled: "pointer-events-none opacity-60 ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const transformPaths = (paths: string[]): string[] => {
  const result: string[] = [];
  let currentPath = "";

  paths.forEach((path, index) => {
    if (index === 0) {
      currentPath = path;
    } else {
      currentPath += path;
    }
    result.push(currentPath);
  });

  return result;
};

export interface NavItem extends LinkProps {
  label: string;
  icon?: IconType;
  image_url?: string;
  className?: string;
  active?: boolean;
  disabled?: boolean;
  subItems?: NavItem[];
  iconOnly?: boolean;
}

export const NavMenu = ({
  items,
  params,
  className,
}: {
  items: NavItem[];
  params: { url_key: string };
  className?: string;
}) => {
  const pathname = usePathname();

  return (
    <Accordion
      type="single"
      defaultValue={undefined}
      collapsible
      className={className}
    >
      {items.map((item, index) => {
        return item.subItems && item.subItems.length > 0 ? (
          <AccordionItem
            key={index}
            value={"/" + params.url_key + item.href.toString()}
          >
            <AccordionTrigger
              className={navItemVariants({ variant: "default" })}
            >
              {item.label}
            </AccordionTrigger>
            <AccordionContent className="pb-0 pl-2">
              <NavMenu
                items={item.subItems.map((subItem) => {
                  return {
                    label: subItem.label,
                    icon: subItem.icon,
                    subItems: subItem.subItems,
                    href: item.href.toString() + subItem.href,
                    active: pathname.startsWith(
                      "/" + params.url_key + item.href + subItem.href
                    ),
                  };
                })}
                params={params}
              />
            </AccordionContent>
          </AccordionItem>
        ) : (
          <NavLink
            key={index}
            href={"/" + params.url_key + item.href}
            label={item.label}
            icon={item.icon}
            active={pathname.startsWith("/" + params.url_key + item.href)}
          />
        );
      })}
    </Accordion>
  );
};

export const NavLink = ({
  href,
  label,
  icon,
  active,
  disabled,
  image_url,
  className,
  iconOnly,
}: NavItem) => {
  const pathname = usePathname();

  if (pathname === href) {
    active = true;
  }

  const Icon = icon && Icons[icon];
  const variant = disabled ? "disabled" : active ? "active" : "default";

  return iconOnly ? (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(navItemVariants({ variant }), className)}
        >
          {Icon ? (
            <Icon strokeWidth={1.5} className={cn("mr-2 h-4 w-4 shrink-0")} />
          ) : null}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        <Label className="text-xs">{label}</Label>
      </TooltipContent>
    </Tooltip>
  ) : (
    <Link href={href} className={cn(navItemVariants({ variant, className }))}>
      {Icon ? (
        <Icon strokeWidth={1.5} className={cn("mr-2 h-4 w-4 shrink-0")} />
      ) : null}

      <span className="overflow-x-auto overflow-ellipsis whitespace-nowrap">
        {label}
      </span>
    </Link>
  );
};
