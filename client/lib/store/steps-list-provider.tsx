"use client";
import { Database } from "@/types/supabase.types";
import { createContext, useContext, useState } from "react";
import { create } from "zustand";

interface StepsListState {
  orderedSteps: Database["public"]["Tables"]["step"]["Row"][] | null;
  setOrderedSteps: (
    steps: Database["public"]["Tables"]["step"]["Row"][] | null,
  ) => void;
}

const createStepsList = (orderedSteps: StepsListState["orderedSteps"]) =>
  create<StepsListState>((set) => ({
    orderedSteps,
    setOrderedSteps: (orderedSteps) => set({ orderedSteps }),
  }));

const StepsListContext = createContext<ReturnType<
  typeof createStepsList
> | null>(null);

export const useStepsList = () => {
  if (!StepsListContext)
    throw new Error("useStepsList must be used within a SidebarProvider");
  return useContext(StepsListContext)!;
};

export const StepsListProvider = ({
  orderedSteps,
  children,
}: {
  orderedSteps: StepsListState["orderedSteps"];
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createStepsList(orderedSteps));
  return (
    <StepsListContext.Provider value={store}>
      {children}
    </StepsListContext.Provider>
  );
};
