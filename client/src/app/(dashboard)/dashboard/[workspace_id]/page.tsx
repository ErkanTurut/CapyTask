import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    workspace_id: string;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  console.log(params.workspace_id);
  const workspace = null;
  if (!workspace) {
    redirect("/dashboard/account/settings");
  }

  return <div>page</div>;
};

export default Page;
