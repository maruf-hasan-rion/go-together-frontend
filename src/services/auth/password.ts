"use server";

import { serverFetch } from "@/lib/server-fetch";
import { deleteCookie } from "@/services/auth/tokenHandlers";
import { zodValidator } from "@/lib/zodValidator";
import {
  changePasswordZodSchema,
  forgotPasswordZodSchema,
  resetPasswordZodSchema,
} from "@/zod/auth.validation";

type AuthActionResult = {
  success: boolean;
  message?: string;
  errors?: { field: string; message: string }[];
  redirectToLogin?: boolean;
};

export const forgotPassword = async (
  _prevState: unknown,
  formData: FormData,
): Promise<AuthActionResult> => {
  const payload = { email: formData.get("email") };

  const validated = zodValidator(payload, forgotPasswordZodSchema);
  if (!validated.success) {
    return {
      success: false,
      message: "Please check the form",
      errors: (validated.errors ?? []).map((error) => ({
        field: String(error.field),
        message: error.message,
      })),
    };
  }

  try {
    const response = await serverFetch.post("/auth/forgot-password", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validated.data),
      cache: "no-store",
    });

    const result = await response.json();

    return {
      success: Boolean(result?.success),
      message:
        result?.message ||
        "If the account exists, a password reset link has been sent.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : "Something went wrong"
          : "Something went wrong. Please try again.",
    };
  }
};

export const changePassword = async (
  _prevState: unknown,
  formData: FormData,
): Promise<AuthActionResult> => {
  const payload = {
    oldPassword: formData.get("oldPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const validated = zodValidator(payload, changePasswordZodSchema);
  if (!validated.success) {
    return {
      success: false,
      message: "Please check the form",
      errors: (validated.errors ?? []).map((error) => ({
        field: String(error.field),
        message: error.message,
      })),
    };
  }

  try {
    const response = await serverFetch.post("/auth/change-password", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        oldPassword: validated.data?.oldPassword,
        newPassword: validated.data?.newPassword,
      }),
      cache: "no-store",
    });

    const result = await response.json();

    // The backend revoked every session. Clear this deployment's own cookies
    // too, otherwise the proxy still sees a valid accessToken and bounces
    // /login back to the dashboard, so the change never appears to take effect.
    if (result?.success) {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
    }

    return {
      success: Boolean(result?.success),
      message: result?.message || "Password changed successfully.",
      redirectToLogin: Boolean(result?.success),
    };
  } catch (error) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : "Something went wrong"
          : "Something went wrong. Please try again.",
    };
  }
};

export const resetPassword = async (
  _prevState: unknown,
  formData: FormData,
): Promise<AuthActionResult> => {
  const payload = {
    token: formData.get("token"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const validated = zodValidator(payload, resetPasswordZodSchema);
  if (!validated.success) {
    return {
      success: false,
      message: "Please check the form",
      errors: (validated.errors ?? []).map((error) => ({
        field: String(error.field),
        message: error.message,
      })),
    };
  }

  try {
    const response = await serverFetch.post("/auth/reset-password", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: validated.data?.token,
        newPassword: validated.data?.newPassword,
      }),
      cache: "no-store",
    });

    const result = await response.json();

    return {
      success: Boolean(result?.success),
      message: result?.message || "Password reset successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : "Something went wrong"
          : "Something went wrong. Please try again.",
    };
  }
};
