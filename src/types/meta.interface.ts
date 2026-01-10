export interface AdminAnalyticsData {
    role: "ADMIN";
    totalUsers: number;
    totalAdmins: number;
    totalClients: number;
    totalHosts: number;
    totalEvents: number;
    totalCompletedEvents: number;
    totalRejectedEvents: number;
    totalPaymentsIncome: number;
    totalAdminIncome: number;
    pendingHostApplications: number;
    pendingEventApplications: number;
}

export interface HostAnalyticsData {
    role: "HOST";
    hostId: string;
    hostName: string;
    totalEvents: number;
    totalCompletedEvents: number;
    totalRejectedEvents: number;
    totalPendingEvents: number;
    totalPaymentsIncome: number;
    hostIncome: number;
    hostRating: number;
    hostRatingCount: number;
}
