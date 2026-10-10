"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AdminAnalyticsData } from "@/types/meta.interface";

const COLORS = ["#3b82f6", "#ec4899", "#22c55e", "#f97316"];

export default function AdminCharts({ analytics }: { analytics: AdminAnalyticsData }) {
  const usersByRole = [
    { role: "Clients", count: analytics?.totalClients ?? 0 },
    { role: "Hosts", count: analytics?.totalHosts ?? 0 },
    { role: "Admins", count: analytics?.totalAdmins ?? 0 },
  ];

  const eventsByStatus = [
    { status: "Upcoming", count: analytics?.totalEvents ?? 0 },
    { status: "Completed", count: analytics?.totalCompletedEvents ?? 0 },
    { status: "Cancelled", count: analytics?.totalRejectedEvents ?? 0 },
  ].filter((entry) => entry.count > 0);

  const revenue = [
    { name: "Platform", amount: analytics?.totalPaymentsIncome ?? 0 },
    { name: "Admin", amount: analytics?.totalAdminIncome ?? 0 },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Users by role</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usersByRole}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="role" fontSize={12} />
              <YAxis allowDecimals={false} fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {usersByRole.map((entry, index) => (
                  <Cell key={entry.role} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Events by status</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          {eventsByStatus.length === 0 ? (
            <p className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No event data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={eventsByStatus} dataKey="count" nameKey="status" outerRadius={90} label>
                  {eventsByStatus.map((entry, index) => (
                    <Cell key={entry.status} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-base">Revenue (BDT)</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenue}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
