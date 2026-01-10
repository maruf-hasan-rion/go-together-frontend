import { Column } from "@/components/shared/ManagementTable";

interface IHostApplicationData {
  id: string;
  userId: string;
  status: string;
  createdAt?: string;
  user: {
    fullName: string;
    id: string;
    email: string;
  };
}

export const hostApplicationColumns: Column<IHostApplicationData>[] = [
  {
    header: "Name",
    accessor: (row) => row.user.fullName || "N/A",
  },
  {
    header: "Email",
    accessor: (row) => row.user?.email || "N/A",
  },
  // {
  //     header: "User Status",
  //     accessor: (row) => row.user?.status || "N/A",
  // },
  {
    header: "Application Status",
    accessor: (row) => row.status,
  },
  {
    header: "Applied At",
    accessor: (row) => new Date(row.createdAt || "").toLocaleDateString(),
  },
];
