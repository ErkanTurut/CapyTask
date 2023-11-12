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
} from "./ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Icons } from "./icons";
import ThemeToggle from "./themeToggle";

import { getUser } from "@/lib/services/user";

interface UserAccountNavProps {
  user_id: string;
  isDashboard?: boolean;
}

const UserAccountNav: FC<UserAccountNavProps> = async ({
  user_id,

  isDashboard,
}) => {
  const user = await getUser(user_id);

  if (!user) return null;
  const initials = `${user.first_name?.charAt(0) ?? ""} ${
    user.last_name?.charAt(0) ?? ""
  }`;
  const profilePicture =
    user?.image_uri ??
    `https://avatar.vercel.sh/${initials}.svg?text=${initials}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profilePicture} alt={user.first_name ?? ""} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        sideOffset={8}
        forceMount
      >
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
            {isDashboard ? (
              <Link href="/">
                <Icons.externalLink
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                />
                Back to site
                <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
              </Link>
            ) : (
              <Link href="/dashboard">
                <Icons.mix className="mr-2 h-4 w-4" aria-hidden="true" />
                Dashboard
                <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
              </Link>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/account/settings">
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
