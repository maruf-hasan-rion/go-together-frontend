"use server";

import { getDefaultDashboardRoute, UserRole } from "@/lib/auth-utils";
import { decodeJwt } from "@/lib/jwt-decode";
import { serverFetch } from "@/lib/server-fetch";
import { redirect } from "next/navigation";
import { persistAuthCookiesFromResponse } from "./tokenHandlers";

/**
 * Exchanges a Google Identity Services credential (ID token) for the
 * backend's session cookies, then redirects to the role dashboard.
 */
export const googleSignIn = async (idToken: string) => {
  try {
    const response = await serverFetch.post("/auth/google", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
      cache: "no-store",
    });

    const result = await response.json();

    if (!result.success) {
      return { success: false, message: result.message || "Google sign-in failed" };
    }

    const stored = await persistAuthCookiesFromResponse(response);
    if (!stored) {
      return { success: false, message: "Google sign-in failed: no tokens returned" };
    }

    const accessToken = result.data?.accessToken as string | undefined;
    const decoded = accessToken ? decodeJwt(accessToken) : null;
    const role = (decoded?.payload.role as UserRole) || "USER";

    redirect(`${getDefaultDashboardRoute(role)}?loggedIn=true`);
  } catch (error) {
    if ((error as { digest?: string })?.digest?.startsWith("NEXT_REDIRECT")) throw error;

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : "Google sign-in failed"
          : "Google sign-in failed. Please try again.",
    };
  }
};
