import { Column } from "@/components/shared/ManagementTable";

interface IUserData {
    id: string;
    email: string;
    status: string;
    client: {
        id: string;
        name: string;
        email: string;
        profilePhoto?: string;
        contactNumber?: string;
        location?: string;
    };
}

export const usersColumns: Column<IUserData>[] = [
    {
        header: "Name",
        accessor: (row) => row.client?.name || "N/A",
    },
    {
        header: "Email",
        accessor: (row) => row.client?.email || row.email,
    },
    {
        header: "Contact",
        accessor: (row) => row.client?.contactNumber || "N/A",
    },
    {
        header: "Location",
        accessor: (row) => row.client?.location || "N/A",
    },
    {
        header: "Status",
        accessor: (row) => row.status === "PENDING" ? "Applied Host" : row.status,
    },
];
