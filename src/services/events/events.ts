/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import {
	createEventValidationZodSchema,
	// updateEventValidationZodSchema,
} from "@/zod/event.validation";
import { revalidateTag } from "next/cache";

export async function getRecentEvents() {
	try {
		const response = await serverFetch.get(`/event/recent-events`, {
			cache: "force-cache",
			next: { tags: ["recent-events"] },
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

export async function getAllEvents(queryString?: string) {
	try {
		const response = await serverFetch.get(
			`/event${queryString ? `?${queryString}` : ""}`,
			{
				cache: "force-cache",
				next: { tags: ["all-events"] },
			},
		);
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

export async function getMyBookedEvents(queryString?: string) {
	try {
		const response = await serverFetch.get(
			`/event/my-events${queryString ? `?${queryString}` : ""}`,
			{
				cache: "force-cache",
				next: { tags: ["my-booked-events"] },
			},
		);
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

export async function getMyHostedEvents(queryString?: string) {
	try {
		const response = await serverFetch.get(
			`/event/my-hosted-events${queryString ? `?${queryString}` : ""}`,
			{
				cache: "force-cache",
				next: { tags: ["my-hosted-events"] },
			},
		);
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

export async function getSingleEvent(id: string) {
	try {
		const response = await serverFetch.get(`/event/${id}`, {
			cache: "force-cache",
			next: { tags: ["single-event"] },
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

export async function getEventParticipants(id: string, queryString?: string) {
	try {
		const response = await serverFetch.get(
			`/event/${id}/participants${queryString ? `?${queryString}` : ""}`,
			{
				cache: "force-cache",
				next: { tags: ["event-participants"] },
			},
		);
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

export async function joinEvent(id: string) {
	try {
		const response = await serverFetch.post(`/bookings`, {
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ eventId: id }),
			cache: "no-store",
		});
		const result = await response.json();
		if (result.success) {
			revalidateTag("my-booked-events", { expire: 0 });
			revalidateTag("all-events", { expire: 0 });
			revalidateTag("event-participants", { expire: 0 });
			revalidateTag("single-event", { expire: 0 });
			revalidateTag("landing-page-stats", { expire: 0 });
			revalidateTag("recent-events", { expire: 0 });
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

export async function completeEvent(id: string) {
	try {
		const response = await serverFetch.patch(`/event/${id}/complete`, {
			cache: "no-store",
		});
		const result = await response.json();
		if (result.success) {
			revalidateTag("my-hosted-events", { expire: 0 });
			revalidateTag("all-events", { expire: 0 });
			revalidateTag("single-event", { expire: 0 });
			revalidateTag("event-participants", { expire: 0 });
			revalidateTag("analytics", { expire: 0 });
			revalidateTag("landing-page-stats", { expire: 0 });
			revalidateTag("recent-events", { expire: 0 });
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

export const createEvent = async (_currentState: any, formData: FormData) => {
	const rawTypes = formData.getAll("type");
	const types = rawTypes
		.map((v) => (typeof v === "string" ? v : ""))
		.filter(Boolean);

	const validationPayload = {
		title: formData.get("title"),
		location: formData.get("location"),
		date: formData.get("date"),
		capacity: formData.get("capacity"),
		joiningFee: formData.get("joiningFee"),
		description: formData.get("description"),
		type: types,
		image: formData.get("file"),
	};

	// console.log("types from FormData:", formData.getAll("type"));
	const validatedPayload = zodValidator(
		validationPayload,
		createEventValidationZodSchema,
	);

	if (!validatedPayload.success && validatedPayload.errors) {
		return {
			success: false,
			message: "Validation failed!",
			formData: validationPayload,
			errors: validatedPayload.errors,
		};
	}

	if (!validatedPayload.data) {
		return {
			success: false,
			message: "Validation failed",
			formData: validationPayload,
		};
	}

	const newFormData = new FormData();

	const eventData = {
		title: validatedPayload.data.title,
		location: validatedPayload.data.location,
		eventDate: validatedPayload.data.date,
		maxParticipants: Number(validatedPayload.data.capacity),
		joiningFee: Number(validatedPayload.data.joiningFee),
		description: validatedPayload.data.description,
		type: validatedPayload.data.type,
	};

	newFormData.append("data", JSON.stringify(eventData));

	const file = formData.get("file");
	if (file instanceof Blob && file.size > 0) {
		newFormData.append("file", file);
	}

	try {
		const res = await serverFetch.post("/event/create-event", {
			body: newFormData,
		});

		const result = await res.json();

		if (result.success) {
			revalidateTag("my-hosted-events", { expire: 0 });
			revalidateTag("all-events", { expire: 0 });
			revalidateTag("landing-page-stats", { expire: 0 });
			revalidateTag("analytics", { expire: 0 });
			revalidateTag("recent-events", { expire: 0 });
		}

		return result;
	} catch (error: any) {
		if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
		return { success: false, message: error.message };
	}
};

export async function updateEvent(id: string, body: FormData) {
	try {
		const res = await serverFetch.patch(`/event/${id}`, {
			body,
			// do NOT set content-type manually for FormData
			cache: "no-store",
		});
		return await res.json();
	} catch (error: any) {
		return { success: false, message: error.message };
	}
}

export async function deleteEvent(id: string) {
	try {
		const res = await serverFetch.delete(`/event/${id}`, {
			cache: "no-store",
		});

		const result = await res.json();

		if (result?.success) {
			// ✅ refresh all pages that use these cached tags
			revalidateTag("all-events", { expire: 0 });
			revalidateTag("my-hosted-events", { expire: 0 });

			// revalidateTag("recent-events");
			// revalidateTag("analytics");
			// revalidateTag("landing-page-stats");
		}

		return result;
	} catch (error: any) {
		return { success: false, message: error.message };
	}
}
// export const updateEvent = async (
//   eventId: string,
//   _currentState: any,
//   formData: any
// ) => {
//   const validationPayload = {
//     title: formData.get("title"),
//     location: formData.get("location"),
//     date: formData.get("date"),
//     capacity: formData.get("capacity"),
//     joiningFee: formData.get("joiningFee"),
//     description: formData.get("description"),
//     category: formData.getAll("category"),
//     image: formData.get("image"),
//   };

//   const validatedPayload = zodValidator(
//     validationPayload,
//     updateEventValidationZodSchema
//   );

//   if (!validatedPayload.success && validatedPayload.errors) {
//     return {
//       success: false,
//       message: "Validation failed",
//       formData: validationPayload,
//       errors: validatedPayload.errors,
//     };
//   }

//   if (!validatedPayload.data) {
//     return {
//       success: false,
//       message: "Validation failed",
//       formData: validationPayload,
//     };
//   }

//   const newFormData = new FormData();

//   const eventData = {
//     title: validatedPayload.data.title,
//     location: validatedPayload.data.location,
//     eventDate: validatedPayload.data.date,
//     maxParticipants: validatedPayload.data.capacity,
//     joiningFee: validatedPayload.data.joiningFee,
//     description: validatedPayload.data.description,
//     category: validatedPayload.data.category,
//   };

//   newFormData.append("data", JSON.stringify(eventData));

//   const file = formData.get("file");
//   if (file instanceof Blob && file.size > 0) {
//     newFormData.append("file", file);
//   }

//   try {
//     const res = await serverFetch.patch(`/host/event/${eventId}`, {
//       body: newFormData,
//     });

//     const result = await res.json();

//     if (result.success) {
//       revalidateTag("my-hosted-events", { expire: 0 });
//       revalidateTag("all-events", { expire: 0 });
//       revalidateTag("event-participants", { expire: 0 });
//       revalidateTag("single-event", { expire: 0 });
//       revalidateTag("landing-page-stats", { expire: 0 });
//       revalidateTag("analytics", { expire: 0 });
//       revalidateTag("recent-events", { expire: 0 });
//     }

//     return result;
//   } catch (error: any) {
//     if (error?.digest?.startsWith("NEXT_REDIRECT")) {
//       throw error;
//     }
//     console.log(error);
//     return {
//       success: false,
//       message: error.message,
//     };
//   }
// };

// export async function deleteEvent(id: string) {
//   try {
//     const response = await serverFetch.delete(`/host/event/${id}`, {
//       cache: "no-store",
//     });
//     const result = await response.json();
//     if (result.success) {
//       revalidateTag("my-hosted-events", { expire: 0 });
//       revalidateTag("analytics", { expire: 0 });
//       revalidateTag("landing-page-stats", { expire: 0 });
//     }
//     return result;
//   } catch (error: any) {
//     console.log(error);
//     return {
//       success: false,
//       message: error.message,
//     };
//   }
// }
