import { siteConfig } from "@/config/site.config";
import Link from "next/link";
import { FC, Suspense } from "react";

import { buttonVariants } from "@/components/ui/button";

import { MainNav } from "@/components/layouts/main-navigation/main-navbar";
import { Skeleton } from "@/components/ui/skeleton";

import UserAccountNav from "../user-account-navigation";

import { getUser } from "@/lib/services/user";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

interface NavbarProps {}

const NavBar: FC<NavbarProps> = async () => {
  const { data: user } = await getUser();
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
            {user ? (
              <Suspense
                fallback={<Skeleton className="h-8 w-8 rounded-full" />}
              >
                <Link href="/signin" className={cn(buttonVariants())}>
                  Use App
                  <Icons.chevronRight
                    className="ml-1 h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
                <UserAccountNav user={user} />
              </Suspense>
            ) : (
              <Link
                href="/signin"
                className={buttonVariants({ variant: "secondary" })}
              >
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
