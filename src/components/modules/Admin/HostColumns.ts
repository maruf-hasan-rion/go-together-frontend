import { Column } from "@/components/shared/ManagementTable";

interface IHostData {
  id: string;
  fullName: string;
  email: string;
  status?: string;
  location?: string | null;
  averageRating?: number | null;
  totalReviews?: number | null;
}

export const hostsColumns: Column<IHostData>[] = [
  {
    header: "Name",
    accessor: (row) => row.fullName || "N/A",
  },
  {
    header: "Email",
    accessor: (row) => row.email,
  },
  {
    header: "Location",
    accessor: (row) => row.location || "N/A",
  },
  {
    header: "Rating",
    accessor: (row) =>
      `${Number(row.averageRating ?? 0).toFixed(1)} (${row.totalReviews ?? 0})`,
  },
  {
    header: "Status",
    accessor: (row) => row.status || "ACTIVE",
  },
];
