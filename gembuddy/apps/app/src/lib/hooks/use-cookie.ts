import { useEffect, useState } from "react";

type UseCookieReturnType = {
  cookie: string | undefined;
  setCookie: (value: string, days?: number) => void;
};

const useCookie = (cookieName: string): UseCookieReturnType => {
  const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  const setCookie = (name: string, value: string, days?: number): void => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
  };

  const [cookie, setCookieState] = useState<string | undefined>(() =>
    getCookie(cookieName),
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const newCookie = getCookie(cookieName);
      if (newCookie !== cookie) setCookieState(newCookie);
    }, 100);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [cookie, cookieName]);

  return {
    cookie,
    setCookie: (value: string, days?: number) =>
      setCookie(cookieName, value, days),
  };
};

export default useCookie;
