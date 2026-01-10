

"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
// export const dynamic = "force-dynamic";


import{ useState,} from 'react';
import { Star, TrendingUp, Shield, Users, Calendar, DollarSign, ArrowRight,  } from 'lucide-react';
import { createHostApplication } from '@/services/user/becomeHost';

const BecomeHost = () => {
//   const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    // fullName: '',
    // email: '',
    // phone: '',
    // location: '',
    // bio: '',
    // experience: '',
    message:'',
  });

//   const eventTypes = [
//     { id: '1', title: 'Concert & Music', icon: '🎵' },
//     { id: '2', title: 'Sports & Fitness', icon: '💪' },
//     { id: '3', title: 'Hiking & Outdoor', icon: '🏔️' },
//     { id: '4', title: 'Tech Meetups', icon: '💻' },
//     { id: '5', title: 'Food & Dining', icon: '🍽️' },
//     { id: '6', title: 'Gaming', icon: '🎮' },
//     { id: '7', title: 'Arts & Culture', icon: '🎨' },
//     { id: '8', title: 'Networking', icon: '👥' },
//   ];

  const benefits = [
    {
      icon: DollarSign,
      title: 'Earn Money',
      description: 'Set your own prices and earn from ticket sales',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: Users,
      title: 'Build Community',
      description: 'Connect with people who share your passions',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: Star,
      title: 'Gain Recognition',
      description: 'Build your reputation through ratings and reviews',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    },
    {
      icon: Calendar,
      title: 'Flexible Schedule',
      description: 'Host events on your own time and terms',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      icon: Shield,
      title: 'Safe Platform',
      description: 'Verified participants and secure payments',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
    {
      icon: TrendingUp,
      title: 'Grow Your Impact',
      description: 'Scale your events and reach more people',
      color: 'text-pink-600',
      bg: 'bg-pink-50'
    },
  ];

  // const steps = [
  //   {
  //     number: '1',
  //     title: 'Create Your Profile',
  //     description: 'Sign up and tell us about yourself and your interests',
  //     icon: Users,
  //   },
  //   {
  //     number: '2',
  //     title: 'Get Verified',
  //     description: 'Complete identity verification for trust and safety',
  //     icon: Shield,
  //   },
  //   {
  //     number: '3',
  //     title: 'Create Your Event',
  //     description: 'Set up your first event with all the details',
  //     icon: Calendar,
  //   },
  //   {
  //     number: '4',
  //     title: 'Start Hosting',
  //     description: 'Welcome participants and build your community',
  //     icon: Star,
  //   },
  // ];

  // const requirements = [
  //   'Be at least 18 years old',
  //   'Have a valid government-issued ID',
  //   'Provide a phone number for verification',
  //   'Agree to our Host Terms and Conditions',
  //   'Have experience or passion in your event category',
  // ];

  // const successStories = [
  //   {
  //     name: 'Sarah Johnson',
  //     role: 'Outdoor Adventure Host',
  //     avatar: 'SJ',
  //     rating: 4.9,
  //     events: 28,
  //     earnings: '৳125,000',
  //     quote: 'Hosting hiking trips has allowed me to share my love for nature while earning income. The community is amazing!',
  //   },
  //   {
  //     name: 'Mike Chen',
  //     role: 'Tech Workshop Host',
  //     avatar: 'MC',
  //     rating: 4.8,
  //     events: 45,
  //     earnings: '৳180,000',
  //     quote: 'I love teaching coding. GoTogether made it easy to organize workshops and connect with eager learners.',
  //   },
  //   {
  //     name: 'Priya Das',
  //     role: 'Food Tour Host',
  //     avatar: 'PD',
  //     rating: 5.0,
  //     events: 36,
  //     earnings: '৳150,000',
  //     quote: 'Sharing Dhaka\'s culinary treasures with food lovers has been incredibly rewarding both personally and financially.',
  //   },
  // ];

    //   const toggleEventType = (id: string) => {
    //     setSelectedTypes(prev =>
    //       prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    //     );
    //   };

const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await fetch("/api/apply-host", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: formData.message }),
  });

  const data = await res.json();

  if (!res.ok || data?.success === false) {
    console.log(data?.message ?? "Failed");
    // here you can show toast
    return;
  }

  setFormData((p) => ({ ...p, message: "" }));
  // toast success if you want
};






  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-semibold">Start Earning Today</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Become a Host on GoTogether
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Turn your passion into income. Host events, build community, and make a difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-semibold">
                  Learn More
                </button>
              </div>
              <div className="flex gap-8 mt-8">
                <div>
                  <div className="text-3xl font-bold">10,000+</div>
                  <div className="text-sm opacity-80">Active Hosts</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">৳2.5M+</div>
                  <div className="text-sm opacity-80">Earned Monthly</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">4.8★</div>
                  <div className="text-sm opacity-80">Avg Rating</div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400" 
                  alt="Host Event"
                  className="rounded-2xl shadow-2xl w-full h-64 object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400" 
                  alt="Community"
                  className="rounded-2xl shadow-2xl w-full h-64 object-cover mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Become a Host?</h2>
            <p className="text-xl text-gray-600">Join thousands of successful hosts and start earning</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-14 h-14 ${benefit.bg} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-7 h-7 ${benefit.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      {/* <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Get Started</h2>
            <p className="text-xl text-gray-600">Four simple steps to start hosting</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center relative">
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-blue-200"></div>
                  )}
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center font-bold text-blue-600 text-lg mx-auto left-0 right-0">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* Requirements */}
      {/* <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Host Requirements</h2>
            <p className="text-xl text-gray-600">What you need to become a host</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-4">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-lg text-gray-700">{req}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Success Stories */}
      {/* <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Real hosts, real results</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {story.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.role}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold">{story.rating}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">&quot;{story.quote}&quot;</p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{story.events}</div>
                    <div className="text-sm text-gray-600">Events Hosted</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{story.earnings}</div>
                    <div className="text-sm text-gray-600">Total Earned</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Application Form */}
      <section id="application-form" className="py-20 px-4 bg-linear-to-br from-gray-50 to-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Apply to Become a Host</h2>
            <p className="text-xl text-gray-600">Fill out the form below and we&apos;ll get back to you within 24 hours</p>
          </div>
          <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">

            {/* <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+880 1234-567890"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Dhaka, Bangladesh"
                />
              </div>
            </div> */}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tell us about yourself *</label>
            <textarea
  name="message"  
  rows={4}
  value={formData.message}
  onChange={(e) =>
    setFormData({ ...formData, message: e.target.value })
  }
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  placeholder="Share your experience, passion, and why you want to become a host..."
/>

            </div>

            {/* <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Previous hosting experience</label>
              <textarea
                rows={3}
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about any events you've organized before (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">What types of events would you like to host? *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {eventTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => toggleEventType(type.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedTypes.includes(type.id)
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{type.icon}</div>
                    <div className="text-sm font-medium text-gray-900">{type.title}</div>
                    {selectedTypes.includes(type.id) && (
                      <CheckCircle className="w-5 h-5 text-blue-600 mx-auto mt-2" />
                    )}
                  </button>
                ))}
              </div>
            </div> */}
<button
  type="submit"
  className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold text-lg flex items-center justify-center gap-2"
>
  Submit Application
  <ArrowRight className="w-5 h-5" />
</button>

        </form>
          </div>
      </section>

      {/* FAQ Preview */}
      {/* <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Have Questions?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Check out our comprehensive FAQ section or contact our support team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              View FAQ
            </button>
            <button className="border-2 border-gray-300 px-8 py-3 rounded-lg hover:border-gray-400 transition-colors font-semibold">
              Contact Support
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default BecomeHost;