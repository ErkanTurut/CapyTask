"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const { url_key } = useParams();

  useEffect(() => {
    document.cookie = `workspace_url_key=${JSON.stringify(url_key)};path=/`;
  }, [url_key]);

  return <TooltipProvider>{children}</TooltipProvider>;
}
