import { Logout } from "@/components/auth/logout";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells";

export default function LogOutPage() {
  return (
    <Shell className="max-w-xs">
      <PageHeader
        id="sign-out-page-header"
        aria-labelledby="sign-out-page-header-heading"
        className="text-center"
      >
        <PageHeaderHeading size="sm">Log out</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Are you sure you want to log out?
        </PageHeaderDescription>
      </PageHeader>
      <Logout />
    </Shell>
  );
}
