import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import WorkspaceSelector from "../sidebar/workspace-selector";
import WorkspaceSkeleton from "@/components/workspace/workspace-skeleton";
import { Separator } from "@/components/ui/separator";
import { Nav } from "@/components/layouts/side-navigation/nav";
import { appNavItems } from "@/config/dashboard.config";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  params: {
    url_key: string;
  };
}

export default async function Sidebar({ className, params }: SidebarProps) {
  return (
    <aside
      className={cn("hidden min-w-[240px] rounded-md md:block", className)}
    >
      <div className="flex h-full w-full flex-col justify-between">
        <div className="w-full p-2">
          <Button variant={"outline"} className="w-full shadow-none">
            dd
          </Button>
        </div>
        <Separator />
        <div className="flex-1 p-2">
          <Nav
            level={1}
            rootPath={`/${params.url_key}`}
            items={appNavItems.main}
            isCollapsed={false}
          />
        </div>
        <Separator />
        <div className="p-2">
          <Button variant={"outline"} className="w-full shadow-none">
            dd
          </Button>
        </div>
      </div>
    </aside>
  );
}
