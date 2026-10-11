"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  totalAmount: number; // ✅ matches your Prisma Booking model (totalAmount)
  createdAt: string;
  updatedAt?: string;

  event?: {
    id: string;
    title: string;
    type: string[];
    eventDate: string;
    location: string;
    image?: string;
    hostId: string;
  };
}

/* =========================================================
   ✅ Get Logged-in User Bookings
   GET /bookings/my-bookings
   ========================================================= */
export async function getMyBookings() {
  try {
    const response = await serverFetch.get("/bookings/my-bookings", {
      cache: "no-store",
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return { success: false, message: error instanceof Error ? error.message : "Something went wrong" };
  }
}

/* =========================================================
   ✅ Create Booking (Join Event)
   POST /bookings
   Body: { eventId }
   Expect: { booking, paymentUrl } for paid-only flow
   ========================================================= */
export async function createBooking(eventId: string) {
  try {
    const response = await serverFetch.post("/bookings", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId }),
      cache: "no-store",
    });

    const result = await response.json();

    if (result?.success) {
      revalidateTag("user-bookings", { expire: 0 });
      revalidateTag("events", { expire: 0 });
      revalidateTag("single-event", { expire: 0 });
      revalidateTag("event-participants", { expire: 0 });
    }

    return result;
  } catch (error) {
    console.log(error);
    return { success: false, message: error instanceof Error ? error.message : "Something went wrong" };
  }
}

/* =========================================================
   ✅ Cancel Booking
   PATCH /bookings/:bookingId/cancel
   ========================================================= */
export async function cancelBooking(bookingId: string) {
  try {
    const response = await serverFetch.patch(`/bookings/${bookingId}/cancel`, {
      cache: "no-store",
    });

    const result = await response.json();

    if (result?.success) {
      revalidateTag("user-bookings", { expire: 0 });
      revalidateTag("events", { expire: 0 });
      revalidateTag("single-event", { expire: 0 });
      revalidateTag("event-participants", { expire: 0 });
    }

    return result;
  } catch (error) {
    console.log(error);
    return { success: false, message: error instanceof Error ? error.message : "Something went wrong" };
  }
}
