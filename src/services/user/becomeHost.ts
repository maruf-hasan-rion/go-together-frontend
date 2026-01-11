/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { z } from "zod";
import { revalidateTag } from "next/cache";

import { zodValidator } from "@/lib/zodValidator";
import { serverFetch } from "@/lib/server-fetch";

const createHostApplicationSchema = z.object({
  message: z.string().min(10, "Please tell us more about yourself"),
});

export const createHostApplication = async (
  _currentState: any,
  formData: FormData
) => {
  const payload = {
    message: formData.get("message"),
  };

  const validated = zodValidator(payload, createHostApplicationSchema);

  if (!validated.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validated.errors,
      formData: payload,
    };
  }

  try {
    // IMPORTANT: server action -> backend call should hit your API base URL inside serverFetch
    const res = await serverFetch.post("/auth/apply-host", {
      // ✅ Don’t set Content-Type manually unless you’re 100% sure serverFetch doesn’t do it
      body: JSON.stringify(validated.data),
      cache: "no-store",
    });

    // ✅ Safe parse (prevents "Unexpected end of JSON input")
    const text = await res.text();
    const result = text ? JSON.parse(text) : null;

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || res.statusText || "Request failed",
      };
    }

    if (result?.success) {
      revalidateTag("host-application", { expire: 0 });
      // (optional) if you show host status anywhere else:
      revalidateTag("me", { expire: 0 });
      revalidateTag("user", { expire: 0 });
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};
