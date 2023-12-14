import { redirect } from "next/navigation";
interface RedirectPageProps {
  params: {
    url_key: string;
  };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  redirect(`/dashboard/${params.url_key}/settings/account/profile`);
}
