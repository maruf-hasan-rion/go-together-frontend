import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ShieldCheck, Sparkles, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About | GoTogether",
  description:
    "GoTogether connects people through real-world events and activities — browse, book, host and review experiences across Bangladesh.",
  openGraph: {
    title: "About GoTogether",
    description: "Connect with people through real-world events and activities.",
    type: "website",
  },
};

const values = [
  {
    icon: Users,
    title: "Community first",
    body: "Every event is run by a verified host, so members meet real people doing things they love.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & secure",
    body: "Hosts are reviewed before approval, payments are processed by Stripe, and accounts are protected with JWT sessions.",
  },
  {
    icon: Sparkles,
    title: "Effortless hosting",
    body: "Hosts publish schedules, manage capacity and track earnings from a single dashboard.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 mt-16 lg:mt-20">
      <header className="text-center">
        <h1 className="text-4xl font-bold">About GoTogether</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          GoTogether is an events and activities marketplace. We bring people together
          around concerts, hiking trips, board game nights, tech meetups and more — and
          give hosts the tools to run them, collect payments and grow a following.
        </p>
      </header>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {values.map((value) => (
          <Card key={value.title}>
            <CardContent className="space-y-3 py-6">
              <value.icon className="h-8 w-8 text-primary" />
              <h2 className="text-lg font-semibold">{value.title}</h2>
              <p className="text-sm text-muted-foreground">{value.body}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-12 rounded-xl border bg-muted/30 p-8 text-center">
        <Calendar className="mx-auto h-10 w-10 text-primary" />
        <h2 className="mt-4 text-2xl font-bold">Ready to join something?</h2>
        <p className="mt-2 text-muted-foreground">
          Browse what&apos;s happening near you, or apply to become a host.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/events">Browse events</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/services">What you can do</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
