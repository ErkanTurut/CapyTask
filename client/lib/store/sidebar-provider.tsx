import { Database } from "@/types/supabase.types";
import { createContext, useContext, useState } from "react";
import { create } from "zustand";

interface SidebarState {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const createSidebar = (isCollapsed: SidebarState["isCollapsed"]) =>
  create<SidebarState>((set) => ({
    isCollapsed,
    setIsCollapsed: (isCollapsed) => set({ isCollapsed }),
  }));

const SidebarContext = createContext<ReturnType<typeof createSidebar> | null>(
  null,
);

export const useSidebar = () => {
  if (!SidebarContext)
    throw new Error("useSidebar must be used within a SidebarProvider");
  return useContext(SidebarContext)!;
};

export const SidebarProvider = ({
  isCollapsed,
  children,
}: {
  isCollapsed: SidebarState["isCollapsed"];
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createSidebar(isCollapsed));
  return (
    <SidebarContext.Provider value={store}>{children}</SidebarContext.Provider>
  );
};
