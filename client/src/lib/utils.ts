import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { isClerkAPIResponseError } from "@clerk/nextjs";
import { formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-US";
import * as z from "zod";
import dayjs from "dayjs";

import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result;
    } else {
      if (result === "just now") return result;
      return result + " ago";
    }
  }

  return result;
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  });
}

export function formatDate(date: Date | string) {
  return dayjs(date).format("MMMM D, YYYY");
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return toast(errors.join("\n"));
  } else if (err instanceof Error) {
    return toast(err.message);
  } else {
    return toast("Something went wrong, please try again later.");
  }
}

export function catchClerkError(err: unknown) {
  const unknownErr = "Something went wrong, please try again later.";

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return toast(errors.join("\n"));
  } else if (isClerkAPIResponseError(err)) {
    return toast.error(err.errors[0]?.longMessage ?? unknownErr);
  } else {
    return toast.error(unknownErr);
  }
}
