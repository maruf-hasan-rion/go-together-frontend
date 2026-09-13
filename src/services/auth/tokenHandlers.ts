"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { parse } from "cookie";

export const setCookie = async (key: string, value: string, options: Partial<ResponseCookie>) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value, options);
};

export const getCookie = async (key: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value || null;
};

export const deleteCookie = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
};

/**
 * Copies the accessToken/refreshToken cookies from a backend response
 * onto the Next cookie store (the backend sets both on login, Google
 * sign-in and refresh).
 */
export const persistAuthCookiesFromResponse = async (response: Response) => {
  const setCookieHeaders = response.headers.getSetCookie();
  if (!setCookieHeaders?.length) return false;

  let accessCookie: Record<string, string> | null = null;
  let refreshCookie: Record<string, string> | null = null;

  for (const header of setCookieHeaders) {
    const parsed = parse(header) as Record<string, string>;
    if (parsed.accessToken) accessCookie = parsed;
    if (parsed.refreshToken) refreshCookie = parsed;
  }

  if (!accessCookie || !refreshCookie) return false;

  const maxAge = (cookie: Record<string, string>, fallbackSeconds: number) =>
    Number(cookie["Max-Age"] ?? cookie["max-age"]) || fallbackSeconds;

  await setCookie("accessToken", accessCookie.accessToken, {
    secure: true,
    httpOnly: true,
    maxAge: maxAge(accessCookie, 60 * 60),
    path: accessCookie.Path || "/",
    sameSite: (accessCookie.SameSite || "none").toLowerCase() as ResponseCookie["sameSite"],
  });

  await setCookie("refreshToken", refreshCookie.refreshToken, {
    secure: true,
    httpOnly: true,
    maxAge: maxAge(refreshCookie, 60 * 60 * 24 * 90),
    path: refreshCookie.Path || "/",
    sameSite: (refreshCookie.SameSite || "none").toLowerCase() as ResponseCookie["sameSite"],
  });

  return true;
};
