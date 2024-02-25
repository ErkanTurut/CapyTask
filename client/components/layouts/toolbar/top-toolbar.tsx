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
} from "@/components/ui/menubar";

import { FC } from "react";
import BackButton from "../back-button";
import { Icons } from "@/components/icons";

interface toolbarProps {}

const Toolbar: FC<toolbarProps> = ({}) => {
  return (
    <div className="sticky top-0 z-40 p-2 ">
      <Menubar className="justify-between border-b  border-none bg-background/80 p-2 backdrop-blur-sm ">
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
              Notifications
            </MenubarTrigger>
          </MenubarMenu>
        </span>
      </Menubar>
    </div>
  );
};

export default Toolbar;
