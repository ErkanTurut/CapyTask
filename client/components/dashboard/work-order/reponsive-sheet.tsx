"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface ReponsiveSheetProps {
  children: React.ReactNode;
}

export default function ReponsiveSheet({ children }: ReponsiveSheetProps) {
  return (
    <Sheet modal={false}>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent className="my-auto mr-5 h-fit w-[1000px] border-none bg-transparent p-0">
        {children}
      </SheetContent>
    </Sheet>
  );
}
