"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface layoutProps {
  children: React.ReactNode;
}

export function Modal({ children }: layoutProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();

  if (isDesktop) {
    return (
      <Dialog open={true} onOpenChange={() => router.back()}>
        <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={true}
      //   onOpenChange={() => router.back()}
      onClose={() => router.back()}
    >
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}
