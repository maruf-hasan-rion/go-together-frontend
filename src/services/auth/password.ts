/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import {
  forgotPasswordZodSchema,
  resetPasswordZodSchema,
} from "@/zod/auth.validation";

export const forgotPassword = async (_prevState: any, formData: FormData): Promise<any> => {
  const payload = { email: formData.get("email") };

  const validated = zodValidator(payload, forgotPasswordZodSchema);
  if (!validated.success) {
    return { ...validated, formData: payload };
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
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong. Please try again.",
    };
  }
};

export const resetPassword = async (_prevState: any, formData: FormData): Promise<any> => {
  const payload = {
    token: formData.get("token"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const validated = zodValidator(payload, resetPasswordZodSchema);
  if (!validated.success) {
    return { ...validated, formData: payload };
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
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong. Please try again.",
    };
  }
};
