import AdminDashboard from "@/components/modules/Admin/AdminDashboard";
import { getAnalytics } from "@/services/analytics/analytics.service";
import { AdminAnalyticsData } from "@/types/meta.interface";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0; 



const AdminDashboardPage = async () => {
  const response = await getAnalytics();
  const analytics = response.data as AdminAnalyticsData;
  <Suspense fallback={<div>Loading...</div>}>
      <AdminDashboard analytics={analytics} />
  </Suspense>
  
};

export default AdminDashboardPage;
