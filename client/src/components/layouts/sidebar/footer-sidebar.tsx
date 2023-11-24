"use client";

import * as React from "react";
import Link from "next/link";
import type { SidebarNavItem } from "@/types";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { siteConfig } from "@/config/site.config";

import { cn } from "@/utils";

import { buttonVariants } from "@/components/ui/button";

import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";

export interface FooterSidebarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarNavItem;
}

export function FooterSidebar({
  items,
  className,
  ...props
}: FooterSidebarProps) {
  const pathname = usePathname();
  return (
    <span className={cn("flex w-full flex-col gap-1 ", className)} {...props}>
      {items.footer.map((footerItem, footerIndex) => {
        return (
          <span key={footerIndex} className={cn("flex w-full gap-1 flex-col")}>
            {footerItem.label && (
              <h2 className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground">
                {footerItem.label}
              </h2>
            )}
            {footerItem.items.length > 0
              ? footerItem.items.map((subitem, subIndex) => {
                  const Icon = subitem.icon ? Icons[subitem.icon] : null;
                  return (
                    <Link
                      aria-label={subitem.title}
                      key={subIndex}
                      href={subitem.href ? subitem.href : ""}
                      target={subitem.external ? "_blank" : ""}
                      rel={subitem.external ? "noreferrer" : ""}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        pathname === subitem.href
                          ? "bg-muted hover:bg-muted font-bold "
                          : "hover:bg-muted",
                        "justify-start",
                        subitem.disabled && "pointer-events-none opacity-60"
                      )}
                    >
                      {Icon && (
                        <Icon className="mr-2 w-4 h-4" aria-hidden="true" />
                      )}
                      {subitem.title}
                    </Link>
                  );
                })
              : null}
          </span>
        );
      })}
      <div className="flex flex-col gap-2">
        <Separator className="flex" />
        <Link
          aria-label="Dashboard"
          href="/dashboard"
          className="items-center space-x-2 flex"
        >
          <Icons.logo size="m" aria-hidden="true" />
          <span className="font-bold inline-block">{siteConfig.name}</span>
        </Link>
      </div>
    </span>
  );
}
//  <span className={cn("flex w-full flex-col gap-1 ", className)} {...props}>
//       {items.footer && (
//         <span className={cn("flex w-full gap-1 flex-col")}>
//           {items.footer.map((footerItem, footerIndex) => {
//             const Icon = footerItem.icon ? Icons[footerItem.icon] : null;
//             return footerItem.items.length > 0 ? (
//               <span
//                 key={footerIndex}
//                 className={cn("flex w-full gap-1 flex-col")}
//               >
//                 <h2 className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground">
//                   {Icon && <Icon className="mr-2 w-4 h-4" aria-hidden="true" />}
//                   {footerItem.title}
//                 </h2>
//                 {footerItem.items.map((subitem, subIndex) => {
//                   const Icon = subitem.icon ? Icons[subitem.icon] : null;
//                   return subitem.href ? (
//                     <Link
//                       aria-label={subitem.title}
//                       key={subIndex}
//                       href={subitem.href}
//                       target={subitem.external ? "_blank" : ""}
//                       rel={subitem.external ? "noreferrer" : ""}
//                       className={cn(
//                         buttonVariants({ variant: "ghost", size: "sm" }),
//                         pathname === subitem.href
//                           ? "bg-muted hover:bg-muted font-bold "
//                           : "hover:bg-muted",
//                         "justify-start",
//                         subitem.disabled && "pointer-events-none opacity-60"
//                       )}
//                     >
//                       {Icon && (
//                         <Icon className="mr-2 w-4 h-4" aria-hidden="true" />
//                       )}
//                       {subitem.title}
//                     </Link>
//                   ) : (
//                     <h2 className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground">
//                       {subitem.title}
//                     </h2>
//                   );
//                 })}
//               </span>
//             ) : footerItem.href ? (
//               <Link
//                 aria-label={footerItem.title}
//                 key={footerIndex}
//                 href={footerItem.href}
//                 target={footerItem.external ? "_blank" : ""}
//                 rel={footerItem.external ? "noreferrer" : ""}
//                 className={cn(
//                   buttonVariants({ variant: "ghost", size: "sm" }),
//                   pathname === footerItem.href
//                     ? "bg-muted hover:bg-muted underline"
//                     : "hover:bg-muted",
//                   "justify-start",
//                   footerItem.disabled && "pointer-events-none opacity-60"
//                 )}
//               >
//                 {Icon && <Icon className="mr-2 w-4 h-4" aria-hidden="true" />}
//                 {footerItem.title}
//               </Link>
//             ) : (
//               <h2 className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground">
//                 {footerItem.title}
//               </h2>
//             );
//           })}
//         </span>
//       )}
//       <div className="flex flex-col gap-2">
//         <Separator className="flex" />
//         <Link
//           aria-label="Dashboard"
//           href="/dashboard"
//           className="items-center space-x-2 flex"
//         >
//           <Icons.logo size="m" aria-hidden="true" />
//           <span className="font-bold inline-block">{siteConfig.name}</span>
//         </Link>
//       </div>
//     </span>
