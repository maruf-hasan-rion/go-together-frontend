import { Column } from "@/components/shared/ManagementTable";

interface IUserData {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status?: string;
  location?: string | null;
  createdAt?: string;
}

export const usersColumns: Column<IUserData>[] = [
  {
    header: "Name",
    accessor: (row) => row.fullName || "N/A",
  },
  {
    header: "Email",
    accessor: (row) => row.email,
  },
  {
    header: "Role",
    accessor: (row) => row.role,
  },
  {
    header: "Location",
    accessor: (row) => row.location || "N/A",
  },
  {
    header: "Status",
    accessor: (row) => row.status || "ACTIVE",
  },
  {
    header: "Joined",
    accessor: (row) =>
      row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A",
  },
];
