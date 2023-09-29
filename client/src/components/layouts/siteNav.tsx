import { FC } from "react";
import Link from "next/link";
import { dashboardConfig } from "@/config/dashboard.config";
import { siteConfig } from "@/config/site.config";

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

// import { CartSheet } from "@/components/cart/cart-sheet";
import { SearchBar } from "@/components/searchBar";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/layouts/mainNav";
import ThemeToggle from "./themeToggle";
import { MobileNav } from "./mobileNav";
// import { MobileNav } from "@/components/layouts/mobile-nav"
import { usePathname } from "next/navigation";

import type { user } from "@prisma/client";
import UserAccountNav from "../userAccountNav";

interface NavbarProps {
  user: user | null;
}

const NavBar: FC<NavbarProps> = ({ user }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="px-6 flex h-16 items-center">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav
          mainNavItems={siteConfig.mainNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <SearchBar />
            {/* <CartSheet /> */}
            {user ? (
              <UserAccountNav user={user} />
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
};

export default NavBar;
