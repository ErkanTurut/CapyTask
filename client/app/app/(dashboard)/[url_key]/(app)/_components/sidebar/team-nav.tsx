import { generateAvatar } from "@/lib/utils";
import { trpc } from "@/trpc/server";
import { Nav } from "@/components/layouts/side-navigation/nav";
import { appNavItems } from "@/config/dashboard.config";
import { getTeamsByWorkspaceUrlKeyHandler } from "@/trpc/routes/team/get.handler";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

interface TeamNavProps {
  params: {
    url_key: string;
  };
}

export default async function TeamNav({ params }: TeamNavProps) {
  const { data: teams } = await getTeamsByWorkspaceUrlKeyHandler({
    input: {
      url_key: params.url_key,
    },
    db: createClient(cookies()),
  });
  return (
    <Nav
      size={"sm"}
      items={[
        {
          title: "Teams",
          icon: "plusCircled",
          id: "all",
          variant: "default",
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
