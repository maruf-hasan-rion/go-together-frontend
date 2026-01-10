
import {Event} from "@/types/event.interface";
import Pagination from "@/components/shared/Pagination";
import { queryStringFormatter } from "@/lib/formatters";
import EventApplicationCard from "@/components/modules/Events/EventApplicationCard";
import { getEventApplications } from "@/services/events/events";
import AdminEventCardFilter from "@/components/modules/Events/AdminEventCardFilter";

const EventApplicationPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) => {

    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const requestedEvents = await getEventApplications(queryString);

    const totalPages = Math.ceil(
        (requestedEvents?.data?.meta?.total || 1) / (requestedEvents?.data?.meta?.limit || 1)
    );

    const totalApplications = requestedEvents?.data?.meta?.total || 0;

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8 ">
                <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold mb-2">Event Applications</h1>
                        <p className="text-sm text-muted-foreground">Review and manage incoming event applications from hosts. Use filters to narrow results.</p>
                    </div>
                    <div className="mt-3 md:mt-0 text-sm text-muted-foreground">Total: <strong>{totalApplications}</strong></div>
                </div>

                <AdminEventCardFilter />
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.isArray(requestedEvents?.data?.eventRequests) && (requestedEvents.data.eventRequests as Event[]).length > 0 ? (
                        (requestedEvents.data.eventRequests as Event[]).map((ev) => (
                            <EventApplicationCard key={ev.id} event={ev} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-sm text-muted-foreground py-12">No events found.</div>
                    )}
                </div>
            </div>
            <Pagination
                currentPage={requestedEvents?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </>
    );
};

export default EventApplicationPage;