"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { Button } from "@/components/ui/button";
import { approveHostApplication, rejectHostApplication } from "@/services/admin/management";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { hostApplicationColumns } from "./HostApplicationColumns";

interface IHostApplicationData {
    id: string;
    userId: string;
    status: string; 
    createdAt?: string;
    user: {
         fullName:string;
        id: string;
        email: string;

    };
}

interface HostApplicationManagementTableProps {
    applications: IHostApplicationData[];
}

const HostApplicationManagementTable = ({ applications }: HostApplicationManagementTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [pendingAppId, setPendingAppId] = useState<string | null>(null);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleApprove = async (app: IHostApplicationData) => {
        setPendingAppId(app.id);
        try {
            const result = await approveHostApplication(app.id);

            if (result.success) {
                toast.success("Host application approved successfully");
                handleRefresh();
            } else {
                toast.error(result.message || "Failed to approve application");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setPendingAppId(null);
        }
    };

    const handleReject = async (app: IHostApplicationData) => {
        setPendingAppId(app.id);
        try {
            const result = await rejectHostApplication(app.id);

            if (result.success) {
                toast.success("Host application rejected successfully");
                handleRefresh();
            } else {
                toast.error(result.message || "Failed to reject application");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setPendingAppId(null);
        }
    };

    const columnsWithActions = [
        ...hostApplicationColumns,
        {
            header: "Actions",
            accessor: (row: IHostApplicationData) => (
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleApprove(row)}
                        disabled={pendingAppId === row.id || row.status !== "PENDING"}
                        className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                        {pendingAppId === row.id ? "..." : "Approve"}
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(row)}
                        disabled={pendingAppId === row.id || row.status !== "PENDING"}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                        {pendingAppId === row.id ? "..." : "Reject"}
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <ManagementTable
            data={applications}
            columns={columnsWithActions}
            getRowKey={(app) => app.id}
            emptyMessage="No host applications found"
        />
    );
};

export default HostApplicationManagementTable;
