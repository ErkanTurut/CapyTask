"use client";
import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@gembuddy/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@gembuddy/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@gembuddy/ui/avatar";
import { Icons } from "@/components/icons";
import ThemeToggle from "@/components/theme-toggle";

import { cn, generateAvatar } from "@/lib/utils";

import { Database } from "@gembuddy/supabase/types";
import { useParams } from "next/navigation";

interface UserAccountNavProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  user: Database["public"]["Tables"]["user"]["Row"];
}

const UserAccountNav: FC<UserAccountNavProps> = ({ className, user }) => {
  const { image_url, initials } = generateAvatar({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });
  const isCollapsed = false;
  const { url_key } = useParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={isCollapsed ? "icon" : "default"}
          className={cn(
            "flex items-center justify-start gap-1",
            isCollapsed &&
              "flex h-8 w-8 items-center justify-center overflow-ellipsis [&>span]:w-auto [&>svg]:hidden",
            className,
          )}
        >
          <Avatar className={cn("h-6 w-6")}>
            <AvatarImage
              src={user.image_uri || image_url}
              alt={user.first_name ?? ""}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span
            className={cn(
              "cursor-pointer overflow-x-auto overflow-ellipsis whitespace-nowrap",
              isCollapsed && "hidden",
            )}
          >
            {user.first_name || user.last_name
              ? `${user.first_name} ${user.last_name}`
              : user.email}
          </span>
          <Icons.caretSort
            className="ml-auto h-4 w-4 min-w-min"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[220px]" sideOffset={8} forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/${url_key}/settings`}>
              <Icons.gear className="mr-2 h-4 w-4" aria-hidden="true" />
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/signout">
              <Icons.lightning className="mr-2 h-4 w-4" aria-hidden="true" />
              Command menu
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-row items-center justify-between space-y-1">
              <p className="leading-none">Theme</p>
              <ThemeToggle toggle={false} className="h-4 w-4" />
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/signout">
            <Icons.logout className="mr-2 h-4 w-4" aria-hidden="true" />
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
