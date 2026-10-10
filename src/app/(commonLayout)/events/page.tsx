import { getAllEvents } from "@/services/events/events";
import EventCard from "@/components/modules/Events/EventCard";
import { Event } from "@/types/event.interface";
import Pagination from "@/components/shared/Pagination";
import { queryStringFormatter } from "@/lib/formatters";
import { unwrapList, unwrapMeta } from "@/lib/unwrap";
import EventsFilter from "@/components/modules/Events/EventsFilters";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "All Events - Browse & Book Events | Eventra",
	description:
		"Browse all upcoming events in your area. Filter by category, date, and location to find concerts, workshops, sports events, festivals, and more. Book your next adventure on Eventra.",
	keywords: [
		"all events",
		"upcoming events",
		"browse events",
		"event listing",
		"event filter",
		"concerts",
		"workshops",
		"sports events",
		"festivals",
	],
	authors: [{ name: "Eventra Team" }],
};

const allEventsPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
	const searchParamsObj = await searchParams;
	const queryString = queryStringFormatter(searchParamsObj);
	const allEvents = await getAllEvents(queryString);
	const events = unwrapList<Event>(allEvents, "events");
	const meta = unwrapMeta(allEvents);

	const totalPages = Math.ceil((meta.total || 1) / (meta.limit || 1));

	return (
		<>
			<div className="max-w-7xl mx-auto px-4 py-8 mt-16 lg:mt-20">
				<h1 className="text-2xl font-semibold mb-6">All Events</h1>
				<p className="text-sm text-muted-foreground mb-6">
					Browse upcoming events - filter by category, date, or location to find
					what interests you.
				</p>

				<EventsFilter />
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{events.length > 0 ? (
						events.map((ev) => (
							<EventCard key={ev.id} event={ev} />
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

export default allEventsPage;
