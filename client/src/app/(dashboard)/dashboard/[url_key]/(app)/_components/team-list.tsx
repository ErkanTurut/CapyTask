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
  params: { url_key: string };
  rootPath: string;
}

export function TeamList({
  items,
  teams,
  isCollapsed,
  params,
  rootPath,
}: TeamListProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:px-2">
        <div className="flex flex-col ">
          {teams && teams?.length > 0 ? (
            <Accordion
              type="single"
              className="flex flex-col gap-1"
              collapsible
            >
              {teams.map((team, index) => {
                const { image_uri, initials } = generateAvatar({
                  name: team.name,
                });
                const href = `${rootPath}/${team.url_key}`;

                return isCollapsed ? (
                  <Tooltip key={index} delayDuration={0}>
                    <TooltipTrigger key={index} asChild>
                      <Link
                        href={`/dashboard/${params?.url_key}/${team.id}`}
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
                ) : (
                  <AccordionItem key={team.id} value={team.id}>
                    <AccordionTrigger
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "flex w-full justify-between gap-2 py-0  "
                      )}
                      key={index}
                    >
                      <span className="flex gap-2 items-center ">
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
                    <AccordionContent key={team.id}>
                      <span className="flex gap-1 ml-1">
                        <Separator
                          orientation="vertical"
                          className="bg-primary h-auto "
                        />
                        <Nav
                          rootPath={href}
                          isCollapsed={isCollapsed}
                          items={items}
                        />
                      </span>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          ) : (
            <p>you have no teams</p>
          )}
        </div>
      </nav>
    </div>
  );
}
