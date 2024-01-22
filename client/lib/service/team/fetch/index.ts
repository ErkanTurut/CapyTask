import "server-only";

import { unstable_cache as cache } from "next/cache";
import { SupabaseClient } from "@/lib/supabase/server";
import { sleep } from "@/lib/utils";
// import { cache } from "react";

export const getTeams = async ({
  workspace_id,
  supabase,
}: {
  workspace_id: string;
  supabase: SupabaseClient;
}) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return await supabase
    .from("team")
    .select("*")
    .eq("workspace_id", workspace_id);

  return await cache(
    async () => {
      return await supabase
        .from("team")
        .select("*")
        .eq("workspace_id", workspace_id);
    },
    [`${session?.user.id}-${workspace_id}-teams`],
    {
      revalidate: 60,
      tags: [`${session?.user.id}-${workspace_id}-teams`],
    },
  )();
};

export const getTeamsByUrlKey = async ({
  url_key,
  supabase,
}: {
  url_key: string;
  supabase: SupabaseClient;
}) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return await cache(
    async () => {
      return await supabase
        .from("workspace")
        .select("team(*)")
        .eq("url_key", url_key)
        .single();
    },
    [`${session?.user.id}-${url_key}-teams`],
    {
      revalidate: 60,
      tags: [`${session?.user.id}-${url_key}-teams`],
    },
  )();
};

export const getTeam = async ({
  team_id,
  supabase,
}: {
  team_id: string;
  supabase: SupabaseClient;
}) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return await cache(
    async () => {
      return await supabase.from("team").select("*").eq("id", team_id).single();
    },
    [`${session?.user.id}-${team_id}-team`],
    {
      revalidate: 60,
      tags: [`${session?.user.id}-${team_id}-team`],
    },
  )();
};

export const getTeamByIdentity = async ({
  identity,
  supabase,
}: {
  identity: string;
  supabase: SupabaseClient;
}) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return await cache(
    async () => {
      return await supabase
        .from("team")
        .select("*")
        .eq("identity", identity)
        .single();
    },
    [`${session?.user.id}-${identity}-team`],
    {
      revalidate: 60,
      tags: [`${session?.user.id}-${identity}-team`],
    },
  )();
};

export const getTeamByUrlKey = async ({
  url_key,
  indentity,
  supabase,
}: {
  url_key: string;
  indentity: string;
  supabase: SupabaseClient;
}) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return await cache(
    async () => {
      return await supabase
        .from("team")
        .select("*")
        .eq("url_key", url_key)
        .eq("identity", indentity)
        .single();
    },
    [`${session?.user.id}-${url_key}-${indentity}-team`],
    {
      revalidate: 60,
      tags: [`${session?.user.id}-${url_key}-${indentity}-team`],
    },
  )();
};
