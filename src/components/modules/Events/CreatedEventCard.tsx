"use client"
import Image from "next/image";
import React, { useMemo, useTransition, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, Edit, Trash2, CheckCircle } from "lucide-react";
import {Event} from "@/types/event.interface";
import { toast } from "sonner";
import { deleteEvent, completeEvent } from "@/services/events/events";
import EventFormDialog from "./EventFormDialog";
import { toNumber } from "@/lib/utils";

type CreatedEventCardProps = {
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

export default function CreatedEventCard({ event }: CreatedEventCardProps) {
    const [isPending, startTransition] = useTransition();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const title = event?.title || "Untitled Event";
    const image = event?.image || "/images/event-placeholder.jpg";
    const categories: string[] = event?.type || [];
    const { date, time } = formatDate(event?.eventDate);
    const fee = toNumber(event?.joiningFee);
    const capacity = event?.maxParticipants ?? null;
    const status = event?.status || "PENDING";

    const isEventTodayOrPast = useMemo(() => {
        if (!event?.eventDate) return false;
        const eventDate = new Date(event.eventDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate <= today;
    }, [event.eventDate]);

    const isEventPast = useMemo(() => {
        if (!event?.eventDate) return false;
        const eventDate = new Date(event.eventDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        eventDate.setHours(0, 0, 0, 0);
        return today > eventDate;
    }, [event.eventDate]);

    const showMarkComplete = useMemo(() => {
        return (status === "OPEN" || status === "FULL") && isEventTodayOrPast;
    }, [status, isEventTodayOrPast]);


    const showPendingDeleteOnly = useMemo(() => {
        return status === "PENDING" && isEventPast;
    }, [status, isEventPast]);


    const isDeleteDisabled = useMemo(() => {
        return status !== "PENDING" && status !== "REJECTED";
    }, [status]);


    const isUpdateDisabled = useMemo(() => {
        return status === "COMPLETED" || status === "REJECTED";
    }, [status]);

    const handleUpdate = () => {
        if (isUpdateDisabled) return;
        setIsUpdateModalOpen(true);
    };

    const handleDelete = () => {
        if (isDeleteDisabled || isPending) return;
        startTransition(async () => {
            const result = await deleteEvent(event.id);
            if (result.success) {
                toast.success(result.message || "Event deleted successfully");
                window.location.reload();
            } else {
                toast.error(result.message || "Failed to delete event");
            }
        });
    };

    const handleMarkComplete = () => {
        if (isPending) return;
        startTransition(async () => {
            const result = await completeEvent(event.id);
            if (result.success) {
                toast.success(result.message || "Event marked as complete");
                window.location.reload();
            } else {
                toast.error(result.message || "Failed to mark event as complete");
            }
        });
    };

    return (
        <>
            <Card className="overflow-hidden border rounded-lg p-0 bg-background hover:cursor-pointer hover:scale-101 transition-shadow duration-600 gap-2">
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
                        <Badge className={`backdrop-blur-xs px-3 py-1 rounded-md ${status === 'OPEN' ? 'bg-green-600/80 text-white' :
                            status === 'FULL' ? 'bg-orange-600/80 text-white' :
                                status === 'COMPLETED' ? 'bg-blue-600/80 text-white' :
                                    status === 'CANCELLED' ? 'bg-red-600/80 text-white' :
                                        status === 'PENDING' ? 'bg-yellow-600/80 text-white' :
                                            'bg-gray-600/80 text-white'
                            }`}>{status}</Badge>
                        <Badge className="bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">Capacity: {capacity ?? 'N/A'}</Badge>
                        <Badge className="bg-black/60 backdrop-blur-xs text-emerald-600 px-3 py-1 rounded-md">Fee: {fee ? `${fee} BDT` : 'Free'}</Badge>
                    </div>
                    <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
                        <div className="flex flex-col items-end gap-2">
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
                        <div className="flex flex-col gap-1">
                            <div className="text-xs text-gray-600">
                                Event ID: <span className="font-semibold text-foreground">{event.id.slice(0, 8)}...</span>
                            </div>
                        </div>
                        {showMarkComplete ? (
                            <div className="ml-auto">
                                <Button
                                    size="sm"
                                    onClick={handleMarkComplete}
                                    disabled={isPending}
                                    className="text-sm font-medium px-4 py-2 text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 rounded-md transition-colors duration-200"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    {isPending ? "Marking..." : "Mark Complete"}
                                </Button>
                            </div>
                        ) : showPendingDeleteOnly ? (
                            <div className="ml-auto">
                                <Button
                                    size="sm"
                                    onClick={handleDelete}
                                    disabled={isDeleteDisabled || isPending}
                                    className={`text-sm font-medium px-4 py-2 text-white flex items-center gap-2 rounded-md transition-colors duration-200 ${isDeleteDisabled || isPending
                                        ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                                        : "bg-red-600 hover:bg-red-700"
                                        }`}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    {isPending ? "Deleting..." : "Delete"}
                                </Button>
                            </div>
                        ) : (
                            <div className="ml-auto flex gap-2">
                                <Button
                                    size="sm"
                                    onClick={handleUpdate}
                                    disabled={isUpdateDisabled}
                                    className={`text-sm font-medium px-4 py-2 text-white flex items-center gap-2 rounded-md transition-colors duration-200 ${isUpdateDisabled
                                        ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                                        : "bg-[#45aaa2] hover:bg-[#3c8f88]"
                                        }`}
                                >
                                    <Edit className="w-4 h-4" />
                                    Update
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={handleDelete}
                                    disabled={isDeleteDisabled || isPending}
                                    className={`text-sm font-medium px-4 py-2 text-white flex items-center gap-2 rounded-md transition-colors duration-200 ${isDeleteDisabled || isPending
                                        ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                                        : "bg-red-600 hover:bg-red-700"
                                        }`}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    {isPending ? "Deleting..." : "Delete"}
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
            <EventFormDialog
                open={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                event={event}
                onSuccess={() => window.location.reload()}
            />
        </>
    );
}