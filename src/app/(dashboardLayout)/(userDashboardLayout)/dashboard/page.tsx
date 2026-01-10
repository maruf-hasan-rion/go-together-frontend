"use client";

import Link from "next/link";
import {
  Calendar,
  MapPin,
  Search,
  Stars,
  Ticket,
  Users,
  ArrowRight,
  Clock,
  BadgeCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function UserDashboardPage() {
  // Later: replace with real data from your API
  const stats = [
    { label: "Upcoming Bookings", value: 2, icon: Calendar },
    { label: "Pending Payments", value: 1, icon: Ticket },
    { label: "Completed Events", value: 5, icon: BadgeCheck },
    { label: "Reviews Given", value: 3, icon: Stars },
  ];

  // Later: replace with real bookings/events from server
  const upcoming = [
    {
      id: "1",
      title: "GoTogether Hiking Meetup",
      date: "Jan 20, 2026 • 7:30 AM",
      location: "Dhanmondi, Dhaka",
      status: "CONFIRMED",
    },
    {
      id: "2",
      title: "Tech Meetup: Next.js & Prisma",
      date: "Jan 25, 2026 • 6:00 PM",
      location: "Banani, Dhaka",
      status: "PENDING",
    },
  ];

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header / Hero */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#45aaa2]">
                Welcome to GoTogether 👋
              </h1>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                Discover events, join activities, and never miss a plan again.
                Manage everything from one dashboard.
              </p>
            </div>

            {/* Quick Actions */}
            {/* <div className="flex flex-wrap gap-3">
              <Link href="/events">
                <Button className="bg-[#45aaa2] hover:bg-[#3c8f88] gap-2">
                  Explore Events <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/my-bookings">
                <Button variant="outline" className="gap-2">
                  My Bookings <Calendar className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline" className="gap-2">
                  My Profile <Users className="h-4 w-4" />
                </Button>
              </Link>
            </div> */}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <Card key={s.label} className="border">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-[#45aaa2]/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-[#45aaa2]" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <p className="text-xl font-bold">{s.value}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 space-y-10">
        {/* Upcoming Events */}
        {/* <section>
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Upcoming Bookings
              </h2>
              <p className="text-sm text-muted-foreground">
                Your next events at a glance.
              </p>
            </div>
            <Link href="/my-bookings">
              <Button variant="outline" size="sm" className="gap-2">
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcoming.map((e) => (
              <Card key={e.id} className="border">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold line-clamp-1">{e.title}</h3>
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{e.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span className="line-clamp-1">{e.location}</span>
                        </div>
                      </div>
                    </div>

                    <Badge
                      className={
                        e.status === "CONFIRMED"
                          ? "bg-green-500/15 text-green-700 border border-green-500/20"
                          : "bg-orange-500/15 text-orange-700 border border-orange-500/20"
                      }
                      variant="secondary"
                    >
                      {e.status === "CONFIRMED" ? "Confirmed" : "Payment Pending"}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <Link href="/my-bookings" className="w-full sm:w-auto">
                      <Button size="sm" variant="outline" className="w-full">
                        Manage Booking
                      </Button>
                    </Link>
                    {e.status === "PENDING" && (
                      <Link href="/my-bookings" className="w-full sm:w-auto">
                        <Button
                          size="sm"
                          className="w-full bg-[#45aaa2] hover:bg-[#3c8f88]"
                        >
                          Pay Now
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section> */}

        {/* Features (your current ClientFeatures but dashboard styled) */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl md:text-2xl font-semibold">
              What you can do here
            </h2>
            <p className="text-sm text-muted-foreground">
              Everything you need to discover and join activities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <Card
                  key={f.title}
                  className="border hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-[#45aaa2]/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#45aaa2]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>

                    <div className="mt-4">
                      <Link href="/events">
                        <Button variant="outline" size="sm" className="gap-2">
                          Open <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Tips / Reminder */}
        <section className="border rounded-2xl p-6 md:p-10 bg-muted/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold uppercase">
                Ready to join your next event?
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl">
                Explore events near you, book your seat, and pay securely to
                confirm. GoTogether helps you never miss out because you’re
                alone.
              </p>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <Link href="/events" className="w-full md:w-auto">
                <Button className="w-full bg-[#45aaa2] hover:bg-[#3c8f88]">
                  Explore Events
                </Button>
              </Link>
              <Link href="/my-bookings" className="w-full md:w-auto">
                <Button variant="outline" className="w-full">
                  My Bookings
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer spacing */}
        <div className="pb-10" />
      </div>
    </div>
  );
}
