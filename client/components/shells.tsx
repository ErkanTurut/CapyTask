import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const shellVariants = cva("grid gap-8", {
  variants: {
    variant: {
      default: "container pb-8 pt-6",
      centered: "container flex h-[100dvh] max-w-2xl flex-col justify-center",
      markdown: "container max-w-3xl gap-0 py-8 md:py-10 lg:py-10",
      markdown_centered:
        "container max-w-3xl gap-0 py-8 md:py-10 lg:py-10 flex h-[100dvh] flex-col justify-center",
      markdown_full:
        "container max-w-3xl gap-0 py-8 md:py-10 lg:py-10 flex h-[100dvh] flex-col justify-center",
      dashboard:
        " border-border w-full rounded-lg border backdrop-blur-[2px] p-6 ",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {
  as?: React.ElementType;
}

const Shell: React.FC<ShellProps> = ({
  className,
  as: Comp = "section",
  variant,
  ...props
}) => {
  return (
    <Comp className={cn(shellVariants({ variant }), className)} {...props} />
  );
};

export { Shell, shellVariants };
