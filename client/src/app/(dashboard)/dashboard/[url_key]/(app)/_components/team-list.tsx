import { NavItem } from "@/types";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { useParams } from "next/navigation";
import { Database } from "@/types/supabase.types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface TeamListProps {
  isCollapsed: boolean;
  items: NavItem[];
  teams: Database["public"]["Tables"]["team"]["Row"][] | null;
  params: { url_key: string };
}

export function TeamList({ items, teams, isCollapsed, params }: TeamListProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:px-2">
        {items.map((item, index) => {
          const Icon = item.icon ? Icons[item.icon] : Icons["chevronRight"];
          return isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={
                    item.href
                      ? `/dashboard/${params?.url_key}${item.href}`
                      : "/"
                  }
                  className={cn(
                    buttonVariants({ variant: item.variant, size: "icon" }),
                    "h-8 w-8",
                    item.variant === "default" &&
                      "dark:bg-muted dark:text-muted-foreground"
                  )}
                  key={index}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span className="sr-only">{item.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                key={index}
                side="right"
                className="flex items-center gap-4"
              >
                {item.title}
                {item.label && (
                  <span className="ml-auto text-muted-foreground">
                    {item.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <>
              <Link
                key={index}
                href={
                  item.href ? `/dashboard/${params?.url_key}${item.href}` : "/"
                }
                className={cn(
                  buttonVariants({ variant: item.variant, size: "sm" }),
                  item.variant === "default" && "dark:bg-muted dark:text-white",
                  "justify-start"
                )}
              >
                {Icon && <Icon className="mr-2 w-4 h-4" aria-hidden="true" />}
                {item.title}
                {item.label && (
                  <span
                    className={cn(
                      "ml-auto",
                      item.variant === "default" &&
                        "text-background dark:text-white"
                    )}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
              {teams && teams?.length > 0 ? (
                <Accordion type="single" collapsible>
                  {teams.map((team, teamIndex) => {
                    const initials = `${team.name?.charAt(0) ?? ""}`;
                    const pathname = "1";
                    const profilePicture =
                      team?.image_uri ??
                      `https://avatar.vercel.sh/${initials}.svg?text=${initials}`;
                    return (
                      <AccordionItem key={teamIndex} value="item-1">
                        <AccordionTrigger
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "sm" }),
                            "flex w-full justify-between gap-2 py-0  mb-1 bg-muted"
                          )}
                        >
                          <span className="flex gap-2 items-center ">
                            <Avatar className={cn("h-5 w-5 rounded-sm")}>
                              <AvatarImage
                                src={profilePicture}
                                alt={team.name ?? ""}
                              />
                              <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            {team.name}
                          </span>
                        </AccordionTrigger>

                        <AccordionContent key={team.id}>
                          <span className="flex gap-2 ml-2">
                            <Separator
                              orientation="vertical"
                              className="bg-primary h-auto "
                            />
                            <span className="flex flex-col w-full gap-1">
                              <Link
                                aria-label={team.name}
                                key={teamIndex}
                                href="/"
                                className={cn(
                                  buttonVariants({
                                    variant: "ghost",
                                    size: "sm",
                                  }),
                                  pathname === team.id
                                    ? "bg-muted hover:bg-muted font-bold "
                                    : "hover:bg-muted",
                                  "justify-start w-full"
                                )}
                              >
                                <Icons.user
                                  className="mr-2 w-4 h-4"
                                  aria-hidden="true"
                                />
                                Members
                              </Link>
                              <Link
                                aria-label={team.name}
                                key={teamIndex}
                                href={`/dashboard/${params?.url_key}/team/${team.id}/projects`}
                                className={cn(
                                  buttonVariants({
                                    variant: "ghost",
                                    size: "sm",
                                  }),
                                  pathname === team.id
                                    ? "bg-muted hover:bg-muted font-bold "
                                    : "hover:bg-muted",
                                  "justify-start w-full"
                                )}
                              >
                                <Icons.lightning
                                  className="mr-2 w-4 h-4"
                                  aria-hidden="true"
                                />
                                Projects
                              </Link>
                              <Link
                                aria-label={team.name}
                                key={teamIndex}
                                href="/"
                                className={cn(
                                  buttonVariants({
                                    variant: "ghost",
                                    size: "sm",
                                  }),
                                  pathname === team.id
                                    ? "bg-muted hover:bg-muted font-bold "
                                    : "hover:bg-muted",
                                  "justify-start w-full"
                                )}
                              >
                                <Icons.fileText
                                  className="mr-2 w-4 h-4"
                                  aria-hidden="true"
                                />
                                Reports
                              </Link>
                            </span>
                          </span>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              ) : (
                <p>you have no teams</p>
              )}
            </>
          );
        })}
      </nav>
    </div>
  );
}
