import { Heart, Shield, Users, Zap } from "lucide-react";

const features = [
    {
      icon: Users,
      title: 'Find Your Crew',
      description: 'Connect with people who share your interests and passions'
    },
    {
      icon: Zap,
      title: 'Quick & Easy',
      description: 'Browse events and join in just a few clicks'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Verified hosts and secure payment processing'
    },
    {
      icon: Heart,
      title: 'Build Connections',
      description: 'Create lasting friendships through shared experiences'
    }
  ];
export default function WhyChooseUs() {
  return (
    <div  className="py-20 px-4 bg-linear-to-br from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose GoTogether?</h2>
            <p className="text-xl opacity-90">The best platform for finding activity companions</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="opacity-90">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
  )
}
