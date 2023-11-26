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

import type { workspace } from "@prisma/client";
import { useRouter } from "next/navigation";

interface WorkspaceNavProps extends React.HTMLAttributes<HTMLDivElement> {
  // user: Pick<user, "first_name" | "last_name" | "email" | "image_uri">;
  workspaces: Pick<workspace, "name" | "description" | "url_key">[] | null;
  url_key: string;
}

const WorkspaceNav: FC<WorkspaceNavProps> = ({
  workspaces,
  url_key,
  className,
}) => {
  const groups = [
    {
      label: "Workspaces",
      workspaces: workspaces ?? [],
    },
  ];

  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const selectedWorkspace =
    workspaces?.find((workspace) => workspace.url_key === url_key) ??
    workspaces?.[0];

  const router = useRouter();

  if (!selectedWorkspace) return null;

  const initials = `${selectedWorkspace.name?.charAt(0) ?? ""}`;

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
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
                        router.push(`/${workspace.url_key}/team`);
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
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <Icons.plusCircled className="mr-2 h-4 w-4" />
                    Create Team
                  </CommandItem>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
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
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>
            Add a new team to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">
                    <span className="font-medium">Free</span> -{" "}
                    <span className="text-muted-foreground">
                      Trial for two weeks
                    </span>
                  </SelectItem>
                  <SelectItem value="pro">
                    <span className="font-medium">Pro</span> -{" "}
                    <span className="text-muted-foreground">
                      $9/month per user
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceNav;
