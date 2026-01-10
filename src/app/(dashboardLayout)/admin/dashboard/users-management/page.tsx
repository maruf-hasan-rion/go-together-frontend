
import UserManagementFilter from "@/components/modules/Admin/UserManagementFilter";
import UserManagementTable from "@/components/modules/Admin/UserManagementTable";
import Pagination from "@/components/shared/Pagination";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllUsers } from "@/services/admin/management";

const UserManagementPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) => {

    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const allUsers = await getAllUsers(queryString);
    console.log("allUsers", allUsers);
    const totalPages = Math.ceil(
        (allUsers?.data?.meta?.total || 1) / (allUsers?.data?.meta?.limit || 1)
    );

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8 ">
                <div>
                    <h1 className="text-2xl font-semibold mb-6">User Management</h1>
                    <p className="text-sm text-muted-foreground mb-6">Manage all users - filter by status or search to organize your users.</p>
                </div>

                <UserManagementFilter />

                <UserManagementTable users={allUsers?.data?.users || []} />
            </div>

            <Pagination
                currentPage={allUsers?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />

        </>
    );
};

export default UserManagementPage;