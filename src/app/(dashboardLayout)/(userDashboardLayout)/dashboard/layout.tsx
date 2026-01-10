export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";

const UserDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div>{children}</div>;
};

export default UserDashboardLayout;
