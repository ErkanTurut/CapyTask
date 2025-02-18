import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./db";

export type Client = SupabaseClient<Database>;

export * from "./db";

export type Provider =
  | "apple"
  | "azure"
  | "bitbucket"
  | "discord"
  | "facebook"
  | "figma"
  | "github"
  | "gitlab"
  | "google"
  | "kakao"
  | "keycloak"
  | "linkedin"
  | "notion"
  | "slack"
  | "spotify"
  | "twitch"
  | "twitter"
  | "workos"
  | "zoom";
