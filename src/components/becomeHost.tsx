"use client";

import {
  Star,
  TrendingUp,
  Shield,
  Users,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createHostApplication } from "@/services/user/becomeHost";

export default function BecomeHost() {
   const benefits = [
    {
      icon: DollarSign,
      title: "Earn Money",
      description: "Set your own prices and earn from ticket sales",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: Users,
      title: "Build Community",
      description: "Connect with people who share your passions",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Star,
      title: "Gain Recognition",
      description: "Build your reputation through ratings and reviews",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      icon: Calendar,
      title: "Flexible Schedule",
      description: "Host events on your own time and terms",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: Shield,
      title: "Safe Platform",
      description: "Verified participants and secure payments",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Impact",
      description: "Scale your events and reach more people",
      color: "text-pink-600",
      bg: "bg-pink-50",
    },
  ];
  const [state, formAction, isPending] = useActionState(createHostApplication, null);

useEffect(() => {
  if (!state) return;

  if (state.success) toast.success(state.message);
  else toast.error(state.message);
}, [state]);

  return (
    <div className="min-h-screen bg-white">
      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Become a Host?
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful hosts and start earning
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`w-14 h-14 ${benefit.bg} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-7 h-7 ${benefit.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section
        id="application-form"
        className="py-20 px-4 bg-linear-to-br from-gray-50 to-white"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Apply to Become a Host
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we&apos;ll get back to you within 24
              hours
            </p>
          </div>
         <form action={formAction} className="space-y-4">
      <textarea
        name="message"
        rows={4}
        className="w-full border p-3"
        placeholder="Tell us about yourself..."
      />

      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-black text-white"
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
        </div>
      </section>
    </div>
  );
};

