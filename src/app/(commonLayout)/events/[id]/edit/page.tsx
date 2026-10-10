import { Metadata } from "next";
import { redirect } from "next/navigation";

// import EditEventClient from "./EditEventClient";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getSingleEvent } from "@/services/events/events";
import EditEvent from "@/components/modules/Events/EditEvent";

export const metadata: Metadata = {
  title: "Edit Event | GoTogether",
  description: "Update your event details in GoTogether",
};

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [eventRes, userRes] = await Promise.all([
    getSingleEvent(id),
    getUserInfo(),
  ]);

  const event = eventRes?.data ?? null;

  // Not logged in -> go login
  const user = userRes ?? null;

  // Not logged in -> go login
  if (!user?.id) redirect("/login");

  // Event not found -> go events
  if (!event?.id) redirect("/events");

  // // Permission check on server (best place)
  // const isHost = user.id === event.hostId;
  // const isAdmin = user.role === "ADMIN";
  // if (!isHost && !isAdmin) redirect(`/events/${id}`);

  return <EditEvent event={event} user={user} />;
}
