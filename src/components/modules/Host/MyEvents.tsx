"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calendar } from "lucide-react";
import EventCard from "@/components/modules/Events/EventCard";

type Props = {
  isAuthenticated: boolean;
  userRole: string | null;
  hostedEvents: any[];
  bookings: any[];
};

export default function MyEvents({
  isAuthenticated,
  userRole,
  hostedEvents,
  bookings,
}: Props) {
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Please Login</h2>
            <p className="text-muted-foreground mb-4">
              You need to login to view your events
            </p>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isHost = userRole === "HOST" || userRole === "ADMIN";

  const hostedCount = Array.isArray(hostedEvents) ? hostedEvents.length : 0;
  const joinedCount = Array.isArray(bookings) ? bookings.length : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-background">
        {/* Header */}
        <div className="bg-linear-to-r from-primary to-purple-600 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">My Events</h1>
                <p className="text-primary-foreground/90">
                  {isHost
                    ? "Manage your hosted and joined events"
                    : "View events you've joined"}
                </p>
              </div>

              {isHost && (
                <Link href="/host/dashboard/create-event">
                  <Button variant="secondary" size="lg" className="gap-2">
                    <Plus className="h-5 w-5" />
                    Create Event
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue={isHost ? "hosted" : "joined"} className="space-y-6">
            <TabsList className={`grid w-full max-w-md ${isHost ? "grid-cols-2" : "grid-cols-1"}`}>
              {isHost && (
                <TabsTrigger value="hosted">Hosted ({hostedCount})</TabsTrigger>
              )}
              <TabsTrigger value="joined">Joined ({joinedCount})</TabsTrigger>
            </TabsList>

            {isHost && (
              <TabsContent value="hosted" className="space-y-6">
                {hostedEvents?.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hostedEvents.map((event: any) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-card border rounded-xl">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-2">
                      No Hosted Events
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Create your first event to get started
                    </p>
                    <Link href="/host/dashboard/create-event">
                      <Button>Create Event</Button>
                    </Link>
                  </div>
                )}
              </TabsContent>
            )}

            <TabsContent value="joined" className="space-y-6">
              {bookings?.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookings.map((booking: any) => (
                    <EventCard
                      key={booking.id}
                      event={booking.event ?? booking}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card border rounded-xl">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Joined Events
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Browse events and join ones that interest you
                  </p>
                  <Link href="/events">
                    <Button>Browse Events</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
