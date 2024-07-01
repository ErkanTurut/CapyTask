import { Database } from "@/types/supabase.types";
import { createContext, useContext, useState } from "react";
import { create } from "zustand";

interface LivekitState {
  token: string | null;
  setToken: (token: string | null) => void;
  url: string | undefined;
  setUrl: (url: string | undefined) => void;
}

const createLivekit = ({
  token,
  url,
}: {
  token: LivekitState["token"];
  url: LivekitState["url"];
}) =>
  create<LivekitState>((set) => ({
    token,
    setToken: (token) => set({ token }),
    url,
    setUrl: (url) => set({ url }),
  }));

const LivekitContext = createContext<ReturnType<typeof createLivekit> | null>(
  null,
);

export const useLivekit = () => {
  if (!LivekitContext)
    throw new Error("useSidebar must be used within a SidebarProvider");
  return useContext(LivekitContext)!;
};

export const LivekitProvider = ({
  token,
  url,
  children,
}: {
  token: LivekitState["token"];
  url: LivekitState["url"];
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createLivekit({ token, url }));
  return (
    <LivekitContext.Provider value={store}>{children}</LivekitContext.Provider>
  );
};
