"use client";
import Image from "next/image";
import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, Clock } from "lucide-react";
import { Event } from "@/types/event.interface";
import Link from "next/link";
import { toNumber } from "@/lib/utils";

// type Host = Event;
type EventCardProps = {
  event: Event;
};

const formatDate = (iso?: string) => {
  if (!iso) return { date: "", time: "" };
  const d = new Date(iso);
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
  return {
    date: dateFormatter.format(d),
    time: timeFormatter.format(d),
  };
};

const getImageSrc = (src?: string) => {
  if (!src) return "/images/event-placeholder.png";

  // Already a valid remote URL (Cloudinary, etc.)
  if (src.startsWith("http")) return src;

  // Backend-served uploads
  if (src.startsWith("/uploads")) {
    return `${process.env.NEXT_PUBLIC_API_URL}${src}`;
  }

  //   Anything else (windows path, broken value)
  return "/images/event-placeholder.png";
};
export default function EventCard({ event }: EventCardProps) {
  const host = event?.host || {};
  const title = event?.title || "Untitled Event";
  const image = getImageSrc(event?.image);
  const categories: string[] = event?.type || [];
  const { date, time } = formatDate(event?.eventDate);
  const fee = toNumber(event?.joiningFee);
  const capacity = event?.maxParticipants ?? null;

  const status = useMemo(() => {
    if (event?.status) return event.status;
    const eventDate = new Date(event?.eventDate ?? "");
    return eventDate < new Date() ? "Past" : "Upcoming";
  }, [event?.status, event?.eventDate]);

  const hostImage = getImageSrc(host.profilePhoto);

  return (
    <Card className="overflow-hidden border rounded-lg p-0 bg-background hover:cursor-pointer hover:scale-101 transition-shadow duration 600 gap-2  ">
      <div className="relative w-full h-56">
        <div className="relative w-full h-56 overflow-hidden rounded-lg border">
          <Image
            src={image}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
          <Badge className="bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">
            {status}
          </Badge>
          <Badge className="bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">
            Capacity: {capacity ?? "N/A"}
          </Badge>
          <Badge className="bg-black/60 backdrop-blur-xs text-emerald-600 px-3 py-1 rounded-md">
            Fee: {fee ? `${fee} BDT` : "Free"}
          </Badge>
        </div>

        <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span className="text-xs">{event?.location || "TBD"}</span>
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
      <CardContent className="space-y-2 mb-6 mt-3 ">
        <div className="text-center">
          <h3 className="text-lg font-semibold line-clamp-2 min-h-[3.2rem]">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.8rem]">
            {event?.description
              ? event.description.length > 160
                ? `${event.description.slice(0, 157)}...`
                : event.description
              : ""}
          </p>
        </div>

        <div className="h-14 flex flex-wrap gap-2 items-center  justify-center text-center mb-7 ">
          {categories.slice(0, 10).map((c: string) => (
            <span
              key={c}
              className="text-xs text-orange-700 rounded whitespace-nowrap"
            >
              #{c.toLowerCase()}
            </span>
          ))}
          {categories.length > 6 && <p className="text-orange-700">...</p>}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 rounded-md">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
              <Image
                src={hostImage}
                alt={host.fullName || "Host"}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>

            <div>
              <div className="text-xs">{host.fullName || "Host"}</div>
              <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>
                  {typeof host.averageRating === "number"
                    ? host?.averageRating
                    : "0.0"}{" "}
                  {/* ({host ?? 0}) */}
                </span>
              </div>
            </div>
          </div>
          <div className="ml-auto">
            <Link href={`/events/${event.id}`}>
              <Button className="bg-[#45aaa2] text-white border hover:bg-[#3c8f88] text-sm">
                Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
