"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { Button } from "@/components/ui/button";
import { suspendClient, unsuspendClient } from "@/services/admin/management";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { hostsColumns } from "./HostColumns";

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

interface HostManagementTableProps {
    hosts: IHostData[];
}

const HostManagementTable = ({ hosts }: HostManagementTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [pendingHostId, setPendingHostId] = useState<string | null>(null);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleSuspend = async (host: IHostData) => {
        setPendingHostId(host.id);
        try {
            const result = await suspendClient(host.id);

            if (result.success) {
                toast.success("Host suspended successfully");
                handleRefresh();
            } else {
                toast.error(result.message || "Failed to suspend host");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setPendingHostId(null);
        }
    };

    const handleUnsuspend = async (host: IHostData) => {
        setPendingHostId(host.id);
        try {
            const result = await unsuspendClient(host.id);

            if (result.success) {
                toast.success("Host unsuspended successfully");
                handleRefresh();
            } else {
                toast.error(result.message || "Failed to unsuspend host");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setPendingHostId(null);
        }
    };

    const columnsWithActions = [
        ...hostsColumns,
        {
            header: "Actions",
            accessor: (row: IHostData) => (
                <div className="flex gap-2">
                    {row.status === "SUSPENDED" ? (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUnsuspend(row)}
                            disabled={pendingHostId === row.id}
                            className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                            {pendingHostId === row.id ? "..." : "Unsuspend"}
                        </Button>
                    ) : (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSuspend(row)}
                            disabled={pendingHostId === row.id}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                            {pendingHostId === row.id ? "..." : "Suspend"}
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <ManagementTable
            data={hosts}
            columns={columnsWithActions}
            getRowKey={(host) => host.id}
            emptyMessage="No hosts found"
        />
    );
};

export default HostManagementTable;
