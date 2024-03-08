"use client";
import * as React from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { useRouter } from "next/navigation";

interface layoutProps {
  children: React.ReactNode;
}

export function Modal({ children }: layoutProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();

  if (isDesktop) {
    return (
      <Dialog defaultOpen>
        <DialogContent className="sm:max-w-3xl">{children}</DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={true}
      //   onOpenChange={() => router.back()}
      // onClose={() => router.back()}
    >
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}
