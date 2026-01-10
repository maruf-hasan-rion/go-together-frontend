import { Metadata } from "next";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getMyHostedEvents } from "@/services/events/events";
import { getMyBookings } from "@/services/booking/booking";
import MyEvents from "@/components/modules/Host/MyEvents";

export const metadata: Metadata = {
  title: "My Events | GoTogether",
  description: "Manage your hosted and joined events in GoTogether.",
};

export default async function MyEventsPage() {
  const userInfo = await getUserInfo();
  const user = userInfo?.data ?? userInfo; // (depending on your API shape)
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

  // Normalize arrays
  const hostedEvents =
    hostedRes?.data?.result ??
    hostedRes?.data ??
    hostedRes?.result ??
    hostedRes ??
    [];

  const bookings =
    bookingsRes?.data?.result ??
    bookingsRes?.data ??
    bookingsRes?.result ??
    bookingsRes ??
    [];

  return (
    <MyEvents
      isAuthenticated
      userRole={userRole}
      hostedEvents={Array.isArray(hostedEvents) ? hostedEvents : []}
      bookings={Array.isArray(bookings) ? bookings : []}
    />
  );
}
