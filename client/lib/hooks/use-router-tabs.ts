import { useRouter } from "next/router";

export function useRouterTabs(name = "tab") {
  const router = useRouter();

  return {
    tabValue: router.query.tab as string,
    setTabValue: (value: string) => {
      router.push({
        query: {
          ...router.query,
          [name]: value,
        },
      });
    },
  };
}
