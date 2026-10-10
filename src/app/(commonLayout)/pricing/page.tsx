import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Pricing & FAQ | GoTogether",
  description:
    "How GoTogether pricing works: hosts set a joining fee per event, members pay securely by card through Stripe. Answers to common questions.",
  openGraph: {
    title: "GoTogether pricing & FAQ",
    description: "How hosting and booking fees work, plus answers to common questions.",
    type: "website",
  },
};

const pricing = [
  {
    title: "Members",
    price: "Free to join",
    points: [
      "Create an account at no cost",
      "Browse and filter every public event",
      "Pay only the host's joining fee per event",
      "Full booking history and invoices",
    ],
  },
  {
    title: "Hosts",
    price: "You set the fee",
    points: [
      "Apply to host — approval is free",
      "Choose each event's joining fee and capacity",
      "Publish and manage unlimited events",
      "Track participants and earnings in your dashboard",
    ],
    featured: true,
  },
];

const faqs = [
  {
    q: "How do payments work?",
    a: "When you book an event you pay the host's joining fee by card through Stripe. Your booking is confirmed as soon as the payment succeeds, and a receipt is emailed to you.",
  },
  {
    q: "When do I get a refund?",
    a: "Cancelling a paid, confirmed booking triggers a refund through Stripe. The booking is released and the seat returns to the event.",
  },
  {
    q: "Can I host events for free?",
    a: "Yes. A host can set a joining fee of zero, in which case bookings are confirmed instantly without a payment step.",
  },
  {
    q: "How does host verification work?",
    a: "Anyone can apply to become a host. An admin reviews the application, and once approved your account gains host permissions and event tools.",
  },
  {
    q: "What happens to an event that is fully booked?",
    a: "Once every slot is taken the event is marked full and stops accepting new bookings. Cancellations reopen it automatically.",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 mt-16 lg:mt-20">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Pricing</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          GoTogether is free to use. Hosts decide the joining fee for each event and
          members pay it securely through Stripe.
        </p>
      </header>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        {pricing.map((tier) => (
          <Card key={tier.title} className={tier.featured ? "border-primary/60" : undefined}>
            <CardHeader>
              <CardTitle className="text-lg">{tier.title}</CardTitle>
              <p className="text-2xl font-bold text-primary">{tier.price}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {tier.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">Frequently asked questions</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-lg border bg-card p-4 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between font-medium">
                {faq.q}
                <span className="text-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/events">Browse events</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </div>
  );
}
