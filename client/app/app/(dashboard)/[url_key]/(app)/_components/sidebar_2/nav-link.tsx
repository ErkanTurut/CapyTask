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

export const navItemVariants = cva(
  "text-muted-foreground group flex w-full  items-center rounded-md border px-3 py-1  h-7 text-xs font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ",
  {
    variants: {
      variant: {
        default:
          " border-transparent hover:bg-accent hover:text-accent-foreground",
        active: "bg-muted/50 border-border text-foreground font-medium",
        disabled: "pointer-events-none opacity-60 border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// sm: "h-7 rounded-md px-3 py-1 text-xs",
// "hover:bg-accent hover:text-accent-foreground",
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
}: {
  items: NavItem[];
  params: { url_key: string };
}) => {
  const selectedLayout = useSelectedLayoutSegment();
  const selectedLayouts = useSelectedLayoutSegments();

  const selectedLayoutSegments = selectedLayouts.map((segment) => {
    return "/" + segment;
  });

  // remove last selectedLayoutSegments item in the array

  const pathname = usePathname();

  console.log(selectedLayoutSegments);
  console.log(pathname);

  return items.map((item, index) => {
    return item.subItems && item.subItems.length > 0 ? (
      <Accordion
        key={index}
        type="single"
        defaultValue={"/" + selectedLayout || undefined}
        collapsible
      >
        <AccordionItem value={item.href.toString()}>
          <AccordionTrigger className={navItemVariants({ variant: "default" })}>
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
                  active:
                    pathname ===
                    "/" + params.url_key + item.href + subItem.href,
                };
              })}
              params={params}
            />
            {/* {item.subItems.map((subItem, index) => {
              return (
                <NavLink
                  key={index}
                  href={"/" + params.url_key + item.href + subItem.href}
                  label={subItem.label}
                  icon={subItem.icon}
                  active={
                    pathname === "/" + params.url_key + item.href + subItem.href
                  }
                />
              );
            })} */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ) : (
      <NavLink
        key={index}
        href={"/" + params.url_key + item.href}
        label={item.label}
        icon={item.icon}
        active={pathname === "/" + params.url_key + item.href}
      />
    );
  });
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
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(navItemVariants({ variant, className }))}
        >
          {Icon ? (
            <Icon strokeWidth={1.5} className={cn("mr-2 h-4 w-4 shrink-0")} />
          ) : null}
          {!iconOnly && (
            <span className="overflow-x-auto overflow-ellipsis whitespace-nowrap">
              {label}
            </span>
          )}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {label}
      </TooltipContent>
    </Tooltip>
  );
};
