import HostManagementFilter from "@/components/modules/Admin/HostManagementFilter";
import HostManagementTable from "@/components/modules/Admin/HostManagementTable";
import Pagination from "@/components/shared/Pagination";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllHosts } from "@/services/admin/management";

const HostManagementPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) => {

    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const allHosts = await getAllHosts(queryString);

    const totalPages = Math.ceil(
        (allHosts?.data?.meta?.total || 1) / (allHosts?.data?.meta?.limit || 1)
    );

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div>
                    <h1 className="text-2xl font-semibold mb-6">Host Management</h1>
                    <p className="text-sm text-muted-foreground mb-6">Manage all hosts - filter by status or search to organize your hosts.</p>
                </div>

                <HostManagementFilter />

                <HostManagementTable hosts={allHosts?.data?.clients || []} />
            </div>
            <Pagination
                currentPage={allHosts?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </>

    );
};

export default HostManagementPage;
