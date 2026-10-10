import { XCircle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Payment cancelled | GoTogether",
  description: "Your payment was cancelled. No charge was made — you can try again any time.",
};

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ bookingId?: string }>;
}) {
  const { bookingId } = await searchParams;

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
          <XCircle className="h-16 w-16 text-red-500" />
          <h1 className="text-2xl font-bold">Payment cancelled</h1>
          <p className="text-sm text-muted-foreground">
            No charge was made. Your booking is still pending — you can complete
            payment from your bookings page.
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <Button asChild>
              <Link href="/dashboard/my-bookings">Back to my bookings</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/events">Explore events</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
