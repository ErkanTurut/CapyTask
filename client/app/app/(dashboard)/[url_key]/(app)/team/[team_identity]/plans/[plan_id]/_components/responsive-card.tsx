"use client";

import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import useWindowSize from "@/lib/hooks/use-window-size";
import { useRouter } from "next/navigation";
interface ResponsiveCardProps {
  children: React.ReactNode;
}

export function ResponsiveCard({ children }: ResponsiveCardProps) {
  const { isDesktop, isMobile, isTablet } = useWindowSize();
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

  return <Card className="sticky top-4 h-min">{children}</Card>;
}
