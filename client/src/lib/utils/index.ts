import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-US";
import dayjs from "dayjs";
import { z } from "zod";

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
    return toast.error(errors.join("\n"));
  } else if (err instanceof Error) {
    return toast.error(err.message);
  } else {
    return toast.error("Something went wrong, please try again later.");
  }
}

export function randomString(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function isMacOs() {
  if (typeof window === "undefined") return false;

  return window.navigator.userAgent.includes("Mac");
}

export function generateAvatar({
  name,
  size,
  withFallback = true,
  first_name,
  last_name,
  email,
}: {
  name?: string;
  size?: number;
  withFallback?: boolean;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
}) {
  let initials = "";

  let input = name || first_name || last_name || email || randomString(5);

  if (name) {
    const nameParts = name.split(" ");
    if (nameParts.length === 1) {
      // Single-word name
      initials = `${name.charAt(0)}`.toUpperCase();
    } else {
      // Multi-word name
      initials =
        `${nameParts[0].charAt(0) ?? ""}` +
        `${nameParts[1].charAt(0) ?? ""}`.toUpperCase();
    }
  }

  if (first_name && last_name) {
    initials = `${first_name.charAt(0) ?? ""}${last_name.charAt(0) ?? ""}`;
  }

  let image_uri = `https://avatar.vercel.sh/${input}.svg${
    withFallback ? `?text=${initials}` : ""
  }${size ? `&size=${size}` : ""}`;

  return { image_uri, initials };
}
