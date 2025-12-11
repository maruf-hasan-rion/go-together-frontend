/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { loginUser } from "./loginUser";
import { registerValidationZodSchema } from "@/zod/auth.validation";
import { zodValidator } from "@/lib/zodValidator";
import { serverFetch } from "@/lib/server-fetch";

export const registerUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    console.log(formData.get("fullName"));
    const payload = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (zodValidator(payload, registerValidationZodSchema).success === false) {
      return zodValidator(payload, registerValidationZodSchema);
    }

    const validatedPayload: any = zodValidator(
      payload,
      registerValidationZodSchema
    ).data;

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
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration Failed. Please try again."
      }`,
    };
  }
};
