"use client";

import { ResizablePanel } from "@/components/ui/resizable";
import { FC } from "react";

interface AppProps {
  children: React.ReactNode;
  defaultLayout?: number[];
}

const Resizable: FC<AppProps> = ({ children, defaultLayout = [20, 80] }) => {
  return (
    <ResizablePanel className="flex-1" defaultSize={defaultLayout[1]}>
      {children}
    </ResizablePanel>
  );
};

export default Resizable;
