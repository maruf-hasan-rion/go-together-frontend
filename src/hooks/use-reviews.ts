"use client";

import { useQuery } from "@tanstack/react-query";
import { getEventReviews } from "@/services/reviews/reviews";

export type EventReview = {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt?: string;
  user?: { id: string; fullName?: string; profilePhoto?: string | null } | null;
};

/**
 * Client-side reviews for an event via TanStack Query — demonstrates the
 * query cache, loading and error states.
 */
export function useEventReviews(eventId: string) {
  return useQuery({
    queryKey: ["event-reviews", eventId],
    enabled: Boolean(eventId),
    queryFn: async (): Promise<EventReview[]> => {
      const res = await getEventReviews(eventId);
      const data = res?.data;
      if (Array.isArray(data)) return data as EventReview[];
      if (Array.isArray(data?.data)) return data.data as EventReview[];
      return [];
    },
  });
}
