"use client"; // Error components must be Client Components

import { TRPCError } from "@trpc/server";

export default function Error({
  error,
  reset,
}: {
  error: TRPCError;
  reset: () => void;
}) {
  console.error(error.message);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <code>{error.message}</code>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
