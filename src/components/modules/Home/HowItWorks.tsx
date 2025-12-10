import { Heart, Search, Users } from "lucide-react";

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-blue-600" />
              </div>
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Browse Events</h3>
              <p className="text-gray-600">Explore activities that match your interests and schedule</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-indigo-600" />
              </div>
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Join & Connect</h3>
              <p className="text-gray-600">Book your spot and meet fellow participants</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-purple-600" />
              </div>
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Experience Together</h3>
              <p className="text-gray-600">Enjoy the activity and build lasting friendships</p>
            </div>
          </div>
        </div>
      </div>
  )
}
