"use client";
import { FC } from "react";
import type { User } from "@clerk/backend";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./userAvatar";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

interface UserAccountNavProps {
  user: Pick<User, "firstName" | "imageUrl" | "emailAddresses">;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            firstName: user.firstName || null,
            imageUrl: user.imageUrl,
          }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.firstName && (
              <p className="font-medium"> {user.firstName} </p>
            )}
            {user.emailAddresses && (
              <p className="w-[200] truncate text-sm text-zinc-700">
                {user.emailAddresses[0].emailAddress}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">Pofile</Link>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
