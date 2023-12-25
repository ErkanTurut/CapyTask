"use client";
import React, { FC, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import { Icons } from "../icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { useWorkspace } from "@/lib/store";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface WorkspaceNavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean;
}

const WorkspaceNav: FC<WorkspaceNavProps> = ({ isCollapsed, className }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { url_key } = useParams();

  const workspaces = useWorkspace()((state) => state.workspaceList)!;

  const selectedWorkspace = useWorkspace()((state) => state.workspace);
  const setSelectedWorkspace = useWorkspace()((state) => state.setWorkspace);

  useEffect(() => {
    setSelectedWorkspace(
      workspaces.find((workspace) => workspace?.url_key === url_key) ??
        workspaces?.[0]
    );
  }, [url_key, workspaces, setSelectedWorkspace]);

  const groups = [
    {
      label: "Workspaces",
      workspaces: workspaces,
    },
  ];

  const WorkspaceIcon: FC<{ isSelected: boolean }> = ({ isSelected }) => (
    <Icons.checkCircled
      className={cn(
        "ml-auto h-4 w-4",
        isSelected ? "opacity-100" : "opacity-0"
      )}
    />
  );
  if (!selectedWorkspace) return null;

  const initials = `${selectedWorkspace.name?.charAt(0) ?? ""}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          className,
          isCollapsed &&
            "flex h-8 w-8 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
        )}
        asChild
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className="w-full gap-1"
        >
          <Avatar className="h-5 w-5 rounded-sm">
            <AvatarImage
              src={`https://avatar.vercel.sh/${
                selectedWorkspace.url_key
              }.svg?text=${initials.toUpperCase()}`}
              alt={selectedWorkspace.url_key}
            />
            <AvatarFallback className="h-5 w-5 rounded-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span
            className={cn(
              "flex max-w-md text-left justify-start overflow-hidden whitespace-nowrap overflow-ellipsis cursor-pointer",
              isCollapsed && "hidden"
            )}
          >
            {selectedWorkspace.name}
          </span>
          <Icons.caretSort className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search team..." />
            <CommandEmpty>No team found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.workspaces.map((workspace) => (
                  <CommandItem
                    key={workspace.url_key}
                    onSelect={() => {
                      setOpen(false);
                      setSelectedWorkspace(workspace);
                      router.push(`/dashboard/${workspace.url_key}/teams`);
                    }}
                    className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis cursor-pointer"
                  >
                    <Avatar className="mr-2 h-5 w-5 rounded-sm">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${workspace.url_key}.png`}
                        alt={workspace.url_key}
                      />
                      <AvatarFallback className="mr-2 h-5 w-5 rounded-sm">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    {workspace.name}
                    <WorkspaceIcon
                      isSelected={
                        selectedWorkspace.url_key === workspace.url_key
                      }
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                }}
              >
                <Icons.plusCircled className="mr-2 h-4 w-4" />
                <Link href="/create">Create workspace</Link>
              </CommandItem>

              <CommandItem
                onSelect={() => {
                  setOpen(false);
                }}
              >
                <Icons.logout className="mr-2 h-4 w-4" />
                <Link href="/signout">Log out</Link>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default WorkspaceNav;
