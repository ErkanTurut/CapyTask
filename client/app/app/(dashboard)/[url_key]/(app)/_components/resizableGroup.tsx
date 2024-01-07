"use client";

import { ResizablePanelGroup } from "@/components/ui/resizable";
import { FC } from "react";

interface ResizableGroupProps {
  children: React.ReactNode;
}

const ResizableGroup: FC<ResizableGroupProps> = ({ children }) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes,
        )};path=/`;
      }}
      className="min-h-screen"
    >
      {children}
    </ResizablePanelGroup>
  );
};

export default ResizableGroup;
