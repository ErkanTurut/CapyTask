"use client";
import React, { FC, useEffect, useState } from "react";

import { cn, generateAvatar } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { unstable_batchedUpdates } from "react-dom"; // or 'react-native'

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

import { useSidebar, useWorkspace } from "@/lib/store";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface WorkspaceNavProps extends React.HTMLAttributes<HTMLDivElement> {}

const WorkspaceNav: FC<WorkspaceNavProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { url_key } = useParams();

  const isCollapsed = useSidebar()((state) => state.isCollapsed);

  const workspaces = useWorkspace()((state) => state.workspaceList)!;
  const selectedWorkspace = useWorkspace()((state) => state.workspace);
  const setSelectedWorkspace = useWorkspace()((state) => state.setWorkspace);

  useEffect(() => {
    setSelectedWorkspace(
      workspaces.find((workspace) => workspace?.url_key === url_key) ??
        workspaces?.[0],
    );
  }, [url_key, workspaces, setSelectedWorkspace]);

  const groups = [
    {
      label: "Workspaces",
      workspaces: workspaces,
    },
  ];

  if (!selectedWorkspace) return null;
  const { image_uri, initials } = generateAvatar({
    name: selectedWorkspace.name,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          className,
          isCollapsed &&
            "flex h-8 w-8 items-center justify-center overflow-ellipsis [&>span]:w-auto [&>svg]:hidden",
        )}
        asChild
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className="w-full gap-1"
          size={isCollapsed ? "icon" : "default"}
        >
          <Avatar className="h-5 w-5 rounded-sm">
            <AvatarImage
              src={selectedWorkspace.image_uri || image_uri}
              alt={selectedWorkspace.url_key}
            />
            <AvatarFallback className="h-5 w-5 rounded-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span
            className={cn(
              "cursor-pointer overflow-x-auto overflow-ellipsis whitespace-nowrap	", // Adjust the max-width as needed
              isCollapsed && "hidden",
            )}
          >
            {selectedWorkspace.name}
          </span>
          <Icons.caretSort className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-1">
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
                    <Avatar className="mr-2 h-5 w-5 rounded-sm">
                      <AvatarImage
                        src={
                          generateAvatar({
                            name: workspace.name,
                          }).image_uri
                        }
                        alt={workspace.url_key}
                      />
                      <AvatarFallback className="mr-2 h-5 w-5 rounded-sm">
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
                          : "opacity-0",
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
