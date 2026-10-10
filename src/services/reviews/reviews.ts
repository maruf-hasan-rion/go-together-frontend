/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

/* =========================================================
   📌 Get Reviews for an Event
   ========================================================= */
export async function getEventReviews(eventId: string) {
	try {
		const response = await serverFetch.get(`/reviews/event/${eventId}`, {
			cache: "force-cache",
			next: { tags: ["event-reviews"] },
		});

		const result = await response.json();
		return result;
	} catch (error: any) {
		console.log(error);
		return {
			success: false,
			message: error.message,
		};
	}
}

/* =========================================================
   📌 Get Reviews for a Host
   ========================================================= */
export async function getHostReviews(hostId: string) {
	try {
		const response = await serverFetch.get(`/reviews/host/${hostId}`, {
			cache: "force-cache",
			next: { tags: ["host-reviews"] },
		});

		const result = await response.json();
		return result;
	} catch (error: any) {
		console.log(error);
		return {
			success: false,
			message: error.message,
		};
	}
}

/* =========================================================
   📌 Create Review
   ========================================================= */
export async function createReview(payload: {
	eventId: string;
	rating: number;
	comment?: string;
}) {
	try {
		const response = await serverFetch.post("/reviews", {
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
			cache: "no-store",
		});

		const result = await response.json();

		if (result.success) {
			revalidateTag("event-reviews", { expire: 0 });
			revalidateTag("host-reviews", { expire: 0 });
			revalidateTag("my-booked-events", { expire: 0 });
			revalidateTag("single-event", { expire: 0 });
			revalidateTag("latest-reviews", { expire: 0 });
		}

		return result;
	} catch (error: any) {
		console.log(error);
		return {
			success: false,
			message: error.message,
		};
	}
}

/* =========================================================
   📌 Check Logged-in User Review for Event
   ========================================================= */
export async function getMyReviewForEvent(eventId: string) {
	try {
		const response = await serverFetch.get(`/reviews/my-review/${eventId}`, {
			cache: "no-store",
		});

		const result = await response.json();
		return result;
	} catch (error: any) {
		console.log(error);
		return {
			success: false,
			message: error.message,
		};
	}
}

/* =========================================================
   📌 Public Testimonials (Home Page)
   ========================================================= */
export async function getPublicTestimonials() {
	try {
		const response = await serverFetch.get("/reviews/public-testimonials", {
			cache: "force-cache",
			next: { tags: ["public-testimonials"] },
		});

		const result = await response.json();
		return result;
	} catch (error: any) {
		console.log(error);
		return {
			success: false,
			message: error.message,
		};
	}
}
