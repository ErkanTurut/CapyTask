import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import * as React from "react";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  avatarUrl?: string;
  children: React.ReactNode;
}

export function ProfileCard({
  name,
  avatarUrl,
  children,
  className,
}: ProfileCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between rounded-md border border-transparent px-2 py-1 transition-all duration-300 hover:border-border hover:shadow-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6 border">
          <AvatarImage
            src={
              avatarUrl ||
              `https://avatar.vercel.sh/${name}.svg?text=${initials}`
            }
            alt={name}
          />
          <AvatarFallback className="text-[0.6rem]">{initials}</AvatarFallback>
        </Avatar>
        <h3 className="text-sm font-medium">{name}</h3>
        <Icons.questionMarkCircled className="h-4 w-4 text-muted-foreground" />
      </div>
      {children}
    </div>
  );
}
