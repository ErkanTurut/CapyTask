import { siteConfig } from "@/config/site.config";
import Link from "next/link";
import { FC } from "react";

import { buttonVariants } from "@gembuddy/ui/button";

import { MainNav } from "@/components/layouts/top-navigation/main-nav";

import ThemeToggle from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { Icons } from "../../icons";

interface NavbarProps {}

const NavBar: FC<NavbarProps> = () => {
  // const scrolled = useScroll(80);
  // const selectedLayout = useSelectedLayoutSegment();

  return (
    <header
      className={cn(
        `sticky top-0 z-50 w-full border-b bg-background`
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
        <div className="flex gap-1">
          <Link
            href={`http://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
            className={cn(buttonVariants(), "group grow overflow-hidden")}
          >
            Get Started
            <span className="sr-only">Get Started</span>
            <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
              <Icons.orange className="h-7" />
            </div>
          </Link>
          <ThemeToggle toggle />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
