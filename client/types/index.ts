import { type z } from "zod";

import { type Icons } from "@/components/icons";
import { Button, ButtonProps } from "@/components/ui/button";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  image_url?: string;
  label?: string;
  description?: string;
  badge?: string;
  badgeColor?: string;
  variant?: ButtonProps["variant"];
  items?: NavItem[];
  id: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export interface SideNavItem {
  isCollapsed: boolean;
  items: NavItemWithOptionalChildren[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = SideNavItem;
export type SettingsNavItem = SideNavItem;

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface StoredFile {
  id: string;
  name: string;
  url: string;
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[];
}

// export interface Category {
//   title: Product["category"]
//   image: string
//   icon: React.ComponentType<{ className?: string }>
//   subcategories: Subcategory[]
// }

export interface Subcategory {
  title: string;
  description?: string;
  image?: string;
  slug: string;
}

// export interface CuratedStore {
//   id: Store["id"]
//   name: Store["name"]
//   description?: Store["description"]
//   stripeAccountId?: Store["stripeAccountId"]
//   productCount?: number
// }

// export type CartItem = z.infer<typeof cartItemSchema>

// export type CheckoutItem = z.infer<typeof checkoutItemSchema>

// export type CartLineItem = z.infer<typeof cartLineItemSchema>

// export type StripePaymentStatus = Stripe.PaymentIntent.Status

export interface SubscriptionPlan {
  id: "basic" | "standard" | "pro";
  name: string;
  description: string;
  features: string[];
  stripePriceId: string;
  price: number;
}

export interface UserSubscriptionPlan extends SubscriptionPlan {
  stripeSubscriptionId?: string | null;
  stripeCurrentPeriodEnd?: string | null;
  stripeCustomerId?: string | null;
  isSubscribed: boolean;
  isCanceled: boolean;
  isActive: boolean;
}

export type Provider =
  | "apple"
  | "azure"
  | "bitbucket"
  | "discord"
  | "facebook"
  | "figma"
  | "github"
  | "gitlab"
  | "google"
  | "kakao"
  | "keycloak"
  | "linkedin"
  | "notion"
  | "slack"
  | "spotify"
  | "twitch"
  | "twitter"
  | "workos"
  | "zoom";

export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: Option[];
}
