import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { type VariantProps } from "class-variance-authority";
import Link from "next/link";

interface sideNavProps {}

const NavLink = ({
  item,
  href,
  size,
  isActive,
}: {
  item: NavItem;
  href: string;
  size?: VariantProps<typeof buttonVariants>["size"];
  isActive: boolean;
}) => {
  const Icon = item.icon ? Icons[item.icon] : null;
  return item.disabled ? (
    <Button variant="ghost" size="sm" className="h-6 justify-start" disabled>
      {Icon && <Icon className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />}
      <span className="overflow-x-auto overflow-ellipsis whitespace-nowrap">
        {item.title}
      </span>
      {item.label && <span className="ml-auto">{item.label}</span>}
    </Button>
  ) : (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: isActive ? "default" : item.variant || "ghost",
          size: size,
        }),
        "h-6 justify-start shadow-none",
      )}
    >
      {Icon && (
        <Icon
          className="mr-2 h-4 w-4 shrink-0"
          aria-hidden="true"
          strokeWidth={1.5}
        />
      )}
      <span className="overflow-x-auto overflow-ellipsis whitespace-nowrap">
        {item.title}
      </span>
      {item.label && <span className="ml-auto">{item.label}</span>}
    </Link>
  );
};

export default function SideNav({}: sideNavProps) {
  return <div>side-nav</div>;
}
