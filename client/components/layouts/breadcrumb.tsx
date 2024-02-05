"use client";

import React, { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Icons } from "../icons";

function Params() {
  const searchParams = useSearchParams()!;

  return searchParams.toString().length !== 0 ? (
    <div className="px-2 text-gray-500">
      <span>?</span>
      {Array.from(searchParams.entries()).map(([key, value], index) => {
        return (
          <React.Fragment key={key}>
            {index !== 0 ? <span>&</span> : null}
            <span className="px-1">
              <span
                key={key}
                className="animate-[highlight_1s_ease-in-out_1] text-gray-100"
              >
                {key}
              </span>
              <span>=</span>
              <span
                key={value}
                className="animate-[highlight_1s_ease-in-out_1] text-gray-100"
              >
                {value}
              </span>
            </span>
          </React.Fragment>
        );
      })}
    </div>
  ) : null;
}

export function Breadcrumb() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-x-2 rounded-sm border bg-accent p-1 px-2">
      <div className="text-primary">
        <Icons.logo size="s" />
      </div>
      <div className="flex items-center gap-x-1 text-sm font-medium text-primary ">
        {pathname ? (
          <>
            <p>/</p>
            {pathname
              .split("/")
              .slice(1)
              .map((segment, index, array) => {
                if (index === 0) return;
                const isLastSegment = index === array.length - 1;
                return (
                  <React.Fragment key={segment}>
                    <Link
                      className="underline"
                      href={`/${array.slice(0, index + 1).join("/")}`}
                    >
                      {segment}
                    </Link>
                    {isLastSegment ? null : <p>/</p>}
                  </React.Fragment>
                );
              })}
          </>
        ) : null}
      </div>
    </div>
  );
}
