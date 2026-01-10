// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import { MapPin, Calendar, Clock, User2 } from "lucide-react";
// import { Event } from "@/types/event.interface";
// import { joinEvent } from "@/services/events/events";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

// type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
// type UserRole = "USER" | "HOST" | "ADMIN";
// type EventStatus = "OPEN" | "FULL" | "CANCELLED" | "COMPLETED";

// type Props = {
//   event: Event | null;
//   userRole?: UserRole | string | null;
//   bookingStatus?: BookingStatus | string | null;
//   transactionId?: string | null;
// };

// export default function EventDetailsCard({
//   event,
//   userRole,
//   bookingStatus,
// }: Props) {
//   const [isPending, setIsPending] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const router = useRouter();

//   if (!event) return null;

//   const isAdminOrHost = userRole === "ADMIN" || userRole === "HOST";
//   const eventStatus = (event.status as EventStatus) || "OPEN";
//   const isCompleted = eventStatus === "COMPLETED";
//   const canBook =
//     !bookingStatus ||
//     bookingStatus === "CANCELLED" ||
//     bookingStatus === "PENDING";

//   const joinDisabled =
//     isPending || isAdminOrHost || eventStatus !== "OPEN" || !canBook;

//   let buttonLabel = "Book Event";
//   if (isPending) buttonLabel = "Processing...";
//   else if (eventStatus !== "OPEN") buttonLabel = "Not Available";

//   const buttonClass = joinDisabled
//     ? "bg-gray-300 text-gray-700 hover:bg-gray-300 cursor-not-allowed"
//     : "bg-[#45aaa2] hover:bg-[#3c8f88] text-white";

//   const handleBook = async () => {
//     if (!event?.id) return;

//     if (isAdminOrHost) {
//       toast.error("Only users can book events.");
//       return;
//     }

//     if (eventStatus !== "OPEN") {
//       toast.error("This event is not open for booking.");
//       return;
//     }

//     // If CONFIRMED, block booking.
//     if (bookingStatus === "CONFIRMED") {
//       toast.error("You already booked this event.");
//       return;
//     }

//     setIsPending(true);
//     try {
//       const result = await joinEvent(event.id);

//       if (result?.success) {
//         toast.success("You have successfully joined this event! 🎉");
//         setTimeout(() => router.push("/dashboard/my-bookings"), 1500);
//       } else {
//         toast.error(result?.message || "Failed to book event");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setIsPending(false);
//     }
//   };

//   const getImageSrc = (src?: string) => {
//     if (!src) return "/images/event-placeholder.png";
//     if (src.startsWith("http")) return src;
//     if (src.startsWith("/uploads"))
//       return `${process.env.NEXT_PUBLIC_API_URL}${src}`;
//     return "/images/event-placeholder.png";
//   };

//   const statusTone = {
//     OPEN: "bg-emerald-500/15 text-emerald-700 border-emerald-200",
//     FULL: "bg-orange-500/15 text-orange-700 border-orange-200",
//     CANCELLED: "bg-red-500/15 text-red-700 border-red-200",
//     COMPLETED: "bg-slate-500/15 text-slate-700 border-slate-200",
//   }[eventStatus];

//   function formatEventDateTime(iso: string) {
//     const d = new Date(iso);

//     return {
//       date: d.toLocaleDateString("en-US", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }),
//       time: d.toLocaleTimeString("en-US", {
//         hour: "numeric",
//         minute: "2-digit",
//         hour12: true,
//       }),
//     };
//   }

//   const { date, time } = formatEventDateTime(event.eventDate);

//   return (
//     <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
//       {/* HERO */}
//       <div className="relative">
//         <div className="relative w-full h-72 md:h-96">
//           <Image
//             src={getImageSrc(event.image)}
//             alt={event.title || "Event"}
//             fill
//             priority
//             sizes="(max-width: 1024px) 100vw, 60vw"
//             className="object-cover"
//           />
//           <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
//         </div>

//         <div className="absolute top-4 left-4 flex flex-wrap gap-2">
//           <span
//             className={`text-xs px-3 py-1 rounded-full border backdrop-blur-md ${statusTone}`}
//           >
//             {eventStatus}
//           </span>
//           <span className="text-xs px-3 py-1 rounded-full border bg-white/75 text-slate-800 backdrop-blur-md">
//             Capacity: {event.maxParticipants ?? "N/A"}
//           </span>
//           <span className="text-xs px-3 py-1 rounded-full border bg-white/75 text-slate-800 backdrop-blur-md">
//             Fee: {event.joiningFee}
//           </span>
//         </div>

//         <div className="absolute top-4 right-4 hidden sm:flex flex-col gap-2 items-end">
//           <div className="flex items-center gap-2 bg-black/55 text-white px-3 py-1.5 rounded-full backdrop-blur-md">
//             <MapPin className="w-4 h-4 text-orange-300" />
//             <span className="text-xs">{event.location || "TBD"}</span>
//           </div>
//           <div className="flex items-center gap-2 bg-black/55 text-white px-3 py-1.5 rounded-full backdrop-blur-md">
//             <Calendar className="w-4 h-4 text-orange-300" />
//             <span className="text-xs">{date || "—"}</span>
//           </div>
//           <div className="flex items-center gap-2 bg-black/55 text-white px-3 py-1.5 rounded-full backdrop-blur-md">
//             <Clock className="w-4 h-4 text-orange-300" />
//             <span className="text-xs">{time || "—"}</span>
//           </div>
//         </div>

//         <div className="absolute bottom-4 left-4 right-4">
//           <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-sm line-clamp-2">
//             {event.title}
//           </h1>
//           <p className="text-white/80 text-sm mt-1 line-clamp-1">
//             {event.location || "TBD"} • {date || "—"} • {time || "—"}
//           </p>
//         </div>
//       </div>

//       {/* BODY */}
//       <div className="p-4 md:p-6 space-y-6">
//         <div className="rounded-xl border bg-muted/20 p-4">
//           <p className="text-sm text-muted-foreground leading-relaxed">
//             {event.description || "No description provided."}
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-2">
//           {(Array.isArray(event.type) ? event.type : [])
//             .slice(0, 12)
//             .map((c: string) => (
//               <Badge
//                 key={c}
//                 variant="secondary"
//                 className="rounded-full bg-[#45aaa2]/10 text-[#2e7b75] border border-[#45aaa2]/20"
//               >
//                 #{String(c).toLowerCase()}
//               </Badge>
//             ))}
//           {Array.isArray(event.type) && event.type.length > 12 && (
//             <span className="text-xs text-muted-foreground">+ more</span>
//           )}
//         </div>

//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div className="flex items-center gap-3">
//             <div className="relative w-10 h-10 rounded-full overflow-hidden border bg-muted">
//               {event.host?.profilePhoto ? (
//                 <Image
//                   src={getImageSrc(event.host.profilePhoto)}
//                   alt={event.host?.fullName || "Host"}
//                   fill
//                   className="object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center">
//                   <User2 className="h-5 w-5 text-muted-foreground" />
//                 </div>
//               )}
//             </div>
//             <div>
//               <p className="text-xs text-muted-foreground">Host</p>
//               <p className="text-sm font-semibold">
//                 {event.host?.fullName || "Host"}
//               </p>
//             </div>
//           </div>
//           <Button
//             onClick={handleBook}
//             disabled={joinDisabled}
//             className={buttonClass}
//           >
//             {buttonLabel}
//           </Button>

//           {/* <div className="flex items-center gap-2 justify-end">
//             {isCompleted && transactionId && bookingStatus === "CONFIRMED" ? (
//               <Button
//                 onClick={() => setShowReviewDialog(true)}
//                 disabled={hasReviewed}
//                 className={
//                   hasReviewed
//                     ? "bg-gray-300 text-gray-700 hover:bg-gray-300 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700 text-white"
//                 }
//               >
//                 {hasReviewed ? "Reviewed" : "Add Review"}
//               </Button>
//             ) : (
//               <Button
//                 onClick={handleBook}
//                 disabled={joinDisabled}
//                 className={buttonClass}
//               >
//                 {buttonLabel}
//               </Button>
//             )}

//             <Button
//               variant="outline"
//               size="icon"
//               onClick={async () => {
//                 setIsRefreshing(true);
//                 try {
//                   await revalidateAllData();
//                   const url = new URL(window.location.href);
//                   url.searchParams.set("_t", Date.now().toString());
//                   window.location.href = url.toString();
//                 } finally {
//                   setIsRefreshing(false);
//                 }
//               }}
//               disabled={isRefreshing}
//               className="rounded-full"
//               title="Refresh"
//             >
//               <RefreshCcw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
//             </Button>
//           </div> */}
//         </div>
//       </div>

//       {/* {transactionId && (
//         <AddReviewDialog
//           open={showReviewDialog}
//           onClose={() => setShowReviewDialog(false)}
//           transactionId={transactionId}
//           onReviewSubmitted={() => setHasReviewed(true)}
//         />
//       )} */}
//     </div>
//   );
// }

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Star,
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  Edit,
  Share2,
  Heart,
  Info,
} from "lucide-react";

import { formatDateTime, formatCurrency, getInitials } from "@/lib/utils";
import { toast } from "sonner";
import { joinEvent } from "@/services/events/events";
import { ReviewDialog } from "../Reviews/ReviewDialog";

export default function EventDetailsCard({
  event,
  userId,
}: {
  event: any;
  userId: string | null;
}) {
  const router = useRouter();
  const [joining, setJoining] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The event you're looking for doesn't exist or has been removed
              </p>
              <Link href="/events">
                <Button>Browse Events</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ✅ Align backend fields here
  const eventImage = event.image;         // backend: image
  const eventTitle = event.title;         // backend: title
  const eventDate = event.eventDate;      // backend: eventDate

  const bookedCount =
    event?.bookings?.filter((b: any) => b.status === "CONFIRMED").length || 0;

  const spotsLeft = event.maxParticipants - bookedCount;
  const isFull = event.status === "FULL" || spotsLeft <= 0;

  const isHost = userId && userId === event.hostId;
  const userBooking = userId
    ? event?.bookings?.find((b: any) => b.userId === userId)
    : null;

  const hasJoined = !!userBooking;
  const canReview = userBooking?.status === "CONFIRMED";

  const handleJoinEvent = async () => {
    setJoining(true);
    try {
      const result = await joinEvent(event.id);

      if (result?.success) {
        toast.success("You have successfully joined this event! 🎉");
        setTimeout(() => router.push("/dashboard/my-bookings"), 1500);
      } else {
        toast.error(result?.message || "Failed to join");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      {/* Hero */}
      <div className="relative h-64 md:h-96 lg:h-[500px] w-full">
        {eventImage ? (
          <Image
            src={eventImage}
            alt={eventTitle}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
            <Calendar className="h-24 w-24 md:h-32 md:w-32 text-primary/50" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-8">
          <div className="flex items-start justify-between">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.back()}
              className="backdrop-blur-sm bg-white/90 hover:bg-white shadow-lg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="backdrop-blur-sm bg-white/90 hover:bg-white shadow-lg"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="backdrop-blur-sm bg-white/90 hover:bg-white shadow-lg"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-white/90 text-foreground backdrop-blur-sm">
                {Array.isArray(event.type) ? event.type.join(", ") : event.type}
              </Badge>

              {isFull && (
                <Badge variant="destructive" className="backdrop-blur-sm">
                  Event Full
                </Badge>
              )}

              {event.joiningFee === 0 && (
                <Badge className="bg-green-500 text-white backdrop-blur-sm">
                  Free Event
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
              {eventTitle}
            </h1>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Info */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="text-sm font-medium truncate">
                      {new Date(eventDate).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="text-sm font-medium">
                      {new Date(eventDate).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Attendees</p>
                    <p className="text-sm font-medium">
                      {bookedCount}/{event.maxParticipants}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="text-sm font-medium">
                      {event.joiningFee === 0
                        ? "Free"
                        : formatCurrency(event.joiningFee)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  About This Event
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {event.description}
                </p>
              </CardContent>
            </Card>

            {/* Details */}
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium mb-1">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium mb-1">Date & Time</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDateTime(eventDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium mb-1">Participants</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-background rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{
                            width: `${(bookedCount / event.maxParticipants) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {bookedCount} / {event.maxParticipants}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              <Card className="shadow-xl">
                <CardContent className="p-6 space-y-6">
                  <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl">
                    <p className="text-4xl font-bold text-primary mb-1">
                      {event.joiningFee === 0
                        ? "Free"
                        : formatCurrency(event.joiningFee)}
                    </p>
                    <p className="text-sm text-muted-foreground">per person</p>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge variant={isFull ? "destructive" : "default"}>
                        {isFull ? "Full" : "Available"}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Spots Left</span>
                      <span className="font-semibold text-lg">{spotsLeft}</span>
                    </div>
                  </div>

                  <Separator />

                  {isHost ? (
                    <Link href={`/events/${event.id}/edit`}>
                      <Button className="w-full h-12 gap-2 shadow-lg" size="lg">
                        <Edit className="h-5 w-5" />
                        Edit Event
                      </Button>
                    </Link>
                  ) : hasJoined ? (
                    <Button className="w-full h-12" disabled size="lg">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Already Joined
                    </Button>
                  ) : isFull ? (
                    <Button className="w-full h-12" disabled variant="secondary" size="lg">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Event Full
                    </Button>
                  ) : (
                    <Button
                      className="w-full h-12 gap-2 shadow-lg hover:shadow-xl transition-all"
                      disabled={joining}
                      onClick={handleJoinEvent}
                      size="lg"
                    >
                      {joining ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          Joining...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-5 w-5" />
                          Join Event
                        </>
                      )}
                    </Button>
                  )}

                  {canReview && <ReviewDialog eventId={event.id} hostId={event.hostId} />}

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Secure booking</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Instant confirmation</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>24/7 support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
