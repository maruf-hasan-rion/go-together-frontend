"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

/* =========================================================
   ✅ Create Payment Intent
   POST /payments/create-intent
   Body: { bookingId }
   ========================================================= */
export async function createPaymentIntent(bookingId: string) {
  try {
    const response = await serverFetch.post("/payments/create-intent", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId }),
      cache: "no-store",
    });

    const result = await response.json();

    // Optional revalidation (only if you update server state here)
    if (result?.success) {
      revalidateTag("user-bookings", { expire: 0 });
      revalidateTag("payments", { expire: 0 });
    }

    return result;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create payment",
    };
  }
}

/* =========================================================
   ✅ Confirm Payment
   POST /payments/confirm
   Body: { paymentIntentId }
   ========================================================= */
export async function confirmPayment(paymentIntentId: string) {
  try {
    if (!paymentIntentId) {
      return { success: false, message: "paymentIntentId is required" };
    }

    const response = await serverFetch.post("/payments/confirm", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentIntentId }),
      cache: "no-store",
    });

    const result = await response.json();

    if (result?.success) {
      revalidateTag("user-bookings", { expire: 0 });
      revalidateTag("events", { expire: 0 });
      revalidateTag("single-event", { expire: 0 });
      revalidateTag("payments", { expire: 0 });
    }

    return result;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Payment failed",
    };
  }
}

/* =========================================================
   ✅ Payment History
   GET /payments/history
   ========================================================= */
export async function getPaymentHistory() {
  try {
    const response = await serverFetch.get("/payments/history", {
      cache: "force-cache",
      next: { tags: ["payments"] },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to load payment history",
    };
  }
}
