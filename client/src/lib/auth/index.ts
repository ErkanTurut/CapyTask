import createSupabaseServerClient from "../supabase/server";

export const getSession = async () => {
  const supabase = await createSupabaseServerClient();
  return supabase.auth.getSession();
};
