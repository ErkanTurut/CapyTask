import { Nav } from "@/components/layouts/side-navigation/nav";
import { appNavItems } from "@/config/dashboard.config";
import { generateAvatar } from "@/lib/utils";
import { trpc } from "@/trpc/server";

interface TeamNavProps {
  params: {
    url_key: string;
  };
}

export default async function TeamNav({ params }: TeamNavProps) {
  const { data: teams } = await trpc.db.team.getByWorkspaceUrlKey({
    url_key: params.url_key,
  });
  return (
    <Nav
      size={"sm"}
      items={[
        {
          title: "Teams",
          id: "all",
          icon: "lightning",
          items: teams?.map((team) => ({
            image_url: generateAvatar({
              name: team.name,
            }).image_url,
            title: team.name,
            href: `/${team.identity}`,
            items: appNavItems.teamNav,
            id: team.identity,
          })),
        },
      ]}
      rootPath={`/${params.url_key}/team`}
    />
  );
}
