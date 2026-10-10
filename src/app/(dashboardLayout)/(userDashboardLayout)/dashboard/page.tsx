import Link from "next/link";
import {
  Calendar,
  MapPin,
  Search,
  Stars,
  Ticket,
  Users,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { unwrapList } from "@/lib/unwrap";
import { getMyBookings, type Booking } from "@/services/booking/booking";

const features = [
  {
    title: "Discover Events",
    desc: "Browse events by type, location and date.",
    icon: Search,
  },
  {
    title: "Join Events",
    desc: "Book a seat and pay securely to confirm.",
    icon: Ticket,
  },
  {
    title: "Track Bookings",
    desc: "View upcoming, past and cancelled bookings.",
    icon: Calendar,
  },
  {
    title: "Connect with People",
    desc: "Meet like-minded attendees and hosts.",
    icon: Users,
  },
  {
    title: "Rate & Review",
    desc: "Share feedback after completing an event.",
    icon: Stars,
  },
  {
    title: "Nearby Suggestions",
    desc: "Get recommendations based on interests.",
    icon: MapPin,
  },
];

export default async function UserDashboardPage() {
  const res = await getMyBookings();
  const bookings = unwrapList<Booking>(res, "result");
  const now = new Date();

  const upcoming = bookings.filter(
    (b) =>
      (b.status === "CONFIRMED" || b.status === "PENDING") &&
      new Date(b.event?.eventDate ?? "") > now,
  );
  const pending = bookings.filter((b) => b.status === "PENDING");
  const completed = bookings.filter((b) => b.status === "COMPLETED");

  const stats = [
    { label: "Upcoming Bookings", value: upcoming.length, icon: Calendar },
    { label: "Pending Payments", value: pending.length, icon: Ticket },
    { label: "Completed Events", value: completed.length, icon: BadgeCheck },
    { label: "Total Bookings", value: bookings.length, icon: Stars },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#45aaa2] md:text-4xl">
                Welcome to GoTogether 👋
              </h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Discover events, join activities, and never miss a plan again.
                Manage everything from one dashboard.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/events">
                <Button className="gap-2 bg-[#45aaa2] hover:bg-[#3c8f88]">
                  Explore Events <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard/my-bookings">
                <Button variant="outline" className="gap-2">
                  My Bookings <Calendar className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="border">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#45aaa2]/10">
                      <Icon className="h-5 w-5 text-[#45aaa2]" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-xl font-bold">{stat.value}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto space-y-10 px-4 py-10">
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-semibold md:text-2xl">What you can do here</h2>
            <p className="text-sm text-muted-foreground">
              Everything you need to discover and join activities.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="border transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#45aaa2]/10">
                      <Icon className="h-6 w-6 text-[#45aaa2]" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border bg-muted/20 p-6 md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold uppercase">
                Ready to join your next event?
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
                Explore events near you, book your seat, and pay securely to confirm.
              </p>
            </div>

            <div className="flex w-full gap-3 md:w-auto">
              <Link href="/events" className="w-full md:w-auto">
                <Button className="w-full bg-[#45aaa2] hover:bg-[#3c8f88]">
                  Explore Events
                </Button>
              </Link>
              <Link href="/dashboard/my-bookings" className="w-full md:w-auto">
                <Button variant="outline" className="w-full">
                  My Bookings
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <div className="pb-10" />
      </div>
    </div>
  );
}
