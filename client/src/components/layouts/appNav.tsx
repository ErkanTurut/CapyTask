import Link from "next/link";

import { siteConfig } from "@/config/site.config";
// import { getUserEmail } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
// import { CartSheet } from "@/components/checkout/cart-sheet";
import { Icons } from "@/components/icons";
import { SearchBar } from "../searchBar";
import UserAccountNav from "../userAccountNav";
import ThemeToggle from "./themeToggle";
import type { User } from "@supabase/supabase-js";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

interface AppNav {
  user: User | null;
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
              <Suspense
                fallback={<Skeleton className="h-8 w-8 rounded-full" />}
              >
                <UserAccountNav user_id={user.id} />
              </Suspense>
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
