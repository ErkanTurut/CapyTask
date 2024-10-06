"use client";
import React, { FC, useState } from "react";

import { cn, generateAvatar } from "@gembuddy/ui/";
import { Avatar, AvatarFallback, AvatarImage } from "@gembuddy/ui/avatar";
import { Button } from "@gembuddy/ui/button";

import { Icons } from "@/components/icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

import { useSidebar } from "@/lib/store";
import { Database } from "@/types/supabase.types";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface WorkspaceNavProps extends React.HTMLAttributes<HTMLDivElement> {
  workspaces: Database["public"]["Tables"]["workspace"]["Row"][];
  workspace: Database["public"]["Tables"]["workspace"]["Row"];
}

const WorkspaceNav: FC<WorkspaceNavProps> = ({
  className,
  workspaces,
  workspace,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspace);
  const router = useRouter();
  const isCollapsed = false;
  const groups = [
    {
      label: "Workspaces",
      workspaces: workspaces,
    },
  ];

  if (!selectedWorkspace) return null;
  const { image_url, initials } = generateAvatar({
    name: selectedWorkspace.name,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className={cn(
            "w-full shadow-none",
            isCollapsed && "[&>span]:w-auto [&>svg]:hidden",
            className
          )}
          size={isCollapsed ? "icon" : "default"}
        >
          <Avatar className="h-5 w-5 rounded-md">
            <AvatarImage
              src={selectedWorkspace.image_uri || image_url}
              alt={selectedWorkspace.url_key}
            />
            <AvatarFallback className="h-5 w-5 rounded-md">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span
            className={cn(
              "w-full cursor-pointer overflow-x-auto overflow-ellipsis whitespace-nowrap", // Adjust the max-width as needed
              isCollapsed && "hidden"
            )}
          >
            {selectedWorkspace.name}
          </span>

          <Icons.caretSort className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-[220px] p-1">
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
                      router.push(`/${workspace.url_key}/team`);
                    }}
                  >
                    <Avatar className="mr-2 h-5 w-5 rounded-md">
                      <AvatarImage
                        src={
                          generateAvatar({
                            name: workspace.name,
                          }).image_url
                        }
                        alt={workspace.url_key}
                      />
                      <AvatarFallback className="mr-2 h-5 w-5 rounded-md">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="cursor-pointer overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {workspace.name}
                    </span>

                    <Icons.checkCircled
                      className={cn(
                        "ml-auto h-4 w-4 min-w-min",
                        selectedWorkspace.url_key === workspace.url_key
                          ? "opacity-100"
                          : "opacity-0"
                      )}
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
