"use client";

import { createClient } from "@gembuddy/supabase/client";
import { Button } from "@gembuddy/ui/button";

export function SignOut() {
  const supabase = createClient();

  const handleSignOut = () => {
    supabase.auth.signOut();
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      className="font-mono gap-2 flex items-center"
    >
      <span>Sign out</span>
    </Button>
  );
}
