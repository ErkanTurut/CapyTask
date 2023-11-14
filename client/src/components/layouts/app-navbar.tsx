import { dashboardConfig } from "@/config/dashboard.config";
import { siteConfig } from "@/config/site.config";
import Link from "next/link";
import { FC, Suspense } from "react";

import { buttonVariants } from "@/components/ui/button";

// import { CartSheet } from "@/components/cart/cart-sheet";
import { MainNav } from "@/components/layouts/main-navigation/main-navbar";
import { SearchBar } from "@/components/searchBar";
import { MobileNav } from "./mobile-navbar";
import ThemeToggle from "../themeToggle";
// import { MobileNav } from "@/components/layouts/mobile-nav"
import { Skeleton } from "@/components/ui/skeleton";

import UserAccountNav from "../user-account-navigation";

import type { User } from "@supabase/supabase-js";

interface NavbarProps {
  user: User | null;
}

const NavBar: FC<NavbarProps> = ({ user }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="px-6 flex h-16 items-center">
        <MainNav items={siteConfig.mainNav} />
        {/* <MobileNav
          mainNavItems={siteConfig.mainNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        /> */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <SearchBar />
            {user ? (
              <Suspense
                fallback={<Skeleton className="h-8 w-8 rounded-full" />}
              >
                <UserAccountNav user_id={user.id} />
              </Suspense>
            ) : (
              <Link href="/signin" className={buttonVariants()}>
                Sign In
                <span className="sr-only">Sign In</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
