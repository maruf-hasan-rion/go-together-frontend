"use client";


import { getAnalytics } from "@/services/analytics/analytics.service";
import { StatCard } from "@/components/modules/Analytics/StatCard";
import {
  Users,
  UserCheck,
  UserSquare2,
  Calendar,
  CheckCircle2,
  XCircle,
  DollarSign,
  Wallet,
  Clock,
  FileText,
} from "lucide-react";
import { AdminAnalyticsData } from "@/types/meta.interface";
import AdminFeatures from "@/components/modules/Admin/AdminFeatures";

const AdminDashboard = async () => {

  const response = await getAnalytics();
  const analytics = response.data as AdminAnalyticsData;

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-xs text-muted-foreground">Platform analytics overview</p>
      </div>

      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Total Users"
          value={analytics?.totalUsers}
          icon={Users}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Clients"
          value={analytics?.totalClients}
          icon={UserCheck}
          color="bg-gradient-to-br from-cyan-500 to-cyan-600"
        />
        <StatCard
          title="Hosts"
          value={analytics?.totalHosts}
          icon={UserSquare2}
          color="bg-gradient-to-br from-pink-500 to-pink-600"
        />
        <StatCard
          title="Upcoming Events"
          value={analytics?.totalEvents ?? 0}

          icon={Calendar}
          color="bg-gradient-to-br from-indigo-500 to-indigo-600"
        />
        <StatCard
          title="Completed"
          value={analytics?.totalCompletedEvents}
          icon={CheckCircle2}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          title="Rejected"
          value={analytics?.totalRejectedEvents}
          icon={XCircle}
          color="bg-gradient-to-br from-red-500 to-red-600"
        />
      </div>

      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Pending Events"
          value={analytics?.pendingEventApplications}
          icon={Clock}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
        />
        <StatCard
          title="Pending Hosts"
          value={analytics?.pendingHostApplications}
          icon={FileText}
          color="bg-gradient-to-br from-amber-500 to-amber-600"
        />
        <StatCard
          title="Total Income"
          value={`৳${'0'}`}
          // value={`৳${analytics?.totalPaymentsIncome?.toLocaleString()|| '0'}`}
          icon={DollarSign}
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Admin Income"
          value={`৳${'0'}`}
          // value={`৳${analytics?.totalAdminIncome?.toLocaleString()|| '0'}`}
          icon={Wallet}
          color="bg-gradient-to-br from-teal-500 to-teal-600"
        />
      </div>
      <AdminFeatures></AdminFeatures>
    </div>
  );
};

export default AdminDashboard;
