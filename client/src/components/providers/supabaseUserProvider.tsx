"use client";
import { useEffect, useState, createContext, useContext } from "react";

import {
  User as Auth,
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import type { User } from "@prisma/client";
import useSWR from "swr";

import React from "react";
import { useRouter } from "next/navigation";

type UserContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
  children: React.ReactNode;
  serverSession: Session | null;
}

export default async function SupabaseUserContext({
  children,
  serverSession,
}: Props) {
  const supabase = createClientComponentClient();
  const [isLoadingData, setIsloadingData] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(false);

  const router = useRouter();
  const getUser = async () => {
    const { data: user, error } = await supabase
      .from("User")
      .select("*")
      .eq("id", serverSession?.user?.id)
      .single();
    if (error) {
      return null;
    } else {
      return user;
    }
  };

  const { data: user, error } = useSWR(
    serverSession ? "profile-context" : null,
    getUser
  );

  // Refresh the Page to Sync Server and Client
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverSession?.access_token) {
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase, serverSession?.access_token]);

  const value: UserContextType = {
    user,
    session: serverSession,
    isLoading: isLoadingSession || isLoadingData,
  };

  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
