import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitials } from "@/lib/formatters";
import { getHostReviews } from "@/services/reviews/reviews";
import { getUserProfile } from "@/services/user/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | GoTogether",
  description: "View a host or member profile on GoTogether.",
};

export const dynamic = "force-dynamic";

type Review = {
  id: string;
  rating: number;
  comment?: string | null;
  user?: { fullName?: string } | null;
};

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getUserProfile(id);
  const user = res?.data;

  if (!user?.id) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 mt-16 text-center lg:mt-20">
        <h2 className="text-xl font-semibold">Profile not found</h2>
      </div>
    );
  }

  const reviewsRes = await getHostReviews(id);
  const reviews: Review[] = reviewsRes?.data ?? [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 mt-16 space-y-6 lg:mt-20">
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
          <Avatar className="h-24 w-24">
            {user.profilePhoto ? (
              <AvatarImage src={user.profilePhoto} alt={user.fullName} />
            ) : null}
            <AvatarFallback className="text-2xl">{getInitials(user.fullName)}</AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-2xl font-bold">{user.fullName}</h1>
            <p className="text-sm text-muted-foreground capitalize">
              {String(user.role || "").toLowerCase()}
            </p>
          </div>

          {user.location && <p className="text-sm text-muted-foreground">{user.location}</p>}

          <p className="text-sm">
            ⭐ {Number(user.averageRating ?? 0).toFixed(1)}{" "}
            <span className="text-muted-foreground">({user.totalReviews ?? 0} reviews)</span>
          </p>

          {user.bio && <p className="max-w-xl text-sm text-muted-foreground">{user.bio}</p>}
        </CardContent>
      </Card>

      {reviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">
                    {review.user?.fullName ?? "GoTogether member"}
                  </span>
                  <span className="text-sm">⭐ {review.rating}</span>
                </div>
                {review.comment && (
                  <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
