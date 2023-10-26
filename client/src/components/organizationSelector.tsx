import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface OrganizationSelectorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
}

export default function OrganizationSelector({
  className,
  ...props
}: OrganizationSelectorProps) {
  const items = [
    {
      title: "Project 1",
      href: "/project-1",
    },
    {
      title: "Project 2",
      href: "/project-2",
    },
    {
      title: "Project 3",
      href: "/project-3",
    },
  ];
  return (
    <div className={cn("", className)}>
      <Select>
        <SelectTrigger className="w-full h-full overflow-auto ">
          <SelectValue placeholder="test" />
        </SelectTrigger>
        <SelectContent>
          {items.map((item, index) => {
            return (
              <SelectItem key={index} value={item.href}>
                {item.title}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
