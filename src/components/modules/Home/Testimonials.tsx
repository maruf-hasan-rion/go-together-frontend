import { Star } from 'lucide-react'

  const testimonials = [
    {
      name: 'Alice Williams',
      text: 'I moved to Dhaka and knew no one. GoTogether helped me find amazing people and activities!',
      rating: 5
    },
    {
      name: 'Bob Anderson',
      text: 'Great platform! Attended 3 hiking trips and made lifelong friends. Highly recommended!',
      rating: 5
    },
    {
      name: 'Carol Martinez',
      text: 'The hosts are verified and events are well-organized. I feel safe trying new activities.',
      rating: 5
    }
  ];


export default function Testimonials() {
  return (
    <div>  <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Real stories from our community</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">{testimonial.text}</p>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section></div>
  )
}
