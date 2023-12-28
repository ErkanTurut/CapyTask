"use client";

import { Shell } from "@/components/shells/shell";
import { ResizablePanel } from "@/components/ui/resizable";
import { FC } from "react";

interface ResizableProps {
  children: React.ReactNode;
  defaultLayout: number[];
}

const Resizable: FC<ResizableProps> = ({
  children,
  defaultLayout = [30, 70],
}) => {
  return (
    <>
      <ResizablePanel defaultSize={defaultLayout[1]}>
        <Shell
          variant="sidebar"
          className="relative flex-1 flex-col overflow-x-hidden  lg:ml-0 backdrop-blur-[1px]"
        >
          {children}
        </Shell>
      </ResizablePanel>
    </>
  );
};

export default Resizable;
