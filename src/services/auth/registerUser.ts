"use server";

import { loginUser } from "./loginUser";
import { registerValidationZodSchema } from "@/zod/auth.validation";
import { zodValidator } from "@/lib/zodValidator";
import { serverFetch } from "@/lib/server-fetch";
import type { ActionState } from "@/types/action";

export const registerUser = async (
  _currentState: unknown,
  formData: FormData,
): Promise<ActionState> => {
  try {
    const payload = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const validation = zodValidator(payload, registerValidationZodSchema);
    if (!validation.success) return validation;

    const validatedPayload = validation.data as {
      fullName: string;
      email: string;
      password: string;
    };

    const registerData = {
      fullName: validatedPayload.fullName,
      email: validatedPayload.email,
      password: validatedPayload.password,
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerData));

    const res = await serverFetch.post("/user/create-user", {
      body: newFormData,
    });
    const result = await res.json();

    if (result.success) {
      await loginUser(_currentState, formData);
    }

    return result;
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
            : "Registration Failed"
          : "Registration Failed. Please try again.",
    };
  }
};
