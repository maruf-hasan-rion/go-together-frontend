import { Metadata } from "next";
import { Calendar, CheckCircle2, DollarSign, Star, Users, Wallet } from "lucide-react";
import { StatCard } from "@/components/modules/Analytics/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { unwrapList } from "@/lib/unwrap";
import { formatDate, toNumber } from "@/lib/utils";
import { getAnalytics } from "@/services/analytics/analytics.service";
import { getMyHostedEvents } from "@/services/events/events";
import type { Event } from "@/types/event.interface";
import type { HostAnalyticsData } from "@/types/meta.interface";

export const metadata: Metadata = {
  title: "Payments | GoTogether",
  description: "Income collected across your hosted events.",
};

type HostEvent = Event & { currentParticipants?: number };

const HostPaymentsPage = async () => {
  const [analyticsRes, eventsRes] = await Promise.all([getAnalytics(), getMyHostedEvents()]);

  const analytics = analyticsRes?.data as HostAnalyticsData | undefined;
  const events = unwrapList<HostEvent>(eventsRes);

  const rows = events.map((event) => {
    const fee = toNumber(event.joiningFee);
    const participants = Number(event.currentParticipants ?? event._count?.bookings ?? 0);
    return {
      id: event.id,
      title: event.title,
      eventDate: event.eventDate,
      status: event.status,
      fee,
      participants,
      collected: fee * participants,
    };
  });

  const collected = rows.reduce((sum, row) => sum + row.collected, 0);
  const paidEvents = rows.filter((row) => row.fee > 0 && row.participants > 0).length;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-card p-5 md:p-6 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Income collected across your hosted events.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Income"
          value={`৳${toNumber(analytics?.hostIncome).toLocaleString()}`}
          icon={Wallet}
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Collected (per seat)"
          value={`৳${collected.toLocaleString()}`}
          icon={DollarSign}
          color="bg-gradient-to-br from-teal-500 to-teal-600"
        />
        <StatCard
          title="Hosted Events"
          value={toNumber(analytics?.totalEvents)}
          icon={Calendar}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Host Rating"
          value={`${toNumber(analytics?.hostRating).toFixed(1)} ★`}
          description={`${toNumber(analytics?.hostRatingCount)} reviews`}
          icon={Star}
          color="bg-gradient-to-br from-amber-500 to-amber-600"
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Event breakdown</CardTitle>
          <span className="text-xs text-muted-foreground">
            {paidEvents} paid event{paidEvents === 1 ? "" : "s"}
          </span>
        </CardHeader>
        <CardContent>
          {rows.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-10 w-10 mx-auto mb-3 opacity-60" />
              No hosted events yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Fee</TableHead>
                    <TableHead className="text-right">Participants</TableHead>
                    <TableHead className="text-right">Collected</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.title}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.eventDate ? formatDate(row.eventDate) : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        {row.fee > 0 ? `৳${row.fee.toLocaleString()}` : "Free"}
                      </TableCell>
                      <TableCell className="text-right">{row.participants}</TableCell>
                      <TableCell className="text-right font-semibold">
                        ৳{row.collected.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          {row.status === "COMPLETED" ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          ) : null}
                          {row.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HostPaymentsPage;
