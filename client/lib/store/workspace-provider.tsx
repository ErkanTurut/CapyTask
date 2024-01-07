import { Database } from "@/types/supabase.types";
import { createContext, useContext, useState } from "react";
import { create } from "zustand";

interface WorkspaceState {
  workspace: Database["public"]["Tables"]["workspace"]["Row"];
  setWorkspace: (
    workspace: Database["public"]["Tables"]["workspace"]["Row"],
  ) => void;

  workspaceList: Database["public"]["Tables"]["workspace"]["Row"][];
  setWorkspaceList: (
    workspaceList: Database["public"]["Tables"]["workspace"]["Row"][],
  ) => void;
}

const createWorkspace = (
  workspace: WorkspaceState["workspace"],
  workspaceList: WorkspaceState["workspaceList"],
) =>
  create<WorkspaceState>((set) => ({
    workspace,
    setWorkspace: (workspace) => set({ workspace }),
    workspaceList,
    setWorkspaceList: (workspaceList) => set({ workspaceList }),
  }));

const WorkspaceContext = createContext<ReturnType<
  typeof createWorkspace
> | null>(null);

export const useWorkspace = () => {
  if (!WorkspaceContext)
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  return useContext(WorkspaceContext)!;
};

// workspace provider

export const WorkspaceProvider = ({
  workspace,
  workspaceList,
  children,
}: {
  workspace: WorkspaceState["workspace"];
  workspaceList: WorkspaceState["workspaceList"];
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createWorkspace(workspace, workspaceList));
  return (
    <WorkspaceContext.Provider value={store}>
      {children}
    </WorkspaceContext.Provider>
  );
};
