import { getMyHostedEvents } from "@/services/events/events";
// import Event from "@/types/event.interface";
import Pagination from "@/components/shared/Pagination";
import { queryStringFormatter } from "@/lib/formatters";
import { unwrapList, unwrapMeta } from "@/lib/unwrap";
import HostEventCardFilter from "@/components/modules/Events/HostEventCardFilter";
import CreatedEventCard from "@/components/modules/Events/CreatedEventCard";
import AddEventButton from "@/components/modules/Events/AddEventButton";
import { Event } from "@/types/event.interface";

const MyCreatedEventsDashboardPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
	const searchParamsObj = await searchParams;
	const queryString = queryStringFormatter(searchParamsObj);
	const hostedEvents = await getMyHostedEvents(queryString);
	const events = unwrapList<Event>(hostedEvents, "eventRequests");
	const meta = unwrapMeta(hostedEvents);

	const totalPages = Math.ceil((meta.total || 1) / (meta.limit || 1));

	return (
		<>
			<div className="max-w-7xl mx-auto px-4 py-8 ">
				<div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center mb-6">
					{/* flex and justify between */}
					<div>
						<h1 className="text-2xl font-semibold mb-6">My Created Events</h1>
						<p className="text-sm text-muted-foreground mb-6">
							Manage your hosted events - filter by status, category, or date to
							organize your events.
						</p>
					</div>
					<AddEventButton />
				</div>
				<HostEventCardFilter />
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
					{events.length > 0 ? (
						events.map((ev) => (
							<CreatedEventCard key={ev.id} event={ev} />
						))
					) : (
						<div className="col-span-full text-center text-sm text-muted-foreground py-12">
							No events found.
						</div>
					)}
				</div>
			</div>
			<Pagination currentPage={meta.page || 1} totalPages={totalPages || 1} />
		</>
	);
};

export default MyCreatedEventsDashboardPage;
