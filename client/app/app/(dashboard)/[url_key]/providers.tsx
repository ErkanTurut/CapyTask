"use client";

import { ModalProvider } from "@/components/modal/provider";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const { url_key } = useParams();

  useEffect(() => {
    document.cookie = `workspace_url_key=${JSON.stringify(url_key)};path=/`;
  }, [url_key]);

  return <>{children}</>;
}
