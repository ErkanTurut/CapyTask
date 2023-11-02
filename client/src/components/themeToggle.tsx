"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/utils";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ThemeToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  toggle?: boolean;
}

export default function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const themes = ["light", "dark", "system"];

  return props.toggle ? (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      <Icons.sun
        className={cn(
          "h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
          className
        )}
        aria-hidden="true"
      />
      <Icons.moon
        className={cn(
          "absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
          className
        )}
        aria-hidden="true"
      />
    </Button>
  ) : (
    <Select defaultValue={theme} onValueChange={(e) => setTheme(e)}>
      <SelectTrigger className="w-[90px] h-[30px]">
        <SelectValue placeholder={theme} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {themes.map((theme) => (
            <SelectItem key={theme} value={theme}>
              {theme}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
