"use client";

import React, { PropsWithChildren } from "react";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

import { SidebarProvider, useSidebar } from "@/lib/store";
import { unstable_batchedUpdates } from "react-dom";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
  navCollapsedSize?: number;
}

export function Sidebar({
  children,
  defaultLayout = [20, 80],
  navCollapsedSize,
  defaultCollapsed = false,
  className,
}: SidebarProps) {
  const setIsCollapsed = useSidebar()((state) => state.setIsCollapsed);
  const isCollapsed = useSidebar()((state) => state.isCollapsed);
  const handlePanelChange = (collapsed: boolean) => {
    unstable_batchedUpdates(() => {
      setIsCollapsed(collapsed);
    });
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
      collapsed,
    )};path=/`;
  };

  return (
    <>
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={13}
        maxSize={20}
        onCollapse={() => handlePanelChange(true)}
        onExpand={() => handlePanelChange(false)}
        className={cn(
          "flex min-w-[120px] flex-col justify-between",
          isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out",
          className,
        )}
        data-collapsed={isCollapsed}
      >
        {children}
      </ResizablePanel>
      <ResizableHandle withHandle />
    </>
  );
}

export const SidebarHeader: React.FC<SidebarProps> = ({
  children,
  className,
}) => {
  return <div className={cn(className)}>{children}</div>;
};

export const SidebarBody: React.FC<SidebarProps> = ({
  children,
  className,
}) => {
  return <div className={cn(className)}>{children}</div>;
};

export const SidebarFooter: React.FC<SidebarProps> = ({
  children,
  className,
}) => {
  return <div className={cn(className)}>{children}</div>;
};
