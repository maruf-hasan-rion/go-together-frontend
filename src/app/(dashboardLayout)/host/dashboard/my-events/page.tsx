import { Metadata } from "next";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getMyHostedEvents } from "@/services/events/events";
import { getMyBookings } from "@/services/booking/booking";
import { unwrapList } from "@/lib/unwrap";
import MyEvents from "@/components/modules/Host/MyEvents";

export const metadata: Metadata = {
	title: "My Events | GoTogether",
	description: "Manage your hosted and joined events in GoTogether.",
};

export default async function MyEventsPage() {
	const userInfo = await getUserInfo();
	const user = userInfo;
	const isAuthenticated = !!user?.id;

	// If not logged in -> render client with empty data, it will show login UI
	if (!isAuthenticated) {
		return (
			<MyEvents
				isAuthenticated={false}
				userRole={null}
				hostedEvents={[]}
				bookings={[]}
			/>
		);
	}

	const userRole = user?.role ?? null;
	// console.log("ur",userRole);
	const isHost = userRole === "HOST" || userRole === "ADMIN";

	// Fetch data (server side)
	const [hostedRes, bookingsRes] = await Promise.all([
		isHost ? getMyHostedEvents() : Promise.resolve(null),
		getMyBookings(),
	]);

	// Normalize arrays (works with both envelope shapes)
	const hostedEvents = unwrapList(hostedRes);
	const bookings = unwrapList(bookingsRes);

	return (
		<MyEvents
			isAuthenticated
			userRole={userRole}
			hostedEvents={Array.isArray(hostedEvents) ? hostedEvents : []}
			bookings={Array.isArray(bookings) ? bookings : []}
		/>
	);
}
