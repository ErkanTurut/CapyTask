import { Database } from "@/types/supabase.types";
import { createContext, useContext, useState } from "react";
import { create } from "zustand";

interface TeamState {
  teamList: Database["public"]["Tables"]["team"]["Row"][] | null;
  setTeamList: (
    teamList: Database["public"]["Tables"]["team"]["Row"][] | null,
  ) => void;

  addTeam: (team: Database["public"]["Tables"]["team"]["Row"]) => void;
  updateTeam: (team: Database["public"]["Tables"]["team"]["Row"]) => void;
  deleteTeam: (team: Database["public"]["Tables"]["team"]["Row"]) => void;
}

const createTeam = (teamList: TeamState["teamList"]) =>
  create<TeamState>((set) => ({
    teamList,
    setTeamList: (teamList) => set({ teamList }),
    addTeam: (team) =>
      set((state) => ({
        teamList: [...(state.teamList ?? []), team],
      })),
    updateTeam: (team) =>
      set((state) => ({
        team,
        teamList: state.teamList?.map((t) => (t.id === team.id ? team : t)),
      })),
    deleteTeam: (team) =>
      set((state) => ({
        teamList: state.teamList?.filter((t) => t.id !== team.id) ?? null,
      })),
  }));

const TeamContext = createContext<ReturnType<typeof createTeam> | null>(null);

export const useTeam = () => {
  if (!TeamContext)
    throw new Error("useTeam must be used within a TeamProvider");
  return useContext(TeamContext)!;
};

// Team provider

export const TeamProvider = ({
  teamList,
  children,
}: {
  teamList: TeamState["teamList"];
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createTeam(teamList));
  return <TeamContext.Provider value={store}>{children}</TeamContext.Provider>;
};
