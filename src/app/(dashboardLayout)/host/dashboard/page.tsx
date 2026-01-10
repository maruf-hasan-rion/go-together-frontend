import { StatCard } from "@/components/modules/Analytics/StatCard";
import { getAnalytics } from "@/services/analytics/analytics.service";
import { HostAnalyticsData } from "@/types/meta.interface";
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  Wallet,
  Star,
  Award,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

const HostDashboardPage = async () => {
  const response = await getAnalytics();
  const analytics = response.data as HostAnalyticsData;

  const successRate =
    analytics.totalEvents > 0
      ? `${(
          (analytics.totalCompletedEvents / analytics.totalEvents) *
          100
        ).toFixed(1)}%`
      : "0%";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border bg-card p-5 md:p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Welcome,{" "}
              <span className="text-[#45aaa2]">{analytics.hostName}</span>!
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your events, track earnings, and monitor performance.
            </p>
          </div>

          {/* Quick chips */}
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs bg-muted/40">
              <TrendingUp className="h-4 w-4 text-[#45aaa2]" />
              <span className="text-muted-foreground">Success</span>
              <span className="font-semibold">{successRate}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs bg-muted/40">
              <Wallet className="h-4 w-4 text-[#45aaa2]" />
              <span className="text-muted-foreground">Income</span>
              <span className="font-semibold">
                ৳{(analytics.hostIncome ?? 0).toLocaleString()}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs bg-muted/40">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-muted-foreground">Rating</span>
              <span className="font-semibold">
                {(analytics.hostRating ?? 0).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Rating"
          value={`${(analytics.hostRating ?? 0).toFixed(1)} ⭐`}
          icon={Star}
          color="bg-gradient-to-br from-yellow-500 to-yellow-600"
        />
        <StatCard
          title="Rating Count"
          value={analytics.hostRatingCount}
          icon={MessageSquare}
          description="Total reviews"
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Your Income"
          value={`৳${(analytics.hostIncome ?? 0).toLocaleString()}`}
          icon={Wallet}
          color="bg-gradient-to-br from-teal-500 to-teal-600"
        />

        <StatCard
          title="Upcoming Events"
          value={analytics?.totalEvents ?? 0}

          icon={Calendar}
          color="bg-gradient-to-br from-indigo-500 to-indigo-600"
        />
        <StatCard
          title="Completed"
          value={analytics.totalCompletedEvents}
          icon={CheckCircle2}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          title="Pending"
          value={analytics.totalPendingEvents}
          icon={Clock}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
        />

        <StatCard
          title="Rejected"
          value={analytics.totalRejectedEvents}
          icon={XCircle}
          color="bg-gradient-to-br from-red-500 to-red-600"
        />
        <StatCard
          title="Total Revenue"
          value={`৳${(analytics.totalPaymentsIncome ?? 0).toLocaleString()}`}
          icon={DollarSign}
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Success Rate"
          value={successRate}
          icon={Award}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>
    </div>
  );
};

export default HostDashboardPage;
