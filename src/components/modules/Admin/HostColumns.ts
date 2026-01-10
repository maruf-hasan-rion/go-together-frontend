import { Column } from "@/components/shared/ManagementTable";

interface IHostData {
    id: string;
    email: string;
    status: string;
    host: {
        id: string;
        name: string;
        email: string;
        profilePhoto?: string;
        contactNumber?: string;
        location?: string;
        income?: number;
        rating?: number;
        ratingCount?: number;
    };
}

export const hostsColumns: Column<IHostData>[] = [
    {
        header: "Name",
        accessor: (row) => row.host?.name || "N/A",
    },
    {
        header: "Email",
        accessor: (row) => row.host?.email || row.email,
    },
    {
        header: "Contact",
        accessor: (row) => row.host?.contactNumber || "N/A",
    },
    {
        header: "Location",
        accessor: (row) => row.host?.location || "N/A",
    },
    {
        header: "Rating",
        accessor: (row) => `${row.host?.rating?.toFixed(1) || "0.0"} (${row.host?.ratingCount || 0})`,
    },
    {
        header: "Income",
        accessor: (row) => `${row.host?.income?.toFixed(2) || "0.00"} BDT`,
    },
    {
        header: "Status",
        accessor: (row) => row.status,
    },
];
