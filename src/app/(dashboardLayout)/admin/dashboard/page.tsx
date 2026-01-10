import AdminDashboard from "@/components/modules/Admin/AdminDashboard";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0; 



const AdminDashboardPage = async () => {
  <Suspense fallback={<div>Loading...</div>}>
      <AdminDashboard />
  </Suspense>
  
};

export default AdminDashboardPage;
