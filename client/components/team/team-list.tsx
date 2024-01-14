"use client";
import { NavItem } from "@/types";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { cn, generateAvatar } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Database } from "@/types/supabase.types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Nav } from "@/components/layouts/side-navigation/nav";
import { useSidebar } from "@/lib/store/sidebar-provider";
import { useTeam } from "@/lib/store";
import { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";

interface TeamListProps {
  items: NavItem[];
  teams: Database["public"]["Tables"]["team"]["Row"][] | null;
  rootPath: string;
  isCollapsed?: boolean;
}

export function TeamList({ items, teams, rootPath }: TeamListProps) {
  const isCollapsed = useSidebar()((state) => state.isCollapsed);
  const setTeam = useTeam()((state) => state.setTeamList);
  const { team_identity }: { url_key: string; team_identity: string } =
    useParams();

  useEffect(() => {
    setTeam(teams);
  }, [teams]);

  return (
    <div data-collapsed={isCollapsed} className=" group flex flex-col gap-4 ">
      <nav className="gap-1">
        <div className="flex flex-col gap-1">
          {isCollapsed ? (
            <>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={`${rootPath}/create`}
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        size: "icon",
                      }),
                      "h-8 w-8",
                    )}
                  >
                    <Icons.plusCircled className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  Create Team
                  <span className="ml-auto text-muted-foreground">
                    Start a new team
                  </span>
                </TooltipContent>
              </Tooltip>
              {teams &&
                teams.length > 0 &&
                teams.map((team, index) => {
                  const { image_uri, initials } = generateAvatar({
                    name: team.name,
                  });
                  return (
                    <Tooltip key={index} delayDuration={0}>
                      <TooltipTrigger key={index} asChild>
                        <Link
                          href={`${rootPath}/${team.identity}`}
                          className={cn(
                            buttonVariants({
                              variant:
                                team_identity === team.identity
                                  ? "secondary"
                                  : "ghost",

                              size: "icon",
                            }),
                            "h-8 w-8",
                          )}
                          key={index}
                        >
                          <Avatar className={cn("h-5 w-5 rounded-sm")}>
                            <AvatarImage
                              src={team.image_uri || image_uri}
                              alt={team.name ?? ""}
                            />
                            <AvatarFallback>{initials}</AvatarFallback>
                          </Avatar>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        key={team.id}
                        className="flex items-center gap-4"
                      >
                        {team.name}
                        {team.name && (
                          <span className="ml-auto text-muted-foreground">
                            {team.name}
                          </span>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
            </>
          ) : (
            <Accordion
              type="single"
              className="flex w-full flex-col gap-1"
              defaultValue="all"
              collapsible
            >
              {teams && teams.length > 0 ? (
                <AccordionItem value="all" className="flex flex-col gap-1">
                  <AccordionTrigger
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "items-center  justify-between gap-1 py-0 underline",
                    )}
                  >
                    <span>All Teams</span>
                    <Link
                      href={`${rootPath}/create`}
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                          size: "icon",
                        }),
                        "order-last ml-auto h-7 w-7",
                      )}
                    >
                      <Icons.plusCircled className="h-4 w-4" />
                    </Link>
                  </AccordionTrigger>

                  <AccordionContent>
                    <Accordion
                      type="single"
                      collapsible
                      defaultValue={team_identity}
                    >
                      {teams.map((team, index) => {
                        const { image_uri, initials } = generateAvatar({
                          name: team.name,
                        });
                        return (
                          <AccordionItem key={team.id} value={team.identity}>
                            <AccordionTrigger
                              className={cn(
                                buttonVariants({
                                  variant: "ghost",
                                  size: "sm",
                                }),
                                "flex w-full justify-start gap-1 py-0",
                              )}
                              key={index}
                            >
                              <Avatar className="h-5 w-5 rounded-sm">
                                <AvatarImage
                                  src={team.image_uri || image_uri}
                                  alt={team.name ?? ""}
                                />
                                <AvatarFallback>{initials}</AvatarFallback>
                              </Avatar>
                              <span className="cursor-pointer overflow-x-auto overflow-ellipsis whitespace-nowrap">
                                {team.name}
                              </span>
                              <Link
                                href="#"
                                className={cn(
                                  buttonVariants({
                                    variant: "ghost",
                                    size: "icon",
                                  }),
                                  "order-last ml-auto h-7 w-7",
                                )}
                              >
                                <Icons.dotsHorizontal className="h-4 w-4" />
                              </Link>
                            </AccordionTrigger>
                            <AccordionContent key={team.id} className="pt-1">
                              <div className="ml-3 flex gap-1">
                                <Separator
                                  orientation="vertical"
                                  className="h-auto "
                                />
                                <Nav
                                  rootPath={`${rootPath}/${team.identity}`}
                                  items={items}
                                />
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <Link
                  href={`${rootPath}/create`}
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    }),
                    "flex w-full justify-between gap-2 py-0",
                  )}
                >
                  Start new team
                  <Icons.plusCircled className="h-4 w-4" />
                </Link>
              )}
            </Accordion>
          )}
        </div>
      </nav>
    </div>
  );
}
