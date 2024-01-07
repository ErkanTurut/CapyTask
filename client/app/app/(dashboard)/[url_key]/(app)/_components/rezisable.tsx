"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useState, FC, useEffect } from "react";
import { Shell } from "@/components/shells";
import { useParams } from "next/navigation";
import { useTeam, useUser, useWorkspace } from "@/lib/store";
import { Sidebar } from "./sidebar";
import { Database } from "@/types/supabase.types";
import { TooltipProvider } from "@/components/ui/tooltip";

interface AppProps {
  children: React.ReactNode;
  defaultLayout?: number[];
}

const Resizable: FC<AppProps> = ({ children, defaultLayout = [20, 80] }) => {
  return (
    <ResizablePanel defaultSize={defaultLayout[1]}>{children}</ResizablePanel>
  );
};

export default Resizable;
