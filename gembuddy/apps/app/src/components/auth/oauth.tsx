"use client";
import * as React from "react";

import { Button } from "@gembuddy/ui/button";
import { Icons } from "@/components/icons";

import { Provider } from "@/types";
import { catchError } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const oauthProviders = [
  { name: "Google", provider: "google", icon: "google" },
  { name: "Github", provider: "github", icon: "gitHub" },
  { name: "Discord", provider: "discord", icon: "discord" },
] satisfies {
  name: string;
  icon: keyof typeof Icons;
  provider: Provider;
}[];

export function OAuthSignIn() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  async function oauthSignIn(provider: Provider) {
    const supabase = createClient();

    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `https://app.gembuddy.co/api/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setIsLoading(false);
      catchError(error);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon];
        return (
          <Button
            aria-label={`Sign in with ${provider.name}`}
            key={provider.provider}
            variant="outline"
            className="w-full bg-background sm:w-auto"
            onClick={() => void oauthSignIn(provider.provider)}
            isLoading={isLoading}
          >
            <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
            {provider.name}
          </Button>
        );
      })}
    </div>
  );
}
