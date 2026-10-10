import Link from "next/link";
import { Code, Dumbbell, Music, Palette, Plane, Utensils } from "lucide-react";

const categories = [
  { name: "Music", type: "CONCERT", icon: Music, color: "bg-purple-500" },
  { name: "Sports", type: "SPORTS", icon: Dumbbell, color: "bg-green-500" },
  { name: "Food", type: "DINNER", icon: Utensils, color: "bg-orange-500" },
  { name: "Outdoor", type: "OUTDOOR", icon: Plane, color: "bg-blue-500" },
  { name: "Tech", type: "TECH_MEETUP", icon: Code, color: "bg-indigo-500" },
  { name: "Arts", type: "ARTS", icon: Palette, color: "bg-pink-500" },
];

export default function EventCategories() {
  return (
    <div id="categories" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore by Category</h2>
          <p className="text-xl text-gray-600">Find activities that match your interests</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.type}
                href={`/events?type=${category.type}`}
                className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all group text-center"
              >
                <div
                  className={`${category.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
