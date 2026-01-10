"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { UserInfo } from "@/types/user.interface";
// import { Button } from "@/components/ui/button";
// import { suspendClient, unsuspendClient } from "@/services/admin/management";
import { useRouter } from "next/navigation";
// import { UserInfo } from "os";
// import { useState, useTransition } from "react";
// import { toast } from "sonner";
// import { usersColumns } from "./usersColumns";

interface IUserData {

        id: string;
        fullName: string;
        email: string;
        profilePhoto?: string;
        contactNumber?: string;
        role:UserInfo

}

interface UserManagementTableProps {
    users: IUserData[];
}

const UserManagementTable = ({ users }: UserManagementTableProps) => {
    const router = useRouter();
    // const [, startTransition] = useTransition();
    // const [pendingUserId, setPendingUserId] = useState<string | null>(null);

    // const handleRefresh = () => {
    //     startTransition(() => {
    //         router.refresh();
    //     });
    // };

    // const handleSuspend = async (user: IUserData) => {
    //     setPendingUserId(user.id);
    //     try {
    //         const result = await suspendClient(user.id);

    //         if (result.success) {
    //             toast.success("User suspended successfully");
    //             handleRefresh();
    //         } else {
    //             toast.error(result.message || "Failed to suspend user");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         toast.error("Something went wrong");
    //     } finally {
    //         setPendingUserId(null);
    //     }
    // };

    // const handleUnsuspend = async (user: IUserData) => {
    //     setPendingUserId(user.id);
    //     try {
    //         const result = await unsuspendClient(user.id);

    //         if (result.success) {
    //             toast.success("User unsuspended successfully");
    //             handleRefresh();
    //         } else {
    //             toast.error(result.message || "Failed to unsuspend user");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         toast.error("Something went wrong");
    //     } finally {
    //         setPendingUserId(null);
    //     }
    // };

    // const columnsWithActions = [
    //     ...usersColumns,
    //     {
    //         header: "Actions",
    //         accessor: (row: IUserData) => (
    //             <div className="flex gap-2">
    //                 {row.status === "SUSPENDED" ? (
    //                     <Button
    //                         size="sm"
    //                         variant="outline"
    //                         onClick={() => handleUnsuspend(row)}
    //                         disabled={pendingUserId === row.id}
    //                         className="text-green-600 border-green-600 hover:bg-green-50"
    //                     >
    //                         {pendingUserId === row.id ? "..." : "Unsuspend"}
    //                     </Button>
    //                 ) : (
    //                     <Button
    //                         size="sm"
    //                         variant="outline"
    //                         onClick={() => handleSuspend(row)}
    //                         disabled={pendingUserId === row.id}
    //                         className="text-red-600 border-red-600 hover:bg-red-50"
    //                     >
    //                         {pendingUserId === row.id ? "..." : "Suspend"}
    //                     </Button>
    //                 )}
    //             </div>
    //         ),
    //     },
    // ];

    return (
        <ManagementTable
            data={users}
            // columns={columnsWithActions}
            getRowKey={(user) => user.id}
            emptyMessage="No users found" columns={[]}        />
    );
};

export default UserManagementTable;