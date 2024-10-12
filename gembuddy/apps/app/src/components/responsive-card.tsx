"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@gembuddy/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@gembuddy/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@gembuddy/ui/drawer";
import useWindowSize from "@/lib/hooks/use-window-size";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Icons } from "./icons";
interface ResponsiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ResponsiveCard({ children, className }: ResponsiveCardProps) {
  const { isDesktop, isMobile, isTablet } = useWindowSize();

  const router = useRouter();

  if (isMobile) {
    return (
      <Drawer
        shouldScaleBackground={true}
        open={true}
        onClose={() => router.back()}
      >
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>
              {
                "Make changes to your profile here. Click save when you're done."
              }
            </DrawerDescription>
          </DrawerHeader>
          <span className="px-4">{children}</span>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button onClick={() => router.back()} variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  if (isTablet) {
    return (
      <Dialog open={true} onOpenChange={() => router.back()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              {
                "Make changes to your profile here. Click save when you're done."
              }
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Card className="sticky top-4 h-min">
      <CardHeader>
        <CardTitle>Plan detail</CardTitle>
        <CardDescription>
          Update the details below to update your plan template. You will be
          able to use this plan in your work order.
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
