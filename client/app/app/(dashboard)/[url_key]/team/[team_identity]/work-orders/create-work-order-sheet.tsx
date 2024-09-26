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
import { Textarea } from "@/components/ui/textarea";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerHeader } from "@/ui/drawer";

export function SheetDemo() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Sheet>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle className="text-xl">Create Work Order</SheetTitle>
          </SheetHeader>
          <div className="flex h-full flex-col justify-between">
            <div className="flex flex-col gap-4 pt-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title" className="text-left">
                  Title
                </Label>
                <Input id="title" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description" className="text-left">
                  Description
                </Label>
                <Textarea id="description" className="max-h-min" />
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Button variant="outline">sdsqdqsdqs </Button>
                <Button variant="outline">sdsqdqsdqs </Button>
              </div>
            </div>
            <Button variant="default">Create</Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open>
      <DrawerContent className="p-6">
        <DrawerHeader className="mb-8 flex flex-row items-center justify-between">
          <h2 className="text-xl">Create Project</h2>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
