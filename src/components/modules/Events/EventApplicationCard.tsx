"use client"
import Image from "next/image";
import React, { useMemo, useState, startTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, Clock } from "lucide-react";
import { Event } from "@/types/event.interface";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { approveEventApplication, rejectEventApplication } from "@/services/events/events";

type Host = Omit<Event, 'title' | 'type' | 'description' | 'eventDate' | 'image' | 'location' | 'joiningFee' | 'maxParticipants' | 'status' | 'date'> & { name?: string; profilePhoto?: string; rating?: number; ratingCount?: number };
type EventCardProps = {
    event: Event;
};

const formatDate = (iso?: string) => {
    if (!iso) return { date: "", time: "" };
    const d = new Date(iso);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[d.getUTCMonth()];
    const day = d.getUTCDate();
    const year = d.getUTCFullYear();
    const hours = String(d.getUTCHours()).padStart(2, "0");
    const minutes = String(d.getUTCMinutes()).padStart(2, "0");
    return {
        date: `${month} ${day}, ${year}`,
        time: `${hours}:${minutes}`,
    };
};

export default function EventApplicationCard({ event }: EventCardProps) {
    const router = useRouter();
    const [isAccepting, setIsAccepting] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);
    const host: Host = (event?.host as unknown as Host) || ({} as Host);
    const title = event?.title || "Untitled Event";
    const image = event?.image || "/images/event-placeholder.jpg";
    const categories: string[] = event?.type || [];
    const { date, time } = formatDate(event?.eventDate);
    const fee = event?.joiningFee ?? 0;
    const capacity = event?.maxParticipants ?? null;

    const status = useMemo(() => {
        if (event?.status) return event.status;
        const eventDate = new Date(event?.eventDate ?? "");
        return eventDate < new Date() ? "Past" : "Upcoming";
    }, [event?.status, event?.eventDate]);

    const handleAccept = async () => {
        if (!event?.id) return;
        setIsAccepting(true);
        try {
            const result = await approveEventApplication(event.id);
            if (result?.success) {
                toast.success(result.message || 'Application approved');
                startTransition(() => router.refresh());
            } else {
                toast.error(result?.message || 'Failed to approve application');
            }
        } catch (err) {
            console.error(err);
            toast.error('Request failed');
        } finally {
            setIsAccepting(false);
        }
    };

    const handleReject = async () => {
        if (!event?.id) return;
        setIsRejecting(true);
        try {
            const result = await rejectEventApplication(event.id);
            if (result?.success) {
                toast.success(result.message || 'Application rejected');
                startTransition(() => router.refresh());
            } else {
                toast.error(result?.message || 'Failed to reject application');
            }
        } catch (err) {
            console.error(err);
            toast.error('Request failed');
        } finally {
            setIsRejecting(false);
        }
    };

    return (
        <Card className="overflow-hidden border rounded-lg p-0 bg-background hover:cursor-pointer hover:scale-101 transition-shadow duration-200 gap-2">
            <div className="relative w-full h-56">
                <div className="relative w-full h-56 overflow-hidden rounded-lg border">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
                <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
                    <Badge className="bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">{status}</Badge>
                    <Badge className="bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">Capacity: {capacity ?? 'N/A'}</Badge>
                    <Badge className="bg-black/60 backdrop-blur-xs text-emerald-600 px-3 py-1 rounded-md">Fee: {fee ? `${fee} BDT` : 'Free'}</Badge>
                </div>

                <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">
                        <MapPin className="w-4 h-4 text-orange-500" />
                        <span className="text-xs">{event?.location || 'TBD'}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span className="text-xs">{date}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-xs">{time}</span>
                    </div>
                </div>
            </div>

            <CardContent className="space-y-2 mb-6 mt-3">
                <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold line-clamp-2 min-h-[3.2rem]">
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.8rem]">
                        {event?.description
                            ? (event.description.length > 160
                                ? `${event.description.slice(0, 157)}...`
                                : event.description)
                            : ""}
                    </p>
                </div>
                <div className="h-14 flex flex-wrap gap-2 items-center  justify-center text-center mb-7 ">
                    {categories.slice(0, 10).map((c: string) => (
                        <span key={c} className="text-xs text-orange-700 rounded whitespace-nowrap">
                            #{c.toLowerCase()}
                        </span>
                    ))}
                    {
                        categories.length > 6 && (
                            <p className="text-orange-700">...</p>
                        )
                    }
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 rounded-md">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                            <Image
                                src={host.profilePhoto || "/images/avatar-placeholder.png"}
                                alt={host.name || "Host"}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div>
                            <div className="text-xs">
                                {host.name || "Host"}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span>
                                    {typeof host.rating === "number"
                                        ? host.rating.toFixed(1)
                                        : "0.0"}{" "}
                                    ({host.ratingCount ?? 0})
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="ml-auto flex flex-col gap-2">
                        <Button
                            onClick={handleAccept}
                            className="bg-emerald-600 text-white hover:bg-emerald-500 min-w-36 whitespace-nowrap"
                            disabled={isAccepting}
                        >
                            {isAccepting ? 'Accepting...' : 'Accept'}
                        </Button>
                        <Button
                            onClick={handleReject}
                            variant="destructive"
                            className="min-w-36 whitespace-nowrap"
                            disabled={isRejecting}
                        >
                            {isRejecting ? 'Rejecting...' : 'Reject'}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
