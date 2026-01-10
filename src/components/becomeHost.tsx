"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import {
  Star,
  TrendingUp,
  Shield,
  Users,
  Calendar,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { createHostApplication } from "@/services/user/becomeHost";

const BecomeHost = () => {
  //   const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    message: "",
  });

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/auth/apply-host", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: formData.message }),
    });

    const data = await res.json();

    if (!res.ok || data?.success === false) {
      console.log(data?.message ?? "Failed");
      // here you can show toast
      return;
    }

    setFormData((p) => ({ ...p, message: "" }));
    // toast success if you want
  };

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
          <form
            onSubmit={onSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tell us about yourself *
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your experience, passion, and why you want to become a host..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold text-lg flex items-center justify-center gap-2"
            >
              Submit Application
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BecomeHost;
