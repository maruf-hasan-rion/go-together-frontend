import Link from "next/link";
import { Calendar, Search, Users, Sparkles, Star, MapPin } from "lucide-react";

type HeroStat = { number: string; label: string };

export default function Hero({ stats = [] }: { stats?: HeroStat[] }) {
  return (
    <div className="pt-32 pb-20 px-4 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Never Miss Out on
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                Activities{" "}
              </span>
              Again
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find companions for concerts, hiking trips, board game nights, and more.
              Connect with like-minded people and explore together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/events"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-lg font-semibold"
              >
                <Search className="w-5 h-5" />
                Find Activities
              </Link>
              <Link
                href="/host/dashboard/create-event"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-lg font-semibold"
              >
                <Calendar className="w-5 h-5" />
                Create Event
              </Link>
            </div>

            {stats.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Branded visual — no placeholder stock imagery */}
          <div className="relative">
            <div className="rounded-3xl bg-linear-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-2xl">
              <Sparkles className="h-10 w-10 opacity-90" />
              <p className="mt-6 text-2xl font-bold">Plan it. Host it. Live it.</p>
              <p className="mt-2 text-blue-100">
                From intimate dinners to weekend hikes — GoTogether helps you find your
                people and make it happen.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: "Meet new people" },
                  { icon: Calendar, label: "Book in seconds" },
                  { icon: Star, label: "Rated by real members" },
                  { icon: MapPin, label: "Events near you" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-3 text-sm"
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
