import { siteConfig } from "@/config/site.config";
import Link from "next/link";
import { FC, Suspense } from "react";

import { buttonVariants } from "@/components/ui/button";

import { MainNav } from "@/components/layouts/top-navigation/main-nav";
import { Skeleton } from "@/components/ui/skeleton";

import UserAccountNav from "@/components/user/user-account-nav";

import { cn } from "@/lib/utils";
import { Icons } from "../../icons";
import useScroll from "@/lib/hooks/use-scroll";
import { useSelectedLayoutSegment } from "next/navigation";

interface NavbarProps {}

const NavBar: FC<NavbarProps> = () => {
  // const scrolled = useScroll(80);
  // const selectedLayout = useSelectedLayoutSegment();

  return (
    <header
      className={cn(
        `sticky top-0 z-50 w-full border-b bg-background`,
        // {
        //   "translate-y-1 border border-border bg-background shadow-md  backdrop-blur-lg delay-100 ease-in-out":
        //     scrolled,
        // },
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <MainNav items={siteConfig.mainNav} />
        {/* <MobileNav
          mainNavItems={siteConfig.mainNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        /> */}

        <Link
          href={`${process.env.AUTH_URL}/login`}
          className={cn(buttonVariants(), "group  overflow-hidden ")}
        >
          Get Started
          <span className="sr-only">Get Started</span>
          <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
            <Icons.rocket className="ml-2 h-4 w-4" />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
