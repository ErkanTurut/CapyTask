import React from "react";

export * from "./cn";

type PossibleRef<T> = React.Ref<T> | undefined;

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */
export function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => refs.forEach((ref) => setRef(ref, node));
}

/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */
export function useComposedRefs<T>(...refs: PossibleRef<T>[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(composeRefs(...refs), refs);
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

  let image_url = `https://avatar.vercel.sh/${input}.svg${
    withFallback ? `?text=${initials}` : ""
  }${size ? `&size=${size}` : ""}`;

  return { image_url, initials };
}
