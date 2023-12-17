"use client";

import * as React from "react";
import Link from "next/link";
import type { SidebarNavItem } from "@/types";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Icons } from "@/components/icons";
import { Database } from "@/types/supabase.types";
import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";

export interface TeamSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: { team: Database["public"]["Tables"]["team"]["Row"][] | null };
}

export function TeamSidebar({ items, className, ...props }: TeamSidebarProps) {
  const pathname = usePathname();
  const params = useParams();

  if (!items.team) return null;
  return (
    <>
      {items.team.map((team, teamIndex) => {
        const link = `/dashboard/${params?.url_key}/${team.id}`;
        const initials = `${team.name?.charAt(0) ?? ""}`;
        const profilePicture =
          team?.image_uri ??
          `https://avatar.vercel.sh/${initials}.svg?text=${initials}`;
        return (
          <span
            key={teamIndex}
            className={cn("flex w-full flex-col gap-1 ", className)}
            {...props}
          >
            <h2 className="flex w-full items-center py-1 text-sm font-semibold text-muted-foreground">
              Your teams
            </h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "flex w-full justify-between gap-2 py-0  mb-1"
                  )}
                >
                  <span className="flex gap-2 items-center">
                    <Avatar className={cn("h-5 w-5 rounded-sm", className)}>
                      <AvatarImage src={profilePicture} alt={team.name ?? ""} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    {team.name}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <span className="flex flex-col gap-1">
                    <Link
                      aria-label={team.name}
                      key={teamIndex}
                      href={link}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        pathname === team.id
                          ? "bg-muted hover:bg-muted font-bold "
                          : "hover:bg-muted",
                        "justify-start w-full "
                      )}
                    >
                      {team.name}
                    </Link>
                    <Link
                      aria-label={team.name}
                      key={teamIndex + 2}
                      href={link}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        pathname === team.id
                          ? "bg-muted hover:bg-muted font-bold "
                          : "hover:bg-muted",
                        "justify-start w-full"
                      )}
                    >
                      {team.name}
                    </Link>
                  </span>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </span>
        );
      })}
    </>
  );
}
