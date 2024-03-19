"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import useTailwindBreakpoint from "@/lib/hooks/use-tailwind-breakpoint";
import useWindowSize from "@/lib/hooks/use-window-size";
import { useRouter } from "next/navigation";
interface ResponsiveCardProps {
  children: React.ReactNode;
}

export function ResponsiveCard({ children }: ResponsiveCardProps) {
  const { isDesktop, isMobile, isTablet } = useWindowSize();
  console.log({ isDesktop, isMobile, isTablet });

  const router = useRouter();

  if (isMobile) {
    return (
      <Drawer open={true} onClose={() => router.back()}>
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    );
  }
  if (isTablet) {
    return (
      <Dialog open={true} onOpenChange={() => router.back()}>
        <DialogContent className="p-0">{children}</DialogContent>
      </Dialog>
    );
  }

  return (
    <Card className="sticky top-4 h-min">
      <CardHeader>
        <CardTitle>Plan detail</CardTitle>
        <CardDescription>
          Update the details below to update your plan template. You will be
          able to use this plan in your inspections.
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
