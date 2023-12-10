"use client";
import { FC, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

import { cn } from "@/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Icons } from "./icons";

import { useParams, useRouter } from "next/navigation";
import { serverClient } from "@/trpc";
import { workspace } from "@prisma/client";
import Link from "next/link";
import { CreateWorspaceForm } from "./workspace/workspace-create";
interface WorkspaceNavProps extends React.HTMLAttributes<HTMLDivElement> {
  workspaces: Pick<workspace, "name" | "description" | "url_key">[];
  // workspaces: Awaited<
  //   ReturnType<(typeof serverClient)["workspace"]["getWorkspaces"]["query"]>
  // >;
}

const WorkspaceNav: FC<WorkspaceNavProps> = ({ workspaces, className }) => {
  const [open, setOpen] = useState(false);
  const [showNewWorkspaceDialog, setShowNewWorkspaceDialog] = useState(false);
  const router = useRouter();
  const { url_key } = useParams();

  const groups = [
    {
      label: "Workspaces",
      workspaces: workspaces,
    },
  ];

  const selectedWorkspace =
    workspaces.find((workspace) => workspace?.url_key === url_key) ??
    workspaces?.[0];

  if (!selectedWorkspace) return null;

  const initials = `${selectedWorkspace.name?.charAt(0) ?? ""}`;

  return (
    <Dialog
      open={showNewWorkspaceDialog}
      onOpenChange={setShowNewWorkspaceDialog}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className="w-full"
          >
            <Avatar className="mr-2 h-5 w-5 rounded-sm">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedWorkspace.url_key}.png`}
                alt={selectedWorkspace.url_key}
              />
              <AvatarFallback className="mr-2 h-5 w-5 rounded-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
            {selectedWorkspace.name}
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
                        router.push(`/${workspace.url_key}/teams`);
                      }}
                      className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis"
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
                      <Icons.checkCircled
                        className={cn(
                          "ml-auto h-4 w-4",
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
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewWorkspaceDialog(true);
                    }}
                  >
                    <Icons.plusCircled className="mr-2 h-4 w-4" />
                    Create workspace
                  </CommandItem>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewWorkspaceDialog(true);
                    }}
                  >
                    <Icons.logout className="mr-2 h-4 w-4" />
                    Log out
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to collaborate with your buddies.
          </DialogDescription>
        </DialogHeader>
        <CreateWorspaceForm />

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowNewWorkspaceDialog(false)}
            className="w-full"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceNav;
