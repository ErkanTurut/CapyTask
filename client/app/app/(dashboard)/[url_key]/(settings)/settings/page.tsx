import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { useTeam } from "@/lib/store";
interface SettingsPageProps {
  params: {
    url_key: string;
  };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  return (
    <PageHeader id="account-header" aria-labelledby="account-header-heading">
      <PageHeaderHeading size="lg">Settings</PageHeaderHeading>
      <PageHeaderDescription size="sm">
        Manage your settings
      </PageHeaderDescription>
    </PageHeader>
  );
}
