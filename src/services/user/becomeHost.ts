/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { z } from "zod";
// import { revalidateTag } from "next/cache";
import { zodValidator } from "@/lib/zodValidator";
import { serverFetch } from "@/lib/server-fetch";

const createHostApplicationSchema = z.object({
  message: z.string().min(10, "Please tell us more about yourself"),
});

// export const createHostApplication = async (
//   _currentState: any,
//   formData: FormData
// ) => {
//   const payload = { message: formData.get("message") };

//   const validated = zodValidator(payload, createHostApplicationSchema);

//   if (!validated.success) {
//     return {
//       success: false,
//       message: "Validation failed",
//       errors: validated.errors,
//       formData: payload,
//     };
//   }

//   try {
//     const res = await serverFetch.post("/auth/apply-host", {
//       body: JSON.stringify(validated.data),
//       cache: "no-store",
//     });

//     const text = await res.text();

//     // ✅ Always return a valid object
//     const result =
//       text && text.trim().length > 0
//         ? JSON.parse(text)
//         : { success: false, message: "Empty response from server" };

//     if (!res.ok) {
//       return {
//         success: false,
//         message: result?.message || res.statusText || "Request failed",
//       };
//     }

//     if (result?.success) {
//       revalidateTag("host-application", { expire: 0 });
//       revalidateTag("me", { expire: 0 });
//     }

//     return {
//       success: Boolean(result?.success),
//       message: result?.message || (result?.success ? "Success" : "Failed"),
//       ...result,
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: error?.message || "Something went wrong",
//     };
//   }
// };
export const createHostApplication = async (_: any, formData: FormData) => {
  const payload = { message: formData.get("message") };

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
    const res = await serverFetch.post("/auth/apply-host", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validated.data),
    });

    const text = await res.text();
    const result = text
      ? JSON.parse(text)
      : { success: false, message: "Empty response from server" };

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};
