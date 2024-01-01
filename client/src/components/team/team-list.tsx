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
import { Nav } from "@/components/layouts/nav";

interface TeamListProps {
  isCollapsed: boolean;
  items: NavItem[];
  teams: Database["public"]["Tables"]["team"]["Row"][] | null;
  rootPath: string;
}

export function TeamList({
  items,
  teams,
  isCollapsed,
  rootPath,
}: TeamListProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:px-2">
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
                      "h-8 w-8"
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
                          href={`${rootPath}/${team.url_key}`}
                          className={cn(
                            buttonVariants({
                              variant: "outline",
                              size: "icon",
                            }),
                            "h-8 w-8"
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
                        className="flex items-center gap-4"
                        key={team.id}
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
            <Accordion type="multiple" className="flex flex-col gap-1">
              <AccordionItem value="all">
                <div className="flex justify-between items-center">
                  <AccordionTrigger
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "flex justify-between gap-2 py-0"
                    )}
                  >
                    <span>All Teams</span>
                  </AccordionTrigger>
                  <Link
                    href={`${rootPath}/create`}
                    className={cn(
                      buttonVariants({
                        variant: "ghost",
                        size: "icon",
                      }),
                      " h-7 w-7"
                    )}
                  >
                    <Icons.plusCircled className="h-4 w-4" />
                  </Link>
                </div>
                <AccordionContent>
                  <Accordion
                    type="single"
                    className="flex flex-col gap-1"
                    collapsible
                  >
                    {teams &&
                      teams.length > 0 &&
                      teams.map((team, index) => {
                        const { image_uri, initials } = generateAvatar({
                          name: team.name,
                        });
                        return (
                          <AccordionItem key={team.id} value={team.id}>
                            <div className="flex justify-between items-center">
                              <AccordionTrigger
                                className={cn(
                                  buttonVariants({
                                    variant: "ghost",
                                    size: "sm",
                                  }),
                                  "flex w-full justify-between gap-2 py-0"
                                )}
                                key={index}
                              >
                                <span className="flex gap-2 items-center">
                                  <Avatar className={cn("h-5 w-5 rounded-sm")}>
                                    <AvatarImage
                                      src={team.image_uri || image_uri}
                                      alt={team.name ?? ""}
                                    />
                                    <AvatarFallback>{initials}</AvatarFallback>
                                  </Avatar>
                                  {team.name}
                                </span>
                              </AccordionTrigger>
                              <Link
                                href="#"
                                className={cn(
                                  buttonVariants({
                                    variant: "ghost",
                                    size: "icon",
                                  }),
                                  " h-7 w-7"
                                )}
                              >
                                <Icons.dotsHorizontal className="h-4 w-4" />
                              </Link>
                            </div>
                            <AccordionContent key={team.id}>
                              <span className="flex gap-1 ml-1">
                                <Separator
                                  orientation="vertical"
                                  className="bg-primary h-auto"
                                />
                                <Nav
                                  rootPath={`${rootPath}/${team.url_key}`}
                                  isCollapsed={isCollapsed}
                                  items={items}
                                />
                              </span>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      </nav>
    </div>
  );
}
