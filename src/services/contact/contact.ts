"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { contactValidationZodSchema } from "@/zod/contact.validation";

type ContactActionResult = {
  success: boolean;
  message?: string;
  errors?: { field: string; message: string }[];
};

export const submitContact = async (
  _prevState: unknown,
  formData: FormData,
): Promise<ContactActionResult> => {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const validated = zodValidator(payload, contactValidationZodSchema);
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
    const response = await serverFetch.post("/contact", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validated.data),
      cache: "no-store",
    });

    const result = await response.json();

    return {
      success: Boolean(result?.success),
      message: result?.message || "Thanks! We received your message.",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
    };
  }
};
