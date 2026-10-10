import type { Metadata } from "next";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact | GoTogether",
  description:
    "Get in touch with the GoTogether team — questions about events, hosting, payments or your account.",
  openGraph: {
    title: "Contact GoTogether",
    description: "Questions about events, hosting or payments? Send us a message.",
    type: "website",
  },
};

const contactDetails = [
  { icon: Mail, label: "Email", value: "support@gotogether.dev" },
  { icon: MessageSquare, label: "Support hours", value: "Sun–Thu, 10:00–18:00 (GMT+6)" },
  { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 mt-16 lg:mt-20">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Contact us</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Questions about an event, hosting or a payment? Send us a message and the
          team will get back to you.
        </p>
      </header>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          {contactDetails.map((detail) => (
            <Card key={detail.label}>
              <CardContent className="flex items-start gap-3 py-5">
                <detail.icon className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">{detail.label}</p>
                  <p className="text-sm text-muted-foreground">{detail.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Send a message</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
