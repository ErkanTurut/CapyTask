import { siteConfig } from "@/config/site.config";
import Link from "next/link";
import { FC, Suspense } from "react";

import { buttonVariants } from "@/components/ui/button";

import { MainNav } from "@/components/layouts/top-navigation/main-nav";
import { Skeleton } from "@/components/ui/skeleton";

import UserAccountNav from "@/components/user/user-account-nav";

import { cn } from "@/lib/utils";
import { Icons } from "../../icons";

interface NavbarProps {}

const NavBar: FC<NavbarProps> = async () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center px-6">
        <MainNav items={siteConfig.mainNav} />
        {/* <MobileNav
          mainNavItems={siteConfig.mainNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        /> */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link
              href={`${process.env.AUTH_URL}/login`}
              className={buttonVariants({ variant: "secondary" })}
            >
              Get Started
              <span className="sr-only">Get Started</span>
              <Icons.rocket className="ml-2 h-4 w-4" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
