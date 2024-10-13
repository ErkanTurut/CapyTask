"use client";

import { cn } from "@/lib/utils";
import { NavItem } from "./types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface navTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavItem[];
}

export function NavTabs({ className, children, items }: navTabsProps) {
  return (
    <nav className="py-4">
      <ul className="scrollbar-hide flex space-x-6 overflow-auto">
        {items.map((item) => (
          <NavLink key={item.id} item={item}>
            {children}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}

interface navLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  item: NavItem;
}

export function NavLink({ children, item }: navLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        "border-transparent text-sm text-muted-foreground hover:text-accent-foreground",
        pathname === item.href &&
          "border-b-2 border-primary font-medium text-primary hover:text-primary"
      )}
      href={item.href || "#"}
    >
      {item.title}
    </Link>
  );
}
