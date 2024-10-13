import { ButtonProps } from "@gembuddy/ui/button";
import { IconType } from "@gembuddy/ui/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: IconType;
  image_url?: string;
  label?: string;
  description?: string;
  badge?: string;
  badgeColor?: string;
  variant?: ButtonProps["variant"];
  items?: NavItem[];
  id: string;
}
