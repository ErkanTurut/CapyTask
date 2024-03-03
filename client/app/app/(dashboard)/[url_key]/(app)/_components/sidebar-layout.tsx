"use client";

import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import React from "react";

import { useSidebar } from "@/lib/store";

export interface SidebarLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
  navCollapsedSize?: number;
}

export function SidebarLayout({
  children,
  defaultLayout = [20, 80],
  navCollapsedSize,
  defaultCollapsed = false,
  className,
}: SidebarLayoutProps) {
  const setIsCollapsed = useSidebar()((state) => state.setIsCollapsed);
  const isCollapsed = useSidebar()((state) => state.isCollapsed);

  const handlePanelChange = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
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
          " flex h-screen min-w-[120px] flex-col justify-between",
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

export const SidebarHeader: React.FC<SidebarLayoutProps> = ({
  children,
  className,
}) => {
  return <div className={cn(className)}>{children}</div>;
};

export const SidebarBody: React.FC<SidebarLayoutProps> = ({
  children,
  className,
}) => {
  return <div className={cn(className)}>{children}</div>;
};

export const SidebarFooter: React.FC<SidebarLayoutProps> = ({
  children,
  className,
}) => {
  return <div className={cn(className)}>{children}</div>;
};
