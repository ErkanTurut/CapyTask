"use client";
import { FC, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

import { getUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";

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

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user_id: string;
}
const groups = [
  {
    label: "Personal Account",
    teams: [
      {
        label: "Alicia Koch",
        value: "personal",
      },
    ],
  },
  {
    label: "Teams",
    teams: [
      {
        label: "Acme Inc.",
        value: "acme-inc",
      },
      {
        label: "Monsters Inc.",
        value: "monsters",
      },
    ],
  },
];

const UserAccountSideNav: FC<UserAccountNavProps> = ({
  user_id,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(groups[0].teams[0]);
  const { data: user } = getUser(user_id);

  if (!user) return null;

  const initials = `${user.first_name?.charAt(0) ?? ""} ${
    user.last_name?.charAt(0) ?? ""
  }`;

  const profilePicture =
    user?.image_uri ??
    "https://img.freepik.com/psd-gratuit/illustration-3d-personne-lunettes-soleil_23-2149436188.jpg?w=1380&t=st=1695853412~exp=1695854012~hmac=ac1d11509e02701591f7cee0bbd7272e0cfae1cf206187e087bbf2016c60d32e";

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage src={profilePicture} alt={selectedTeam.label} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            {user.first_name} {user.last_name}
            {/* <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" /> */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.teams.map((team) => (
                    <CommandItem
                      key={team.value}
                      onSelect={() => {
                        setSelectedTeam(team);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={profilePicture}
                          alt={team.label}
                          className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {team.label}
                      {/* <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              selectedTeam.value === team.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          /> */}
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
                    {/* <PlusCircledIcon className="mr-2 h-5 w-5" /> */}
                    Create Team
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

  //   return (
  //     <div className={cn("", className)}>
  //       <Select>
  //         <SelectTrigger className=" overflow-auto ">
  //           <Button variant="secondary" className="relative h-8 w-8 rounded-full">
  //             <Avatar className="h-8 w-8">
  //               <AvatarImage src={profilePicture} alt={user.first_name ?? ""} />
  //               <AvatarFallback>{initials}</AvatarFallback>
  //             </Avatar>
  //           </Button>
  //           <SelectValue placeholder="test" />
  //         </SelectTrigger>
  //         <SelectContent>
  //           <SelectItem value="null">test</SelectItem>
  //         </SelectContent>
  //       </Select>
  //     </div>
  //   );
};

export default UserAccountSideNav;
