"use client";

import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEventReviews } from "@/hooks/use-reviews";
import { getInitials } from "@/lib/formatters";

export default function EventReviews({ eventId }: { eventId: string }) {
  const { data: reviews, isLoading, isError } = useEventReviews(eventId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Reviews {reviews && reviews.length > 0 ? `(${reviews.length})` : ""}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse space-y-2">
                <div className="h-4 w-32 rounded bg-muted" />
                <div className="h-3 w-full rounded bg-muted" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <p className="text-sm text-muted-foreground">
            Couldn&apos;t load reviews. Please try again later.
          </p>
        )}

        {!isLoading && !isError && reviews?.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <Star className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No reviews yet — be the first to share your experience.
            </p>
          </div>
        )}

        {reviews?.map((review) => (
          <div key={review.id} className="border-b pb-3 last:border-b-0 last:pb-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">
                {review.user?.fullName ?? "GoTogether member"}
                <span className="ml-2 text-xs text-muted-foreground">
                  {getInitials(review.user?.fullName ?? "G")}
                </span>
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                {review.rating}
              </span>
            </div>
            {review.comment && (
              <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
