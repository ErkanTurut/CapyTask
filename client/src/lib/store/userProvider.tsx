import { Database } from "@/types/supabase.types";
import { createContext, useContext, useState } from "react";
import { create } from "zustand";
// Database["public"]["Tables"]["user"]["Row"];
interface UserState {
  user: Database["public"]["Tables"]["user"]["Row"] | null;
  setUser: (user: Database["public"]["Tables"]["user"]["Row"] | null) => void;
  // updateUser: (
  //   updatedUser: Database["public"]["Tables"]["user"]["Row"]
  // ) => void;
}

const createUser = (user: UserState["user"]) =>
  create<UserState>((set) => ({
    user,
    setUser: (user) => set({ user }),

    //  updateUser: (updatedUser) =>
    //   set((state) => ({ user: { ...state.user, ...updatedUser } })),
  }));

const UserContext = createContext<ReturnType<typeof createUser> | null>(null);

export const useUser = () => {
  if (!UserContext)
    throw new Error("useUser must be used within a UserProvider");
  return useContext(UserContext)!;
};

export const UserProvider = ({
  user,
  children,
}: {
  user: UserState["user"];
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createUser(user));
  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
};
