import Link from "next/link";

import { dashboardConfig } from "@/config/dashboard.config";
import { siteConfig } from "@/config/site.config";
// import { getUserEmail } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { CartSheet } from "@/components/checkout/cart-sheet";
import { Combobox } from "@/components/combobox";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/layouts/mainNav";
import { MobileNav } from "@/components/layouts/mobileNav";
import ThemeToggle from "./themeToggle";
import type { user } from "@prisma/client";
import { SearchBar } from "../searchBar";
import UserAccountNav from "../userAccountNav";

interface AppNav {
  user: user | null;
}

export function AppNav({ user }: AppNav) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className=" px-6 flex h-16 items-center">
        <Link
          aria-label="Home"
          href="/"
          className="hidden items-center space-x-2 lg:flex"
        >
          <Icons.logo size="m" aria-hidden="true" />
          <span className="hidden font-bold lg:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        {/* <MainNav items={siteConfig.mainNav} />
        <MobileNav
          mainNavItems={siteConfig.mainNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        /> */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <SearchBar />
            {user ? (
              <UserAccountNav user={user} isDashboard={true} />
            ) : (
              <Link
                href="/signin"
                className={buttonVariants({
                  size: "sm",
                })}
              >
                Sign In
                <span className="sr-only">Sign In</span>
              </Link>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
