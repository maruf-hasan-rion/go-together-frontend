import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BadgeCheck,
  CalendarPlus,
  CreditCard,
  LayoutDashboard,
  Search,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services | GoTogether",
  description:
    "Discover, book and host events on GoTogether — secure Stripe payments, host verification, reviews and analytics dashboards.",
  openGraph: {
    title: "GoTogether services",
    description: "Everything you can do on GoTogether, for members and hosts.",
    type: "website",
  },
};

const memberFeatures = [
  {
    icon: Search,
    title: "Discover events",
    body: "Filter events by category, date and location. Every listing shows capacity, fee and host details.",
  },
  {
    icon: CreditCard,
    title: "Book & pay securely",
    body: "Reserve a slot and pay by card through Stripe — you get a confirmation and an invoice right away.",
  },
  {
    icon: Star,
    title: "Review experiences",
    body: "After an event completes, share a rating and comment with the community.",
  },
];

const hostFeatures = [
  {
    icon: CalendarPlus,
    title: "Publish schedules",
    body: "Create an event with a date, time window and capacity; slots are generated automatically.",
  },
  {
    icon: BadgeCheck,
    title: "Get verified",
    body: "Apply to host and get approved by an admin before your events go live.",
  },
  {
    icon: LayoutDashboard,
    title: "Manage & track",
    body: "Track participants, update event status and follow your earnings from the host dashboard.",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 mt-16 lg:mt-20">
      <header className="text-center">
        <h1 className="text-4xl font-bold">What you can do on GoTogether</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          One platform for members looking for their next activity and hosts who
          love bringing people together.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">For members</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          {memberFeatures.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="h-7 w-7 text-primary" />
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">For hosts</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          {hostFeatures.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="h-7 w-7 text-primary" />
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/events">Browse events</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/register">Create an account</Link>
        </Button>
      </div>
    </div>
  );
}
