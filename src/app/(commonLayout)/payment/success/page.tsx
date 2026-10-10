import { BadgeCheck } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Payment successful | GoTogether",
  description: "Your booking is confirmed. View your bookings or browse more events.",
};

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ bookingId?: string }>;
}) {
  const { bookingId } = await searchParams;

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
          <BadgeCheck className="h-16 w-16 text-green-600" />
          <h1 className="text-2xl font-bold">Payment successful</h1>
          <p className="text-sm text-muted-foreground">
            Your booking is confirmed and a receipt has been emailed to you.
            {bookingId ? ` Reference: ${bookingId.slice(0, 8)}.` : ""}
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <Button asChild>
              <Link href="/dashboard/my-bookings">View my bookings</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/events">Browse events</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
