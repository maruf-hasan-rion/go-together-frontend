import { Metadata } from "next";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { getInitials } from "@/lib/formatters";
import { unwrapList } from "@/lib/unwrap";
import { formatDate } from "@/lib/utils";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getHostReviews } from "@/services/reviews/reviews";

export const metadata: Metadata = {
  title: "Reviews | GoTogether",
  description: "Feedback participants left for your events.",
};

type HostReview = {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt?: string;
  user?: { fullName?: string; profilePhoto?: string | null };
  event?: { title?: string; name?: string };
};

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`h-4 w-4 ${
          star <= rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

const HostReviewsPage = async () => {
  const userInfo = await getUserInfo();
  const response = await getHostReviews(userInfo.id);
  const reviews = unwrapList<HostReview>(response);

  const average =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + Number(review.rating ?? 0), 0) / reviews.length
      : 0;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-card p-5 md:p-6 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Reviews</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Feedback participants left for your events.
        </p>

        <div className="mt-4 flex items-center gap-4">
          <div className="text-4xl font-bold text-[#45aaa2]">{average.toFixed(1)}</div>
          <div>
            <Stars rating={Math.round(average)} />
            <p className="text-xs text-muted-foreground mt-1">
              {reviews.length} review{reviews.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-16 bg-card border rounded-xl">
          <Star className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-1">No reviews yet</h3>
          <p className="text-muted-foreground">
            Once participants review your events, they&apos;ll show up here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="flex gap-4 p-5">
                <Avatar className="h-10 w-10">
                  {review.user?.profilePhoto ? (
                    <AvatarImage
                      src={review.user.profilePhoto}
                      alt={review.user.fullName ?? "Participant"}
                    />
                  ) : (
                    <AvatarFallback>{getInitials(review.user?.fullName)}</AvatarFallback>
                  )}
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">{review.user?.fullName ?? "Participant"}</p>
                    <span className="text-xs text-muted-foreground">
                      {review.createdAt ? formatDate(review.createdAt) : ""}
                    </span>
                  </div>

                  <Stars rating={Number(review.rating ?? 0)} />

                  {(review.event?.title || review.event?.name) && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {review.event?.title ?? review.event?.name}
                    </p>
                  )}

                  {review.comment && (
                    <p className="mt-2 text-sm text-foreground/90">{review.comment}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HostReviewsPage;
