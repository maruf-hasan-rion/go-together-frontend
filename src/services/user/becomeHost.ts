/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { zodValidator } from "@/lib/zodValidator";
import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";
import { z } from "zod";

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
  console.log("v", validated);

  if (!validated.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validated.errors,
      formData: payload,
    };
  }

  const res = await serverFetch.post("/auth/apply-host", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validated.data),
  });

  const result = await res.json();
  console.log(result);

  if (result.success) {
    revalidateTag("host-application", { expire: 0 });
  }

  return result;
};
