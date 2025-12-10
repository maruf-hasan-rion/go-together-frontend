import { Star } from "lucide-react";

  const topHosts = [
    { name: 'Sarah Johnson', rating: 4.9, events: 18, avatar: 'SJ', specialty: 'Outdoor Adventures' },
    { name: 'John Smith', rating: 4.8, events: 25, avatar: 'JS', specialty: 'Music Events' },
    { name: 'Mike Chen', rating: 4.7, events: 32, avatar: 'MC', specialty: 'Tech Workshops' }
  ];

export default function TopRatedHosts() {
  return (
    <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top-Rated Hosts</h2>
            <p className="text-xl text-gray-600">Connect with our most trusted event organizers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {topHosts.map((host, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {host.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{host.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-gray-900">{host.rating}</span>
                      <span className="text-gray-500 text-sm">({host.events} events)</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{host.specialty}</p>
                <button className="w-full border-2 border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}
