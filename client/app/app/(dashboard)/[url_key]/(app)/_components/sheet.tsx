"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PropsWithChildren } from "react";
const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

export function SheetSide({ children }: PropsWithChildren) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">test</Button>
      </SheetTrigger>
      <SheetContent className="h-screen" side={"left"}>
        {children}
      </SheetContent>
    </Sheet>
  );
}
