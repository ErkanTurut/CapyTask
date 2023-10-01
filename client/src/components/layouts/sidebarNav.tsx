"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import type { SidebarNavItem } from "@/types";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { buttonVariants } from "../ui/button";
import { Label } from "@/components/ui/label";

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarNavItem[];
}

export function SidebarNav({ items, className, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  if (!items?.length) return null;

  return (
    <nav
      className={cn("flex flex-col space-x-0 space-y-1", className)}
      {...props}
    >
      {items.map((item, index) => {
        const Icon = Icons[item.icon ?? "chevronLeft"];
        return item.items.length > 0 ? (
          <div className="flex flex-col space-x-0 space-y-1" key={index}>
            <h2 className="flex w-full items-center py-3 text-sm font-semibold text-muted-foreground">
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
              {item.title}
            </h2>
            {item.items.map((subitem, subIndex) => {
              return (
                <Link
                  aria-label={subitem.title}
                  key={subIndex}
                  href={subitem.href ? subitem.href : "#"}
                  target={subitem.external ? "_blank" : ""}
                  rel={subitem.external ? "noreferrer" : ""}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    pathname === subitem.href
                      ? "bg-muted hover:bg-muted"
                      : "hover:bg-muted hover:underline",
                    "justify-start",
                    subitem.disabled && "pointer-events-none opacity-60"
                  )}
                >
                  <span>{subitem.title}</span>
                </Link>
              );
            })}
            <Separator key={`separator-${index}`} />
          </div>
        ) : (
          <Link
            aria-label={item.title}
            key={index}
            href={item.href ? item.href : "#"}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-muted hover:underline ",
              "justify-start",
              item.disabled && "pointer-events-none opacity-60"
            )}
          >
            <Icon className="mr-2 h-4 w-4" aria-hidden="true" size={"s"} />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}

// <div className={cn("flex w-full flex-col gap-2", className)} {...props}>
// {items.map((item, index) => {
//   const Icon = Icons[item.icon ?? "chevronLeft"];

//   return item.href ? (
//     <Link
//       aria-label={item.title}
//       key={index}
//       href={item.href}
//       target={item.external ? "_blank" : ""}
//       rel={item.external ? "noreferrer" : ""}
//     >
//       <span
//         className={cn(
//           "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
//           item.href.includes(String(segment))
//             ? "bg-muted font-medium text-foreground"
//             : "text-muted-foreground",
//           item.disabled && "pointer-events-none opacity-60"
//         )}
//       >
//         <Icon className="mr-2 h-4 w-4" aria-hidden="true" size={"s"} />
//         <span>{item.title}</span>
//       </span>
//     </Link>
//   ) : (
//     <span
//       key={index}
//       className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
//     >
//       {item.title}
//     </span>
//   );
// })}
// </div>
