import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@gembuddy/ui/menubar";

import { cn } from "@/lib/utils";
import { Icons } from "@gembuddy/ui/icons";
import type { FC } from "react";
import BackButton from "../back-button";

interface toolbarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Toolbar: FC<toolbarProps> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <Menubar className="justify-between border bg-background/80 px-2 text-muted-foreground shadow-inner backdrop-blur-sm ">
        <BackButton />
        <span className="flex gap-2">
          <MenubarMenu>
            <MenubarTrigger>Feedback</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Docs</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Icons.bell className="mr-1 h-4 w-4" />
              <span className="hidden md:inline">Notifications</span>
            </MenubarTrigger>
          </MenubarMenu>
        </span>
      </Menubar>
    </div>
  );
};

export default Toolbar;
