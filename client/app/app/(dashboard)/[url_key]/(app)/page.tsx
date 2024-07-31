import { createClient } from "@/lib/supabase/server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

interface PageProps {}

export default function Page({}: PageProps) {
  const supabase = createClient(cookies());
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (session) {
      const jwt = jwtDecode(session.access_token);
      console.log(jwt);
    }
  });
  return <div>page</div>;
}
