import EventCard from "@/components/modules/Events/EventCard";
import { Event } from "@/types/event.interface";
import Link from "next/link";

export default function FeaturedEvents({ events = [] }: { events?: Event[] }) {
	return (
		<div id="events" className="py-20 px-4 bg-gray-50">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">
						Upcoming Events
					</h2>
					<p className="text-xl text-gray-600">
						Join exciting activities near you
					</p>
				</div>

				{events.length > 0 ? (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{events.map((event) => (
							<EventCard key={event.id} event={event} />
						))}
					</div>
				) : (
					<p className="text-center text-gray-500">
						No upcoming events yet — check back soon.
					</p>
				)}

				<div className="text-center mt-10">
					<Link
						href="/events"
						className="text-blue-600 font-semibold hover:underline"
					>
						Browse all events →
					</Link>
				</div>
			</div>
		</div>
	);
}
