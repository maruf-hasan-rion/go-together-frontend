import HostApplicationManagementFilter from "@/components/modules/Admin/HostApplicationManagementFilter";
import HostApplicationManagementTable from "@/components/modules/Admin/HostApplicationManagementTable";
import Pagination from "@/components/shared/Pagination";
import { queryStringFormatter } from "@/lib/formatters";
import { unwrapList, unwrapMeta } from "@/lib/unwrap";
import { getAllHostApplications } from "@/services/admin/management";

const HostApplicationManagementPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
	const searchParamsObj = await searchParams;
	const queryString = queryStringFormatter(searchParamsObj);
	const allApplications = await getAllHostApplications(queryString);
	const applications = unwrapList(allApplications, "hostApplications");
	const meta = unwrapMeta(allApplications);

	const totalPages = Math.ceil((meta.total || 1) / (meta.limit || 1));

	return (
		<>
			<div className="max-w-7xl mx-auto px-4 py-8">
				<div>
					<h1 className="text-2xl font-semibold mb-6">
						Host Application Management
					</h1>
					<p className="text-sm text-muted-foreground mb-6">
						Review and manage host applications - approve or reject pending
						applications.
					</p>
				</div>

				<HostApplicationManagementFilter />

				<HostApplicationManagementTable applications={applications} />
			</div>

			<Pagination currentPage={meta.page || 1} totalPages={totalPages || 1} />
		</>
	);
};

export default HostApplicationManagementPage;
