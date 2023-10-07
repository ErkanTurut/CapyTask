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
  items: { title: string; href: string }[];
  icon?: React.ReactNode;
}

export default function OrganizationSelector({
  className,
  items,
  ...props
}: OrganizationSelectorProps) {
  return (
    <div className={cn("", className)}>
      <Select>
        <SelectTrigger className="w-full h-full">
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
