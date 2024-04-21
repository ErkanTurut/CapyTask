"use client";
import { Database } from "@/types/supabase.types";
import { Button, ButtonProps } from "./ui/button";
import { Icons } from "./icons";

interface statusButtonProps extends ButtonProps {
  status: Database["public"]["Enums"]["Status"];
}

const statusConfigMap: Record<
  Database["public"]["Enums"]["Status"],
  { variant: ButtonProps["variant"]; icon: keyof typeof Icons; label: string }
> = {
  OPEN: {
    variant: "outline",
    icon: "view",
    label: "Open",
  },
  IN_PROGRESS: {
    variant: "outline",
    icon: "timer",
    label: "In progress",
  },
  COMPLETED: {
    variant: "outline",
    icon: "check",
    label: "Completed",
  },
  ON_HOLD: {
    variant: "outline",
    icon: "pause",
    label: "On hold",
  },
  CANCELED: {
    variant: "ghost",
    icon: "CrossCircled",
    label: "Canceled",
  },
};

export function StatusButton({ status, className }: statusButtonProps) {
  const config = statusConfigMap["CANCELED"];
  const Icon = Icons[config.icon];

  return (
    <Button size={"sm"} variant={config.variant}>
      <Icon className="mr-2 h-4 w-4" />
      {config.label}
    </Button>
  );
}
