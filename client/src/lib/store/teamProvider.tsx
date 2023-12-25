import { Database } from "@/types/supabase.types";
import { createContext, useContext, useState } from "react";
import { create } from "zustand";

interface TeamState {
  team: Database["public"]["Tables"]["team"]["Row"] | null;
  setTeam: (team: Database["public"]["Tables"]["team"]["Row"] | null) => void;

  teamList: Database["public"]["Tables"]["team"]["Row"][] | null;
  setTeamList: (
    teamList: Database["public"]["Tables"]["team"]["Row"][] | null
  ) => void;
}

const createTeam = (team: TeamState["team"], teamList: TeamState["teamList"]) =>
  create<TeamState>((set) => ({
    team,
    setTeam: (team) => set({ team }),
    teamList,
    setTeamList: (teamList) => set({ teamList }),
  }));

const TeamContext = createContext<ReturnType<typeof createTeam> | null>(null);

export const useTeam = () => {
  if (!TeamContext)
    throw new Error("useTeam must be used within a TeamProvider");
  return useContext(TeamContext)!;
};

// Team provider

export const TeamProvider = ({
  team,
  teamList,
  children,
}: {
  team: TeamState["team"];
  teamList: TeamState["teamList"];
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createTeam(team, teamList));
  return <TeamContext.Provider value={store}>{children}</TeamContext.Provider>;
};
