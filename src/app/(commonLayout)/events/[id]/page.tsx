// import Image from "next/image";
// import { Card, CardContent } from "@/components/ui/card";

import { getSingleEvent } from "@/services/events/events";
import { getUserInfo } from "@/services/auth/getUserInfo";
// import { ApiParticipantInfo } from "@/types/event.interface";
import EventDetailsCard from "@/components/modules/Events/EventDetailsCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event-Details - Explore Event Info & Participants | Eventra",
  description:
    "Explore detailed information about events, including date, time, location, and participant list. Connect with other attendees and get involved in exciting activities through Eventra's event management platform.",
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

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
      const { id } = await params;
  const userInfo = await getUserInfo();
  const userId = userInfo?.id ?? null;

  const result = await getSingleEvent(id);
  const event = result?.data;
//   console.log("uuu",event);



  return <EventDetailsCard event={event} userId={userId} />;
}
// const formatDate = (iso?: string) => {
//     if (!iso) return { date: "", time: "" };
//     const d = new Date(iso);
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     const month = months[d.getUTCMonth()];
//     const day = d.getUTCDate();
//     const year = d.getUTCFullYear();
//     const hours = String(d.getUTCHours()).padStart(2, "0");
//     const minutes = String(d.getUTCMinutes()).padStart(2, "0");
//     return {
//         date: `${month} ${day}, ${year}`,
//         time: `${hours}:${minutes}`,
//     };
// };

// const EventDetailsPage = async ({ params }: { params: { id: string } }) => {
//     const { id } = await params;

//     const result = await getSingleEvent(id);
//     // const participantsResult = await getEventParticipants(id);
//     const event = result?.data || result || null;
//     // const participantsList: ApiParticipantInfo[] = participantsResult?.data?.data || [];

//     const userInfo = await getUserInfo();
//     const userRole = userInfo?.role ?? null;
//     // const userEmail = userInfo?.email ?? null;

//     if (!event) {
//         return (
//             <div className="max-w-7xl mx-auto px-4 py-12 text-center">
//                 <h2 className="text-xl font-semibold">Event not found</h2>
//             </div>
//         );
//     }

//     const { date, time } = formatDate(event?.date);

//     // type ParticipantWithStatus = ApiParticipantInfo & { participantStatus?: string; client?: { email?: string }; transactionId?: string };
//     // let currentParticipantStatus: string | null = null;
//     // let currentTransactionId: string | null = null;
//     // if (Array.isArray(participantsList) && userEmail) {
//     //     for (const p of participantsList as ParticipantWithStatus[]) {
//     //         if (p?.client?.email === userEmail) {
//     //             currentParticipantStatus = p.participantStatus ?? null;
//     //             currentTransactionId = p.transactionId ?? null;
//     //             break;
//     //         }
//     //     }
//     // }

//     return (
//         <div className="max-w-7xl mx-auto px-4 py-8 mt-16 lg:mt-20">
//             <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

//                 <div className="xl:col-span-3">
//                     <EventDetailsCard event={event} date={date} time={time} userRole={userRole}
//                     // currentParticipantStatus={currentParticipantStatus} transactionId={currentTransactionId}
//                     />
//                 </div>

//                 <aside className="xl:col-span-1">
//                     <div className="sticky top-24">
//                         <h3 className="text-lg font-semibold mb-3">Participants </h3>
//                         {/* <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
//                             {Array.isArray(participantsList) && participantsList.length > 0 ? (
//                                 participantsList.map((p: ApiParticipantInfo) => (
//                                     <Card key={p.id} className="p-2 bg-background">
//                                         <CardContent className="flex items-center gap-3">
//                                             <div className="w-7 h-7 rounded-full">
//                                                 <Image src={p.client?.profilePhoto || '/images/avatar-placeholder.png'} alt={p.client?.name || 'Client'} width={48} height={48} className="object-cover rounded-full" />
//                                             </div>
//                                             <div className="flex-1">
//                                                 <div className="flex items-center justify-between">
//                                                     <div className="text-xs font-semibold">{p.client?.name || 'Participant'}</div>
//                                                 </div>
//                                                 <div className="mt-2 text-xs text-muted-foreground lowercase">
//                                                     {(p.client?.interests || []).slice(0, 3).map((t: string) => <span key={t} className="mr-2 text-orange-700">#{t}</span>)}
//                                                 </div>
//                                             </div>

//                                         </CardContent>
//                                     </Card>
//                                 ))
//                             ) : (
//                                 <div className="text-sm text-muted-foreground">No participants yet.</div>
//                             )}
//                         </div> */}
//                     </div>
//                 </aside>
//             </div>
//         </div>
//     );
// };

// export default EventDetailsPage;
