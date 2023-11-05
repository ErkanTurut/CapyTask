import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/utils";
interface minimizeButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

const MinimizeButton: FC<minimizeButtonProps> = ({ className }) => {
  return (
    <Button variant="ghost" size="icon">
      <Icons.doubleArrowLeft
        className={cn("h-4 w-4", className)}
        aria-hidden="true"
      />
    </Button>
  );
};

export default MinimizeButton;
