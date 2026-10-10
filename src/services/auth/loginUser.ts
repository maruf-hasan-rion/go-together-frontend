"use server";

import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  type UserRole,
} from "@/lib/auth-utils";
import { parse } from "cookie";
import { redirect } from "next/navigation";
import { decodeJwt } from "@/lib/jwt-decode";
import { setCookie } from "./tokenHandlers";
import { loginValidationZodSchema } from "@/zod/auth.validation";
import { zodValidator } from "@/lib/zodValidator";
import { serverFetch } from "@/lib/server-fetch";
import type { ActionState } from "@/types/action";

export const loginUser = async (
  _currentState: unknown,
  formData: FormData,
): Promise<ActionState> => {
  try {
    const redirectTo = formData.get("redirect");
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validation = zodValidator(payload, loginValidationZodSchema);
    if (!validation.success) return validation;

    const res = await serverFetch.post("/auth/login", {
      body: JSON.stringify(validation.data),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    const setCookieHeaders = res.headers.getSetCookie();

    let accessTokenObject: Record<string, string> | null = null;
    let refreshTokenObject: Record<string, string> | null = null;

    for (const cookie of setCookieHeaders ?? []) {
      const parsedCookie = parse(cookie) as Record<string, string>;
      if (parsedCookie.accessToken) accessTokenObject = parsedCookie;
      if (parsedCookie.refreshToken) refreshTokenObject = parsedCookie;
    }

    if (!accessTokenObject || !refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    const cookieOptions = {
      secure: true,
      httpOnly: true,
      sameSite: "none" as const,
      path: "/" as const,
    };

    await setCookie("accessToken", accessTokenObject.accessToken, {
      ...cookieOptions,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
    });

    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      ...cookieOptions,
      maxAge: parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
    });

    const decoded = decodeJwt(accessTokenObject.accessToken);
    if (!decoded || decoded.expired || !decoded.payload.role) {
      throw new Error("Invalid token");
    }
    const userRole = decoded.payload.role as UserRole;

    if (!result.success) {
      throw new Error(result.message || "Login failed");
    }

    if (redirectTo) {
      const requestedPath = String(redirectTo);
      if (isValidRedirectForRole(requestedPath, userRole)) {
        redirect(`${requestedPath}?loggedIn=true`);
      } else {
        redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
      }
    } else {
      redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
    }
  } catch (error) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if ((error as { digest?: string })?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : "Login Failed"
          : "Login Failed. You might have entered incorrect email or password.",
    };
  }
};
