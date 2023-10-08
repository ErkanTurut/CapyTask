"use client";

import {
  HydrationBoundary,
  HydrateOptions,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

function Hydrate(props: any) {
  const queryClient = new QueryClient();
  return <HydrationBoundary state={dehydrate(queryClient)} />;
}

export default Hydrate;
