import { Calendar, Search } from "lucide-react";
import Image from "next/image";

  const stats = [
    { number: '10,000+', label: 'Active Users' },
    { number: '500+', label: 'Events Monthly' },
    { number: '50+', label: 'Cities' },
    { number: '4.8★', label: 'Average Rating' }
  ];
export default function Hero() {
  return (
    <div className="pt-32 pb-20 px-4 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Never Miss Out on 
                <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Activities </span>
                Again
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Find companions for concerts, hiking trips, board game nights, and more. 
                Connect with like-minded people and explore together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-lg font-semibold">
                  <Search className="w-5 h-5" />
                  Find Activities
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-lg font-semibold">
                  <Calendar className="w-5 h-5" />
                  Create Event
                </button>
              </div>
              <div className="mt-8 flex items-center gap-8">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Image width={400} height={400}
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400" 
                  alt="Event"
                  className="rounded-2xl shadow-xl w-full h-64 object-cover"
                />
                <Image width={400} height={400}
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400" 
                  alt="Activity"
                  className="rounded-2xl shadow-xl w-full h-64 object-cover mt-8"
                />
             
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
