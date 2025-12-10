import { Calendar, MapPin, Star, Users } from "lucide-react";
import Image from "next/image";

 const upcomingEvents = [
    {
      id: 1,
      title: 'Summer Music Festival',
      type: 'Concert',
      date: 'June 15, 2025',
      location: 'Dhaka Arena',
      participants: 8,
      maxParticipants: 50,
      fee: 1500,
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500',
      host: { name: 'John Smith', rating: 4.8 }
    },
    {
      id: 2,
      title: 'Weekend Hiking Adventure',
      type: 'Hiking',
      date: 'May 20, 2025',
      location: 'Chittagong',
      participants: 6,
      maxParticipants: 15,
      fee: 2000,
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=500',
      host: { name: 'Sarah Johnson', rating: 4.9 }
    },
    {
      id: 3,
      title: 'React Workshop',
      type: 'Tech Meetup',
      date: 'May 10, 2025',
      location: 'Sylhet',
      participants: 15,
      maxParticipants: 30,
      fee: 500,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
      host: { name: 'Mike Chen', rating: 4.7 }
    }
  ];

export default function FeaturedEvents() {
  return (
    <div id="events" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600">Join exciting activities near you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image width={500} height={200} src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {event.type}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{event.participants}/{event.maxParticipants} joined</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="text-sm text-gray-500">Hosted by</div>
                      <div className="font-semibold text-gray-900 flex items-center gap-1">
                        {event.host.name}
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm">{event.host.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">৳{event.fee}</div>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Join Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}
