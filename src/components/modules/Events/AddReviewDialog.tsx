"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { addReview } from "@/services/events/events";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AddReviewDialogProps {
    open: boolean;
    onClose: () => void;
    transactionId: string;
    onReviewSubmitted?: () => void;
}

export default function AddReviewDialog({ open, onClose, transactionId, onReviewSubmitted }: AddReviewDialogProps) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        if (!comment.trim()) {
            toast.error("Please add a comment");
            return;
        }

        setIsPending(true);
        try {
            const result = await addReview(transactionId, { rating, comment });

            if (result.success) {
                toast.success("Review added successfully");

                const reviewedEvents = localStorage.getItem('reviewedEvents');
                const reviewed = reviewedEvents ? JSON.parse(reviewedEvents) : [];
                if (!reviewed.includes(transactionId)) {
                    reviewed.push(transactionId);
                    localStorage.setItem('reviewedEvents', JSON.stringify(reviewed));
                }

                setRating(0);
                setComment("");
                onReviewSubmitted?.();
                onClose();
                router.refresh();
            } else {
                toast.error(result.message || "Failed to add review");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsPending(false);
        }
    };

    const handleClose = () => {
        if (!isPending) {
            setRating(0);
            setComment("");
            onClose();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Review</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div>
                        <label className="text-sm font-medium mb-2 block">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    className="transition-transform hover:scale-110"
                                    disabled={isPending}
                                >
                                    <Star
                                        className={`w-8 h-8 ${star <= (hoveredRating || rating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        {rating > 0 && (
                            <p className="text-sm text-muted-foreground mt-1">
                                You rated {rating} star{rating > 1 ? "s" : ""}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="comment" className="text-sm font-medium mb-2 block">
                            Comment
                        </label>
                        <Textarea
                            id="comment"
                            placeholder="Share your experience..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            disabled={isPending}
                            rows={4}
                            className="resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isPending || rating === 0}
                            className="bg-[#45aaa2] hover:bg-[#3c8f88] text-white"
                        >
                            {isPending ? "Submitting..." : "Submit Review"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
