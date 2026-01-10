export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";

const HostDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default HostDashboardLayout;