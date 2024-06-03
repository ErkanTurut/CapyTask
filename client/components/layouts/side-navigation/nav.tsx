"use client";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/lib/store";
import { usePathname } from "next/navigation";

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavItem[];
  size?: VariantProps<typeof buttonVariants>["size"];
  rootPath: string;
  isCollapsed?: boolean;
  isChild?: boolean;
  level?: number;
  defaultValue?: string | undefined;
}

const NavLink = ({
  item,
  href,
  size,
  isActive,
}: {
  item: NavItem;
  href: string;
  size?: VariantProps<typeof buttonVariants>["size"];
  isActive: boolean;
}) => {
  const Icon = item.icon ? Icons[item.icon] : null;

  return item.disabled ? (
    <Button variant="ghost" size="sm" className="h-6 justify-start" disabled>
      {Icon && <Icon className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />}
      <span className="overflow-x-auto overflow-ellipsis whitespace-nowrap">
        {item.title}
      </span>
      {item.label && <span className="ml-auto">{item.label}</span>}
    </Button>
  ) : (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: isActive ? "default" : item.variant || "ghost",
          size: size,
        }),
        "h-6 justify-start shadow-none",
      )}
    >
      {Icon && (
        <Icon
          className="mr-2 h-4 w-4 shrink-0"
          aria-hidden="true"
          strokeWidth={1.5}
        />
      )}
      <span className="overflow-x-auto overflow-ellipsis whitespace-nowrap">
        {item.title}
      </span>
      {item.label && <span className="ml-auto">{item.label}</span>}
    </Link>
  );
};

const NavItemWithTooltip = ({
  item,
  href,
}: {
  item: NavItem;
  href: string;
}) => {
  const Icon = item.icon ? Icons[item.icon] : null;

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: item.variant || "ghost", size: "icon" }),
            "h-8 w-8",
          )}
        >
          {Icon && <Icon strokeWidth={1} className="h-4 w-4 shrink-0" />}
          <span className="sr-only">{item.title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {item.title}
        {item.label && (
          <span className="ml-auto text-muted-foreground">{item.label}</span>
        )}
      </TooltipContent>
    </Tooltip>
  );
};

export function Nav({
  items,
  size = "sm",
  className,
  rootPath,
  level = 0,
  defaultValue,
}: NavProps) {
  const isCollapsed = useSidebar()((state) => state.isCollapsed);
  const pathname = usePathname() ?? "";
  const decomposedPath = pathname.split("/");

  return (
    <nav
      data-collapsed={isCollapsed}
      className={cn("group flex w-full flex-col gap-1", className)}
    >
      {items.map((item, index) => {
        const href = item.href ? `${rootPath}${item.href}` : rootPath;
        const isActive = pathname === href;
        const Icon = item.icon ? Icons[item.icon] : null;

        if (isCollapsed) {
          return <NavItemWithTooltip key={index} item={item} href={href} />;
        } else if (item.items && item.items.length > 0) {
          return (
            <Accordion
              key={index}
              type="single"
              collapsible
              defaultValue={
                item.href && decomposedPath.includes(item.href.replace("/", ""))
                  ? item.href
                  : defaultValue
              }
            >
              <AccordionItem value={item.href || item.id}>
                <AccordionTrigger
                  className={cn(
                    buttonVariants({ variant: item.variant || "ghost", size }),
                    "group h-6 justify-between",
                  )}
                  disabled={item.disabled}
                >
                  <Link href={item.href ? href : rootPath}>
                    <span className="flex w-full justify-start ">
                      {item.image_url && (
                        <Avatar className="mr-2 h-4 w-4 rounded-md">
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
                          strokeWidth={1}
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
                  </Link>
                </AccordionTrigger>
                <AccordionContent className="py-1">
                  <span
                    className={cn("flex w-full gap-1", level > 1 && "pl-2")}
                  >
                    {level > 0 && (
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
            <NavLink
              key={index}
              item={item}
              href={href}
              size={size}
              isActive={isActive}
            />
          );
        }
      })}
    </nav>
  );
}
