import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { Icons } from "@/components/icons";
import { Database } from "@/types/supabase.types";
import Link, { LinkProps } from "next/link";
import { Button } from "./button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center w-full rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-7 rounded-sm px-3 text-xs",
        lg: "h-20 rounded-md p-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ListItemProps
  extends VariantProps<typeof buttonVariants>,
    React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

const Item = React.forwardRef<HTMLButtonElement, ListItemProps>(
  ({ className, variant, size, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(
          " flex w-full items-center justify-between rounded-md  border border-background px-4 py-2 transition-all hover:border-border",
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Item.displayName = "Item";

const ItemStart = React.forwardRef<HTMLButtonElement, ListItemProps>(
  ({ className, variant, size, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

export { Item };
// <Link className={className} {...props}>
//   {step.name}
//   <span className="sr-only">Get Started</span>
//   <div className="ml-1 transition group-hover:translate-x-1">
//     <Icons.arrowRight className="h-4 w-4" />
//   </div>
// </Link>

// <div className="inline-flex h-20 w-full items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors  hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
//   <div className="flex items-center p-4">
//     <div className="flex items-center gap-4">
//       <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800/30">
//         <img
//           alt="Avatar"
//           className="rounded-full"
//           height={32}
//           src="/placeholder.svg"
//           style={{
//             aspectRatio: "32/32",
//             objectFit: "cover",
//           }}
//           width={32}
//         />
//       </div>
//       <div className="space-y-1.5">
//         <div className="flex items-center gap-2">
//           <h3 className="text-sm font-semibold">Sarah Day</h3>
//           <Badge className="text-xs" variant="primary">
//           New
//         </Badge>
//         </div>
//         <p className="text-sm text-gray-500 dark:text-gray-400">
//           Product Designer
//         </p>
//       </div>
//     </div>
//     <div className="ml-auto flex items-center gap-4">
//       <FileIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
//     <Button size="sm">Follow</Button>
//     </div>
//   </div>
// </div>
