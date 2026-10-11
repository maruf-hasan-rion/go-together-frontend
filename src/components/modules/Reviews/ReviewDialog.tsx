"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, Loader2, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createReview, getMyReviewForEvent } from "@/services/reviews/reviews";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  comment: z.string().optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

type ReviewSummary = {
  id: string;
  rating: number;
  comment?: string | null;
};

interface ReviewDialogProps {
  eventId: string;
  hostId: string; // (not needed in payload if backend derives hostId from eventId)
}

export function ReviewDialog({ eventId }: ReviewDialogProps) {
  const [open, setOpen] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [existingReview, setExistingReview] = useState<ReviewSummary | null>(null);
  const router = useRouter();

  useEffect(() => {
    let active = true;

    getMyReviewForEvent(eventId)
      .then((res) => {
        if (!active) return;
        const payload = res as { success?: boolean; data?: ReviewSummary | null };
        if (payload?.success && payload.data) setExistingReview(payload.data);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setIsChecking(false);
      });

    return () => {
      active = false;
    };
  }, [eventId]);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const selectedRating = form.watch("rating");

  const onSubmit = async (data: ReviewFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await createReview({
        eventId,
        rating: data.rating,
        comment: data.comment?.trim() ? data.comment.trim() : undefined,
      });

      if (!result?.success) {
        toast.error(result?.message || "Failed to submit review");
        return;
      }

      const created = (result as { data?: ReviewSummary })?.data;
      if (created) setExistingReview(created);

      toast.success("Review submitted successfully!");
      setOpen(false);
      form.reset();
      router.refresh(); // refresh UI if needed
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isChecking) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Review
      </Button>
    );
  }

  if (existingReview) {
    return (
      <div className="rounded-lg border bg-muted/30 p-3 text-sm">
        <div className="flex items-center gap-2 font-medium">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          You reviewed this event
        </div>
        <div className="mt-1 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= existingReview.rating
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        {existingReview.comment && (
          <p className="mt-1 line-clamp-2 text-muted-foreground">{existingReview.comment}</p>
        )}
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Star className="mr-2 h-4 w-4" />
          Leave Review
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
          <DialogDescription>
            Share your experience with this event. Your feedback helps others!
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating *</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => field.onChange(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= (hoveredRating || selectedRating)
                                ? "fill-yellow-500 text-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your experience..."
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Review"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
